// Search and Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const guideCards = document.querySelectorAll('.guide-card');
    const noResults = document.getElementById('no-results');

    let currentDifficulty = 'all';
    let currentSearchTerm = '';

    // Filter by renter article stage
    if (filterButtons) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Update active state
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                // Get selected article stage
                currentDifficulty = this.dataset.difficulty;

                // Apply filters
                applyFilters();
            });
        });
    }

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentSearchTerm = this.value.toLowerCase();
            applyFilters();
        });
    }

    // Apply all active filters
    function applyFilters() {
        let visibleCount = 0;

        guideCards.forEach(card => {
            const difficulty = card.dataset.difficulty;
            const title = card.dataset.title;
            const description = card.dataset.description;
            const tags = card.dataset.tags.toLowerCase();

            // Check article stage filter
            const matchesDifficulty = currentDifficulty === 'all' || difficulty === currentDifficulty;

            // Check search filter
            const matchesSearch = currentSearchTerm === '' ||
                                title.includes(currentSearchTerm) ||
                                description.includes(currentSearchTerm) ||
                                tags.includes(currentSearchTerm);

            // Show or hide card
            if (matchesDifficulty && matchesSearch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide no results message
        if (noResults) {
            noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        }
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
