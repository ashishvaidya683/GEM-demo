// Header Menubar open & close 
function OpenMenubar() {
    const slider = document.querySelector(".slider");
    slider.classList.add("open");  // Add 'open' class to slide in
}

function CloseMenuBar() {
    const slider = document.querySelector(".slider");
    slider.classList.remove("open");  // Remove 'open' class to slide out
}

// Conuter effect

// Function to animate the counter
function animateCounter(counterElement, start, end, suffix, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        let current = progress * (end - start) + start;

        if (suffix === "M+") {
            counterElement.textContent = current.toFixed(1) + suffix;
        } else {
            counterElement.textContent = Math.floor(current) + suffix;
        }

        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Trigger the counter when scrolling into view (but only once)
function handleScroll() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach((counter) => {
        const targetValue = parseFloat(counter.getAttribute('data-target'));
        const suffix = counter.getAttribute('data-suffix');
        const startValue = 0;
        const duration = 2000; // Duration in ms (2 seconds)

        // Check if the counter has already been animated
        if (!counter.classList.contains('counted')) {
            const boxPosition = counter.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;

            // Start animation only when the element is scrolled into view
            if (boxPosition < screenPosition) {
                animateCounter(counter, startValue, targetValue, suffix, duration);
                // Mark the counter as counted to avoid re-triggering the animation
                counter.classList.add('counted');
            }
        }
    });
}

// Listen for scroll events
window.addEventListener('scroll', handleScroll);


// Tabs
document.addEventListener("DOMContentLoaded", function() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panels
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanels.forEach(panel => panel.classList.remove('active'));

            // Add active class to the clicked button and corresponding panel
            button.classList.add('active');
            tabPanels[index].classList.add('active');
        });
    });
});
