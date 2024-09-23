// includeHeader.js
document.addEventListener('DOMContentLoaded', function() {
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
        const menuItems = document.querySelectorAll('.desktop-nav ul li a'); // Select all navigation links

        // Loop through each menu item
        menuItems.forEach(item => {
            // Remove 'active' class from all menu items initially
            item.classList.remove('active');

            // Check if the current link matches the current page's URL
            if (item.getAttribute('href') === currentPath) {
                item.classList.add('active'); // Add the active class to the matching link
            }
        });
    }
});
