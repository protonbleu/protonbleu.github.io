// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Carousel functionality
    const carousel = document.querySelector('.carousel-outer-container');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dots = carousel.querySelectorAll('.dot');
        const prevBtn = carousel.querySelector('.carousel-btn.prev');
        const nextBtn = carousel.querySelector('.carousel-btn.next');

        let currentSlide = 0;
        let autoPlayInterval;

        function showSlide(index) {
            // Remove active class from all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));

            // Add active class to current slide and dot
            slides[index].classList.add('active');
            dots[index].classList.add('active');

            currentSlide = index;
        }

        function nextSlide() {
            const nextIndex = (currentSlide + 1) % slides.length;
            showSlide(nextIndex);
        }

        function prevSlide() {
            const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prevIndex);
        }

        function startAutoPlay() {
            // Clear any existing interval first to prevent multiple intervals
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
            }
            autoPlayInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }

        // Event listeners for navigation buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopAutoPlay();
                startAutoPlay(); // Restart auto-play
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopAutoPlay();
                startAutoPlay(); // Restart auto-play
            });
        }

        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                showSlide(index);
                stopAutoPlay();
                startAutoPlay(); // Restart auto-play
            });
        });

        // Pause auto-play on hover
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
                stopAutoPlay();
                startAutoPlay();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
                stopAutoPlay();
                startAutoPlay();
            }
        });

        // Start auto-play
        startAutoPlay();
    }

    // Email form handling (placeholder)
    const emailForm = document.querySelector('.email-form');
    if (emailForm) {
        emailForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (email) {
                // Show success message (placeholder)
                alert('Thank you! We\'ll notify you when Repurplist launches.');
                emailInput.value = '';
            }
        });
    }

    // Button click handlers
    const downloadBtn = document.querySelector('.btn-primary');
    if (downloadBtn && downloadBtn.textContent === 'Download App') {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Repurplist will be available soon! Stay tuned for updates.');
        });
    }

    const learnMoreBtn = document.querySelector('.btn-secondary');
    if (learnMoreBtn && learnMoreBtn.textContent === 'Learn More') {
        learnMoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const featuresSection = document.querySelector('.features');
            if (featuresSection) {
                featuresSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }

    // Add subtle animations to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
