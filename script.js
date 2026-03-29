document.addEventListener('DOMContentLoaded', () => {

    // 1. Reveal Elements on Scroll
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100;

        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on initial load

    // 2. Delay Urgency Banner Reveal (creates FOMO focus point)
    setTimeout(() => {
        const spotsText = document.getElementById('spots-left-text');
        if (spotsText) {
            spotsText.style.transition = 'opacity 1s ease-in-out';
            spotsText.style.opacity = '1';
        }
    }, 1500);

    // 3. Live Counter Simulation
    const liveCounterEl = document.getElementById('live-counter');
    let currentCount = 1327;

    const simulateLiveSignups = () => {
        // Random intervals between 4 to 12 seconds
        const randomTime = Math.floor(Math.random() * (12000 - 4000 + 1) + 4000);

        setTimeout(() => {
            currentCount += Math.floor(Math.random() * 3) + 1; // Add 1 to 3 users
            if (liveCounterEl) {
                // Add comma formatting
                liveCounterEl.textContent = currentCount.toLocaleString();

                // Add slight flash effect
                liveCounterEl.style.color = '#00f0ff';
                setTimeout(() => {
                    liveCounterEl.style.color = '';
                }, 500);
            }
            simulateLiveSignups();
        }, randomTime);
    };

    // Start simulation after 3 seconds
    setTimeout(simulateLiveSignups, 3000);

    // 4. Form Submission Simulation
    const handleFormSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const btn = form.querySelector('button');
        const input = form.querySelector('input');

        const originalText = btn.innerHTML;

        // Loading state
        btn.innerHTML = '<span>Reserving...</span>';
        btn.style.opacity = '0.7';
        btn.disabled = true;

        // Success state simulation (after 1.5s)
        setTimeout(() => {
            btn.innerHTML = '<span>Spot Secured! <i class="ph ph-check-circle"></i></span>';
            btn.style.background = '#27c93f';
            btn.style.color = '#fff';
            btn.style.opacity = '1';
            input.value = '';

            // Revert back after 3s
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.color = '';
                btn.disabled = false;
            }, 3000);
        }, 1500);
    };

    const forms = document.querySelectorAll('.early-access-form');
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
});
