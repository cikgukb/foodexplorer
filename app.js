// Main JS logic for Manjung Food Explorer

// Coordinates for Manjung, Perak (Center point)
const MAP_CENTER = [4.1936, 100.6644];
const MAP_ZOOM = 13;

let map;
let markerGroup;
let currentFilter = 'all'; // 'all', 'halal', 'viral'
let currentCategory = 'all'; // 'all', 'Seafood', etc.

document.addEventListener('DOMContentLoaded', () => {
    initMap();
    setupFilters();
    renderMarkers(window.foodPlaces);

    // Setup modal close
    document.getElementById('close-modal').addEventListener('click', closeModal);
    document.getElementById('details-modal').addEventListener('click', (e) => {
        if (e.target.id === 'details-modal') closeModal();
    });
});

function initMap() {
    map = L.map('map', {
        zoomControl: false // Disable default zoom to position it elsewhere if needed, or keep false for cleaner UI
    }).setView(MAP_CENTER, MAP_ZOOM);

    // Modern vibrant light map style from CartoDB Voyager
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    // Group for markers to easily clear them
    markerGroup = L.layerGroup().addTo(map);

    // Add custom zoom control at bottom right to avoid sidebar
    L.control.zoom({
        position: 'bottomright'
    }).addTo(map);
}

function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const categorySelect = document.getElementById('category-select');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');

            currentFilter = e.currentTarget.getAttribute('data-filter');
            applyFilters();
        });
    });

    categorySelect.addEventListener('change', (e) => {
        currentCategory = e.target.value;
        applyFilters();
    });
}

function applyFilters() {
    let filteredData = window.foodPlaces;

    if (currentFilter === 'halal') {
        filteredData = filteredData.filter(place => place.isHalal);
    } else if (currentFilter === 'viral') {
        filteredData = filteredData.filter(place => place.isViral);
    }

    if (currentCategory !== 'all') {
        filteredData = filteredData.filter(place => place.category === currentCategory);
    }

    renderMarkers(filteredData);
}

function renderMarkers(data) {
    // Clear existing markers
    markerGroup.clearLayers();

    data.forEach(place => {
        // Determine icon color based on attributes
        let iconClass = 'custom-div-icon'; // default primary
        let iconMarkup = '<i class="fa-solid fa-location-dot"></i>';

        if (place.isViral) {
            iconClass += ' marker-viral';
            iconMarkup = '<i class="fa-solid fa-fire"></i>'; // fire icon for viral
        } else if (place.isHalal) {
            iconClass += ' marker-halal';
        }

        const customIcon = L.divIcon({
            className: iconClass,
            html: iconMarkup,
            iconSize: [30, 30],
            iconAnchor: [15, 30]
        });

        const marker = L.marker([place.lat, place.lng], { icon: customIcon });

        // Add minimal tooltip
        marker.bindTooltip(`<b>${place.name}</b><br>★ ${place.rating}`, {
            direction: 'top',
            offset: [0, -20],
            className: 'glass-tooltip'
        });

        // Click event to open modal
        marker.on('click', () => {
            openModal(place);
            // Optional: Pan map slightly to center the marker
            map.flyTo([place.lat, place.lng], 15, { duration: 0.5 });
        });

        markerGroup.addLayer(marker);
    });
}

function openModal(place) {
    const modal = document.getElementById('details-modal');

    // Populate Data
    document.getElementById('modal-img').src = place.image_url;
    document.getElementById('modal-title').textContent = place.name;
    document.getElementById('modal-desc').textContent = place.description;

    // Rating
    document.getElementById('modal-rating-stars').innerHTML = getStars(parseFloat(place.rating));
    document.getElementById('modal-rating-text').textContent = `${place.rating} (${place.reviews.length} ulasan)`;

    // Badges
    const badgesContainer = document.getElementById('modal-badges');
    badgesContainer.innerHTML = '';

    const catBadge = document.createElement('span');
    catBadge.className = 'badge badge-category';
    catBadge.textContent = place.category;
    badgesContainer.appendChild(catBadge);

    if (place.isHalal) {
        const halalBadge = document.createElement('span');
        halalBadge.className = 'badge badge-halal';
        halalBadge.innerHTML = '<i class="fa-solid fa-check-circle"></i> Halal';
        badgesContainer.appendChild(halalBadge);
    }

    if (place.isViral) {
        const viralBadge = document.createElement('span');
        viralBadge.className = 'badge badge-viral';
        viralBadge.innerHTML = '<i class="fa-solid fa-bolt"></i> Viral';
        badgesContainer.appendChild(viralBadge);
    }

    // Reviews
    const reviewsContainer = document.getElementById('modal-reviews');
    reviewsContainer.innerHTML = '';

    if (place.reviews && place.reviews.length > 0) {
        place.reviews.forEach(rev => {
            const revEl = document.createElement('div');
            revEl.className = 'review-card';
            revEl.innerHTML = `
                <div class="review-header">
                    <span class="review-user"><i class="fa-solid fa-circle-user"></i> ${rev.user}</span>
                    <span style="color:#ffa502; font-size:0.8rem;">${getStars(rev.rating)}</span>
                </div>
                <div class="review-comment">"${rev.comment}"</div>
            `;
            reviewsContainer.appendChild(revEl);
        });
    } else {
        reviewsContainer.innerHTML = '<p class="modal-desc" style="margin:0;">Tiada ulasan lagi.</p>';
    }

    // Show modal
    modal.classList.add('active');
}

function closeModal() {
    const modal = document.getElementById('details-modal');
    modal.classList.remove('active');
}

function getStars(rating) {
    let starsHtml = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            starsHtml += '<i class="fa-solid fa-star"></i>';
        } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
            starsHtml += '<i class="fa-solid fa-star-half-stroke"></i>';
        } else {
            starsHtml += '<i class="fa-regular fa-star"></i>';
        }
    }
    return starsHtml;
}
