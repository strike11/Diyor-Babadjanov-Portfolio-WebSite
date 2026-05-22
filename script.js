document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger-menu');
    const overlay = document.getElementById('nav-overlay');
    const navLinks = document.querySelectorAll('.nav-overlay-link');
    const panels = document.querySelectorAll('.panel');

    function showPanel(id) {
        panels.forEach(p => p.classList.remove('panel--active'));
        const target = document.getElementById(id);
        if (target) target.classList.add('panel--active');
    }

    function toggleMenu() {
        burger.classList.toggle('active');
        overlay.classList.toggle('open');
    }

    burger.addEventListener('click', toggleMenu);
    burger.addEventListener('touchend', (e) => { e.preventDefault(); toggleMenu(); });

    navLinks.forEach(link => {
        function handleNav(e) {
            e.preventDefault();
            const target = link.getAttribute('data-target');
            burger.classList.remove('active');
            overlay.classList.remove('open');
            setTimeout(() => showPanel(target), 600);
        }
        link.addEventListener('click', handleNav);
        link.addEventListener('touchend', handleNav);
    });

    /* ── Custom Cursor ── */
    const dot = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');

    if (dot && ring) {
        let mx = 0, my = 0, rx = 0, ry = 0;

        document.addEventListener('mousemove', e => {
            mx = e.clientX;
            my = e.clientY;
            dot.style.left = mx + 'px';
            dot.style.top = my + 'px';
        });

        (function moveRing() {
            rx += (mx - rx) * 0.15;
            ry += (my - ry) * 0.15;
            ring.style.left = rx + 'px';
            ring.style.top = ry + 'px';
            requestAnimationFrame(moveRing);
        })();

        const hoverTargets = 'a, button, .burger-menu, .card-btn, .nav-overlay-link, .scr-dot, .project-card';
        document.addEventListener('mouseover', e => {
            if (e.target.closest(hoverTargets)) {
                dot.classList.add('hover');
                ring.classList.add('hover');
            }
        });
        document.addEventListener('mouseout', e => {
            if (e.target.closest(hoverTargets)) {
                dot.classList.remove('hover');
                ring.classList.remove('hover');
            }
        });

        document.addEventListener('mousedown', () => { dot.classList.add('click'); ring.classList.add('click'); });
        document.addEventListener('mouseup', () => { dot.classList.remove('click'); ring.classList.remove('click'); });
    }

    /* ── Image Modal & Screenshot Sliders ── */
    const imageModal = document.getElementById('image-modal');
    const imageModalImg = document.getElementById('image-modal-img');
    const imageModalClose = document.getElementById('image-modal-close');

    function openModal(src) {
        if (!imageModal) return;
        imageModalImg.src = src;
        imageModal.classList.add('open');
    }

    if (imageModalClose) {
        imageModalClose.addEventListener('click', () => imageModal.classList.remove('open'));
        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) imageModal.classList.remove('open');
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') imageModal.classList.remove('open');
        });
    }

    document.querySelectorAll('.card-screenshots').forEach(slider => {
        const btn = document.createElement('button');
        btn.className = 'fullscreen-btn';
        btn.setAttribute('aria-label', 'View Fullscreen');
        btn.innerHTML = '<svg viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>';
        slider.appendChild(btn);

        const track = slider.querySelector('.scr-track');
        if (!track) return;
        const imgs = track.querySelectorAll('img');
        let idx = 0;

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (imgs.length > 0) openModal(imgs[idx].src);
        });
        imgs.forEach((img, i) => {
            img.addEventListener('click', () => openModal(img.src));
        });

        if (slider.hasAttribute('data-slider')) {
            const dotsWrap = slider.querySelector('.scr-dots');
            if (imgs.length <= 1 || !dotsWrap) return;

            imgs.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.className = 'scr-dot' + (i === 0 ? ' active' : '');
                dot.addEventListener('click', (e) => { e.stopPropagation(); go(i); });
                dotsWrap.appendChild(dot);
            });

            function go(i) {
                idx = i;
                track.style.transform = `translateX(-${idx * 100}%)`;
                dotsWrap.querySelectorAll('.scr-dot').forEach((d, j) => d.classList.toggle('active', j === idx));
            }

            let interval = setInterval(() => go((idx + 1) % imgs.length), 3000);
            slider.addEventListener('mouseenter', () => clearInterval(interval));
            slider.addEventListener('mouseleave', () => {
                interval = setInterval(() => go((idx + 1) % imgs.length), 3000);
            });
        }
    });

    /* ── Card Hover Glow Effect ── */
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});
