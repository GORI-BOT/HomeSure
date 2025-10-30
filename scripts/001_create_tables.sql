-- Insert sample products (only if table is empty)
INSERT INTO public.products (name, description, price, category, brand, image_url, stock_quantity, featured)
SELECT 
  'Samsung Front Load Washer',
  'Energy efficient front load washing machine with 10 wash programs',
  899.99,
  'Washers',
  'Samsung',
  'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
  15,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.products LIMIT 1);

INSERT INTO public.products (name, description, price, category, brand, image_url, stock_quantity, featured)
SELECT 
  'LG French Door Refrigerator',
  '28 cu. ft. smart refrigerator with ice and water dispenser',
  1299.99,
  'Refrigerators',
  'LG',
  'https://images.unsplash.com/photo-1591798454113-023bcfba59a9?w=400',
  8,
  true
WHERE NOT EXISTS (SELECT 1 FROM public.products LIMIT 1);

-- Create updated_at trigger function (if not exists)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at (only if they don't exist)
DO $$ BEGIN
    CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TRIGGER update_repair_requests_updated_at BEFORE UPDATE ON public.repair_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
    CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON public.cart_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
    WHEN duplicate_object THEN NULL;
END $$;