// Sample data for February 2026 allocations
const allocationsData = [
    {
        id: "1",
        name: "02-05: MUMBAI - PUNE",
        start: {
            city: "MUMBAI",
            address: "Warehouse Complex, Andheri East",
            lat: 19.0760,
            lng: 72.8777
        },
        end: {
            city: "PUNE",
            address: "Industrial Area, Hinjewadi",
            lat: 18.5921,
            lng: 73.7410
        },
        date: "2026-02-05",
        time: "08:00 AM",
        status: "pending",
        status_key: "pending",
        vehicle: {
            type: {
                en: "HEAVY TRUCK - 20 TON",
                hi: "भारी ट्रक - 20 टन",
                bn: "ভারী ট্রাক - ২০ টন",
                mr: "जड ट्रक - २० टन"
            },
            number: "MH-01-AB-1234"
        },
        distance: "150 km",
        duration: "3 hours",
        estimated_time: "11:00 AM"
    },
    {
        id: "2",
        name: "02-08: PUNE - BANGALORE",
        start: {
            city: "PUNE",
            address: "Distribution Center, Hinjewadi",
            lat: 18.5921,
            lng: 73.7410
        },
        end: {
            city: "BANGALORE",
            address: "Logistics Hub, Whitefield",
            lat: 12.9716,
            lng: 77.5946
        },
        date: "2026-02-08",
        time: "10:30 AM",
        status: "in_progress",
        status_key: "in_progress",
        vehicle: {
            type: {
                en: "MEDIUM TRUCK - 10 TON",
                hi: "मध्यम ट्रक - 10 टन",
                bn: "মাঝারি ট্রাক - ১০ টন",
                mr: "मध्यम ट्रक - १० टन"
            },
            number: "DL-02-CD-5678"
        },
        distance: "560 km",
        duration: "9.5 hours",
        estimated_time: "08:00 PM"
    },
    {
        id: "3",
        name: "02-12: BANGALORE - HYDERABAD",
        start: {
            city: "BANGALORE",
            address: "Logistics Hub, Whitefield",
            lat: 12.9716,
            lng: 77.5946
        },
        end: {
            city: "HYDERABAD",
            address: "HITEC City Logistics Park",
            lat: 17.3850,
            lng: 78.4867
        },
        date: "2026-02-12",
        time: "06:00 AM",
        status: "pending",
        status_key: "pending",
        vehicle: {
            type: {
                en: "CONTAINER TRUCK - 40 FT",
                hi: "कंटेनर ट्रक - 40 फीट",
                bn: "কনটেইনার ট্রাক - ৪০ ফুট",
                mr: "कंटेनर ट्रक - ४० फूट"
            },
            number: "KA-03-EF-9012"
        },
        distance: "580 km",
        duration: "10 hours",
        estimated_time: "04:00 PM"
    },
    {
        id: "4",
        name: "02-15: HYDERABAD - KOLKATA",
        start: {
            city: "HYDERABAD",
            address: "HITEC City Logistics Park",
            lat: 17.3850,
            lng: 78.4867
        },
        end: {
            city: "KOLKATA",
            address: "Howrah Goods Terminal",
            lat: 22.5726,
            lng: 88.3639
        },
        date: "2026-02-15",
        time: "09:00 AM",
        status: "pending",
        status_key: "pending",
        vehicle: {
            type: {
                en: "TRAILER TRUCK - 30 TON",
                hi: "ट्रेलर ट्रक - 30 टन",
                bn: "ট্রেলার ট্রাক - ৩০ টন",
                mr: "ट्रेलर ट्रक - ३० टन"
            },
            number: "WB-04-GH-3456"
        },
        distance: "1,240 km",
        duration: "20 hours",
        estimated_time: "05:00 PM"
    },
    {
        id: "5",
        name: "02-20: KOLKATA - MUMBAI",
        start: {
            city: "KOLKATA",
            address: "Howrah Goods Terminal",
            lat: 22.5726,
            lng: 88.3639
        },
        end: {
            city: "MUMBAI",
            address: "Central Distribution Hub, Andheri",
            lat: 19.0760,
            lng: 72.8777
        },
        date: "2026-02-20",
        time: "07:30 AM",
        status: "completed",
        status_key: "completed",
        vehicle: {
            type: {
                en: "REFRIGERATED TRUCK - 15 TON",
                hi: "प्रशीतित ट्रक - 15 टन",
                bn: "রেফ্রিজারেটেড ট্রাক - ১৫ টন",
                mr: "रेफ्रिजरेटेड ट्रक - १५ टन"
            },
            number: "TS-05-IJ-7890"
        },
        distance: "1,850 km",
        duration: "31 hours",
        estimated_time: "02:30 PM"
    }
];

// Google Maps variables
let map;
let directionsService;
let directionsRenderer;
let currentRoute = null;

// Initialize the page
function initPage() {
    loadAllocations();
    setupEventListeners();
    updateStats();
    updateLastUpdated();
}

// Load allocations into the DOM
function loadAllocations() {
    const container = document.getElementById('allocationsContainer');
    container.innerHTML = '';
    
    allocationsData.forEach(allocation => {
        const allocationCard = createAllocationCard(allocation);
        container.appendChild(allocationCard);
    });
    
    // Select first allocation by default
    if (allocationsData.length > 0) {
        setTimeout(() => {
            selectAllocation(allocationsData[0].id);
        }, 500);
    }
}

// Create allocation card HTML
function createAllocationCard(allocation) {
    const card = document.createElement('div');
    card.className = 'allocation-card';
    card.id = `allocation-${allocation.id}`;
    card.dataset.id = allocation.id;
    
    // Get current language
    const lang = document.getElementById('languageSelect').value;
    
    card.innerHTML = `
        <div class="allocation-header">
            <div class="allocation-id">${allocation.name}</div>
            <div class="allocation-status">${translations[lang][allocation.status_key]}</div>
        </div>
        
        <div class="allocation-content">
            <div class="route-section">
                <div class="start-point">
                    <div class="point-icon">
                        <i class="fas fa-flag-checkered"></i>
                    </div>
                    <div class="point-info">
                        <h4>${translations[lang].start_location}</h4>
                        <p>${allocation.start.city}</p>
                        <p class="address">${allocation.start.address}</p>
                    </div>
                </div>
                
                <div class="route-divider">
                    <div class="divider-line"></div>
                    <div class="divider-icon">
                        <i class="fas fa-arrow-right"></i>
                    </div>
                    <div class="divider-line"></div>
                </div>
                
                <div class="end-point">
                    <div class="point-icon">
                        <i class="fas fa-map-marker-alt"></i>
                    </div>
                    <div class="point-info">
                        <h4>${translations[lang].end_location}</h4>
                        <p>${allocation.end.city}</p>
                        <p class="address">${allocation.end.address}</p>
                    </div>
                </div>
            </div>
            
            <div class="time-section">
                <div class="time-item">
                    <div class="time-label">${translations[lang].delivery_date}</div>
                    <div class="time-value">${formatDate(allocation.date)}</div>
                </div>
                <div class="time-item">
                    <div class="time-label">${translations[lang].delivery_time}</div>
                    <div class="time-value">${allocation.time}</div>
                </div>
            </div>
            
            <div class="vehicle-info">
                <div class="vehicle-icon">
                    <i class="fas fa-truck"></i>
                </div>
                <div class="vehicle-details">
                    <h4>${translations[lang].vehicle_type}</h4>
                    <p>${allocation.vehicle.type[lang]} (${allocation.vehicle.number})</p>
                </div>
            </div>
        </div>
    `;
    
    // Add click event
    card.addEventListener('click', () => {
        selectAllocation(allocation.id);
    });
    
    return card;
}

// Format date to display
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).toUpperCase();
}

// Select allocation and show on map
function selectAllocation(allocationId) {
    // Remove active class from all cards
    document.querySelectorAll('.allocation-card').forEach(card => {
        card.classList.remove('active');
    });
    
    // Add active class to selected card
    const selectedCard = document.getElementById(`allocation-${allocationId}`);
    selectedCard.classList.add('active');
    
    // Scroll to selected card
    selectedCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Find allocation data
    const allocation = allocationsData.find(a => a.id === allocationId);
    if (allocation) {
        showRouteOnMap(allocation);
        updateRouteDetails(allocation);
    }
}

// Initialize Google Maps
function initMap() {
    // Default to first allocation's start location
    const defaultLocation = { 
        lat: allocationsData[0].start.lat, 
        lng: allocationsData[0].start.lng 
    };
    
    map = new google.maps.Map(document.getElementById('mapContainer'), {
        zoom: 12,
        center: defaultLocation,
        mapTypeId: 'roadmap',
        styles: [
            {
                "elementType": "geometry",
                "stylers": [{"color": "#1d2c3d"}]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#8ec3b9"}]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [{"color": "#1a3646"}]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#4b6878"}]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#64779e"}]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{"color": "#283d6a"}]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#6f9ba5"}]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [{"color": "#023e58"}]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{"color": "#304a7d"}]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#98a5be"}]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [{"color": "#373d42"}]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{"color": "#2c6675"}]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{"color": "#255763"}]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [{"color": "#234d60"}]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"color": "#0e1626"}]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#4e6d70"}]
            }
        ]
    });
    
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
        suppressMarkers: false,
        polylineOptions: {
            strokeColor: '#7c3aed',
            strokeWeight: 6,
            strokeOpacity: 0.8
        },
        markerOptions: {
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#7c3aed',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 3
            }
        }
    });
    
    // Remove placeholder
    const placeholder = document.querySelector('.map-placeholder');
    if (placeholder) {
        placeholder.style.display = 'none';
    }
}

// Show route on Google Maps
function showRouteOnMap(allocation) {
    if (!directionsService || !directionsRenderer) return;
    
    const start = new google.maps.LatLng(allocation.start.lat, allocation.start.lng);
    const end = new google.maps.LatLng(allocation.end.lat, allocation.end.lng);
    
    const request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
    };
    
    directionsService.route(request, (result, status) => {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);
            currentRoute = result;
            
            // Adjust map bounds to show the entire route
            const bounds = new google.maps.LatLngBounds();
            const route = result.routes[0];
            
            route.legs.forEach(leg => {
                bounds.extend(leg.start_location);
                bounds.extend(leg.end_location);
            });
            
            map.fitBounds(bounds);
            
            // Add custom markers
            addCustomMarkers(allocation);
        } else {
            console.error('Directions request failed:', status);
        }
    });
}

// Add custom markers for start and end points
function addCustomMarkers(allocation) {
    // Start marker
    new google.maps.Marker({
        position: { lat: allocation.start.lat, lng: allocation.start.lng },
        map: map,
        title: allocation.start.city,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 15,
            fillColor: '#10b981',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 3
        },
        label: {
            text: 'S',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 'bold'
        }
    });
    
    // End marker
    new google.maps.Marker({
        position: { lat: allocation.end.lat, lng: allocation.end.lng },
        map: map,
        title: allocation.end.city,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 15,
            fillColor: '#ef4444',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 3
        },
        label: {
            text: 'E',
            color: '#ffffff',
            fontSize: '14px',
            fontWeight: 'bold'
        }
    });
}

// Update route details panel
function updateRouteDetails(allocation) {
    document.getElementById('detailDistance').textContent = allocation.distance;
    document.getElementById('detailDuration').textContent = allocation.duration;
    
    const lang = document.getElementById('languageSelect').value;
    document.getElementById('detailVehicle').textContent = 
        `${allocation.vehicle.type[lang]} (${allocation.vehicle.number})`;
}

// Update statistics
function updateStats() {
    const totalDistance = allocationsData.reduce((sum, allocation) => {
        const km = parseInt(allocation.distance);
        return sum + (isNaN(km) ? 0 : km);
    }, 0);
    
    document.getElementById('totalAllocations').textContent = allocationsData.length;
    document.getElementById('totalDistance').textContent = totalDistance.toLocaleString();
    document.getElementById('febDays').textContent = '28';
    
    // Calculate average hours
    const totalHours = allocationsData.reduce((sum, allocation) => {
        const hours = parseFloat(allocation.duration);
        return sum + (isNaN(hours) ? 0 : hours);
    }, 0);
    
    const avgHours = (totalHours / allocationsData.length).toFixed(1);
    document.getElementById('avgTime').textContent = avgHours;
}

// Update last updated timestamp
function updateLastUpdated() {
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-CA') + ' ' + 
                         now.toLocaleTimeString('en-US', { hour12: false });
    document.getElementById('lastUpdated').textContent = formattedDate;
}

// Setup event listeners
function setupEventListeners() {
    // Refresh button
    document.getElementById('refreshBtn').addEventListener('click', () => {
        const btn = document.getElementById('refreshBtn');
        btn.classList.add('refreshing');
        
        // Simulate refresh
        setTimeout(() => {
            loadAllocations();
            updateLastUpdated();
            btn.classList.remove('refreshing');
            
            // Show success animation
            const statusDot = document.querySelector('.status-dot');
            statusDot.style.animation = 'none';
            setTimeout(() => {
                statusDot.style.animation = 'statusPulse 2s infinite';
            }, 10);
        }, 1000);
    });
    
    // Map zoom controls
    document.getElementById('zoomInBtn').addEventListener('click', () => {
        if (map) {
            const currentZoom = map.getZoom();
            map.setZoom(currentZoom + 1);
        }
    });
    
    document.getElementById('zoomOutBtn').addEventListener('click', () => {
        if (map) {
            const currentZoom = map.getZoom();
            map.setZoom(currentZoom - 1);
        }
    });
    
    // Add ripple effect to all buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initPage();

    // Theme toggle initialization
    const themeToggle = document.getElementById('themeToggle');
    // Determine saved preference or system preference
    const savedTheme = localStorage.getItem('preferredTheme');
    const defaultLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const theme = savedTheme ? savedTheme : (defaultLight ? 'light' : 'dark');

    if (theme === 'light') document.body.classList.add('light-theme');
    if (themeToggle) {
        themeToggle.checked = document.body.classList.contains('light-theme');
        themeToggle.addEventListener('change', (e) => {
            if (e.target.checked) {
                document.body.classList.add('light-theme');
                localStorage.setItem('preferredTheme', 'light');
            } else {
                document.body.classList.remove('light-theme');
                localStorage.setItem('preferredTheme', 'dark');
            }
        });
    }
});

// Add ripple animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);