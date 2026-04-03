# Reverence Preparatory School Website

## Logo Setup
Place the school logo file at:
`assets/img/logo/reverence-logo.jpg`

The logo is a JPG with a white background.
On light backgrounds: CSS `mix-blend-mode: multiply` removes the white background automatically.
On dark/purple backgrounds: CSS `filter: brightness(0) invert(1)` renders it as a clean white logo.
No Photoshop or image editing is required.

## Project Overview
This is a complete, multi-page school website for **Reverence Preparatory School**, located at **Old Town, Offinso, Ashanti, Ghana**.

The site is built with:
- Pure HTML5, CSS3, and Vanilla JavaScript
- Shared reusable navbar and footer partials loaded via `fetch()`
- Decap CMS (Netlify CMS) for content management
- Netlify Forms for admissions and contact submissions

## How To Run Locally
1. Open the `reverence-school` folder in VS Code.
2. For static preview, open `index.html` directly (`file://`) or use a local server (recommended):
   - `python3 -m http.server 8080`
   - Visit `http://localhost:8080`
3. All assets use relative paths, and form handling gracefully validates under `file://`.

## How To Deploy To Netlify via GitHub
1. Push this folder to a GitHub repository.
2. In Netlify, click **Add new site** → **Import an existing project**.
3. Connect your GitHub repo and choose the branch.
4. Netlify will read `netlify.toml` and publish from the site root.
5. After deploy, check:
   - `/admin` route for CMS access
   - contact/admissions form submissions

## ADMIN SETUP
1. Go to your Netlify dashboard → Site settings → Identity → Enable Identity.
2. Under Identity → Registration → set to "Invite only".
3. Under Identity → Services → Enable Git Gateway.
4. Invite yourself as admin using your email.
5. Accept the email invite.
6. Go to yourdomain.netlify.app/admin to access the CMS.
7. From there you can:
   - Write and publish blog posts (with images)
   - Create events and news entries in one shared collection
   - Add/remove gallery images
   - All changes auto-deploy to the live site via GitHub.

## File Structure
- `index.html` and other top-level HTML pages: all site pages
- `partials/navbar.html`, `partials/footer.html`: reusable layout includes
- `css/`: global styles, components, hero, carousel, responsive rules
- `js/`: navbar, carousel, forms, animations, content loading, gallery features
- `admin/`: Decap CMS admin panel + CMS config
- `content/`: markdown content for blog, events (including news), and gallery
- `assets/`: images, uploads, and icons
- `_redirects`, `netlify.toml`: Netlify routing and deploy configuration

## How To Update Content via CMS
1. Log in at `/admin`.
2. Choose a collection:
   - **Blog Posts**
   - **Events & News**
   - **Gallery Images**
3. Create or edit entries.
4. Publish changes from the CMS editor.
5. Netlify rebuilds and deploys automatically.
