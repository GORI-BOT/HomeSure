-- Insert sample appliances for the store
-- NOTE: You can use either local images (starting with /) or full web URLs (starting with https://)
-- Examples:
--   Local: '/stainless-steel-refrigerator-appliance.jpg' (stored in /public folder)
--   Web URL: 'https://example.com/images/refrigerator.jpg' (from any website)

insert into public.products (name, description, price, category, brand, image_url, stock_quantity, featured) values
  ('Samsung French Door Refrigerator', 'Energy-efficient 28 cu. ft. refrigerator with FlexZone drawer', 2499.99, 'Refrigerators', 'Samsung', 'https://i.pinimg.com/736x/bf/4b/60/bf4b60c878abd7410ef00a3942c498cf.jpg', 5, true),
  ('LG Front Load Washing Machine', '5.0 cu. ft. capacity with TurboWash technology and Steam cleaning', 1299.99, 'Washing Machines', 'LG', '/premium-washing-machine-dryer-set.jpg', 8, true),
  ('Whirlpool Gas Range', '5.8 cu. ft. capacity with 5 burners and convection oven', 899.99, 'Ovens & Ranges', 'Whirlpool', '/modern-electric-oven-range.jpg', 6, true),
  ('Bosch Dishwasher', 'Ultra-quiet 44 dBA with 16 place settings and third rack', 1099.99, 'Dishwashers', 'Bosch', '/stainless-steel-dishwasher.jpg', 4, true),
  ('GE Profile Microwave', '2.2 cu. ft. countertop microwave with sensor cooking', 349.99, 'Microwaves', 'GE', '/microwave-oven-kitchen.jpg', 12, false),
  ('Frigidaire Chest Freezer', '14.8 cu. ft. manual defrost chest freezer', 599.99, 'Freezers', 'Frigidaire', '/chest-freezer-appliance.jpg', 3, false),
  -- Example of using web URL for product-- Insert sample appliances for the store
-- NOTE: Using working web URLs from Unsplash for immediate display
-- You can replace these with your own images later

insert into public.products (name, description, price, category, brand, image_url, stock_quantity, featured) values
  ('Samsung French Door Refrigerator', 'Energy-efficient 28 cu. ft. refrigerator with FlexZone drawer', 2499.99, 'Refrigerators', 'Samsung', 'https://plus.unsplash.com/premium_photo-1731622157143-70f72e11a580?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=415', 5, true),
  ('LG Front Load Washing Machine', '5.0 cu. ft. capacity with TurboWash technology and Steam cleaning', 1299.99, 'Washing Machines', 'LG', 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80', 8, true),
  ('Whirlpool Gas Range', '5.8 cu. ft. capacity with 5 burners and convection oven', 899.99, 'Ovens & Ranges', 'Whirlpool', 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=800&q=80', 6, true),
  ('Bosch Dishwasher', 'Ultra-quiet 44 dBA with 16 place settings and third rack', 1099.99, 'Dishwashers', 'Bosch', 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=800&q=80', 4, true),
  ('GE Profile Microwave', '2.2 cu. ft. countertop microwave with sensor cooking', 349.99, 'Microwaves', 'GE', 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=800&q=80', 12, false),
  ('Frigidaire Chest Freezer', '14.8 cu. ft. manual defrost chest freezer', 599.99, 'Freezers', 'Frigidaire', 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80', 3, false),
  ('KitchenAid Stand Mixer', '5-quart tilt-head stand mixer with 10 speeds', 449.99, 'Small Appliances', 'KitchenAid', 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=800&q=80', 15, false),
  ('Dyson Vacuum Cleaner', 'V15 Detect cordless vacuum with laser dust detection', 749.99, 'Vacuums', 'Dyson', 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&q=80', 10, true),
  ('Maytag Top Load Washer', '4.7 cu. ft. capacity with PowerWash agitator', 799.99, 'Washing Machines', 'Maytag', 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80', 7, false),
  ('Electrolux Electric Dryer', '8.0 cu. ft. capacity with Perfect Steam technology', 999.99, 'Dryers', 'Electrolux', 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=800&q=80', 5, false);
 image
  ('KitchenAid Stand Mixer', '5-quart tilt-head stand mixer with 10 speeds', 449.99, 'Small Appliances', 'KitchenAid', 'https://images.unsplash.com/photo-1578269174936-2709b6aeb913?w=400', 15, false),
  ('Dyson Vacuum Cleaner', 'V15 Detect cordless vacuum with laser dust detection', 749.99, 'Vacuums', 'Dyson', 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400', 10, true),
  ('Maytag Top Load Washer', '4.7 cu. ft. capacity with PowerWash agitator', 799.99, 'Washing Machines', 'Maytag', '/premium-washing-machine-dryer-set.jpg', 7, false),
  ('Electrolux Electric Dryer', '8.0 cu. ft. capacity with Perfect Steam technology', 999.99, 'Dryers', 'Electrolux', 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400', 5, false);
