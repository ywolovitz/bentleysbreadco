# Quick GitHub Pages Setup Guide

Run these commands in your terminal from the project directory:

```bash
# 1. Initialize git repository
git init

# 2. Add all files
git add .

# 3. Make initial commit
git commit -m "Initial commit: Bentley's Bread Co. landing page"

# 4. Rename branch to main (if needed)
git branch -M main

# 5. Create a new repository on GitHub (via web interface)
#    Then connect it:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# 6. Push to GitHub
git push -u origin main
```

## Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under "Source", select **main** branch, **/ (root)** folder
4. Click **Save**

Your site will be live in a few minutes at:
`https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

## Note

The `.gitignore` file is already created to exclude system files like `.DS_Store`.
