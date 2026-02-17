// MarketMind Script

document.addEventListener('DOMContentLoaded', () => {

    /* -------------------------------------------------------------------------- */
    /*                         Page Transitions & init                            */
    /* -------------------------------------------------------------------------- */
    // Add loaded class for fade-in
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 50);

    // Handle Link Clicks for Transition
    document.querySelectorAll('a').forEach(link => {
        // Only internal links that are not # anchors
        if (link.hostname === window.location.hostname && !link.getAttribute('href').startsWith('#')) {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = link.href;

                document.body.classList.add('fade-out');

                setTimeout(() => {
                    window.location.href = target;
                }, 300); // Match CSS duration
            });
        }
    });

    // Active Link Highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath) {
            link.classList.add('text-brand-primary', 'bg-white/5'); // Tailwind active styles
        }
    });

    /* -------------------------------------------------------------------------- */
    /* -------------------------------------------------------------------------- */
    /*                         SaaS Helper Functions                              */
    /* -------------------------------------------------------------------------- */

    // --- Notification System ---
    const notificationContainer = document.getElementById('notification-container');

    function showNotification(message, type = 'info') {
        if (!notificationContainer) return;

        const toast = document.createElement('div');
        toast.className = `notification-toast show`;
        let icon = '<svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

        if (type === 'success') icon = '<svg class="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
        if (type === 'alert') icon = '<svg class="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>';

        toast.innerHTML = `
            <div class="flex-shrink-0">${icon}</div>
            <div>
                <h4 class="font-semibold text-sm text-white capitalize">${type}</h4>
                <p class="text-xs text-gray-300 mt-1">${message}</p>
            </div>
        `;

        notificationContainer.appendChild(toast);

        // Auto dismiss
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }

    // --- KPI Animation Helper ---
    function animateValue(obj, start, end, duration, prefix = '', suffix = '', isInt = false) {
        if (!obj) return;
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // EaseOutQuart
            const ease = 1 - Math.pow(1 - progress, 4);

            const value = start + (end - start) * ease;

            let formatted;
            if (isInt) {
                formatted = Math.floor(value).toLocaleString();
            } else {
                formatted = value.toFixed(1);
            }

            obj.innerHTML = `${prefix}${formatted}${suffix}`;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                let final = isInt ? Math.floor(end).toLocaleString() : end.toFixed(1);
                obj.innerHTML = `${prefix}${final}${suffix}`;
            }
        };
        window.requestAnimationFrame(step);
    }

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


    // Updated: We removed anchor smooth scrolling for page navigation, 
    // but keep it if there are specific # anchors on the same page.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only if on same page
            // e.preventDefault(); // Default behavior is often better for #
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

    // --- Advanced AI Logic ---
    function getSmartInsight(query) {
        const q = query.toLowerCase();
        const templates = {
            'sales': [
                "Sales velocity increases 15% when following up within 1 hour. Automate first-touch emails.",
                "Q3 Projections show a dip. Recommend launching an early-bird incentive program."
            ],
            'marketing': [
                "CTR on Facebook Video ads is down 5%. Refresh creative assets to combat ad fatigue.",
                "Content engagement is high on weekends. Schedule educational posts for Saturday mornings."
            ],
            'competitor': [
                "Competitor 'Y' increased ad spend by 20%. Counter with targeted brand keywords.",
                "Market analysis suggests Competitor 'Z' is pivoting to enterprise. Secure SMB foothold now."
            ],
            'churn': [
                "High churn risk in Tier-3 accounts. Implement checking calls for accounts inactive > 30 days.",
                "Usage drops correlate with support ticket volume. Improve help docs to reduce friction."
            ]
        };

        let pool = [
            ...templates.sales,
            ...templates.marketing,
            ...templates.competitor,
            ...templates.churn,
            "Cross-channel data indicates moving 10% budget to LinkedIn creates 3x ROI.",
            "AI detection is stable. No anomalies found. Continue current growth trajectory."
        ];

        for (const key in templates) {
            if (q.includes(key)) {
                pool = templates[key];
                break;
            }
        }
        return pool[Math.floor(Math.random() * pool.length)];
    }

    // --- Dashboard Locking Logic ---
    const dashboardContainer = document.getElementById('dashboard-container');
    const lockContent = document.getElementById('dashboard-lock-content');
    const lockModal = document.getElementById('lock-modal');
    const dashboardLoginBtn = document.getElementById('dashboard-login-btn');

    function checkDashboardLock() {
        const user = localStorage.getItem('marketmind_user');
        if (user) {
            unlockDashboard();
        } else {
            lockDashboard();
        }
    }

    function lockDashboard() {
        if (dashboardContainer) dashboardContainer.classList.add('dashboard-blurred');
        if (lockContent) {
            lockContent.classList.remove('hidden');
            setTimeout(() => {
                if (lockModal) {
                    lockModal.classList.remove('opacity-0', 'scale-95');
                    lockModal.classList.add('opacity-100', 'scale-100');
                    lockContent.classList.remove('opacity-0', 'pointer-events-none'); // Ensure container visible
                }
            }, 50);
        }
        if (analyzeBtn) {
            analyzeBtn.disabled = true;
            analyzeBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
    }

    function unlockDashboard() {
        if (dashboardContainer) {
            dashboardContainer.classList.remove('dashboard-blurred');
            dashboardContainer.classList.add('dashboard-unlocked');
        }
        if (lockContent) {
            if (lockModal) {
                lockModal.classList.add('opacity-0', 'scale-95');
                lockModal.classList.remove('opacity-100', 'scale-100');
            }
            setTimeout(() => {
                lockContent.classList.add('hidden', 'opacity-0', 'pointer-events-none');
            }, 500);
        }
        if (analyzeBtn) {
            analyzeBtn.disabled = false;
            analyzeBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }

    if (dashboardLoginBtn) {
        dashboardLoginBtn.addEventListener('click', openModal);
    }

    // Check initial state
    // Check initial state
    // Ensure dashboard specific logic runs only if elements exist
    if (document.getElementById('dashboard-container')) {
        checkDashboardLock();
    } else {
        // If not on dashboard, we might want to still check login state for nav
        const user = localStorage.getItem('marketmind_user');
        if (user) updateAuthUI(user);
    }

    // --- History System ---
    const historyPanel = document.getElementById('history-panel');
    const historyList = document.getElementById('history-list');
    const clearHistoryBtn = document.getElementById('clear-history-btn');

    function saveToHistory(query) {
        if (!query) return;
        const newItem = {
            query: query,
            date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            timestamp: Date.now()
        };

        let history = JSON.parse(localStorage.getItem('marketmind_history') || '[]');
        history.unshift(newItem);
        if (history.length > 5) history.pop();

        localStorage.setItem('marketmind_history', JSON.stringify(history));
        renderHistory();
    }

    function renderHistory() {
        const history = JSON.parse(localStorage.getItem('marketmind_history') || '[]');
        if (history.length > 0 && historyList && historyPanel) {
            historyPanel.classList.remove('hidden');
            historyList.innerHTML = history.map((item) => `
                <div class="bg-white/5 border border-white/10 p-3 rounded-lg hover:bg-white/10 cursor-pointer transition-all hover:scale-105 group" data-query="${item.query.replace(/"/g, '&quot;')}">
                    <div class="text-xs text-brand-primary font-bold mb-1 flex items-center gap-1">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        ${item.date}
                    </div>
                    <div class="text-sm text-gray-300 truncate group-hover:text-white transition-colors">"${item.query}"</div>
                </div>
            `).join('');
        } else if (historyPanel) {
            historyPanel.classList.add('hidden');
        }
    }

    if (historyList) {
        historyList.addEventListener('click', (e) => {
            const card = e.target.closest('[data-query]');
            if (card) {
                const q = card.getAttribute('data-query');
                if (inputField) {
                    inputField.value = q;
                    analyzeBtn.click();
                    // Scroll to input
                    inputField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    }

    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', () => {
            localStorage.removeItem('marketmind_history');
            renderHistory();
            showNotification('History cleared', 'info');
        });
    }

    // Initialize History
    renderHistory();

    // --- Export Report ---
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const date = new Date().toLocaleDateString();
            const time = new Date().toLocaleTimeString();
            const reportContent = `MARKETMIND AI INTELLIGENCE REPORT
Generated: ${date} at ${time}
----------------------------------------

DASHBOARD KPIS:
- Total Leads:      ${kpiLeads ? kpiLeads.innerText : 'N/A'} (${kpiLeadsChange ? kpiLeadsChange.innerText : ''})
- Conversion Rate:  ${kpiConversion ? kpiConversion.innerText : 'N/A'} (${kpiConversionChange ? kpiConversionChange.innerText : ''})
- Revenue Forecast: ${kpiRevenue ? kpiRevenue.innerText : 'N/A'}

LATEST AI INSIGHT:
"${insightText ? insightText.innerText : 'No insight available'}"
Confidence Score: ${confidenceScore ? confidenceScore.innerText : 'N/A'}

----------------------------------------
This report was generated by MarketMind AI.
Confidential & Proprietary.`;

            const blob = new Blob([reportContent], { type: 'text/plain' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `MarketMind_Report_${new Date().toISOString().split('T')[0]}.txt`;
            a.click();
            URL.revokeObjectURL(url);

            showNotification('Report exported successfully', 'success');
        });
    }
    function setLoading(isLoading) {
        if (!btnText || !spinner) return;

        if (isLoading) {
            btnText.textContent = "Analyzing...";
            spinner.classList.remove('hidden');
            analyzeBtn.disabled = true;
            analyzeBtn.classList.add('opacity-50', 'cursor-not-allowed');
        } else {
            btnText.textContent = "Analyze";
            spinner.classList.add('hidden');
            analyzeBtn.disabled = false;
            analyzeBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        }
    }

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



    function updateDashboard() {
        const query = inputField ? inputField.value : '';

        // --- 1. Save History ---
        if (query) saveToHistory(query);

        // --- 2. Update Timestamp ---
        const lastUpdated = document.getElementById('last-updated');
        if (lastUpdated) lastUpdated.innerText = `Last updated: ${new Date().toLocaleTimeString()}`;

        // --- 3. Smart Insight Logic ---
        const selectedInsight = getSmartInsight(query);
        typeWriter(selectedInsight, insightText); // Existing typing effect

        // --- 4. Animate KPIs ---

        // Helper to parse '12,450' to 12450
        const parseVal = (el) => parseFloat(el.innerText.replace(/[^0-9.]/g, '')) || 0;

        // Leads: 10k - 15k
        const currentLeads = parseVal(kpiLeads);
        const newLeads = Math.floor(Math.random() * 5000) + 10000;
        animateValue(kpiLeads, currentLeads, newLeads, 1200, '', '', true);

        const leadsChange = (Math.random() * 20).toFixed(1);
        kpiLeadsChange.innerText = `${leadsChange}%`; // Simple text update for small badges

        // Conversion: 1.5 - 5.0
        const currentConv = parseVal(kpiConversion);
        const newConv = parseFloat((Math.random() * 3.5 + 1.5).toFixed(1));
        animateValue(kpiConversion, currentConv, newConv, 1000, '', '%', false);

        const convChange = (Math.random() * 2).toFixed(1);
        kpiConversionChange.innerText = `${convChange}%`;

        // Revenue: 50 - 120
        const currentRev = parseVal(kpiRevenue);
        const newRev = parseFloat((Math.random() * 70 + 50).toFixed(1));
        animateValue(kpiRevenue, currentRev, newRev, 1500, '$', 'k', false); // Start from $50k

        // Confidence Score
        const currentConf = parseVal(confidenceScore);
        const newConf = Math.floor(Math.random() * 15) + 80;
        animateValue(confidenceScore, currentConf, newConf, 800, '', '%', true);

        // --- 5. Animate Bars ---
        bars.forEach(bar => {
            if (bar) {
                const newHeight = Math.floor(Math.random() * 75) + 20;
                bar.style.height = `${newHeight}%`;
            }
        });

        // --- 6. Notification Mock ---
        if (Math.random() > 0.7) {
            setTimeout(() => {
                showNotification('⚡ Market anomaly detected in sector data', 'alert');
            }, 2000);
        } else {
            showNotification('Analysis complete', 'success');
        }
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

                    // Unlock Dashboard
                    unlockDashboard();

                    // Notify
                    showNotification(`Welcome back, ${username}!`, 'success');

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

        // Ensure dashboard state matches auth
        if (username) {
            unlockDashboard();
        } else {
            lockDashboard();
        }
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

        // Lock Dashboard
        lockDashboard();
        showNotification('Logged out successfully', 'info');
    }

    if (logoutBtnDesktop) logoutBtnDesktop.addEventListener('click', handleLogout);
    if (logoutBtnMobile) logoutBtnMobile.addEventListener('click', handleLogout);


    /* -------------------------------------------------------------------------- */
    /*                         Features Page Logic                                */
    /* -------------------------------------------------------------------------- */
    const featureList = document.getElementById('feature-list');
    const featurePreview = document.getElementById('feature-preview-panel');

    if (featureList && featurePreview) {
        console.log("Initializing Feature Switcher...");

        // Data for features
        const featuresData = {
            'market-research': {
                title: 'AI Market Research',
                desc: 'Automated deep-dive analysis into global market trends and emerging opportunities. Our algorithms process millions of data points to give you a clear picture of where the market is heading.',
                iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
                color: 'text-brand-primary',
                bg: 'bg-brand-primary/20',
                kpi: '+127% Growth',
                confidence: '98.2%'
            },
            'competitive-intel': {
                title: 'Competitive Intel',
                desc: 'Real-time tracking of competitor movements, pricing strategies, and ad campaigns. Stay one step ahead by analyzing their moves before they happen.',
                iconPath: 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
                color: 'text-brand-secondary',
                bg: 'bg-brand-secondary/20',
                kpi: '3 New Rivals',
                confidence: '95.5%'
            },
            'sentiment-analysis': {
                title: 'Sentiment Analysis',
                desc: 'Understand how customers feel about your brand across social media and reviews. Detect negative spikes instantly and amplify positive feedback loops.',
                iconPath: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
                color: 'text-brand-accent',
                bg: 'bg-brand-accent/20',
                kpi: '85% Positive',
                confidence: '99.1%'
            },
            'predictive-sales': {
                title: 'Predictive Sales',
                desc: 'Forecast future sales trends and identify high-value leads before anyone else. Our predictive models help you allocate resources to the most profitable channels.',
                iconPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
                color: 'text-blue-400',
                bg: 'bg-blue-400/20',
                kpi: '$1.2M Forecast',
                confidence: '92.4%'
            }
        };

        const buttons = featureList.querySelectorAll('.feature-item');

        // Elements to update
        const pTitle = document.getElementById('preview-title');
        const pDesc = document.getElementById('preview-desc');
        const pIconContainer = document.getElementById('preview-icon');
        const pIconSvg = pIconContainer ? pIconContainer.querySelector('svg path') : null;
        const pKpi = document.getElementById('preview-kpi');
        const pConf = document.getElementById('preview-confidence');
        const pBars = document.querySelectorAll('#preview-chart div');

        if (!buttons.length) console.warn("No feature buttons found!");

        buttons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault(); // Safety first
                console.log("Feature clicked:", btn.getAttribute('data-feature'));

                // Remove active class from all
                buttons.forEach(b => b.classList.remove('active-feature', 'bg-white/5'));

                // Add active to current
                btn.classList.add('active-feature', 'bg-white/5');

                const featureKey = btn.getAttribute('data-feature');
                const data = featuresData[featureKey];

                if (data) {
                    // Animate Out
                    const content = document.getElementById('preview-content');
                    if (content) content.classList.add('opacity-0', 'translate-y-4');

                    setTimeout(() => {
                        // Update Content safely
                        if (pTitle) pTitle.innerText = data.title;
                        if (pDesc) pDesc.innerText = data.desc;
                        if (pIconSvg) {
                            pIconSvg.setAttribute('d', data.iconPath);
                        }

                        // Update Colors
                        if (pIconContainer) {
                            pIconContainer.className = `inline-flex items-center justify-center p-3 rounded-lg ${data.bg} ${data.color} mb-4 transition-colors duration-300`;
                        }
                        if (pKpi) pKpi.innerText = data.kpi;
                        if (pConf) pConf.innerText = data.confidence;

                        // Trigger Chart Animation
                        if (pBars.length) {
                            pBars.forEach(bar => {
                                bar.style.height = Math.floor(Math.random() * 80 + 20) + '%';
                                bar.classList.remove('bg-brand-primary', 'bg-brand-secondary', 'bg-brand-accent', 'bg-blue-400', 'bg-brand-primary/50', 'bg-brand-secondary/50', 'bg-brand-accent/50', 'bg-blue-400/50');

                                let colorClass = data.color.replace('text-', 'bg-');
                                if (bar.classList.contains('shadow-[0_0_15px_rgba(99,102,241,0.5)]')) {
                                    bar.classList.add(colorClass);
                                } else {
                                    bar.classList.add(colorClass + '/50');
                                }
                            });
                        }

                        // Animate In
                        if (content) content.classList.remove('opacity-0', 'translate-y-4');
                    }, 300);
                } else {
                    console.error("No data found for feature:", featureKey);
                }
            });
        });
    }

    // Workflow Animation
    const workflowLine = document.getElementById('workflow-line');
    if (workflowLine) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    workflowLine.style.width = '100%';
                }
            });
        }, { threshold: 0.5 });
        observer.observe(document.getElementById('ai-workflow'));
    }

});
