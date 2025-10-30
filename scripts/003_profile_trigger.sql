-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table for user management
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  address text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create products table for appliance retail
create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  description text,
  price decimal(10, 2) not null,
  category text not null,
  brand text,
  image_url text,
  stock_quantity integer default 0,
  featured boolean default false,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create repair_requests table
create table if not exists public.repair_requests (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  phone text not null,
  address text not null,
  appliance_type text not null,
  brand text,
  model text,
  issue_description text not null,
  preferred_date date,
  status text default 'pending' check (status in ('pending', 'confirmed', 'in_progress', 'completed', 'cancelled')),
  technician_notes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create orders table
create table if not exists public.orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  total_amount decimal(10, 2) not null,
  status text default 'pending' check (status in ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  shipping_address text not null,
  shipping_name text not null,
  shipping_phone text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Create order_items table
create table if not exists public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  quantity integer not null,
  price decimal(10, 2) not null,
  created_at timestamp with time zone default now()
);

-- Create cart_items table
create table if not exists public.cart_items (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  product_id uuid references public.products(id) on delete cascade,
  quantity integer not null default 1,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique(user_id, product_id)
);