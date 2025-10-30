# How to Add Product Images

You can add product images in two ways:

## Method 1: Using Web URLs (Recommended for Quick Setup)

You can use image URLs from any website. Simply use the full URL in the `image_url` field:

\`\`\`sql
UPDATE products
SET image_url = 'https://example.com/images/refrigerator.jpg'
WHERE id = 'your-product-id';
\`\`\`

**Popular Image Sources:**

- Unsplash: `https://images.unsplash.com/photo-xxxxx?w=400`
- Manufacturer websites
- Your own CDN or image hosting service

**Example:**
\`\`\`sql
INSERT INTO products (name, description, price, category, brand, image_url, stock_quantity, featured)
VALUES (
'Samsung Refrigerator',
'Modern stainless steel refrigerator',
1999.99,
'Refrigerators',
'Samsung',
'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400',
10,
true
);
\`\`\`

## Method 2: Using Local Images

1. **Add images to the `/public` folder** in your project:
   \`\`\`
   /public
   /stainless-steel-refrigerator.jpg
   /washing-machine.jpg
   /dishwasher.jpg
   \`\`\`

2. **Reference them in the database** without the `/public` prefix:
   \`\`\`sql
   UPDATE products
   SET image_url = '/stainless-steel-refrigerator.jpg'
   WHERE id = 'your-product-id';
   \`\`\`

## Updating Products via Supabase Dashboard

1. Go to your Supabase Dashboard
2. Navigate to **Table Editor** → **products**
3. Click on the product you want to update
4. Edit the `image_url` field with either:
   - Full web URL: `https://example.com/image.jpg`
   - Local path: `/my-image.jpg`
5. Click **Save**

## Best Practices

- Use consistent image dimensions (recommended: 400x400px or 800x800px)
- Optimize images for web (compress to reduce file size)
- Use HTTPS URLs for security
- Consider using a CDN for better performance
- Use descriptive filenames: `samsung-refrigerator-model-123.jpg`

## Image Optimization Tips

For local images, you can use tools like:

- TinyPNG (https://tinypng.com)
- ImageOptim (https://imageoptim.com)
- Squoosh (https://squoosh.app)

Next.js will automatically optimize images when using the `<Image>` component!
