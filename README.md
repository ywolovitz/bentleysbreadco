# Bentley's Bread Co. Landing Page

A clean, elegant landing page for Bentley's Bread Co. featuring an image carousel, flip-card contact section, and social media links.

## Setup for GitHub Pages

To publish this site to GitHub Pages, follow these steps:

### 1. Initialize Git Repository (if not already done)

```bash
git init
git add .
git commit -m "Initial commit: Bentley's Bread Co. landing page"
git branch -M main
```

### 2. Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it (e.g., `bentleysbreadco` or `bentleys-bread-co`)
3. **Don't** initialize it with a README, .gitignore, or license (we already have these)

### 3. Connect and Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select **Deploy from a branch**
5. Choose **main** branch and `/ (root)` folder
6. Click **Save**

Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Adding Images to Carousel

1. Add images to the `assets/carousel/` directory
2. Run: `node generate-carousel.js`
3. Commit and push the changes:
   ```bash
   git add .
   git commit -m "Add new carousel images"
   git push
   ```

## Local Development

Simply open `index.html` in your web browser to view the site locally.
