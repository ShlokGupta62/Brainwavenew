const themeToggle = document.getElementById('theme-toggle');
const languageSelect = document.getElementById('language-select');

const weightInput = document.getElementById('weight');
const pickupInput = document.getElementById('pickup-location');
const dropInput = document.getElementById('drop-location');
const goodsTypeSelect = document.getElementById('goods-type');
const goodsLengthInput = document.getElementById('goods-length');
const goodsWidthInput = document.getElementById('goods-width');
const goodsHeightInput = document.getElementById('goods-height');
const goodsQuantityInput = document.getElementById('goods-quantity');
const temperatureWrapper = document.getElementById('temperature-wrapper');
const temperatureInput = document.getElementById('goods-temperature');

const goodsDimensionsSummary = document.getElementById('goods-dimensions');
const goodsVolumeSummary = document.getElementById('goods-volume');
const goodsQuantitySummary = document.getElementById('goods-quantity-summary');
const goodsTemperatureSummary = document.getElementById('goods-temperature-summary');

const calculateBtn = document.getElementById('calculate-btn');
const confirmBtn = document.getElementById('confirm-btn');
const trackBtn = document.getElementById('track-btn');
const printBtn = document.getElementById('print-btn');

const billingModal = document.getElementById('billing-modal');
const closeModalBtn = document.getElementById('close-modal');
const cancelBookingBtn = document.getElementById('cancel-booking');
const finalConfirmBtn = document.getElementById('final-confirm');
const generatedCustomerId = document.getElementById('generated-customer-id');

const chatbotContainer = document.getElementById('chatbot-container');
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotCloseBtn = document.getElementById('chatbot-close');
const chatbotMessages = document.getElementById('chatbot-messages');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSendBtn = document.getElementById('chatbot-send');
const headerChatbotTrigger = document.getElementById('header-chatbot');

const centerMapBtn = document.getElementById('center-map');
const simulateBtn = document.getElementById('simulate-btn');
const driverContactEl = document.getElementById('driver-contact');
const qrImage = document.getElementById('qr');

const driverNameEl = document.getElementById('driver-name');
const driverPhoneEl = document.getElementById('driver-phone');
const driverLicenseEl = document.getElementById('driver-license');
const driverRatingEl = document.getElementById('driver-rating');
const driverPhotoEl = document.getElementById('driver-photo');
const trackerDriverNameEl = document.getElementById('tracker-driver-name');
const trackerDriverPhoneEl = document.getElementById('tracker-driver-phone');
const trackerDriverLicenseEl = document.getElementById('tracker-driver-license');
const trackerDriverPhotoEl = document.getElementById('tracker-driver-photo');

const distanceValueEl = document.getElementById('distance');
const baseFareEl = document.getElementById('base-fare');
const tollTaxEl = document.getElementById('toll-tax');
const gstEl = document.getElementById('gst');
const totalFareEl = document.getElementById('fare');

const truckModelEl = document.getElementById('truck-model');
const truckNumberEl = document.getElementById('truck-number');
const truckTypeEl = document.getElementById('truck-type');
const personnelEl = document.getElementById('personnel');

const currentLocationEl = document.getElementById('current-location');
const distanceCoveredEl = document.getElementById('distance-covered');
const remainingDistanceEl = document.getElementById('remaining-distance');

const DEFAULT_COORDINATES = [23.6345, 78.9629];

const cityCoordinates = {
    delhi: { lat: 28.6139, lng: 77.2090 },
    newdelhi: { lat: 28.6139, lng: 77.2090 },
    ncr: { lat: 28.4595, lng: 77.0266 },
    gurgaon: { lat: 28.4595, lng: 77.0266 },
    gurugram: { lat: 28.4595, lng: 77.0266 },
    noida: { lat: 28.5355, lng: 77.3910 },
    faridabad: { lat: 28.4089, lng: 77.3178 },
    ghaziabad: { lat: 28.6692, lng: 77.4538 },
    mumbai: { lat: 19.0760, lng: 72.8777 },
    bombay: { lat: 19.0760, lng: 72.8777 },
    navimumbai: { lat: 19.0330, lng: 73.0297 },
    pune: { lat: 18.5204, lng: 73.8567 },
    bangalore: { lat: 12.9716, lng: 77.5946 },
    bengaluru: { lat: 12.9716, lng: 77.5946 },
    hyderabad: { lat: 17.3850, lng: 78.4867 },
    chennai: { lat: 13.0827, lng: 80.2707 },
    kolkata: { lat: 22.5726, lng: 88.3639 },
    calcutta: { lat: 22.5726, lng: 88.3639 },
    jaipur: { lat: 26.9124, lng: 75.7873 },
    indore: { lat: 22.7196, lng: 75.8577 },
    bhopal: { lat: 23.2599, lng: 77.4126 },
    ahmedabad: { lat: 23.0225, lng: 72.5714 },
    surat: { lat: 21.1702, lng: 72.8311 },
    vadodara: { lat: 22.3072, lng: 73.1812 },
    nagpur: { lat: 21.1458, lng: 79.0882 },
    lucknow: { lat: 26.8467, lng: 80.9462 },
    kanpur: { lat: 26.4499, lng: 80.3319 },
    patna: { lat: 25.5941, lng: 85.1376 },
    ranchi: { lat: 23.3441, lng: 85.3096 },
    guwahati: { lat: 26.1445, lng: 91.7362 },
    kochi: { lat: 9.9312, lng: 76.2673 },
    cochin: { lat: 9.9312, lng: 76.2673 },
    trivandrum: { lat: 8.5241, lng: 76.9366 },
    visakhapatnam: { lat: 17.6868, lng: 83.2185 },
    vishakhapatnam: { lat: 17.6868, lng: 83.2185 },
    coimbatore: { lat: 11.0168, lng: 76.9558 },
    madurai: { lat: 9.9252, lng: 78.1198 },
    mysore: { lat: 12.2958, lng: 76.6394 },
    goa: { lat: 15.2993, lng: 74.1240 },
    panaji: { lat: 15.4909, lng: 73.8278 },
    chandigarh: { lat: 30.7333, lng: 76.7794 },
    ludhiana: { lat: 30.9010, lng: 75.8573 },
    amritsar: { lat: 31.6340, lng: 74.8723 },
    dehradun: { lat: 30.3165, lng: 78.0322 },
    shimla: { lat: 31.1048, lng: 77.1734 },
    jammu: { lat: 32.7266, lng: 74.8570 },
    srinagar: { lat: 34.0837, lng: 74.7973 },
    raipur: { lat: 21.2514, lng: 81.6296 },
    bhubaneswar: { lat: 20.2961, lng: 85.8245 },
    jodhpur: { lat: 26.2389, lng: 73.0243 },
    udaipur: { lat: 24.5854, lng: 73.7125 },
    agra: { lat: 27.1767, lng: 78.0081 },
    varanasi: { lat: 25.3176, lng: 82.9739 },
    meerut: { lat: 28.9845, lng: 77.7064 },
    nashik: { lat: 19.9975, lng: 73.7898 },
    nasik: { lat: 19.9975, lng: 73.7898 },
    aurangabad: { lat: 19.8762, lng: 75.3433 }
};

const driverProfiles = [
    {
        name: 'Arjun Mehta',
        phone: '+91 98765 43210',
        license: 'DL-14-2024-1145',
        rating: '4.9 ★ | 1,120 trips',
        photo: 'https://i.pravatar.cc/160?img=11',
        vehicleClass: 'lcv'
    },
    {
        name: 'Rahul Patil',
        phone: '+91 99301 55644',
        license: 'MH-33-2019-3317',
        rating: '4.8 ★ | 980 trips',
        photo: 'https://i.pravatar.cc/160?img=23',
        vehicleClass: 'lcv'
    },
    {
        name: 'Imran Khan',
        phone: '+91 98111 20458',
        license: 'KA-45-2021-5688',
        rating: '4.7 ★ | 1,540 trips',
        photo: 'https://i.pravatar.cc/160?img=38',
        vehicleClass: 'mcv'
    },
    {
        name: 'Manish Kulkarni',
        phone: '+91 97663 88990',
        license: 'TN-09-2020-7781',
        rating: '4.9 ★ | 1,310 trips',
        photo: 'https://i.pravatar.cc/160?img=44',
        vehicleClass: 'mcv'
    },
    {
        name: 'Karthik R',
        phone: '+91 96223 11440',
        license: 'GJ-18-2018-9920',
        rating: '4.8 ★ | 1,870 trips',
        photo: 'https://i.pravatar.cc/160?img=56',
        vehicleClass: 'hcv'
    },
    {
        name: 'Neeraj Chauhan',
        phone: '+91 98986 66745',
        license: 'RJ-27-2017-4412',
        rating: '4.9 ★ | 2,040 trips',
        photo: 'https://i.pravatar.cc/160?img=64',
        vehicleClass: 'hcv'
    }
];

function getDriverProfile(vehicleClass) {
    const matchingDrivers = driverProfiles.filter(profile => profile.vehicleClass === vehicleClass);
    const source = matchingDrivers.length ? matchingDrivers : driverProfiles;
    return source[Math.floor(Math.random() * source.length)];
}

function updateDriverDetails(profile) {
    if (!profile) {
        return;
    }

    driverNameEl.textContent = profile.name;
    driverPhoneEl.textContent = profile.phone;
    driverLicenseEl.textContent = profile.license;
    driverRatingEl.textContent = profile.rating;
    driverContactEl.textContent = profile.phone;

    trackerDriverNameEl.textContent = profile.name;
    trackerDriverPhoneEl.textContent = profile.phone;
    trackerDriverLicenseEl.textContent = profile.license;

    if (driverPhotoEl) {
        driverPhotoEl.src = profile.photo;
        driverPhotoEl.alt = `${profile.name} portrait`;
    }

    if (trackerDriverPhotoEl) {
        trackerDriverPhotoEl.src = profile.photo;
        trackerDriverPhotoEl.alt = `${profile.name} portrait`;
    }
}

let map = null;
let marker = null;
let routePolyline = null;
let currentRoutePoints = [];
let currentRouteDistanceKm = 0;
let simulationTimer = null;
let currentRouteProgressIndex = 0;
let lastCalculatedFare = 0;
let cachedPickup = pickupInput.value || '';
let cachedDrop = dropInput.value || '';

const currencyFormatter = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });
const distanceFormatter = new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 });
const volumeFormatter = new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
});

function formatCurrency(amount) {
    return '₹' + currencyFormatter.format(Math.round(amount));
}

function formatLocationLabel(value) {
    if (!value) {
        return '—';
    }
    return value
        .split(' ')
        .filter(Boolean)
        .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ');
}

function normalizeLocationKey(value) {
    return value.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
}

function resolveCoordinates(input) {
    if (!input) {
        return null;
    }

    const trimmed = input.trim();
    if (!trimmed) {
        return null;
    }

    const numericParts = trimmed.split(/[,\s]+/).filter(Boolean);
    if (numericParts.length === 2) {
        const lat = parseFloat(numericParts[0]);
        const lng = parseFloat(numericParts[1]);
        if (Number.isFinite(lat) && Number.isFinite(lng)) {
            return { lat, lng, label: formatLocationLabel(trimmed) };
        }
    }

    const key = normalizeLocationKey(trimmed);
    if (cityCoordinates[key]) {
        const city = cityCoordinates[key];
        return { lat: city.lat, lng: city.lng, label: formatLocationLabel(trimmed) };
    }

    if (trimmed.includes(',')) {
        const primary = trimmed.split(',')[0];
        const primaryKey = normalizeLocationKey(primary);
        if (cityCoordinates[primaryKey]) {
            const city = cityCoordinates[primaryKey];
            return { lat: city.lat, lng: city.lng, label: formatLocationLabel(trimmed) };
        }
    }

    return null;
}

function haversineDistanceKm(start, end) {
    const toRad = value => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(end.lat - start.lat);
    const dLng = toRad(end.lng - start.lng);
    const lat1 = toRad(start.lat);
    const lat2 = toRad(end.lat);

    const a = Math.sin(dLat / 2) ** 2 +
        Math.sin(dLng / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function generateRoutePoints(start, end, segments = 80) {
    const points = [];
    for (let i = 0; i <= segments; i += 1) {
        const ratio = i / segments;
        const lat = start.lat + (end.lat - start.lat) * ratio;
        const lng = start.lng + (end.lng - start.lng) * ratio;
        points.push([lat, lng]);
    }
    return points;
}

function stopSimulation(resetProgress = true) {
    if (simulationTimer) {
        clearInterval(simulationTimer);
        simulationTimer = null;
    }
    if (resetProgress) {
        currentRouteProgressIndex = 0;
    }
    if (simulateBtn) {
        simulateBtn.innerHTML = '<i class="fas fa-road"></i> Start Journey';
    }
}

function setupRoute(startLocation, endLocation, distanceKm) {
    if (!map || !marker) {
        return;
    }

    stopSimulation(true);
    currentRoutePoints = generateRoutePoints(startLocation, endLocation, 80);

    const measuredDistance = Number.isFinite(distanceKm)
        ? distanceKm
        : haversineDistanceKm(startLocation, endLocation);

    currentRouteDistanceKm = Math.max(Math.round(measuredDistance), 5);
    cachedPickup = startLocation.label;
    cachedDrop = endLocation.label;

    if (routePolyline) {
        routePolyline.setLatLngs(currentRoutePoints);
    } else {
        routePolyline = L.polyline(currentRoutePoints, {
            color: '#20d24a',
            weight: 4,
            opacity: 0.85
        }).addTo(map);
    }

    marker.setLatLng([startLocation.lat, startLocation.lng]);
    marker.bindPopup(`Pickup: ${formatLocationLabel(startLocation.label)}`).openPopup();

    map.fitBounds(routePolyline.getBounds(), { padding: [50, 50] });
    updateTrackingInfo(0);
}

function updateGoodsSummary(details) {
    const { length, width, height, volume, quantity, temperatureText } = details;
    goodsDimensionsSummary.textContent = `${length.toFixed(1)} m × ${width.toFixed(1)} m × ${height.toFixed(1)} m`;
    goodsVolumeSummary.textContent = `${volumeFormatter.format(volume)} m³`;
    goodsQuantitySummary.textContent = `${quantity} units`;
    goodsTemperatureSummary.textContent = temperatureText;
}

function updateTrackingInfo(progress) {
    const clamped = Math.min(Math.max(progress, 0), 1);
    const covered = Math.round(currentRouteDistanceKm * clamped);
    const remaining = Math.max(currentRouteDistanceKm - covered, 0);

    distanceCoveredEl.textContent = `${distanceFormatter.format(covered)} km`;
    remainingDistanceEl.textContent = `${distanceFormatter.format(remaining)} km`;

    let locationLabel = 'Awaiting pickup';
    if (!currentRoutePoints.length) {
        locationLabel = 'Route not set';
    } else if (clamped <= 0.01) {
        locationLabel = `Origin: ${formatLocationLabel(cachedPickup)}`;
    } else if (clamped >= 0.99) {
        locationLabel = `Destination: ${formatLocationLabel(cachedDrop)}`;
    } else {
        locationLabel = `En route to ${formatLocationLabel(cachedDrop)}`;
    }
    currentLocationEl.textContent = locationLabel;

    const steps = document.querySelectorAll('.status-step');
    const totalSteps = steps.length - 1;
    steps.forEach((step, index) => {
        if (index === 0) {
            step.classList.add('active');
        }
        if (totalSteps <= 0) {
            return;
        }
        const threshold = index / totalSteps;
        if (clamped >= threshold) {
            step.classList.add('active');
            if (index < totalSteps && clamped > threshold) {
                step.classList.add('completed');
            } else {
                step.classList.remove('completed');
            }
        } else {
            if (index !== 0) {
                step.classList.remove('active');
            }
            step.classList.remove('completed');
        }
    });
}

function handleGoodsTypeChange() {
    const isPerishable = goodsTypeSelect.value === 'perishable';
    temperatureWrapper.classList.toggle('visible', isPerishable);
    if (!isPerishable) {
        temperatureInput.value = '';
        goodsTemperatureSummary.textContent = 'Not required';
    } else if (temperatureInput.value) {
        goodsTemperatureSummary.textContent = `${parseFloat(temperatureInput.value).toFixed(1)} °C`;
    } else {
        goodsTemperatureSummary.textContent = 'Pending';
    }
}

function calculateFare() {
    const weight = parseFloat(weightInput.value);
    const length = parseFloat(goodsLengthInput.value);
    const width = parseFloat(goodsWidthInput.value);
    const height = parseFloat(goodsHeightInput.value);
    const quantity = parseInt(goodsQuantityInput.value, 10);
    const goodsType = goodsTypeSelect.value;
    const pickup = pickupInput.value.trim();
    const drop = dropInput.value.trim();
    const isPerishable = goodsType === 'perishable';
    const temperatureValue = isPerishable ? parseFloat(temperatureInput.value) : null;

    if (!weight || weight <= 0) {
        showToast('Enter a valid consignment weight.');
        return;
    }
    if (!length || !width || !height || length <= 0 || width <= 0 || height <= 0) {
        showToast('Enter valid dimensions for your goods.');
        return;
    }
    if (!quantity || quantity <= 0) {
        showToast('Enter the quantity of goods to be shipped.');
        return;
    }
    if (!pickup || !drop) {
        showToast('Enter both pickup and drop locations.');
        return;
    }
    if (isPerishable && (!Number.isFinite(temperatureValue) || temperatureValue < -40 || temperatureValue > 30)) {
        showToast('Enter storage temperature between -40°C and 30°C for perishable goods.');
        return;
    }

    const pickupLocation = resolveCoordinates(pickup);
    const dropLocation = resolveCoordinates(drop);

    if (!pickupLocation) {
        showToast('Unable to locate pickup city. Try a major city name or coordinates.');
        return;
    }
    if (!dropLocation) {
        showToast('Unable to locate drop city. Try a major city name or coordinates.');
        return;
    }

    if (normalizeLocationKey(pickup) === normalizeLocationKey(drop)) {
        showToast('Pickup and drop locations must be different.');
        return;
    }

    const distanceKmRaw = haversineDistanceKm(pickupLocation, dropLocation);
    setupRoute(pickupLocation, dropLocation, distanceKmRaw);
    const distanceKm = currentRouteDistanceKm;

    const volume = length * width * height;
    const goodsMultiplier = 1 + (goodsType === 'fragile' ? 0.18 : 0) + (isPerishable ? 0.22 : 0);
    const volumeSurcharge = volume > 15 ? 0.15 : volume > 10 ? 0.1 : volume > 6 ? 0.05 : 0;
    const quantitySurcharge = quantity > 80 ? 0.18 : quantity > 40 ? 0.12 : quantity > 20 ? 0.06 : 0;

    let truckType;
    let personnel;
    let truckModel;
    let truckNumber;
    let baseRate;
    let vehicleClass;

    if (weight <= 3.5) {
        truckType = 'LCV (Light Commercial Vehicle)';
        personnel = '2 People';
        truckModel = 'Tata Ace';
        truckNumber = 'DL 01 AB 1234';
        baseRate = 28;
        vehicleClass = 'lcv';
    } else if (weight <= 7.5) {
        truckType = 'MCV (Medium Commercial Vehicle)';
        personnel = '4 People';
        truckModel = 'Ashok Leyland';
        truckNumber = 'MH 02 CD 5678';
        baseRate = 42;
        vehicleClass = 'mcv';
    } else {
        truckType = 'HCV (Heavy Commercial Vehicle)';
        personnel = '6 People';
        truckModel = 'BharatBenz';
        truckNumber = 'TN 04 EF 9101';
        baseRate = 58;
        vehicleClass = 'hcv';
    }

    const ratePerKm = baseRate * goodsMultiplier * (1 + volumeSurcharge + quantitySurcharge / 2);
    const baseFare = distanceKm * ratePerKm;
    const tollTax = distanceKm * 2.3;
    const handlingFee = 1200 * goodsMultiplier + (isPerishable ? 650 : 0) + (goodsType === 'fragile' ? 450 : 0);
    const accessorialFee = volume * 35 + quantity * 18;
    const subtotal = baseFare + tollTax + handlingFee + accessorialFee;
    const gst = subtotal * 0.18;
    const totalFare = subtotal + gst;

    lastCalculatedFare = Math.round(totalFare);

    truckModelEl.textContent = truckModel;
    truckNumberEl.textContent = truckNumber;
    truckTypeEl.textContent = truckType;
    personnelEl.textContent = personnel;

    distanceValueEl.textContent = `${distanceFormatter.format(distanceKm)} km`;
    baseFareEl.textContent = formatCurrency(baseFare);
    tollTaxEl.textContent = formatCurrency(tollTax);
    gstEl.textContent = formatCurrency(gst);
    totalFareEl.textContent = formatCurrency(totalFare);

    const temperatureText = isPerishable ? `${temperatureValue.toFixed(1)} °C` : 'Not required';
    updateGoodsSummary({
        length,
        width,
        height,
        volume,
        quantity,
        temperatureText
    });

    const assignedDriver = getDriverProfile(vehicleClass);
    updateDriverDetails(assignedDriver);

    const upiParams = `upi://pay?pa=logihub.support@okaxis&pn=LogiHub%20Services&am=${lastCalculatedFare}&cu=INR&tn=Payment%20for%20LogiHub%20Consignment`;
    qrImage.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(upiParams)}`;

    updateTrackingInfo(0);
    showToast('Truck allocated successfully');
}

function initTheme() {
    const savedTheme = localStorage.getItem('logihub-theme') || 'dark';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeToggle.checked = true;
    } else {
        document.body.classList.remove('dark-theme');
        themeToggle.checked = false;
    }

    themeToggle.addEventListener('change', () => {
        if (themeToggle.checked) {
            document.body.classList.add('dark-theme');
            localStorage.setItem('logihub-theme', 'dark');
            showToast('Dark theme activated');
        } else {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('logihub-theme', 'light');
            showToast('Light theme activated');
        }
    });
}

function initMap() {
    map = L.map('map', { zoomControl: true }).setView(DEFAULT_COORDINATES, 5);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const truckIcon = L.divIcon({
        html: '<div class="truck-icon"><i class="fas fa-truck"></i></div>',
        className: 'custom-truck-icon',
        iconSize: [40, 40]
    });

    marker = L.marker(DEFAULT_COORDINATES, { icon: truckIcon }).addTo(map);
    marker.bindPopup('Waiting for assignment').openPopup();
}

function initPaymentButtons() {
    const paymentButtons = document.querySelectorAll('.pay-btn');
    const paymentBoxes = document.querySelectorAll('.payment-box');

    paymentButtons.forEach(button => {
        button.addEventListener('click', () => {
            paymentButtons.forEach(btn => btn.classList.remove('active'));
            paymentBoxes.forEach(box => box.classList.remove('active'));

            button.classList.add('active');
            const method = button.dataset.method;
            const targetBox = document.getElementById(method);
            if (targetBox) {
                targetBox.classList.add('active');
            }

            showToast(`${method.toUpperCase()} payment selected`);
        });
    });
}

function showModal() {
    const customerId = `LOGHUB-${Date.now().toString().slice(-6)}-${Math.random().toString(36).slice(-4).toUpperCase()}`;
    generatedCustomerId.textContent = customerId;
    billingModal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeModalFunc() {
    billingModal.classList.remove('show');
    document.body.style.overflow = 'auto';
}

function initChatbot() {
    chatbotToggle.addEventListener('click', () => {
        chatbotContainer.classList.toggle('show');
        const badge = chatbotToggle.querySelector('.notification-badge');
        if (badge) {
            badge.style.display = 'none';
        }
    });

    if (headerChatbotTrigger) {
        headerChatbotTrigger.addEventListener('click', () => {
            chatbotContainer.classList.add('show');
            const badge = chatbotToggle.querySelector('.notification-badge');
            if (badge) {
                badge.style.display = 'none';
            }
        });
    }

    chatbotCloseBtn.addEventListener('click', () => {
        chatbotContainer.classList.remove('show');
    });

    chatbotSendBtn.addEventListener('click', sendChatMessage);
    chatbotInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            sendChatMessage();
        }
    });

    document.querySelectorAll('.quick-option').forEach(option => {
        option.addEventListener('click', () => {
            chatbotInput.value = option.dataset.question;
            sendChatMessage();
        });
    });
}

function sendChatMessage() {
    const message = chatbotInput.value.trim();
    if (!message) {
        return;
    }

    addChatMessage(message, 'user');
    chatbotInput.value = '';

    setTimeout(() => {
        const response = getBotResponse(message.toLowerCase());
        addChatMessage(response, 'bot');
    }, 600);
}

function addChatMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${sender}`;
    messageDiv.textContent = text;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function getBotResponse(message) {
    if (message.includes('track')) {
        return 'Use the live tracking section to follow your shipment. Start or pause the simulated journey anytime.';
    }
    if (message.includes('payment')) {
        return 'We support UPI, Cards, Net Banking, and Wallet payments. Select a method in the booking modal to proceed.';
    }
    if (message.includes('temperature')) {
        return 'Select "Perishable Goods" to reveal the temperature field, then enter the required storage temperature.';
    }
    if (message.includes('schedule') || message.includes('time')) {
        return 'Pick a schedule from the booking form. Choose immediate, today, or a custom date and time.';
    }
    if (message.includes('contact')) {
        return 'You can reach support at support@logihub.com or call +91-1800-123-456 (24/7).';
    }
    if (message.includes('cost') || message.includes('fare')) {
        return 'Fare is calculated from distance, vehicle class, handling, and taxes. Update shipment details and tap Calculate.';
    }
    if (message.includes('hello') || message.includes('hi')) {
        return 'Hello! I can assist with pricing, scheduling, tracking, and payment questions.';
    }
    return 'I can help with tracking, pricing, scheduling, and payments. What would you like to do next?';
}

function simulateJourney() {
    if (!currentRoutePoints.length) {
        showToast('Calculate a route before starting the live tracking simulation.');
        return;
    }

    if (simulationTimer) {
        stopSimulation(false);
        showToast('Journey simulation paused');
        return;
    }

    simulateBtn.innerHTML = '<i class="fas fa-pause"></i> Pause Journey';

    simulationTimer = setInterval(() => {
        currentRouteProgressIndex = Math.min(
            currentRouteProgressIndex + 1,
            currentRoutePoints.length - 1
        );

        const [lat, lng] = currentRoutePoints[currentRouteProgressIndex];
        marker.setLatLng([lat, lng]);

        if (currentRouteProgressIndex % 4 === 0) {
            map.panTo([lat, lng], { animate: true, duration: 1.0 });
        }

        const progress = currentRoutePoints.length <= 1
            ? 1
            : currentRouteProgressIndex / (currentRoutePoints.length - 1);
        updateTrackingInfo(progress);

        if (progress >= 1) {
            stopSimulation(false);
            currentRouteProgressIndex = currentRoutePoints.length - 1;
            updateTrackingInfo(1);
            showToast('Shipment simulation completed');
            setTimeout(() => {
                currentRouteProgressIndex = 0;
                updateTrackingInfo(0);
            }, 4000);
        }
    }, 1500);
}

function centerMap() {
    if (routePolyline) {
        map.fitBounds(routePolyline.getBounds(), { padding: [50, 50] });
    } else if (marker) {
        map.setView(marker.getLatLng(), 6);
    }
    showToast('Map centered on current route');
}

function printDetails() {
    if (!lastCalculatedFare) {
        showToast('Nothing to print. Please calculate fare first.');
        return;
    }

    const length = parseFloat(goodsLengthInput.value) || 0;
    const width = parseFloat(goodsWidthInput.value) || 0;
    const height = parseFloat(goodsHeightInput.value) || 0;
    const quantity = parseInt(goodsQuantityInput.value, 10) || 0;
    const volume = length * width * height;
    const goodsTypeLabel = goodsTypeSelect.options[goodsTypeSelect.selectedIndex].text;
    const temperatureText = goodsTypeSelect.value === 'perishable'
        ? `${temperatureInput.value || 'N/A'} °C`
        : 'Not required';

    const printContent = `
        <html>
        <head>
            <title>LogiHub Booking Details</title>
            <style>
                body { font-family: 'Poppins', Arial, sans-serif; padding: 24px; color: #0b0f0d; }
                h1 { color: #0b2e1a; margin-bottom: 16px; }
                .detail { margin-bottom: 10px; }
                .label { font-weight: 600; }
                .total { font-size: 1.2em; font-weight: 700; margin-top: 20px; color: #20d24a; }
            </style>
        </head>
        <body>
            <h1>Booking Summary</h1>
            <div class="detail"><span class="label">Customer ID:</span> ${generatedCustomerId.textContent}</div>
            <div class="detail"><span class="label">Weight:</span> ${weightInput.value} tons</div>
            <div class="detail"><span class="label">Pickup:</span> ${formatLocationLabel(pickupInput.value)}</div>
            <div class="detail"><span class="label">Drop:</span> ${formatLocationLabel(dropInput.value)}</div>
            <div class="detail"><span class="label">Goods Type:</span> ${goodsTypeLabel}</div>
            <div class="detail"><span class="label">Dimensions:</span> ${length.toFixed(1)} m × ${width.toFixed(1)} m × ${height.toFixed(1)} m</div>
            <div class="detail"><span class="label">Volume:</span> ${volumeFormatter.format(volume)} m³</div>
            <div class="detail"><span class="label">Quantity:</span> ${quantity} units</div>
            <div class="detail"><span class="label">Temperature:</span> ${temperatureText}</div>
            <div class="detail"><span class="label">Truck Model:</span> ${truckModelEl.textContent}</div>
            <div class="detail"><span class="label">Truck Number:</span> ${truckNumberEl.textContent}</div>
            <div class="detail"><span class="label">Distance:</span> ${distanceValueEl.textContent}</div>
            <div class="detail"><span class="label">Base Fare:</span> ${baseFareEl.textContent}</div>
            <div class="detail"><span class="label">Toll Tax:</span> ${tollTaxEl.textContent}</div>
            <div class="detail"><span class="label">GST:</span> ${gstEl.textContent}</div>
            <div class="detail total">Grand Total: ${totalFareEl.textContent}</div>
        </body>
        </html>
    `;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
        showToast('Allow pop-ups to print booking details.');
        return;
    }
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.print();
}

function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    if (!toast || !toastMessage) {
        return;
    }
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function initScheduleButtons() {
    const scheduleBtns = document.querySelectorAll('.schedule-btn');
    const datetimeInput = document.querySelector('.datetime-input');

    scheduleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            scheduleBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (btn.dataset.schedule === 'custom') {
                datetimeInput.style.display = 'block';
            } else {
                datetimeInput.style.display = 'none';
            }
        });
    });
}

function initClearButtons() {
    const clearPickup = document.getElementById('clear-pickup');
    const clearDrop = document.getElementById('clear-drop');

    clearPickup.addEventListener('click', () => {
        pickupInput.value = '';
        showToast('Pickup location cleared');
    });

    clearDrop.addEventListener('click', () => {
        dropInput.value = '';
        showToast('Drop location cleared');
    });
}

function processBooking() {
    if (!lastCalculatedFare) {
        showToast('Calculate your fare before confirming the booking.');
        return;
    }

    const name = document.getElementById('bill-name').value.trim();
    const email = document.getElementById('bill-email').value.trim();
    const phone = document.getElementById('bill-phone').value.trim();
    const address = document.getElementById('bill-address').value.trim();
    const description = document.getElementById('product-description').value.trim();

    if (!name || !email || !phone || !address) {
        showToast('Fill in all billing details to proceed.');
        return;
    }

    closeModalFunc();

    document.getElementById('bill-name').value = '';
    document.getElementById('bill-email').value = '';
    document.getElementById('bill-phone').value = '';
    document.getElementById('bill-address').value = '';
    document.getElementById('product-description').value = '';

    addChatMessage(
        `Booking ${generatedCustomerId.textContent} confirmed! Our team will reach ${formatLocationLabel(cachedPickup)} shortly.`,
        'bot'
    );

    showToast('Booking confirmed successfully!');
}

function initApp() {
    initTheme();
    initMap();
    initPaymentButtons();
    initChatbot();
    initScheduleButtons();
    initClearButtons();

    goodsTypeSelect.addEventListener('change', handleGoodsTypeChange);
    handleGoodsTypeChange();

    calculateBtn.addEventListener('click', calculateFare);
    confirmBtn.addEventListener('click', () => {
        if (!lastCalculatedFare) {
            showToast('Calculate your allocation before booking.');
            return;
        }
        showModal();
    });
    trackBtn.addEventListener('click', () => {
        document.querySelector('.tracking-section').scrollIntoView({ behavior: 'smooth' });
        showToast('Live tracking section opened');
    });
    printBtn.addEventListener('click', printDetails);

    closeModalBtn.addEventListener('click', closeModalFunc);
    cancelBookingBtn.addEventListener('click', closeModalFunc);
    finalConfirmBtn.addEventListener('click', processBooking);

    centerMapBtn.addEventListener('click', centerMap);
    simulateBtn.addEventListener('click', simulateJourney);

    billingModal.addEventListener('click', event => {
        if (event.target === billingModal) {
            closeModalFunc();
        }
    });

    calculateFare();

    setTimeout(() => {
        showToast('Welcome to LogiHub! Provide your shipment details.');
    }, 900);
}

window.addEventListener('DOMContentLoaded', initApp);
