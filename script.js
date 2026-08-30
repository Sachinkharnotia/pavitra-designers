// Minimal frontend interactions for Pavitra premium sarees
// Adds a SiteHeader custom element and touch/drag horizontal scrolling helper

class SiteHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav class="navbar navbar-expand-lg" style="background:var(--ivory);">
            <div class="container">
                <a class="navbar-brand d-flex align-items-center" href="index.html">
                    <img src="logo.png" alt="Pavitra logo" style="height:64px;object-fit:contain;"/>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#pavitraNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="pavitraNav">
                    <ul class="navbar-nav mx-auto mb-2 mb-lg-0 gap-3" style="font-weight:600;">
                        <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="sarees.html">Sarees</a></li>
                        <li class="nav-item"><a class="nav-link" href="collections.html">Collections</a></li>
                        <li class="nav-item"><a class="nav-link" href="new-arrivals.html">New Arrivals</a></li>
                        <li class="nav-item"><a class="nav-link" href="best-sellers.html">Best Sellers</a></li>
                    </ul>
                    <div class="d-flex align-items-center gap-3 ms-auto">
                        <a href="#" class="text-dark" title="Search"><i class="fas fa-search"></i></a>
                        <a href="wishlist.html" class="text-dark" title="Wishlist"><i class="fas fa-heart"></i></a>
                        <a href="auth.html" class="text-dark" title="Account"><i class="fas fa-user"></i></a>
                        <a href="cart.html" class="text-dark" title="Cart"><i class="fas fa-shopping-bag"></i></a>
                    </div>
                </div>
            </div>
        </nav>
        ";
    }
}

customElements.define('site-header', SiteHeader);

// Horizontal scroll / drag helper for any container with .horizontal-scroll
function enableDragScroll(selector) {
    const containers = document.querySelectorAll(selector);
    containers.forEach(container => {
        let isDown = false;
        let startX;
        let scrollLeft;
        container.style.scrollBehavior = 'smooth';
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.classList.add('dragging');
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });
        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.classList.remove('dragging');
        });
        container.addEventListener('mouseup', () => {
            isDown = false;
            container.classList.remove('dragging');
        });
        container.addEventListener('mousemove', (e) => {
            if(!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 1.2; //scroll-fast
            container.scrollLeft = scrollLeft - walk;
        });
        // touch support
        let touchStartX = 0;
        container.addEventListener('touchstart', (e)=>{ touchStartX = e.touches[0].pageX; });
        container.addEventListener('touchmove', (e)=>{
            const delta = touchStartX - e.touches[0].pageX;
            container.scrollLeft += delta;
            touchStartX = e.touches[0].pageX;
        });
    });
}

// Init behaviors
document.addEventListener('DOMContentLoaded', () => {
    // enable horizontal drag for any element with .saree-slider or .horizontal-scroll
    enableDragScroll('.saree-slider');
    enableDragScroll('.horizontal-scroll');

    // small UX: add keyboard focus outline for interactive cards
    document.querySelectorAll('.saree-type-card, .saree-type-card a, .product-card, .product-card button').forEach(el => {
        el.setAttribute('tabindex', '0');
    });

    // PWA install prompt handling
    let deferredPrompt;
    const banner = document.getElementById('pwa-install-banner');
    const installBtn = document.getElementById('pwa-install-btn');
    const dismissBtn = document.getElementById('pwa-install-dismiss');

    window.addEventListener('beforeinstallprompt', (e) => {
        // Prevent Chrome 67+ from showing the mini-infobar
        e.preventDefault();
        deferredPrompt = e;
        // Show our custom install banner
        if (banner) banner.classList.remove('d-none');
    });

    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            if (!deferredPrompt) return;
            deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
            if (banner) banner.classList.add('d-none');
        });
    }

    if (dismissBtn) {
        dismissBtn.addEventListener('click', () => {
            if (banner) banner.classList.add('d-none');
        });
    }

    window.addEventListener('appinstalled', (evt) => {
        console.log('PWA was installed.', evt);
        const banner = document.getElementById('pwa-install-banner');
        if (banner) banner.classList.add('d-none');
        showToast('Pavitra installed on your device');
    });
});
