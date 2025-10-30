# Google Ads (AdWords) Setup Guide

## Overview

Google Ads integration has been added to track conversions and measure the effectiveness of your advertising campaigns.

## Setup Instructions

### 1. Get Your Google Ads Conversion ID

1. Sign in to your Google Ads account at [ads.google.com](https://ads.google.com)
2. Click **Tools & Settings** (wrench icon) in the top right
3. Under **Measurement**, click **Conversions**
4. Click the **+ New conversion action** button
5. Select **Website** as the conversion source
6. Choose your conversion goal (e.g., "Submit lead form", "Purchase")
7. Configure your conversion settings:
   - **Category**: Choose appropriate category (Lead, Purchase, etc.)
   - **Value**: Set if applicable
   - **Count**: Choose "One" for unique conversions
8. Click **Create and Continue**
9. Select **Use Google tag manager or add code manually**
10. Copy your **Conversion ID** (format: AW-XXXXXXXXXX)

### 2. Update Your Website Code

Replace `AW-XXXXXXXXXX` in `app/layout.tsx` with your actual Conversion ID:

\`\`\`tsx

<script
  async
  src="https://www.googletagmanager.com/gtag/js?id=AW-XXXXXXXXXX"
/>
\`\`\`

And in the gtag config:

\`\`\`tsx
gtag('config', 'AW-XXXXXXXXXX');
\`\`\`

### 3. Add Conversion Tracking to Key Pages

Add conversion tracking events to important actions:

**For Repair Requests** (in `components/repair/repair-request-form.tsx`):
\`\`\`tsx
// After successful form submission
if (typeof window !== 'undefined' && window.gtag) {
  window.gtag('event', 'conversion', {
    'send_to': 'AW-XXXXXXXXXX/AbC-DEFG1234',
    'value': 1.0,
    'currency': 'USD'
  });
}
\`\`\`

**For Product Purchases** (in `components/checkout/checkout-form.tsx`):
\`\`\`tsx
// After successful order
if (typeof window !== 'undefined' && window.gtag) {
  window.gtag('event', 'conversion', {
    'send_to': 'AW-XXXXXXXXXX/XyZ-HIJK5678',
    'value': totalAmount,
    'currency': 'USD',
    'transaction_id': orderId
  });
}
\`\`\`

### 4. Verify Installation

1. Install the **Google Tag Assistant** Chrome extension
2. Visit your website
3. Click the extension icon
4. Verify that the Google Ads tag is firing correctly

### 5. Test Conversions

1. In Google Ads, go to **Tools & Settings** > **Conversions**
2. Find your conversion action
3. Check the **Status** column - it should show "Recording conversions"
4. Perform a test conversion on your website
5. Wait 24-48 hours for data to appear in Google Ads

## Conversion Actions to Track

Recommended conversion actions for your appliance repair website:

1. **Repair Request Submission** - High value
2. **Product Purchase** - High value
3. **Contact Form Submission** - Medium value
4. **Phone Call Click** - Medium value
5. **WhatsApp Click** - Medium value
6. **Newsletter Signup** - Low value

## Best Practices

- Set appropriate conversion values based on your average customer lifetime value
- Use different conversion actions for different goals
- Enable auto-tagging in Google Ads settings
- Link Google Ads with Google Analytics for deeper insights
- Review conversion data weekly to optimize campaigns

## Troubleshooting

**Conversions not tracking:**
- Verify the Conversion ID is correct
- Check browser console for JavaScript errors
- Ensure ad blockers are disabled during testing
- Confirm the gtag script is loading (check Network tab in DevTools)

**Duplicate conversions:**
- Set conversion counting to "One" instead of "Every"
- Use transaction IDs to prevent duplicates

## Additional Resources

- [Google Ads Help Center](https://support.google.com/google-ads)
- [Conversion Tracking Guide](https://support.google.com/google-ads/answer/1722022)
- [Google Tag Manager Documentation](https://support.google.com/tagmanager)
