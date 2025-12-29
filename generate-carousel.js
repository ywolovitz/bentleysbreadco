// Script to scan assets/carousel directory and generate images.js
// Run this script whenever you add new images: node generate-carousel.js

const fs = require('fs');
const path = require('path');

const carouselDir = path.join(__dirname, 'assets', 'carousel');
const outputFile = path.join(__dirname, 'images.js');

// Get all image files from the carousel directory
function getImageFiles(dir) {
    try {
        const files = fs.readdirSync(dir);
        return files
            .filter(file => {
                const ext = path.extname(file).toLowerCase();
                return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
            })
            .map(file => `assets/carousel/${file}`)
            .sort(); // Sort alphabetically for consistent ordering
    } catch (error) {
        console.error('Error reading carousel directory:', error.message);
        return [];
    }
}

const images = getImageFiles(carouselDir);

if (images.length === 0) {
    console.log('⚠️  No images found in assets/carousel/');
    console.log('   Add some images to that directory and run this script again.');
} else {
    console.log(`✓ Found ${images.length} image(s) in assets/carousel/`);
}

// Generate the images.js file
const content = `// Auto-generated file - do not edit manually
// Run 'node generate-carousel.js' to regenerate this file

const carouselImages = ${JSON.stringify(images, null, 2)};
`;

fs.writeFileSync(outputFile, content, 'utf8');
console.log(`✓ Generated images.js with ${images.length} image(s)`);
console.log(`  Images will be loaded automatically when you open index.html`);
