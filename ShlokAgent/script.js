// Delivery Hubs Data with Indian cities
const deliveryHubs = [
    {
        id: 1,
        name: "Mumbai Central Hub",
        location: [19.076, 72.8777],
        address: "Andheri East, Mumbai, Maharashtra",
        capacity: 150,
        used: 65,
        facilities: ["Cold Storage", "Forklifts", "Security", "24/7 Access"],
        contact: "+91-22-12345678",
        manpower: 25,
    },
    {
        id: 2,
        name: "Delhi NCR Hub",
        location: [28.7041, 77.1025],
        address: "Gurugram Sector 18, Delhi NCR",
        capacity: 200,
        used: 120,
        facilities: ["Heavy Lift Cranes", "Warehouse", "Packaging", "Loading Bays"],
        contact: "+91-11-87654321",
        manpower: 35,
    },
    {
        id: 3,
        name: "Bangalore South Hub",
        location: [12.9716, 77.5946],
        address: "Electronic City, Bangalore, Karnataka",
        capacity: 120,
        used: 45,
        facilities: ["Electronics Handling", "ESD Protection", "Quality Check", "Storage"],
        contact: "+91-80-23456789",
        manpower: 20,
    },
    {
        id: 4,
        name: "Chennai Port Hub",
        location: [13.0827, 80.2707],
        address: "Chennai Port, Chennai, Tamil Nadu",
        capacity: 180,
        used: 150,
        facilities: ["Port Access", "Customs Clearance", "Heavy Machinery", "Export Packing"],
        contact: "+91-44-34567890",
        manpower: 30,
    },
    {
        id: 5,
        name: "Kolkata Eastern Hub",
        location: [22.5726, 88.3639],
        address: "Salt Lake City, Kolkata, West Bengal",
        capacity: 100,
        used: 40,
        facilities: ["Textile Storage", "Humidity Control", "Loading Docks", "Security"],
        contact: "+91-33-45678901",
        manpower: 18,
    },
    {
        id: 6,
        name: "Hyderabad Tech Hub",
        location: [17.385, 78.4867],
        address: "HITEC City, Hyderabad, Telangana",
        capacity: 130,
        used: 90,
        facilities: ["Tech Goods", "Temperature Control", "Surveillance", "Quick Dispatch"],
        contact: "+91-40-56789012",
        manpower: 22,
    },
];

// Initialize variables
let map;
let hubMarkers = [];
let pickupMarker = null;
let deliveryMarker = null;
let truckMarker = null;
let selectedHub = null;
let currentLocation = [19.076, 72.8777]; // Mumbai as default
let trackingInterval = null;
let isTracking = false;
let notifications = [];
let notificationCount = 0;
let cargoWeight = 4.2;
let routingControl = null;
let routeLine = null;
let routeDistance = 0;
let routeDuration = 0;
let currentSpeed = 0;
let geocoder = null;

// DOM elements
const notificationBell = document.getElementById("notificationBell");
const notificationPanel = document.getElementById("notificationPanel");
const notificationCountElement = document.getElementById("notificationCount");
const notificationList = document.getElementById("notificationList");
const clearNotificationsBtn = document.getElementById("clearNotifications");
const calculateRouteBtn = document.getElementById("calculateRouteBtn");
const allocationResult = document.getElementById("allocationResult");
const noAllocation = document.getElementById("noAllocation");
const hubDetails = document.getElementById("hubDetails");
const startTrackingBtn = document.getElementById("startTrackingBtn");
const trackingSection = document.getElementById("trackingSection");
const noTracking = document.getElementById("noTracking");
const cargoWeightSlider = document.getElementById("cargoWeight");
const weightValueElement = document.getElementById("weightValue");
const displayWeightElement = document.getElementById("displayWeight");
const cargoTypeSelect = document.getElementById("cargoType");
const displayCargoTypeElement = document.getElementById("displayCargoType");
const distanceIndicator = document.getElementById("distanceIndicator");
const distanceValueElement = document.getElementById("distanceValue");
const proximityAlert = document.getElementById("proximityAlert");
const alertMessage = document.getElementById("alertMessage");
const currentLocationElement = document.getElementById("currentLocation");
const currentSpeedElement = document.getElementById("currentSpeed");
const simulateMovementBtn = document.getElementById("simulateMovement");
const stopTrackingBtn = document.getElementById("stopTracking");
const loadingCrewElement = document.getElementById("loadingCrew");
const unloadingCrewElement = document.getElementById("unloadingCrew");
const supervisorElement = document.getElementById("supervisor");
const totalManpowerElement = document.getElementById("totalManpower");
const pickupLocationInput = document.getElementById("pickupLocation");
const deliveryLocationInput = document.getElementById("deliveryLocation");
const displayDistanceElement = document.getElementById("displayDistance");
const displayTimeElement = document.getElementById("displayTime");
const totalDistanceElement = document.getElementById("totalDistance");
const estimatedTimeElement = document.getElementById("estimatedTime");
const routeInfoElement = document.getElementById("routeInfo");
const zoomInBtn = document.getElementById("zoomIn");
const zoomOutBtn = document.getElementById("zoomOut");
const centerMapBtn = document.getElementById("centerMap");
const locateMeBtn = document.getElementById("locateMe");

// Initialize the page
document.addEventListener("DOMContentLoaded", function () {
    // Initialize Leaflet Map
    initMap();

    // Set up event listeners
    notificationBell.addEventListener("click", toggleNotificationPanel);
    clearNotificationsBtn.addEventListener("click", clearAllNotifications);
    calculateRouteBtn.addEventListener("click", calculateRouteAndAllocate);
    startTrackingBtn.addEventListener("click", startLiveTracking);
    simulateMovementBtn.addEventListener("click", simulateMovement);
    stopTrackingBtn.addEventListener("click", stopTracking);

    // Map controls
    zoomInBtn.addEventListener("click", () => map.setZoom(map.getZoom() + 1));
    zoomOutBtn.addEventListener("click", () => map.setZoom(map.getZoom() - 1));
    centerMapBtn.addEventListener("click", centerMapOnRoute);
    locateMeBtn.addEventListener("click", locateUser);

    // Cargo weight slider
    cargoWeightSlider.addEventListener("input", function () {
        cargoWeight = parseFloat(this.value);
        weightValueElement.textContent = cargoWeight.toFixed(1);
        displayWeightElement.textContent = cargoWeight.toFixed(1);
        calculateManpowerRequirements();
    });

    // Cargo type change
    cargoTypeSelect.addEventListener("change", function () {
        displayCargoTypeElement.textContent = this.options[this.selectedIndex].text;
        calculateManpowerRequirements();
    });

    // Setup geocoding for address inputs
    setupGeocoding();

    // Load any saved notifications
    loadNotifications();

    // Initialize with default values
    updateCargoDetails();

    // Add sample locations after a delay
    setTimeout(() => {
        pickupLocationInput.value = "Mumbai International Airport, Mumbai";
        deliveryLocationInput.value = "Connaught Place, New Delhi";
    }, 500);
});

// Initialize Leaflet Map
function initMap() {
    // Initialize the map with OpenStreetMap tiles
    map = L.map("map").setView([20.5937, 78.9629], 5); // Center of India

    // Add OpenStreetMap tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        id: "osm/light",
    }).addTo(map);

    // Add a second tile layer option (CartoDB for better visuals)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        maxZoom: 19,
        subdomains: "abcd",
    }).addTo(map);

    // Initialize geocoder
    geocoder = L.Control.geocoder({
        defaultMarkGeocode: false,
        placeholder: "Search locations...",
        collapsed: false,
    }).addTo(map);

    // Handle geocoder results
    geocoder.on("markgeocode", function (e) {
        map.setView(e.geocode.center, 13);
        L.marker(e.geocode.center)
            .addTo(map)
            .bindPopup(e.geocode.name)
            .openPopup();
    });

    // Add delivery hub markers to the map
    addHubMarkers();
}

// Add hub markers to the map
function addHubMarkers() {
    deliveryHubs.forEach((hub) => {
        const availableCapacity = hub.capacity - hub.used;
        const isFull = availableCapacity < 20;

        // Create custom icon
        const hubIcon = L.divIcon({
            html: `<div style="background: ${
                isFull ? "#ef4444" : "#4f46e5"
            }; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); cursor: pointer;"></div>`,
            className: "hub-icon",
            iconSize: [24, 24],
            iconAnchor: [12, 12],
        });

        const marker = L.marker(hub.location, { icon: hubIcon })
            .addTo(map)
            .bindPopup(`
                <div style="min-width: 250px; padding: 8px;">
                    <h3 style="margin: 0 0 10px 0; color: #4f46e5;">${hub.name}</h3>
                    <p style="margin: 0 0 5px 0;"><strong>Address:</strong> ${hub.address}</p>
                    <p style="margin: 0 0 5px 0;"><strong>Capacity:</strong> ${availableCapacity} / ${hub.capacity} tons available</p>
                    <p style="margin: 0 0 5px 0;"><strong>Manpower:</strong> ${hub.manpower} people</p>
                    <p style="margin: 0 0 5px 0;"><strong>Contact:</strong> ${hub.contact}</p>
                    <p style="margin: 0;"><strong>Facilities:</strong> ${hub.facilities.join(", ")}</p>
                    <button onclick="selectHubFromMap(${hub.id})" style="margin-top: 10px; background: #4f46e5; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">Select This Hub</button>
                </div>
            `);

        hubMarkers.push(marker);
    });
}

// Select hub from map popup
window.selectHubFromMap = function (hubId) {
    const hub = deliveryHubs.find((h) => h.id === hubId);
    if (hub) {
        selectedHub = hub;
        updateHubSelection();

        // Close all popups
        hubMarkers.forEach((marker) => marker.closePopup());

        // Add notification
        addNotification(`Selected ${hub.name} from map`, "info");
    }
};

// Update hub selection in UI
function updateHubSelection() {
    const hubCards = document.querySelectorAll(".hub-card");
    hubCards.forEach((card) => {
        card.classList.remove("selected");
        if (parseInt(card.dataset.hubId) === selectedHub.id) {
            card.classList.add("selected");
        }
    });
}

// Setup geocoding for address inputs
function setupGeocoding() {
    // Add geocoding to pickup input
    pickupLocationInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            geocodeAddress(this.value, "pickup");
        }
    });

    // Add geocoding to delivery input
    deliveryLocationInput.addEventListener("keypress", function (e) {
        if (e.key === "Enter") {
            geocodeAddress(this.value, "delivery");
        }
    });
}

// Geocode address using Nominatim (OpenStreetMap)
function geocodeAddress(address, type) {
    if (!address.trim()) return;

    const loadingText = type === "pickup" ? "Searching pickup location..." : "Searching delivery location...";
    const inputElement = type === "pickup" ? pickupLocationInput : deliveryLocationInput;
    const originalValue = inputElement.value;

    inputElement.value = loadingText;

    // Use Nominatim geocoding
    fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&countrycodes=in`
    )
        .then((response) => response.json())
        .then((data) => {
            if (data && data.length > 0) {
                const result = data[0];
                const lat = parseFloat(result.lat);
                const lon = parseFloat(result.lon);

                if (type === "pickup") {
                    updatePickupLocation([lat, lon], result.display_name);
                } else {
                    updateDeliveryLocation([lat, lon], result.display_name);
                }

                // Update input with actual address found
                inputElement.value = result.display_name;
            } else {
                alert("Location not found. Please try a different address.");
                inputElement.value = originalValue;
            }
        })
        .catch((error) => {
            console.error("Geocoding error:", error);
            inputElement.value = originalValue;
            alert("Unable to geocode address. Please check your connection and try again.");
        });
}

// Update pickup location on map
function updatePickupLocation(coords, address) {
    // Remove existing marker
    if (pickupMarker) {
        map.removeLayer(pickupMarker);
    }

    // Create custom pickup icon
    const pickupIcon = L.divIcon({
        html: `<div style="background: #10b981; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 3px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><i class="fas fa-location-arrow" style="color: white; font-size: 12px;"></i></div>`,
        className: "pickup-icon",
        iconSize: [30, 30],
        iconAnchor: [15, 15],
    });

    pickupMarker = L.marker(coords, { icon: pickupIcon })
        .addTo(map)
        .bindPopup(`<strong>Pickup Location</strong><br>${address}`)
        .openPopup();

    // Update current location
    currentLocation = coords;

    // Center map on pickup
    map.setView(coords, 13);
}

// Update delivery location on map
function updateDeliveryLocation(coords, address) {
    // Remove existing marker
    if (deliveryMarker) {
        map.removeLayer(deliveryMarker);
    }

    // Create custom delivery icon
    const deliveryIcon = L.divIcon({
        html: `<div style="background: #f59e0b; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 3px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><i class="fas fa-flag-checkered" style="color: white; font-size: 12px;"></i></div>`,
        className: "delivery-icon",
        iconSize: [30, 30],
        iconAnchor: [15, 15],
    });

    deliveryMarker = L.marker(coords, { icon: deliveryIcon })
        .addTo(map)
        .bindPopup(`<strong>Delivery Location</strong><br>${address}`)
        .openPopup();
}

// Calculate route and allocate delivery hub
function calculateRouteAndAllocate() {
    resetMapState();
    const pickup = pickupLocationInput.value;
    const delivery = deliveryLocationInput.value;

    if (!pickup || !delivery) {
        alert("Please enter both pickup and delivery locations.");
        return;
    }

    // Show loading state
    calculateRouteBtn.innerHTML = '<div class="loader" style="margin-right: 8px;"></div> Calculating Route...';
    calculateRouteBtn.disabled = true;

    // First geocode both addresses
    Promise.all([geocodeAddressPromise(pickup), geocodeAddressPromise(delivery)])
        .then(([pickupCoords, deliveryCoords]) => {
            if (!pickupCoords || !deliveryCoords) {
                throw new Error("Could not geocode one or both addresses");
            }

            // Update markers
            updatePickupLocation(pickupCoords, pickup);
            updateDeliveryLocation(deliveryCoords, delivery);

            // Calculate route using Leaflet Routing Machine
            return calculateRouteOSM(pickupCoords, deliveryCoords);
        })
        .then((routeData) => {
            // Update route information
            updateRouteInfo(routeData);

            // Allocate delivery hub based on cargo weight and location
            allocateDeliveryHub(routeData);

            // Show results
            allocationResult.style.display = "block";
            noAllocation.style.display = "none";
        })
        .catch((error) => {
            console.error("Error calculating route:", error);
            alert("Unable to calculate route. Please check the locations and try again.");

            // Fallback: Allocate hub without route
            allocateDeliveryHub(null);
            allocationResult.style.display = "block";
            noAllocation.style.display = "none";
        })
        .finally(() => {
            // Reset button
            calculateRouteBtn.innerHTML = '<i class="fas fa-route"></i> Calculate Route & Allocate Hub';
            calculateRouteBtn.disabled = false;
        });
}

// Geocode address promise wrapper
function geocodeAddressPromise(address) {
    return new Promise((resolve, reject) => {
        if (!address.trim()) {
            resolve(null);
            return;
        }

        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&countrycodes=in`)
            .then((response) => response.json())
            .then((data) => {
                if (data && data.length > 0) {
                    const result = data[0];
                    resolve([parseFloat(result.lat), parseFloat(result.lon)]);
                } else {
                    resolve(null);
                }
            })
            .catch((error) => {
                console.error("Geocoding error:", error);
                resolve(null);
            });
    });
}

// Calculate route using OSM (simulated since OSRM needs server)
function calculateRouteOSM(startCoords, endCoords) {
    return new Promise((resolve, reject) => {
        // Remove existing routing control
        if (routingControl) {
            map.removeControl(routingControl);
        }

        // Calculate straight-line distance (simplified for demo)
        // In production, you would use OSRM or similar routing service
        const distance = calculateDistanceHaversine(startCoords[0], startCoords[1], endCoords[0], endCoords[1]);
        const duration = distance / 50; // Assuming average speed of 50 km/h

        // Create a simple polyline for the route (straight line for demo)
        routeLine = L.polyline([startCoords, endCoords], {
            color: "#4f46e5",
            weight: 5,
            opacity: 0.7,
            dashArray: "10, 10",
        }).addTo(map);

        // Fit bounds to show both points
        const bounds = L.latLngBounds([startCoords, endCoords]);
        map.fitBounds(bounds, { padding: [50, 50] });

        // Store route data
        routeDistance = distance;
        routeDuration = duration;

        resolve({
            distance: distance,
            duration: duration,
            startLocation: startCoords,
            endLocation: endCoords,
        });
    });
}

// Calculate distance using Haversine formula
function calculateDistanceHaversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

function resetMapState() {
    // Remove old route
    if (routeLine) {
        map.removeLayer(routeLine);
        routeLine = null;
    }

    // Remove old pickup marker
    if (pickupMarker) {
        map.removeLayer(pickupMarker);
        pickupMarker = null;
    }

    // Remove old delivery marker
    if (deliveryMarker) {
        map.removeLayer(deliveryMarker);
        deliveryMarker = null;
    }

    // Remove old truck marker
    if (truckMarker) {
        map.removeLayer(truckMarker);
        truckMarker = null;
    }

    // Stop live tracking
    if (trackingInterval) {
        clearInterval(trackingInterval);
        trackingInterval = null;
    }

    isTracking = false;
    selectedHub = null;

    trackingSection.style.display = "none";
    noTracking.style.display = "block";
    proximityAlert.style.display = "none";
}

// Check if a hub is between pickup and delivery locations
function isHubBetweenLocations(hubCoords, startCoords, endCoords) {
    // Simple bounding box check - hub should be within the rectangle formed by pickup and delivery
    const minLat = Math.min(startCoords[0], endCoords[0]);
    const maxLat = Math.max(startCoords[0], endCoords[0]);
    const minLng = Math.min(startCoords[1], endCoords[1]);
    const maxLng = Math.max(startCoords[1], endCoords[1]);

    // Check if hub is within the bounding box with some buffer
    const buffer = 1.0; // 1 degree buffer (approx 111km)
    return (
        hubCoords[0] >= minLat - buffer &&
        hubCoords[0] <= maxLat + buffer &&
        hubCoords[1] >= minLng - buffer &&
        hubCoords[1] <= maxLng + buffer
    );
}

// Calculate distance from a point to a line segment (simplified)
function distanceToRoute(point, startCoords, endCoords) {
    // Calculate perpendicular distance from point to line
    const A = point[0] - startCoords[0];
    const B = point[1] - startCoords[1];
    const C = endCoords[0] - startCoords[0];
    const D = endCoords[1] - startCoords[1];

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;

    if (lenSq !== 0) {
        param = dot / lenSq;
    }

    let xx, yy;

    if (param < 0) {
        xx = startCoords[0];
        yy = startCoords[1];
    } else if (param > 1) {
        xx = endCoords[0];
        yy = endCoords[1];
    } else {
        xx = startCoords[0] + param * C;
        yy = startCoords[1] + param * D;
    }

    const dx = point[0] - xx;
    const dy = point[1] - yy;

    return Math.sqrt(dx * dx + dy * dy);
}

// Update route information display
function updateRouteInfo(routeData) {
    displayDistanceElement.textContent = `${routeData.distance.toFixed(1)} km`;
    displayTimeElement.textContent = `${routeData.duration.toFixed(1)} hours`;
    totalDistanceElement.textContent = `${routeData.distance.toFixed(1)} km`;
    estimatedTimeElement.textContent = `${routeData.duration.toFixed(1)} hours`;

    // Update route info text
    routeInfoElement.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 10px;">
            <div><i class="fas fa-map-marker-alt" style="color: #10b981; margin-right: 8px;"></i> <strong>Pickup:</strong> ${pickupLocationInput.value.substring(
                0,
                60
            )}...</div>
            <div><i class="fas fa-flag-checkered" style="color: #f59e0b; margin-right: 8px;"></i> <strong>Delivery:</strong> ${deliveryLocationInput.value.substring(
                0,
                60
            )}...</div>
            <div><i class="fas fa-route" style="color: #4f46e5; margin-right: 8px;"></i> <strong>Distance:</strong> ${routeData.distance.toFixed(
                1
            )} km</div>
            <div><i class="fas fa-clock" style="color: #8b5cf6; margin-right: 8px;"></i> <strong>Estimated travel time:</strong> ${routeData.duration.toFixed(
                1
            )} hours</div>
        </div>
    `;
}

function allocateDeliveryHub(routeData) {
    // Always reset previous selection
    selectedHub = null;

    // Fallback logic when route is invalid or missing
    if (!routeData || !routeData.startLocation || !routeData.endLocation) {
        const suitableHubs = deliveryHubs.filter((hub) => {
            const availableCapacity = hub.capacity - hub.used;
            return availableCapacity >= cargoWeight;
        });

        displayHubAllocation(suitableHubs, routeData);
        calculateManpowerRequirements();
        return;
    }

    const startCoords = routeData.startLocation;
    const endCoords = routeData.endLocation;

    // 1️⃣ Filter by capacity
    let suitableHubs = deliveryHubs.filter((hub) => {
        const availableCapacity = hub.capacity - hub.used;
        return availableCapacity >= cargoWeight;
    });

    // 2️⃣ Filter hubs between pickup & delivery
    suitableHubs = suitableHubs.filter((hub) => {
        return isHubBetweenLocations(hub.location, startCoords, endCoords);
    });

    // 3️⃣ If none on route, fallback to all suitable hubs
    if (suitableHubs.length === 0) {
        suitableHubs = deliveryHubs.filter((hub) => {
            const availableCapacity = hub.capacity - hub.used;
            return availableCapacity >= cargoWeight;
        });

        addNotification("No hubs found along the route. Showing all available hubs instead.", "warning");
    }

    // 4️⃣ Sort by distance from route
    suitableHubs.sort((a, b) => {
        const distA = distanceToRoute(a.location, startCoords, endCoords);
        const distB = distanceToRoute(b.location, startCoords, endCoords);
        return distA - distB;
    });

    // Show results
    displayHubAllocation(suitableHubs, routeData);
    calculateManpowerRequirements();
}

function displayHubAllocation(hubs, routeData = null) {
    hubDetails.innerHTML = "";

    if (hubs.length === 0) {
        hubDetails.innerHTML = `
            <div style="text-align: center; padding: 2.5rem; color: var(--gray-600); grid-column: 1 / -1;">
                <i class="fas fa-exclamation-triangle fa-3x" style="margin-bottom: 1.5rem; color: var(--danger);"></i>
                <h3 style="color: var(--dark);">No Suitable Hubs Found</h3>
                <p>No delivery hubs have enough capacity for your cargo (${cargoWeight} tons).</p>
                <p style="margin-top: 8px;">Try reducing the cargo weight or check back later.</p>
            </div>
        `;
        startTrackingBtn.disabled = true;
        return;
    }

    // Check if we have route data for location info
    const hasRouteInfo = routeData && routeData.startLocation && routeData.endLocation;

    // Display top 3 recommended hubs
    const recommendedHubs = hubs.slice(0, 3);

    recommendedHubs.forEach((hub, index) => {
        const availableCapacity = hub.capacity - hub.used;
        const capacityPercentage = (hub.used / hub.capacity) * 100;
        const isRecommended = index === 0;

        // Calculate distance from route
        let distanceText = "";
        if (hasRouteInfo) {
            const routeDistance = distanceToRoute(hub.location, routeData.startLocation, routeData.endLocation);
            distanceText = `${routeDistance.toFixed(1)} km from route`;
        } else {
            // Fallback to distance from current location
            const distanceToHub = calculateDistanceHaversine(
                currentLocation[0],
                currentLocation[1],
                hub.location[0],
                hub.location[1]
            );
            distanceText = `${distanceToHub.toFixed(1)} km away`;
        }

        // Check if hub is between locations (for indicator)
        const isBetweenLocations = hasRouteInfo
            ? isHubBetweenLocations(hub.location, routeData.startLocation, routeData.endLocation)
            : true;

        const hubCard = document.createElement("div");
        hubCard.className = `hub-card ${isRecommended ? "selected" : ""}`;
        hubCard.dataset.hubId = hub.id;

        if (isRecommended) {
            selectedHub = hub;
        }

        hubCard.innerHTML = `
            <div class="hub-icon">
                <i class="fas fa-warehouse"></i>
            </div>
            <h4 style="color: var(--dark);">${hub.name}</h4>
            <p style="font-size: 0.9rem; margin: 8px 0; color: var(--gray-600);">${hub.address}</p>

            <div class="capacity-bar">
                <div class="capacity-fill" style="width: ${capacityPercentage}%"></div>
            </div>

            <div style="display: flex; justify-content: space-between; font-size: 0.9rem; margin: 10px 0;">
                <span style="color: var(--gray-600);">Available:</span>
                <strong style="color: var(--dark);">${availableCapacity} tons</strong>
            </div>

            <div style="margin: 10px 0; font-size: 0.9rem; color: ${
                isBetweenLocations ? "var(--success)" : "var(--warning)"
            };">
                <i class="fas fa-map-marker-alt"></i> ${distanceText}
                ${!isBetweenLocations ? '<br><small style="color: var(--warning);">(Not on route)</small>' : ""}
            </div>

            <div class="hub-capacity">${hub.manpower} people available</div>

            ${
                isRecommended
                    ? '<div style="margin-top: 12px; color: var(--accent); font-weight: 600;"><i class="fas fa-star"></i> Recommended</div>'
                    : ""
            }
        `;

        hubCard.addEventListener("click", () => {
            document.querySelectorAll(".hub-card").forEach((card) => card.classList.remove("selected"));
            hubCard.classList.add("selected");
            selectedHub = hub;

            // Add appropriate notification based on location
            if (isBetweenLocations) {
                addNotification(`Selected ${hub.name} (on route) as delivery hub`, "info");
            } else {
                addNotification(`Selected ${hub.name} (off route) as delivery hub - may require detour`, "warning");
            }
        });

        hubDetails.appendChild(hubCard);
    });

    startTrackingBtn.disabled = false;
}

// Calculate manpower requirements based on cargo
function calculateManpowerRequirements() {
    // Base calculations based on cargo weight
    let loadingCrew = Math.ceil(cargoWeight / 2); // 1 person per 2 tons
    let unloadingCrew = Math.ceil(cargoWeight / 2);
    let supervisor = 1;

    // Adjust based on cargo type
    const cargoType = cargoTypeSelect.value;
    if (cargoType === "furniture" || cargoType === "automotive") {
        loadingCrew += 1;
        unloadingCrew += 1;
    } else if (cargoType === "hazardous") {
        loadingCrew += 2;
        unloadingCrew += 2;
        supervisor += 1; // Extra supervisor for hazardous materials
    } else if (cargoType === "perishable") {
        loadingCrew += 1; // Faster loading for perishables
    }

    // Ensure minimum crew
    loadingCrew = Math.max(loadingCrew, 2);
    unloadingCrew = Math.max(unloadingCrew, 2);

    const totalManpower = loadingCrew + unloadingCrew + supervisor;

    // Update UI
    loadingCrewElement.textContent = loadingCrew;
    unloadingCrewElement.textContent = unloadingCrew;
    supervisorElement.textContent = supervisor;
    totalManpowerElement.textContent = totalManpower;
}

// Start live tracking
function startLiveTracking() {
    if (!selectedHub) {
        alert("Please select a delivery hub first.");
        return;
    }

    isTracking = true;
    trackingSection.style.display = "block";
    noTracking.style.display = "none";

    // Add truck marker to map
    addTruckMarker();

    // Start tracking interval
    trackingInterval = setInterval(updateTracking, 3000);

    // Add initial notification
    addNotification(`Live tracking started for cargo to ${selectedHub.name}`, "info");
}

// Add truck marker to map
function addTruckMarker() {
    // Remove existing truck marker if any
    if (truckMarker) {
        map.removeLayer(truckMarker);
    }

    // Create custom truck icon
    const truckIcon = L.divIcon({
        html: `<div style="background: #8b5cf6; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 3px 10px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;"><i class="fas fa-truck" style="color: white; font-size: 14px;"></i></div>`,
        className: "truck-icon",
        iconSize: [32, 32],
        iconAnchor: [16, 16],
    });

    truckMarker = L.marker(currentLocation, {
        icon: truckIcon,
        zIndexOffset: 1000, // Ensure truck appears above other markers
    }).addTo(map);

    // Center map on truck
    map.setView(currentLocation, 13);
}

// Update tracking information
function updateTracking() {
    if (!isTracking) return;

    // Calculate distance to selected hub
    const distance = calculateDistanceHaversine(
        currentLocation[0],
        currentLocation[1],
        selectedHub.location[0],
        selectedHub.location[1]
    );

    // Update distance display
    distanceValueElement.textContent = distance.toFixed(2);
    distanceIndicator.innerHTML = `Distance to <strong>${selectedHub.name}</strong>: <span id="distanceValue" style="color: var(--primary);">${distance.toFixed(
        2
    )}</span> km`;

    // Update current location display
    currentLocationElement.textContent = `Lat: ${currentLocation[0].toFixed(6)}, Lng: ${currentLocation[1].toFixed(6)}`;

    // Simulate speed (random between 40-80 km/h)
    currentSpeed = 40 + Math.random() * 40;
    currentSpeedElement.innerHTML = `Speed: <span style="color: var(--primary);">${currentSpeed.toFixed(0)}</span> km/h`;

    // Check proximity to any hub (not just selected one)
    let nearestHub = null;
    let nearestDistance = Infinity;

    deliveryHubs.forEach((hub) => {
        const hubDistance = calculateDistanceHaversine(
            currentLocation[0],
            currentLocation[1],
            hub.location[0],
            hub.location[1]
        );

        if (hubDistance < nearestDistance) {
            nearestDistance = hubDistance;
            nearestHub = hub;
        }
    });

    // Check if within 1km of any hub
    if (nearestDistance <= 1) {
        proximityAlert.style.display = "block";
        alertMessage.textContent = `You are within ${nearestDistance.toFixed(2)}km of ${nearestHub.name}. Prepare for unloading.`;

        // Add notification if not already added for this hub
        const notificationExists = notifications.some(
            (n) => n.message.includes(nearestHub.name) && Date.now() - n.timestamp < 60000 // Within last minute
        );

        if (!notificationExists) {
            addNotification(`Approaching ${nearestHub.name} - within ${nearestDistance.toFixed(2)}km`, "warning");
        }
    } else {
        proximityAlert.style.display = "none";
    }

    // Simulate small movement for realism
    simulateSmallMovement();
}

// Simulate truck movement
function simulateMovement() {
    if (!isTracking) {
        alert("Please start tracking first.");
        return;
    }

    // Move truck towards selected hub
    const latDiff = selectedHub.location[0] - currentLocation[0];
    const lngDiff = selectedHub.location[1] - currentLocation[1];

    // Move 10% of the way towards the hub
    currentLocation[0] += latDiff * 0.1;
    currentLocation[1] += lngDiff * 0.1;

    // Update truck marker
    if (truckMarker) {
        truckMarker.setLatLng(currentLocation);
    }

    // Update map view
    map.setView(currentLocation);

    // Force update tracking
    updateTracking();

    // Add notification
    addNotification(`Truck manually moved towards ${selectedHub.name}`, "info");
}

// Simulate small random movement for realism
function simulateSmallMovement() {
    // Add small random movement (simulating road travel)
    const latChange = (Math.random() - 0.5) * 0.005;
    const lngChange = (Math.random() - 0.5) * 0.005;

    currentLocation[0] += latChange;
    currentLocation[1] += lngChange;

    // Update truck marker
    if (truckMarker) {
        truckMarker.setLatLng(currentLocation);
    }
}

// Stop tracking
function stopTracking() {
    isTracking = false;
    clearInterval(trackingInterval);

    trackingSection.style.display = "none";
    noTracking.style.display = "block";

    // Remove truck marker
    if (truckMarker) {
        map.removeLayer(truckMarker);
        truckMarker = null;
    }

    // Add notification
    addNotification(`Live tracking stopped for cargo to ${selectedHub.name}`, "info");
}

// Center map on route
function centerMapOnRoute() {
    if (pickupMarker && deliveryMarker) {
        const bounds = L.latLngBounds([pickupMarker.getLatLng(), deliveryMarker.getLatLng()]);
        map.fitBounds(bounds, { padding: [50, 50] });
    } else {
        map.setView([20.5937, 78.9629], 5);
    }
}

// Locate user using browser geolocation
function locateUser() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                const userLocation = [position.coords.latitude, position.coords.longitude];
                map.setView(userLocation, 13);

                // Add marker at user location
                L.marker(userLocation).addTo(map).bindPopup("Your Location").openPopup();

                addNotification("Found your location on map", "info");
            },
            function (error) {
                alert("Unable to retrieve your location. Please enable location services.");
                console.error("Geolocation error:", error);
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
}

// Update cargo details
function updateCargoDetails() {
    displayWeightElement.textContent = cargoWeight.toFixed(1);
    displayCargoTypeElement.textContent = cargoTypeSelect.options[cargoTypeSelect.selectedIndex].text;
    calculateManpowerRequirements();
}

// Notification functions
function toggleNotificationPanel() {
    notificationPanel.style.display = notificationPanel.style.display === "block" ? "none" : "block";

    if (notificationPanel.style.display === "block") {
        markAllNotificationsAsRead();
    }
}

function addNotification(message, type = "info") {
    const notification = {
        id: Date.now(),
        message,
        type,
        timestamp: Date.now(),
        read: false,
    };

    notifications.unshift(notification);
    notificationCount++;

    updateNotificationCount();
    updateNotificationList();
    saveNotifications();

    // Show desktop notification
    if (Notification.permission === "granted") {
        new Notification("Delivery Hub System", {
            body: message,
            icon: "https://cdn-icons-png.flaticon.com/512/3095/3095113.png",
        });
    }
}

function updateNotificationCount() {
    const unreadCount = notifications.filter((n) => !n.read).length;
    notificationCountElement.textContent = unreadCount;

    if (unreadCount > 0) {
        notificationCountElement.style.display = "flex";
        notificationBell.style.animation = "pulse 0.5s 3";
        setTimeout(() => {
            notificationBell.style.animation = "";
        }, 1500);
    } else {
        notificationCountElement.style.display = "none";
    }
}

function updateNotificationList() {
    if (notifications.length === 0) {
        notificationList.innerHTML = `
            <div class="notification-item">
                <div class="notification-icon">
                    <i class="fas fa-info-circle"></i>
                </div>
                <div>
                    <p>No notifications yet. Notifications will appear here for delivery hub proximity alerts.</p>
                    <div class="notification-time">Just now</div>
                </div>
            </div>
        `;
        return;
    }

    let notificationHTML = "";

    notifications.forEach((notification) => {
        const timeAgo = getTimeAgo(notification.timestamp);
        const icon = getNotificationIcon(notification.type);

        notificationHTML += `
            <div class="notification-item ${notification.read ? "" : "unread"}">
                <div class="notification-icon">
                    <i class="${icon}"></i>
                </div>
                <div>
                    <p>${notification.message}</p>
                    <div class="notification-time">${timeAgo}</div>
                </div>
            </div>
        `;
    });

    notificationList.innerHTML = notificationHTML;
}

function getNotificationIcon(type) {
    switch (type) {
        case "warning":
            return "fas fa-exclamation-triangle";
        case "success":
            return "fas fa-check-circle";
        case "danger":
            return "fas fa-exclamation-circle";
        default:
            return "fas fa-info-circle";
    }
}

function getTimeAgo(timestamp) {
    const now = Date.now();
    const diff = now - timestamp;

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
    return `${days} day${days > 1 ? "s" : ""} ago`;
}

function markAllNotificationsAsRead() {
    notifications.forEach((notification) => {
        notification.read = true;
    });

    updateNotificationCount();
    updateNotificationList();
    saveNotifications();
}

function clearAllNotifications() {
    notifications = [];
    notificationCount = 0;

    updateNotificationCount();
    updateNotificationList();
    saveNotifications();
}

function saveNotifications() {
    localStorage.setItem("deliveryHubNotifications", JSON.stringify(notifications));
}

function loadNotifications() {
    const savedNotifications = localStorage.getItem("deliveryHubNotifications");
    if (savedNotifications) {
        notifications = JSON.parse(savedNotifications);
        updateNotificationCount();
        updateNotificationList();
    }

    // Request notification permission
    if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
    }
}

// Request notification permission
window.addEventListener("load", function () {
    if ("Notification" in window && Notification.permission === "default") {
        Notification.requestPermission();
    }
});

// Login form handling: redirect Delivery Agent to provided Netlify link
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) return;

    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const roleEl = document.getElementById("loginRole");
        const role = (roleEl && roleEl.value) || "other";

        // Here you could add real authentication. For now assume sign-in succeeds.
        if (role === "delivery") {
            // Redirect Delivery Agent to the specified Netlify URL after successful sign in
            window.location.href = "https://profound-cuchufli-5d5677.netlify.app/";
        } else {
            alert("Signed in (non-Delivery Agent). No redirect performed.");
        }
    });
});