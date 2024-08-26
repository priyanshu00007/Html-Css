document.addEventListener('DOMContentLoaded', () => {
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const closeSidebar = document.getElementById('close-sidebar');
    const sidebar = document.getElementById('sidebar');
    const links = document.querySelectorAll('#sidebar nav ul li a');
    const sections = document.querySelectorAll('.content-section');

    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    closeSidebar.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');

            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Show the clicked section
            const activeSection = document.getElementById(sectionId);
            if (activeSection) {
                activeSection.classList.add('active');
            }

            // Update active link
            links.forEach(link => {
                link.classList.remove('active');
            });
            link.classList.add('active');
        });
    });
});
