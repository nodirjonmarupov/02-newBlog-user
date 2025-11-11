/**
 * =====================================================
 * NODIRJONBLOG PREMIUM JAVASCRIPT
 * Fixed & Enhanced Version
 * =====================================================
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // =====================================================
    // 1. THEME TOGGLE (Dark/Light Mode)
    // =====================================================
    
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const html = document.documentElement;

    // SVG Icons
    const sunIcon = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
    
    const moonIcon = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';

    // Update icon based on theme
    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
        }
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Toggle theme on button click
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = html.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
            
            console.log('Theme changed to:', newTheme);
        });
    }

    // =====================================================
    // 2. NAVBAR SCROLL EFFECT
    // =====================================================
    
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (navbar) {
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
        
        lastScroll = currentScroll;
    });

    // =====================================================
    // 3. PARALLAX PARTICLES
    // =====================================================
    
    const particles = document.querySelectorAll('.particle');
    
    document.addEventListener('mousemove', function(e) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        particles.forEach(function(particle, index) {
            const speed = (index + 1) * 10;
            const xMove = (x - 0.5) * speed;
            const yMove = (y - 0.5) * speed;
            
            particle.style.transform = 'translate(' + xMove + 'px, ' + yMove + 'px)';
        });
    });

    // =====================================================
    // 4. SMOOTH SCROLL FOR ANCHOR LINKS
    // =====================================================
    
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // =====================================================
    // 5. CARD ANIMATIONS ON SCROLL
    // =====================================================
    
    const cards = document.querySelectorAll('.card');
    
    if (cards.length > 0) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const cardObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    cardObserver.unobserve(entry.target);
                }
            });
        }, observerOptions);

        cards.forEach(function(card) {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            cardObserver.observe(card);
        });
    }

    // =====================================================
    // 6. RIPPLE EFFECT ON BUTTONS
    // =====================================================
    
    // Add ripple animation CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        .btn {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyle);

    // Create ripple effect
    document.addEventListener('click', function(e) {
        const button = e.target.closest('.btn');
        if (!button) return;
        
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        button.appendChild(ripple);
        
        setTimeout(function() {
            ripple.remove();
        }, 600);
    });

    // =====================================================
    // 7. FORM VALIDATION ENHANCEMENT
    // =====================================================
    
    const forms = document.querySelectorAll('form');
    
    forms.forEach(function(form) {
        const inputs = form.querySelectorAll('.form-control');
        
        inputs.forEach(function(input) {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });

            input.addEventListener('input', function() {
                if (this.validity.valid) {
                    this.classList.remove('is-invalid');
                    this.classList.add('is-valid');
                } else {
                    this.classList.remove('is-valid');
                    this.classList.add('is-invalid');
                }
            });
        });
    });

    // =====================================================
    // 8. LAZY LOADING IMAGES
    // =====================================================
    
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if (lazyImages.length > 0) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            threshold: 0,
            rootMargin: '50px'
        });

        lazyImages.forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    // =====================================================
    // 9. TOAST NOTIFICATIONS
    // =====================================================
    
    // Add toast styles
    const toastStyle = document.createElement('style');
    toastStyle.id = 'toast-styles';
    toastStyle.textContent = `
        .toast-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-card);
            color: var(--text-primary);
            padding: 1rem 1.5rem;
            border-radius: 12px;
            box-shadow: var(--shadow-lg);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            z-index: 9999;
            border-left: 4px solid var(--accent-primary);
            min-width: 250px;
        }
        .toast-notification.show {
            transform: translateX(0);
        }
        .toast-content {
            display: flex;
            align-items: center;
            gap: 0.75rem;
        }
        .toast-icon {
            font-size: 1.25rem;
            font-weight: bold;
        }
        .toast-success {
            border-left-color: var(--accent-secondary);
        }
        .toast-error {
            border-left-color: var(--accent-danger);
        }
        .toast-warning {
            border-left-color: var(--accent-warning);
        }
    `;
    document.head.appendChild(toastStyle);

    // Toast function
    function showToast(message, type, duration) {
        type = type || 'info';
        duration = duration || 3000;
        
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        
        const toast = document.createElement('div');
        toast.className = 'toast-notification toast-' + type;
        toast.innerHTML = '<div class="toast-content"><span class="toast-icon">' + 
                         (icons[type] || icons.info) + '</span><span class="toast-message">' + 
                         message + '</span></div>';
        
        document.body.appendChild(toast);
        
        setTimeout(function() {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(function() {
            toast.classList.remove('show');
            setTimeout(function() {
                toast.remove();
            }, 300);
        }, duration);
    }
    
    // Make toast available globally
    window.showToast = showToast;

    // =====================================================
    // 10. READING PROGRESS BAR
    // =====================================================
    
    const progressBar = document.createElement('div');
    progressBar.id = 'reading-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0;
        height: 3px;
        background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    function updateReadingProgress() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight - windowHeight;
        const scrolled = window.pageYOffset;
        const progress = (scrolled / documentHeight) * 100;
        
        progressBar.style.width = progress + '%';
    }

    window.addEventListener('scroll', updateReadingProgress);
    updateReadingProgress();

    // =====================================================
    // 11. SCROLL TO TOP BUTTON
    // =====================================================
    
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.id = 'scroll-to-top';
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.setAttribute('aria-label', 'Yuqoriga qaytish');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--bg-card);
        color: var(--text-primary);
        border: 2px solid var(--border-color);
        border-radius: 50%;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `;
    document.body.appendChild(scrollTopBtn);

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
    });

    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.visibility = 'visible';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.visibility = 'hidden';
        }
    });

    // =====================================================
    // 12. COPY TO CLIPBOARD
    // =====================================================
    
    document.addEventListener('click', function(e) {
        const copyBtn = e.target.closest('[data-copy]');
        if (copyBtn) {
            e.preventDefault();
            const text = copyBtn.dataset.copy;
            
            if (navigator.clipboard) {
                navigator.clipboard.writeText(text).then(function() {
                    showToast('Nusxa olindi!', 'success', 2000);
                }).catch(function() {
                    showToast('Xatolik yuz berdi', 'error', 2000);
                });
            }
        }
    });

    // =====================================================
    // 13. DJANGO MESSAGES AUTO-TOAST
    // =====================================================
    
    // Django messages ni avtomatik toast ko'rsatish
    const djangoMessages = document.querySelectorAll('.alert');
    djangoMessages.forEach(function(alert) {
        const message = alert.textContent.trim();
        let type = 'info';
        
        if (alert.classList.contains('alert-success')) type = 'success';
        else if (alert.classList.contains('alert-danger')) type = 'error';
        else if (alert.classList.contains('alert-warning')) type = 'warning';
        
        if (message) {
            showToast(message, type, 3000);
            alert.style.display = 'none';
        }
    });

    // =====================================================
    // INITIALIZATION COMPLETE
    // =====================================================
    
    console.log('🚀 NodirjonBlog Premium initialized successfully!');
    console.log('✅ Theme:', savedTheme);
    console.log('✅ Cards found:', cards.length);
    console.log('✅ Forms found:', forms.length);
    
    // Show welcome toast if user just logged in
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('login') === 'success') {
        setTimeout(function() {
            showToast('Xush kelibsiz!', 'success', 3000);
        }, 500);
    }

}); // END DOMContentLoaded