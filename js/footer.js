// includeFooter.js
document.addEventListener('DOMContentLoaded', function() {
    // Fetch and insert footer
    fetch('../components/footer.html')
        .then(response => response.text())
        .then(html => {
            document.querySelectorAll('footer').forEach(footer => {
                footer.innerHTML = html;
            });
        })
        .catch(error => {
            console.error('Error fetching footer:', error);
        });
});

