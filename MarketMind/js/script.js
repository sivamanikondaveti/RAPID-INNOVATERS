// MarketMind Script

document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------------------------------------------- */
    /*                               Mobile Menu Toggle                           */
    /* -------------------------------------------------------------------------- */
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });

        // Close menu when clicking a link
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.add('hidden');
            });
        });
    }

    /* -------------------------------------------------------------------------- */
    /*                         Navbar Background on Scroll                        */
    /* -------------------------------------------------------------------------- */
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-brand-dark/90', 'backdrop-blur-md', 'shadow-lg');
        } else {
            navbar.classList.remove('bg-brand-dark/90', 'backdrop-blur-md', 'shadow-lg');
        }
    });

    /* -------------------------------------------------------------------------- */
    /*                         Intersection Observer for Fade In                  */
    /* -------------------------------------------------------------------------- */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: Stop observing once visible
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in-section');
    fadeElements.forEach(el => observer.observe(el));

    /* -------------------------------------------------------------------------- */
    /*                           Smooth Scrolling for Anchors                     */
    /* -------------------------------------------------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                           Smooth Scrolling for Anchors                     */
    /* -------------------------------------------------------------------------- */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    /* -------------------------------------------------------------------------- */
    /*                           Dashboard AI Simulation                          */
    /* -------------------------------------------------------------------------- */
    const analyzeBtn = document.getElementById('analyze-btn');
    const inputField = document.getElementById('ai-input');
    const btnText = document.getElementById('btn-text');
    const spinner = document.getElementById('loading-spinner');

    // Elements to update
    const kpiLeads = document.getElementById('kpi-leads');
    const kpiLeadsChange = document.getElementById('kpi-leads-change');
    const kpiConversion = document.getElementById('kpi-conversion');
    const kpiConversionChange = document.getElementById('kpi-conversion-change');
    const kpiRevenue = document.getElementById('kpi-revenue');
    const insightText = document.getElementById('insight-text');
    const confidenceScore = document.getElementById('confidence-score');

    // Bar Chart Bars
    const bars = [
        document.getElementById('bar-mon'),
        document.getElementById('bar-tue'),
        document.getElementById('bar-wed'),
        document.getElementById('bar-thu'),
        document.getElementById('bar-fri'),
        document.getElementById('bar-sat'),
        document.getElementById('bar-sun'),
    ];

    // Mock Insights Data
    const insights = [
        "Competitor 'X' just launched a 20% discount campaign. Recommend matching with a referral bonus to retain high-value users.",
        "Detected a 35% surge in mobile traffic from the EMEA region. Optimize landing pages for mobile to capitalize on this trend.",
        "Customer sentiment on Twitter has dropped by 12% due to late support responses. Suggest allocating more resources to weekend support.",
        "High-intent keywords 'AI sales tools' are trending up. Launching a targeted PPC campaign now could yield a 4x ROI.",
        "Churn risk detected in the Enterprise segment. Engage account managers to schedule check-ins with top 10 at-risk clients."
    ];

    if (analyzeBtn && inputField) {
        analyzeBtn.addEventListener('click', () => {
            const query = inputField.value.trim();
            // We'll proceed with a "general analysis" simulation even if empty for UX flow.

            // 1. Loading State
            setLoading(true);

            // 2. Simulate AI Processing Delay (1.5s - 2.5s)
            const delay = Math.floor(Math.random() * 1000) + 1500;

            setTimeout(() => {
                // 3. Update Data
                updateDashboard();

                // 4. Reset Loading State
                setLoading(false);
            }, delay);
        });

        // Allow 'Enter' key to trigger analysis
        inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                analyzeBtn.click();
            }
        });
    }

    function setLoading(isLoading) {
        if (isLoading) {
            analyzeBtn.disabled = true;
            btnText.textContent = "Analyzing...";
            spinner.classList.remove('hidden');
            analyzeBtn.classList.add('opacity-75', 'cursor-not-allowed');
            // Clear current insight with a placeholder or fade
            insightText.style.opacity = '0.5';
        } else {
            analyzeBtn.disabled = false;
            btnText.textContent = "Analyze";
            spinner.classList.add('hidden');
            analyzeBtn.classList.remove('opacity-75', 'cursor-not-allowed');
            insightText.style.opacity = '1';
        }
    }

    function updateDashboard() {
        // --- Update KPIs with Randomness ---
        // Leads: 10,000 - 15,000
        const newLeads = Math.floor(Math.random() * 5000) + 10000;
        const leadsChange = (Math.random() * 20).toFixed(1);
        kpiLeads.textContent = newLeads.toLocaleString();
        kpiLeadsChange.textContent = `${leadsChange}%`;

        // Conversion: 1.5% - 5.0%
        const newConv = (Math.random() * 3.5 + 1.5).toFixed(1);
        const convChange = (Math.random() * 2).toFixed(1);
        kpiConversion.textContent = `${newConv}%`;
        kpiConversionChange.textContent = `${convChange}%`;

        // Revenue: $50k - $120k
        const newRev = (Math.random() * 70 + 50).toFixed(1);
        kpiRevenue.textContent = `$${newRev}k`;

        // --- Update Confidence Score ---
        if (confidenceScore) {
            const newConfidence = Math.floor(Math.random() * 20) + 75; // 75 - 95%
            confidenceScore.textContent = `${newConfidence}%`;
        }

        // --- Animate Bar Chart ---
        bars.forEach(bar => {
            if (bar) {
                // Random height between 20% and 95%
                const newHeight = Math.floor(Math.random() * 75) + 20;
                bar.style.height = `${newHeight}%`;
            }
        });

        // --- Typing Effect for Insight ---
        const randomInsight = insights[Math.floor(Math.random() * insights.length)];
        typeWriter(randomInsight, insightText);
    }

    function typeWriter(text, element) {
        element.textContent = "";
        let i = 0;
        const speed = 20; // ms per char

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    /* -------------------------------------------------------------------------- */
    /*                                Login System                                */
    /* -------------------------------------------------------------------------- */
    const loginModal = document.getElementById('login-modal');
    const modalBackdrop = document.getElementById('modal-backdrop');
    const modalPanel = document.getElementById('modal-panel');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const loginForm = document.getElementById('login-form');

    // Auth UI Elements
    const loginBtnDesktop = document.getElementById('login-btn-desktop');
    const userMenuDesktop = document.getElementById('user-menu-desktop');
    const usernameDisplayDesktop = document.getElementById('username-display-desktop');

    const loginBtnMobile = document.getElementById('login-btn-mobile');
    const userMenuMobile = document.getElementById('user-menu-mobile');
    const usernameDisplayMobile = document.getElementById('username-display-mobile');
const profileBtnDesktop = document.getElementById('profile-btn-desktop');
const profileDropdown = document.getElementById('profile-dropdown');
const logoutBtnDesktop = document.getElementById('logout-btn-desktop');
const logoutBtnMobile = document.getElementById('logout-btn-mobile');

let isDropdownOpen = false;
    // --- State Check on Load ---
    const storedUser = localStorage.getItem('marketmind_user');
    if (storedUser) {
        updateAuthUI(storedUser);
    }

    // --- Event Listeners ---
    if (loginBtnDesktop) loginBtnDesktop.addEventListener('click', openModal);
    if (loginBtnMobile) loginBtnMobile.addEventListener('click', openModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

    // Close on backdrop click
    if (modalBackdrop) {
        // We attach to the modal container but check target
        loginModal.addEventListener('click', (e) => {
            if (e.target === modalBackdrop || e.target.classList.contains('flex') && e.target.closest('#login-modal')) {
                // The second condition handles clicking on the flex container centering the modal
                // But strictly checking backdrop is safer if well structured.
                // Let's stick to checking if click is outside panel
            }
        });

        // Better approach: Click outside panel
        window.addEventListener('click', (e) => {
            if (e.target === modalBackdrop || (e.target.closest('#login-modal') && !e.target.closest('#modal-panel') && !e.target.closest('#login-btn-desktop') && !e.target.closest('#login-btn-mobile'))) {
                closeModal();
            }
        });
    }

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('email').value;
            const passwordInput = document.getElementById('password').value;

            if (emailInput && passwordInput) {
                // Stimulate API call / Processing
                const submitBtn = loginForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerText;
                submitBtn.innerText = "Signing in...";
                submitBtn.disabled = true;

                setTimeout(() => {
                    // Extract username from email (before @)
                    const username = emailInput.split('@')[0];

                    // Save to local storage
                    localStorage.setItem('marketmind_user', username);

                    // Update UI
                    updateAuthUI(username);

                    // Close Modal
                    closeModal();

                    // Reset Button
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;

                    // Clear form
                    loginForm.reset();

                }, 800);
            }
        });
    }

    function openModal() {
        if (!loginModal) return;
        loginModal.classList.remove('hidden');
        // Small delay to allow display:block to apply before opacity transition
        setTimeout(() => {
            modalBackdrop.classList.remove('opacity-0');
            modalPanel.classList.remove('opacity-0', 'scale-95');
            modalPanel.classList.add('opacity-100', 'scale-100');
        }, 10);
    }

    function closeModal() {
        if (!loginModal) return;
        modalBackdrop.classList.add('opacity-0');
        modalPanel.classList.remove('opacity-100', 'scale-100');
        modalPanel.classList.add('opacity-0', 'scale-95');

        // Wait for transition to finish before hiding
        setTimeout(() => {
            loginModal.classList.add('hidden');
        }, 300); // Duration matches tailwind transition (default ~150-300ms)
    }

    function updateAuthUI(username) {
    // Desktop
    if (loginBtnDesktop) loginBtnDesktop.classList.add('hidden');
    if (userMenuDesktop) {
        userMenuDesktop.classList.remove('hidden');
        usernameDisplayDesktop.textContent = username;
    }

    // Update desktop avatar
    const avatarDesktop = document.getElementById('user-avatar-desktop');
    if (avatarDesktop) {
        avatarDesktop.textContent = username.charAt(0).toUpperCase();
    }

    // Mobile
    if (loginBtnMobile) loginBtnMobile.classList.add('hidden');
    if (userMenuMobile) {
        userMenuMobile.classList.remove('hidden');
        usernameDisplayMobile.textContent = username;
    }

    // Update mobile avatar
    const avatarMobile = document.getElementById('user-avatar-mobile');
    if (avatarMobile) {
        avatarMobile.textContent = username.charAt(0).toUpperCase();
    }

    // Close dropdown if open
    if (profileDropdown) {
        profileDropdown.classList.add('hidden');
        profileDropdown.classList.remove('opacity-100', 'scale-100');
        profileDropdown.classList.add('opacity-0', 'scale-95');
    }

    isDropdownOpen = false;
}
/* -------------------------------------------------------------------------- */
/*                      Professional Profile Dropdown Logic                   */
/* -------------------------------------------------------------------------- */


// Toggle dropdown with animation
function toggleDropdown() {
    if (!profileDropdown) return;

    isDropdownOpen = !isDropdownOpen;

    if (isDropdownOpen) {
        profileDropdown.classList.remove('hidden');
        setTimeout(() => {
            profileDropdown.classList.remove('opacity-0', 'scale-95');
            profileDropdown.classList.add('opacity-100', 'scale-100');
        }, 10);
    } else {
        profileDropdown.classList.remove('opacity-100', 'scale-100');
        profileDropdown.classList.add('opacity-0', 'scale-95');

        setTimeout(() => {
            profileDropdown.classList.add('hidden');
        }, 200);
    }
}

// Desktop profile click
if (profileBtnDesktop && profileDropdown) {
    profileBtnDesktop.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown();
    });
}

// Close dropdown on outside click
document.addEventListener('click', (e) => {
    if (!profileDropdown || !profileBtnDesktop) return;

    if (
        isDropdownOpen &&
        !profileDropdown.contains(e.target) &&
        !profileBtnDesktop.contains(e.target)
    ) {
        toggleDropdown();
    }
});

// Logout handler
function handleLogout() {
    localStorage.removeItem('marketmind_user');

    // Hide dropdown
    if (profileDropdown) {
        profileDropdown.classList.add('hidden');
        profileDropdown.classList.remove('opacity-100', 'scale-100');
        profileDropdown.classList.add('opacity-0', 'scale-95');
    }

    // Reset Desktop UI
    if (loginBtnDesktop) loginBtnDesktop.classList.remove('hidden');
    if (userMenuDesktop) userMenuDesktop.classList.add('hidden');

    // Reset Mobile UI
    if (loginBtnMobile) loginBtnMobile.classList.remove('hidden');
    if (userMenuMobile) userMenuMobile.classList.add('hidden');

    isDropdownOpen = false;
}

if (logoutBtnDesktop) logoutBtnDesktop.addEventListener('click', handleLogout);
if (logoutBtnMobile) logoutBtnMobile.addEventListener('click', handleLogout);

});
