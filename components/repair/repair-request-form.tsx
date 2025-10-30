"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function RepairRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [applianceType, setApplianceType] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  const whatsappNumber = "263717064945"; // Removed + for URL compatibility

  const handleSubmit = async (method: "whatsapp" | "email") => {
    if (!formRef.current) return;

    if (!applianceType) {
      setError("Please select an appliance type");
      return;
    }

    if (!formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(formRef.current);
    const data = {
      full_name: formData.get("full_name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      address: formData.get("address") as string,
      appliance_type: applianceType,
      brand: formData.get("brand") as string,
      model: formData.get("model") as string,
      issue_description: formData.get("issue_description") as string,
      preferred_date: formData.get("preferred_date") as string,
    };

    try {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error: insertError } = await supabase
        .from("repair_requests")
        .insert({
          ...data,
          user_id: user?.id || null,
        });

      if (insertError) throw insertError;

      setIsSuccess(true);

      if (method === "whatsapp") {
        const whatsappMessage = encodeURIComponent(
          `New Repair Request:\nName: ${data.full_name}\nPhone: ${
            data.phone
          }\nEmail: ${data.email}\nAddress: ${data.address}\nAppliance: ${
            data.appliance_type
          }\nBrand: ${data.brand || "N/A"}\nModel: ${
            data.model || "N/A"
          }\nIssue: ${data.issue_description}\nPreferred Date: ${
            data.preferred_date || "ASAP"
          }`
        );
        // Fixed: Using the whatsappNumber variable correctly
        window.open(
          `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`,
          "_blank"
        );
      } else {
        const subject = encodeURIComponent(
          `Repair Request - ${data.appliance_type}`
        );
        const body = encodeURIComponent(
          `New Repair Request:\n\nName: ${data.full_name}\nPhone: ${
            data.phone
          }\nEmail: ${data.email}\nAddress: ${data.address}\nAppliance: ${
            data.appliance_type
          }\nBrand: ${data.brand || "N/A"}\nModel: ${
            data.model || "N/A"
          }\nIssue: ${data.issue_description}\nPreferred Date: ${
            data.preferred_date || "ASAP"
          }`
        );
        window.location.href = `mailto:repairs@applifixpro.com?subject=${subject}&body=${body}`;
      }

      setTimeout(() => {
        setIsSuccess(false);
        setApplianceType("");
        formRef.current?.reset();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit request");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <Card className="border-2 border-primary">
        <CardContent className="pt-6 text-center">
          <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">
            Request Submitted Successfully!
          </h3>
          <p className="text-muted-foreground">
            Your repair request has been saved and sent. We'll contact you
            shortly.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form ref={formRef} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="full_name">Full Name *</Label>
              <Input
                id="full_name"
                name="full_name"
                required
                placeholder="John Doe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="(123) 456-7890"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="john@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Service Address *</Label>
            <Input
              id="address"
              name="address"
              required
              placeholder="123 Main St, City, State 12345"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="appliance_type">Appliance Type *</Label>
              <Select
                value={applianceType}
                onValueChange={setApplianceType}
                required
              >
                <SelectTrigger id="appliance_type">
                  <SelectValue placeholder="Select appliance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Refrigerator">Refrigerator</SelectItem>
                  <SelectItem value="Washing Machine">
                    Washing Machine
                  </SelectItem>
                  <SelectItem value="Dryer">Dryer</SelectItem>
                  <SelectItem value="Oven/Range">Oven/Range</SelectItem>
                  <SelectItem value="Dishwasher">Dishwasher</SelectItem>
                  <SelectItem value="Microwave">Microwave</SelectItem>
                  <SelectItem value="Freezer">Freezer</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                name="brand"
                placeholder="e.g., Samsung, LG, Whirlpool"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Model Number</Label>
            <Input
              id="model"
              name="model"
              placeholder="Optional - helps us prepare"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="issue_description">Describe the Issue *</Label>
            <Textarea
              id="issue_description"
              name="issue_description"
              required
              placeholder="Please describe what's wrong with your appliance..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="preferred_date">Preferred Service Date</Label>
            <Input id="preferred_date" name="preferred_date" type="date" />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              type="button"
              onClick={() => handleSubmit("whatsapp")}
              className="flex-1 bg-[#25D366] hover:bg-[#20BA5A] text-white"
              disabled={isSubmitting}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              {isSubmitting ? "Submitting..." : "Submit via WhatsApp"}
            </Button>
            <Button
              type="button"
              onClick={() => handleSubmit("email")}
              variant="outline"
              className="flex-1"
              disabled={isSubmitting}
            >
              <Mail className="mr-2 h-4 w-4" />
              {isSubmitting ? "Submitting..." : "Submit via Email"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
