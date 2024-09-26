document.addEventListener('DOMContentLoaded', function () {
    // Fetch and insert header
    fetch('../components/header.html')
        .then(response => response.text())
        .then(html => {
            document.querySelectorAll('header').forEach(header => {
                header.innerHTML = html;
            });

            // After the header is loaded, run the script to set the active nav item
            setActiveNavItem();
        })
        .catch(error => {
            console.error('Error fetching header:', error);
        });

    // Function to set active nav item
    function setActiveNavItem() {
        const currentPath = window.location.pathname; // Get the current page's URL path

        // Select all navigation links for desktop and mobile menus
        const menuItemDesktop = document.querySelectorAll('.desktop-nav ul li a');
        const menuItemMobile = document.querySelectorAll('.mobile-nav .slider .menu ul li a'); // Corrected mobile menu selector

        // Loop through each desktop menu item
        menuItemDesktop.forEach(item => {
            item.classList.remove('active'); // Remove 'active' class from all menu items

            // Check if the current link matches the current page's URL
            if (item.getAttribute('href') === currentPath) {
                item.classList.add('active'); // Add the active class to the matching link
            }
        });

        // Loop through each mobile menu item
        menuItemMobile.forEach(item => {
            item.classList.remove('active'); // Remove 'active' class from all mobile menu items

            // Check if the current link matches the current page's URL
            if (item.getAttribute('href') === currentPath) {
                item.classList.add('active'); // Add the active class to the matching mobile link
            }
        });
    }
});
