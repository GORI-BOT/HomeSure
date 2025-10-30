export interface Product {
  id: string
  name: string
  description: string | null
  price: number
  category: string
  brand: string | null
  image_url: string | null
  stock_quantity: number
  featured: boolean
  created_at: string
  updated_at: string
}

export interface RepairRequest {
  id: string
  user_id: string | null
  full_name: string
  email: string
  phone: string
  address: string
  appliance_type: string
  brand: string | null
  model: string | null
  issue_description: string
  preferred_date: string | null
  status: "pending" | "confirmed" | "in_progress" | "completed" | "cancelled"
  technician_notes: string | null
  created_at: string
  updated_at: string
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at: string
  updated_at: string
  products?: Product
}

export interface Order {
  id: string
  user_id: string
  total_amount: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  shipping_address: string
  shipping_name: string
  shipping_phone: string
  created_at: string
  updated_at: string
}

export interface Profile {
  id: string
  full_name: string | null
  phone: string | null
  address: string | null
  created_at: string
  updated_at: string
}
