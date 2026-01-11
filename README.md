# Shirwal Circle (Shiwal Circle)

A simple, responsive static directory site for businesses in Shirwal. Built to make it easy for buyers to find and contact local shops and services.

## Features
- Search and filter by category
- Business cards with description, address and photo
- Direct contact actions: Call, WhatsApp, Email, Website
- Details modal and copy-to-clipboard for phone numbers
- Easy to edit JSON data for businesses

## Files
- `index.html` — main site
- `styles.css` — styles
- `script.js` — client JS to load and render businesses
- `businesses.json` — data for each business

## businesses.json schema
Each entry should have:
- `name` (string, required)
- `category` (string)
- `description` (string)
- `phone` (string)
- `whatsapp` (string) — phone number for WhatsApp (international format without spaces recommended)
- `email` (string)
- `website` (string)
- `address` (string)
- `hours` (string)
- `image` (string) — optional image URL

Example:
```json
{
  "name": "Shirwal Grocers",
  "category": "Grocery",
  "description": "Daily essentials and fresh produce.",
  "phone": "+91-1234567890",
  "whatsapp": "+911234567890",
  "email": "shop@example.com",
  "website": "https://example.com",
  "address": "Main road, Shirwal",
  "hours": "8 AM - 9 PM",
  "image": "https://images.unsplash.com/..."
}
```

## Local testing
Serve the folder with a simple static server. Example:
- Using Python 3:
  - `python -m http.server 8000`
  - Open `http://localhost:8000/` in your browser.

## Deploy to GitHub Pages
1. Add files to your repository (root or `docs/` directory).
2. In repository Settings → Pages choose branch `main` (or `gh-pages`) and folder `/ (root)` or `/docs`.
3. Save; after a minute your site will be available at `https://<user>.github.io/<repo>/`.

## Customize
- To add businesses, edit `businesses.json` and commit.
- Replace placeholder images with local `/assets/` images if desired.
- Change colors in `styles.css` to match branding.

## Need help?
If you'd like, I can:
- Add more features (map view, categories page, admin upload form)
- Push these files directly to your GitHub repo and enable Pages (I can make a commit if you want — tell me the branch and confirm)
- Integrate a small admin UI to add listings without editing JSON

Enjoy — Shirwal Circle will help local buyers connect with businesses quickly.
