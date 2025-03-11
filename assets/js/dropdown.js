document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    document.addEventListener('click', function(event) {
        const isMenuButton = mobileMenuButton.contains(event.target);
        const isMenuContent = mobileMenu.contains(event.target);

        if (!isMenuButton && !isMenuContent && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
        }
    });

    mobileMenuButton.addEventListener('click', function(e) {
        e.stopPropagation();
        mobileMenu.classList.toggle('hidden');
    });

    const mobileNavContainer = document.querySelector('.mobile-nav-container');
    if (mobileNavContainer) {
        mobileNavContainer.addEventListener('click', function(e) {
            const dropdownLink = e.target.closest('.nav-link');
            if (dropdownLink && dropdownLink.querySelector('.dropdown-arrow')) {
                e.preventDefault();

                const container = dropdownLink.closest('.dropdown-container');
                const content = container.querySelector('.dropdown-content');
                const arrow = dropdownLink.querySelector('.dropdown-arrow');

                document.querySelectorAll('.mobile-nav-container .dropdown-content.show').forEach(function(openContent) {
                    if (openContent !== content) {
                        openContent.classList.remove('show');
                        const openArrow = openContent.parentElement.querySelector('.dropdown-arrow');
                        if (openArrow) openArrow.classList.remove('rotate-180');
                    }
                });

                content.classList.toggle('show');
                arrow.classList.toggle('rotate-180');
            }
        });
    }
});