// Carousel functionality - shows 5 images at a time
class ImageCarousel {
    constructor() {
        this.currentIndex = 0;
        this.slidesPerView = 5;
        this.track = document.getElementById('carouselTrack');
        this.indicatorsContainer = document.getElementById('carouselIndicators');
        this.prevBtn = document.querySelector('.carousel-btn.prev');
        this.nextBtn = document.querySelector('.carousel-btn.next');
        this.carouselWrapper = document.querySelector('.carousel-wrapper');
        this.slides = this.track.querySelectorAll('.carousel-slide');
        this.startX = 0;
        this.endX = 0;
        this.autoScrollInterval = null;
        this.autoScrollDelay = 4000; // 4 seconds between slides
        
        // Adjust for mobile
        if (window.innerWidth <= 768) {
            this.slidesPerView = 1;
        }
        
        this.totalSlides = this.slides.length;
        this.totalGroups = Math.ceil(this.totalSlides / this.slidesPerView);
        
        this.init();
    }
    
    init() {
        // Create indicators
        this.createIndicators();
        
        // Add event listeners
        this.prevBtn.addEventListener('click', () => {
            this.pauseAutoScroll();
            this.prevSlide();
            // Resume after a delay
            setTimeout(() => this.startAutoScroll(), 5000);
        });
        this.nextBtn.addEventListener('click', () => {
            this.pauseAutoScroll();
            this.nextSlide();
            // Resume after a delay
            setTimeout(() => this.startAutoScroll(), 5000);
        });
        
        // Touch/swipe support for mobile
        this.track.addEventListener('touchstart', (e) => {
            this.startX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', (e) => {
            this.endX = e.changedTouches[0].clientX;
            this.handleSwipe();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.pauseAutoScroll();
                this.prevSlide();
                setTimeout(() => this.startAutoScroll(), 5000);
            }
            if (e.key === 'ArrowRight') {
                this.pauseAutoScroll();
                this.nextSlide();
                setTimeout(() => this.startAutoScroll(), 5000);
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth <= 768 && this.slidesPerView !== 1) {
                this.slidesPerView = 1;
                this.totalGroups = Math.ceil(this.totalSlides / this.slidesPerView);
                this.createIndicators();
                this.updateCarousel();
            } else if (window.innerWidth > 768 && this.slidesPerView !== 5) {
                this.slidesPerView = 5;
                this.totalGroups = Math.ceil(this.totalSlides / this.slidesPerView);
                this.createIndicators();
                this.updateCarousel();
            }
        });
        
        // Pause auto-scroll on hover
        if (this.carouselWrapper) {
            this.carouselWrapper.addEventListener('mouseenter', () => this.pauseAutoScroll());
            this.carouselWrapper.addEventListener('mouseleave', () => this.startAutoScroll());
        }
        
        this.updateCarousel();
        this.startAutoScroll();
    }
    
    createIndicators() {
        this.indicatorsContainer.innerHTML = '';
        for (let i = 0; i < this.totalGroups; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (i === 0) indicator.classList.add('active');
            indicator.addEventListener('click', () => {
                this.pauseAutoScroll();
                this.goToSlide(i);
                // Resume after a delay
                setTimeout(() => this.startAutoScroll(), 5000);
            });
            this.indicatorsContainer.appendChild(indicator);
        }
    }
    
    updateCarousel() {
        const translateX = -(this.currentIndex * (100 / this.slidesPerView));
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Update indicators
        const indicators = this.indicatorsContainer.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
        
        // Update button states (removed disabled state since we loop now)
        this.prevBtn.style.opacity = '1';
        this.prevBtn.style.cursor = 'pointer';
        this.nextBtn.style.opacity = '1';
        this.nextBtn.style.cursor = 'pointer';
    }
    
    nextSlide() {
        if (this.currentIndex < this.totalGroups - 1) {
            this.currentIndex++;
            this.updateCarousel();
        } else {
            // Loop back to beginning
            this.currentIndex = 0;
            this.updateCarousel();
        }
    }
    
    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        } else {
            // Loop to end
            this.currentIndex = this.totalGroups - 1;
            this.updateCarousel();
        }
    }
    
    goToSlide(index) {
        this.currentIndex = index;
        this.updateCarousel();
    }
    
    handleSwipe() {
        const diff = this.startX - this.endX;
        if (Math.abs(diff) > 50) {
            this.pauseAutoScroll();
            if (diff > 0) {
                this.nextSlide();
            } else {
                this.prevSlide();
            }
            // Resume after a delay
            setTimeout(() => this.startAutoScroll(), 5000);
        }
    }
    
    startAutoScroll() {
        // Only auto-scroll if there's more than one group
        if (this.totalGroups <= 1) return;
        
        this.stopAutoScroll();
        this.autoScrollInterval = setInterval(() => {
            this.nextSlide();
        }, this.autoScrollDelay);
    }
    
    pauseAutoScroll() {
        this.stopAutoScroll();
    }
    
    stopAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
            this.autoScrollInterval = null;
        }
    }
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Load images from images.js if available (generated by generate-carousel.js)
    if (typeof carouselImages !== 'undefined' && carouselImages.length > 0) {
        addFacebookImages(carouselImages);
    } else {
        // Fallback: show message if no images found
        const track = document.getElementById('carouselTrack');
        if (track && track.children.length === 0) {
            track.innerHTML = '<div style="text-align: center; padding: 40px; color: #999;"><p>No images found. Add images to assets/carousel/ and run: node generate-carousel.js</p></div>';
        } else {
            new ImageCarousel();
        }
    }
});

// Function to add images from Facebook (to be called when images are available)
// Usage examples:
//
// 1. From browser console with local images (recommended):
//    addFacebookImages([
//        'assets/image1.jpg',
//        'assets/image2.jpg',
//        'assets/image3.jpg',
//        'assets/image4.jpg',
//        'assets/image5.jpg',
//        'assets/image6.jpg'
//    ]);
//
// 2. From browser console with direct URLs (may have CORS issues):
//    addFacebookImages([
//        'https://facebook.com/path/to/image1.jpg',
//        'https://facebook.com/path/to/image2.jpg'
//    ]);
//
// 3. Or simply add images directly to index.html in the carousel-track div
function addFacebookImages(imageUrls) {
    const track = document.getElementById('carouselTrack');
    if (!track) {
        console.error('Carousel track not found!');
        return;
    }
    
    track.innerHTML = ''; // Clear existing images
    
    imageUrls.forEach((url, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        const img = document.createElement('img');
        img.src = url;
        img.alt = `Bread Gallery Image ${index + 1}`;
        slide.appendChild(img);
        track.appendChild(slide);
    });
    
    // Reinitialize carousel with new images
    setTimeout(() => {
        new ImageCarousel();
    }, 100);
}

// Flip card functionality - click to flip on all devices, hover on desktop
document.addEventListener('DOMContentLoaded', () => {
    const flipCards = document.querySelectorAll('.flip-card');
    
    flipCards.forEach(card => {
        // Click to flip on all devices
        card.addEventListener('click', function(e) {
            // Don't flip if clicking a link
            if (e.target.tagName !== 'A') {
                this.classList.toggle('flipped');
            }
        });
    });
});
