/**
 * Pavitra Designers - Shared Theme Components & Router
 * Implements reusable Web Components (<site-header>, <site-footer>)
 * and a lightweight client-side page router (PJAX)
 */

class SiteHeader extends HTMLElement {
    static get observedAttributes() {
        return ['active-tab'];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        this.setupListeners();
        this.updateBadges();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'active-tab' && oldValue !== newValue) {
            this.updateActiveTab();
        }
    }

    render() {
        const activeTab = this.getAttribute('active-tab') || 'home';
        
        this.innerHTML = `
            <!-- Sticky Navigation Bar -->
            <nav class="navbar navbar-expand-lg navbar-saree sticky-top">
                <div class="container-fluid max-width-container px-lg-5">
                    <a class="navbar-brand d-flex align-items-center" href="index.html">
                        <img src="logo.png" alt="Pavitra Designers logo" class="site-logo">
                    </a>
                    <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <i class="fas fa-bars text-dark-brown"></i>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarText">
                        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li class="nav-item"><a class="nav-link nav-link-saree ${activeTab === 'home' ? 'active' : ''}" data-tab="home" href="index.html">Home</a></li>
                            <li class="nav-item"><a class="nav-link nav-link-saree ${activeTab === 'sarees' ? 'active' : ''}" data-tab="sarees" href="sarees.html">Sarees</a></li>
                            <li class="nav-item"><a class="nav-link nav-link-saree ${activeTab === 'collections' ? 'active' : ''}" data-tab="collections" href="collections.html">Collections</a></li>
                            <li class="nav-item"><a class="nav-link nav-link-saree ${activeTab === 'new-arrivals' ? 'active' : ''}" data-tab="new-arrivals" href="new-arrivals.html">New Arrivals</a></li>
                            <li class="nav-item"><a class="nav-link nav-link-saree ${activeTab === 'best-sellers' ? 'active' : ''}" data-tab="best-sellers" href="best-sellers.html">Best Sellers</a></li>
                        </ul>
                        <div class="navbar-action-icons">
                            <a href="#" class="navbar-icon-btn" id="search-trigger" title="Search"><i class="fas fa-search"></i></a>
                            <a href="wishlist.html" class="navbar-icon-btn ${activeTab === 'wishlist' ? 'active-icon' : ''}" title="Wishlist">
                                <i class="far fa-heart"></i>
                                <span class="badge-saree" id="wishlist-badge-count" style="display: none;">0</span>
                            </a>
                            <a href="${window.PavitraDB && window.PavitraDB.getCurrentUser() ? 'dashboard.html' : 'auth.html'}" class="navbar-icon-btn ${activeTab === 'account' ? 'active-icon' : ''}" title="Profile/Account"><i class="far fa-user"></i></a>
                            <a href="cart.html" class="navbar-icon-btn ${activeTab === 'cart' ? 'active-icon' : ''}" title="Shopping Bag">
                                <i class="fas fa-shopping-bag"></i>
                                <span class="badge-saree" id="cart-badge-count" style="display: none;">0</span>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            <!-- Search Bar Overlay -->
            <div class="search-overlay-bar" id="search-overlay">
                <div class="search-overlay-inner">
                    <form onsubmit="event.preventDefault(); window.triggerGlobalSearch();">
                        <input type="text" class="search-input-field" id="search-input" placeholder="Search for Kanchipuram, Banarasi, Linen..." autocomplete="off">
                        <button type="submit" style="display: none;"></button>
                    </form>
                    <button class="search-close-btn" id="search-close" title="Close"><i class="fas fa-times"></i></button>
                    <div id="search-suggestions" class="search-suggestions-box-pavitra"></div>
                </div>
            </div>
        `;
    }

    setupListeners() {
        const searchTrigger = this.querySelector("#search-trigger");
        const searchOverlay = this.querySelector("#search-overlay");
        const searchClose = this.querySelector("#search-close");
        const searchInputField = this.querySelector("#search-input");
        const navbar = this.querySelector(".navbar-saree");

        // Toggle search overlay
        if (searchTrigger && searchOverlay) {
            searchTrigger.addEventListener("click", (e) => {
                e.preventDefault();
                searchOverlay.classList.add("active");
                if (searchInputField) {
                    setTimeout(() => searchInputField.focus(), 300);
                }
            });
        }

        if (searchClose && searchOverlay) {
            searchClose.addEventListener("click", () => {
                searchOverlay.classList.remove("active");
            });
        }

        // Suggestions logic
        if (searchInputField) {
            searchInputField.addEventListener("input", (e) => {
                const query = e.target.value.trim().toLowerCase();
                const box = this.querySelector("#search-suggestions");
                if (box) {
                    if (query) {
                        this.showSearchSuggestions(query, box);
                    } else {
                        box.classList.remove("show");
                    }
                }
            });
        }

        // Navbar shadow scroll behavior
        window.addEventListener("scroll", () => {
            if (navbar) {
                if (window.scrollY > 50) {
                    navbar.classList.add("scrolled");
                } else {
                    navbar.classList.remove("scrolled");
                }
            }
        });

        // DB badge sync listeners
        window.addEventListener("cart_updated", () => this.updateBadges());
        window.addEventListener("wishlist_updated", () => this.updateBadges());
    }

    updateActiveTab() {
        const activeTab = this.getAttribute('active-tab') || 'home';
        this.querySelectorAll('.nav-link-saree').forEach(link => {
            if (link.dataset.tab === activeTab) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    updateBadges() {
        if (!window.PavitraDB) return;
        const cart = window.PavitraDB.getCart() || [];
        const wishlist = window.PavitraDB.getWishlist() || [];
        
        const cartCountEl = this.querySelector("#cart-badge-count");
        const wishlistCountEl = this.querySelector("#wishlist-badge-count");
        
        if (cartCountEl) {
            const count = cart.reduce((sum, item) => sum + item.qty, 0);
            cartCountEl.innerText = count;
            cartCountEl.style.display = count > 0 ? "flex" : "none";
        }
        
        if (wishlistCountEl) {
            const count = wishlist.length;
            wishlistCountEl.innerText = count;
            wishlistCountEl.style.display = count > 0 ? "flex" : "none";
        }
    }

    showSearchSuggestions(query, box) {
        if (!window.PavitraDB) return;
        
        const currentUser = window.PavitraDB.getCurrentUser();
        const isB2B = currentUser && currentUser.role === "Retailer";
        
        const products = window.PavitraDB.getProducts() || [];
        const matches = products.filter(p => 
            p.title.toLowerCase().includes(query) ||
            (p.category && p.category.toLowerCase().includes(query)) ||
            (p.subcategory && p.subcategory.toLowerCase().includes(query)) ||
            (p.fabric && p.fabric.toLowerCase().includes(query))
        ).slice(0, 5);

        let html = "";
        if (matches.length > 0) {
            html += `<div class="suggestion-section-title-pavitra" style="padding: 10px 15px; font-weight: 600; color: var(--color-gold); font-size: 0.8rem; text-transform: uppercase;">Products</div>`;
            matches.forEach(p => {
                const price = isB2B ? p.b2bPrice : p.retailPrice;
                html += `
                    <a href="product-details.html?id=${p.id}" class="suggestion-item-pavitra" style="display: flex; align-items: center; padding: 10px 15px; border-bottom: 1px solid rgba(176,141,87,0.1); text-decoration: none; color: var(--color-dark-brown);">
                        <img src="${p.imageUrl}" alt="${p.title}" style="width: 40px; height: 50px; object-fit: cover; margin-right: 15px; border: 1px solid var(--color-beige);">
                        <div>
                            <div style="font-weight: 500; font-size: 0.95rem;">${p.title}</div>
                            <div style="font-size: 0.75rem; color: var(--color-gold); text-transform: uppercase;">${p.subcategory || p.category}</div>
                            <div style="font-size: 0.85rem; font-weight: 600; color: var(--color-maroon);">₹${price.toLocaleString("en-IN")}</div>
                        </div>
                    </a>
                `;
            });
            box.innerHTML = html;
            box.classList.add("show");
        } else {
            box.innerHTML = `<div class="p-3 text-center text-muted small">No luxury sarees match "${query}".</div>`;
            box.classList.add("show");
        }
    }
}

class SiteFooter extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <!-- Footer -->
            <footer class="footer-editorial">
                <div class="container-fluid px-lg-5">
                    <div class="row g-5">
                        <div class="col-md-12 col-lg-5">
                            <div class="footer-brand-column">
                                <img src="logo.png" alt="Pavitra Designers logo" class="footer-brand-logo mb-4" style="height: 80px; filter: brightness(1.2) contrast(1.1);">
                                <p class="footer-brand-text mb-4">Pavitra Designers brings you handcrafted royal weaves, celebrating India's rich handloom weaving heritage and traditional artisans from across the country.</p>
                                <div class="footer-social-wrapper">
                                    <a href="https://instagram.com" class="footer-social-icon" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                                    <a href="https://facebook.com" class="footer-social-icon" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
                                    <a href="https://pinterest.com" class="footer-social-icon" aria-label="Pinterest"><i class="fab fa-pinterest"></i></a>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-md-4 col-lg-2 ms-lg-auto">
                            <h4 class="footer-heading">Shop</h4>
                            <ul class="footer-links-list">
                                <li><a href="sarees.html">All Sarees</a></li>
                                <li><a href="new-arrivals.html">New Arrivals</a></li>
                                <li><a href="sarees.html">Saree Types</a></li>
                                <li><a href="best-sellers.html">Best Sellers</a></li>
                            </ul>
                        </div>
                        <div class="col-6 col-md-4 col-lg-2">
                            <h4 class="footer-heading">Customer Care</h4>
                            <ul class="footer-links-list">
                                <li><a href="contact.html">Contact Us</a></li>
                                <li><a href="faq.html">Shipping Info</a></li>
                                <li><a href="faq.html">Returns & Exchanges</a></li>
                                <li><a href="faq.html">FAQs</a></li>
                            </ul>
                        </div>
                        <div class="col-md-4 col-lg-3">
                            <h4 class="footer-heading">Mailing List</h4>
                            <p class="small text-muted mb-3" style="color: rgba(245, 241, 235, 0.6) !important;">Subscribe to receive curated styling journals and early announcements for seasonal heritage drops.</p>
                            <form onsubmit="event.preventDefault(); if(window.showToast) { window.showToast('Subscribed successfully!'); } else { alert('Subscribed successfully!'); } this.reset();" class="d-flex border-bottom border-secondary pb-2">
                                <input type="email" placeholder="Your email address" required style="background:transparent; border:none; color:var(--color-ivory); outline:none; font-size:0.85rem; width:100%;">
                                <button type="submit" style="background:none; border:none; color:var(--color-rose); cursor:pointer;"><i class="fas fa-arrow-right"></i></button>
                            </form>
                        </div>
                    </div>
                    
                    <div class="footer-bottom d-md-flex justify-content-between align-items-center">
                        <span>&copy; 2026 Pavitra Designers. All Rights Reserved.</span>
                        <span class="mt-2 mt-md-0 d-block">Crafted for Luxury Indian Saree Boutique</span>
                    </div>
                </div>
            </footer>
        `;
    }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);

// LIGHTWEIGHT PJAX CLIENT-SIDE ROUTER
document.addEventListener("DOMContentLoaded", () => {
    // Only intercept clicks if running on a server (http/https protocol)
    const isServer = window.location.protocol.startsWith('http');
    if (!isServer) return; // Fallback to standard page loads on local file systems (CORS limits fetch)

    document.addEventListener("click", (e) => {
        const link = e.target.closest("a");
        if (!link) return;

        const href = link.getAttribute("href");
        if (!href || href.startsWith("#") || href.startsWith("javascript:") || href.startsWith("http") || link.target === "_blank") return;

        // Verify it is a internal HTML route
        e.preventDefault();
        navigateToPage(href);
    });

    window.addEventListener("popstate", () => {
        loadPageContent(window.location.pathname + window.location.search, false);
    });
});

function navigateToPage(url) {
    history.pushState(null, '', url);
    loadPageContent(url, true);
}

function loadPageContent(url, scrollUp = true) {
    // Show page loader if it exists
    const loader = document.getElementById("page-loader");
    if (loader) {
        loader.style.display = "flex";
        loader.style.opacity = "1";
    }

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Page not found");
            return response.text();
        })
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            // 1. Update title
            document.title = doc.title;

            // 2. Swap Main Content
            const newContent = doc.getElementById("main-content");
            const currentContent = document.getElementById("main-content");
            if (newContent && currentContent) {
                currentContent.innerHTML = newContent.innerHTML;
            } else {
                // Fallback to standard page load if page structure does not match
                window.location.href = url;
                return;
            }

            // 3. Update Site Header active-tab attribute
            const newHeader = doc.querySelector("site-header");
            const currentHeader = document.querySelector("site-header");
            if (newHeader && currentHeader) {
                const activeTab = newHeader.getAttribute("active-tab");
                currentHeader.setAttribute("active-tab", activeTab);
            }

            // 4. Update body classes to match
            document.body.className = doc.body.className;

            // 5. Re-run any scripts contained inside the swapped content
            if (newContent) {
                const scripts = newContent.querySelectorAll("script");
                scripts.forEach(oldScript => {
                    const newScript = document.createElement("script");
                    if (oldScript.src) {
                        newScript.src = oldScript.src;
                    } else {
                        newScript.textContent = oldScript.textContent;
                    }
                    document.body.appendChild(newScript);
                    setTimeout(() => newScript.remove(), 100); // Clean up injected tag after execution
                });
            }

            // 6. Fire custom page load event for page-specific initialization
            const loadEvent = new CustomEvent("page_loaded", { detail: { url } });
            window.dispatchEvent(loadEvent);

            // Hide loader
            if (loader) {
                setTimeout(() => {
                    loader.style.opacity = "0";
                    setTimeout(() => { loader.style.display = "none"; }, 400);
                }, 300);
            }

            if (scrollUp) {
                window.scrollTo({ top: 0, behavior: 'instant' });
            }
        })
        .catch(err => {
            console.error("PJAX Navigation Error, reloading page:", err);
            window.location.href = url; // Fallback
        });
}

// Global page_loaded listener for standard pages to re-run initializers if PJAX router loads them
window.addEventListener("page_loaded", (e) => {
    // If a page needs to re-run DOMContentLoaded listeners, it can listen to "page_loaded"
    // We will ensure our pages attach key listeners to both DOMContentLoaded and page_loaded.
});
