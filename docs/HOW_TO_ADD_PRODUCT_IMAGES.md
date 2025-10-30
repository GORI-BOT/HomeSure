# How to Add Product Images

Product images aren't showing? Here's how to fix it:

## Quick Fix: Use Web URLs (Recommended)

The easiest way is to use image URLs from the web. The website now supports images from any HTTPS source.

### Step 1: Find Your Images

Get image URLs from:

- **Unsplash**: https://unsplash.com (free high-quality images)
- **Pexels**: https://pexels.com (free stock photos)
- **Your own hosting**: Upload to Imgur, Cloudinary, or your own server

### Step 2: Update Database

Run this SQL in Supabase SQL Editor:

\`\`\`sql
-- Update a specific product
UPDATE products
SET image_url = 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80'
WHERE name = 'Samsung French Door Refrigerator';

-- Or update all products at once
UPDATE products SET image_url = 'https://your-image-url.com/image.jpg' WHERE id = 'product-id';
\`\`\`

### Step 3: Restart Dev Server

\`\`\`bash

# Stop the server (Ctrl + C)

# Start again

npm run dev
\`\`\`

## Alternative: Use Local Images

If you want to use local images:

### Step 1: Add Images to Public Folder

1. Place your images in the `/public` folder
2. Name them clearly (e.g., `samsung-refrigerator.jpg`)

### Step 2: Update Database

\`\`\`sql
UPDATE products
SET image_url = '/samsung-refrigerator.jpg'
WHERE name = 'Samsung French Door Refrigerator';
\`\`\`

### Step 3: Restart Server

\`\`\`bash
npm run dev
\`\`\`

## Troubleshooting

**Images still not showing?**

1. **Check the database**: Make sure the `image_url` column has valid URLs
   \`\`\`sql
   SELECT name, image_url FROM products;
   \`\`\`

2. **Check browser console**: Press F12 and look for image loading errors

3. **Verify URLs work**: Copy the image URL and paste it in a new browser tab

4. **Clear cache**: Hard refresh with Ctrl + Shift + R (Windows) or Cmd + Shift + R (Mac)

5. **Check file names**: If using local images, ensure the file name in the database matches exactly (case-sensitive)

## Best Practices

- Use **web URLs** for easier management
- Use **high-quality images** (at least 800x800px)
- Use **consistent aspect ratios** (square images work best)
- Optimize images before uploading (compress to reduce file size)
- Use **descriptive file names** (samsung-refrigerator.jpg, not IMG_1234.jpg)

## Example: Adding a New Product with Image

\`\`\`sql
INSERT INTO products (name, description, price, category, brand, image_url, stock_quantity, featured)
VALUES (
'New Refrigerator',
'Amazing new fridge',
1999.99,
'Refrigerators',
'Samsung',
'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800&q=80',
10,
true
);
\`\`\`

That's it! Your product images should now display correctly.
