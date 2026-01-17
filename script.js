// Import translations
let translations = {};

// Minimal runtime diagnostics (only visible if there is a JS error).
(function () {
    function showDiag(text) {
        try {
            if (!document || !document.body) return;
            let el = document.getElementById('logihubRuntimeError');
            if (!el) {
                el = document.createElement('div');
                el.id = 'logihubRuntimeError';
                el.style.cssText = 'position:fixed;left:12px;bottom:12px;z-index:999999;max-width:calc(100vw - 24px);padding:10px 12px;border-radius:12px;background:rgba(180,0,0,0.92);color:#fff;font:12px/1.4 system-ui,-apple-system,Segoe UI,Roboto,Arial;box-shadow:0 16px 40px rgba(0,0,0,0.45);';
                el.title = 'A JavaScript error is preventing the UI from working.';
                document.body.appendChild(el);
            }
            el.textContent = text;
        } catch (_) {
            // ignore
        }
    }

    window.addEventListener('error', function (e) {
        const msg = (e && e.message) ? String(e.message) : 'Unknown script error';
        showDiag('LogiHub UI error: ' + msg);
    });

    window.addEventListener('unhandledrejection', function (e) {
        const reason = e && e.reason;
        const msg = reason && reason.message ? reason.message : String(reason || 'Unknown promise rejection');
        showDiag('LogiHub UI error: ' + msg);
    });
})();

// Prefer server-side auth (MongoDB + JWT) when available.
const API_TOKEN_KEY = 'logihub_jwt';
// NOTE: auth.js already defines CURRENT_USER_KEY/SESSION_KEY as global consts.
// Using the same names here breaks the entire page with "Identifier has already been declared".
const UI_CURRENT_USER_KEY = 'logihub_current_user';
const UI_SESSION_KEY = 'logihub_session';

function tr(key, fallback) {
    const langPack = (translations && translations[currentLanguage]) ? translations[currentLanguage] : null;
    const enPack = (translations && translations.en) ? translations.en : null;
    const value = (langPack && langPack[key]) || (enPack && enPack[key]);
    return value || fallback || '';
}

function addListenerById(id, eventName, handler, options) {
    const el = document.getElementById(id);
    if (!el) return null;
    el.addEventListener(eventName, handler, options);
    return el;
}

function setAiText(id, text) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = String(text || '').trim();
}

function getAuthToken() {
    return localStorage.getItem(API_TOKEN_KEY);
}

function setAuthToken(token) {
    if (token) localStorage.setItem(API_TOKEN_KEY, token);
}

function clearAuthToken() {
    localStorage.removeItem(API_TOKEN_KEY);
}

function persistSessionForUi(user, roleOverride) {
    if (!user) return;

    const role = roleOverride || user.role;
    const session = {
        userId: user.id || null,
        email: user.email,
        role,
        name: user.name,
        phone: user.phone,
        loginTime: new Date().toISOString()
    };

    try {
        localStorage.setItem(UI_CURRENT_USER_KEY, JSON.stringify({ ...user, role }));
        localStorage.setItem(UI_SESSION_KEY, JSON.stringify(session));
        localStorage.setItem('userRole', role);
        if (role) localStorage.setItem(`${role}LoggedIn`, 'true');
    } catch (e) {
        console.warn('Unable to persist session:', e);
    }
}

async function apiJson(path, { method = 'GET', body, auth = true } = {}) {
    const headers = { 'Content-Type': 'application/json' };
    if (auth) {
        const token = getAuthToken();
        if (token) headers.Authorization = `Bearer ${token}`;
    }

    const res = await fetch(path, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
        const message = (data && data.error) || `Request failed (${res.status})`;
        const err = new Error(message);
        err.status = res.status;
        err.data = data;
        throw err;
    }
    return data;
}

function safeRoleRedirectUrl(role) {
    if (typeof auth !== 'undefined' && auth && typeof auth.getRoleRedirectUrl === 'function') return auth.getRoleRedirectUrl(role);
    const redirectUrls = {
        customer: 'JoyBangla/index.html',
        driver: 'driver_interface.html',
        agent: 'ShlokAgent/index.html',
        manager: 'JuhiManager/index.html',
        admin: 'admin.html'
    };
    return redirectUrls[role] || 'index.html';
}

function bindThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle || themeToggle.dataset.bound === 'true') return;

    const savedTheme = localStorage.getItem('logihub-theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    themeToggle.checked = savedTheme === 'light';
    themeToggle.dataset.bound = 'true';

    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('logihub-theme', newTheme);
    });
}

function bindAuthButtonsToggle() {
    const authButtonsToggle = document.getElementById('authButtonsToggle');
    const headerAuthButtons = document.getElementById('headerAuthButtons');
    if (!authButtonsToggle || !headerAuthButtons || authButtonsToggle.dataset.bound === 'true') return;

    const savedVisibility = localStorage.getItem('logihub-auth-buttons-visible');
    const isVisible = savedVisibility !== 'false';

    authButtonsToggle.checked = isVisible;
    headerAuthButtons.classList.toggle('is-hidden', !isVisible);
    authButtonsToggle.dataset.bound = 'true';

    authButtonsToggle.addEventListener('change', () => {
        const visible = authButtonsToggle.checked;
        headerAuthButtons.classList.toggle('is-hidden', !visible);
        localStorage.setItem('logihub-auth-buttons-visible', String(visible));
    });
}

document.addEventListener('DOMContentLoaded', bindThemeToggle);

function loadTranslations() {
    // Use fetch when available; fall back to XHR for older webviews.
    if (typeof fetch === 'function') {
        return fetch('language.json').then(function (response) { return response.json(); });
    }

    return new Promise(function (resolve, reject) {
        try {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'language.json', true);
            xhr.onreadystatechange = function () {
                if (xhr.readyState !== 4) return;
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        resolve(JSON.parse(xhr.responseText));
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(new Error('Failed to load language.json'));
                }
            };
            xhr.onerror = function () { reject(new Error('Failed to load language.json')); };
            xhr.send(null);
        } catch (e) {
            reject(e);
        }
    });
}

loadTranslations()
    .then(function (data) {
        translations = data;
        initializeApp();
    })
    .catch(function (error) {
        console.error('Error loading translations:', error);
        // Fallback to basic English
        translations = { en: getFallbackTranslations() };
        initializeApp();
    });

// Database simulation
const database = {
    users: [
        {
            id: 1,
            email: 'customer@example.com',
            password: 'password123',
            role: 'customer',
            name: 'John Customer',
            phone: '+91 9876543210'
        },
        {
            id: 2,
            email: 'driver@example.com',
            password: 'password123',
            role: 'driver',
            name: 'Raj Driver',
            phone: '+91 9876543211',
            license: 'DL1234567890',
            truckAssigned: 'AB 01C 1234'
        },
        {
            id: 3,
            email: 'agent@example.com',
            password: 'password123',
            role: 'agent',
            name: 'Priya Agent',
            phone: '+91 9876543212',
            employeeId: 'AGT001'
        },
        {
            id: 4,
            email: 'manager@example.com',
            password: 'password123',
            role: 'manager',
            name: 'Amit Manager',
            phone: '+91 9876543213',
            employeeId: 'MGR001'
        }
    ],
    shipments: [],
    trucks: {
        LCV: [
            { name: "Tata Ace (Chhota Hathi)", number: "AB 01C 1234" },
            { name: "Mahindra Jeeto/Supro", number: "KA 04 MA 3402" },
            { name: "Maruti Suzuki Super Carry", number: "GJ 06 PC 8080" }
        ],
        MCV: [
            { name: "Tata LPT 1618", number: "WB 03 MF 4477" },
            { name: "Ashok Leyland Ecomet", number: "MH 40B P4321" },
            { name: "Mahindra Furio 17", number: "MG 11 AQ 1111" }
        ],
        HCV: [
            { name: "Tata Signa 5530.S", number: "HR 26 DQ 5551" },
            { name: "Ashok Leyland AVTR 2820-6x4", number: "DL 2C K8169" },
            { name: "BharatBenz 3528C", number: "TN 76 AZ 1197" }
        ]
    },
    pricing: {
        LCV: { baseRate: 1500, perKm: 25, people: 2 },
        MCV: { baseRate: 3500, perKm: 45, people: 4 },
        HCV: { baseRate: 7000, perKm: 70, people: 8 }
    }
};

let currentUser = null;
let currentLanguage = 'en';

// DOM Elements
const authModal = document.getElementById('authModal');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const notification = document.getElementById('notification');
const languageSelect = document.getElementById('languageSelect');

// Change language function
function changeLanguage() {
    currentLanguage = languageSelect.value;
    
    // Update all text elements
    if (translations[currentLanguage]) {
        Object.keys(translations[currentLanguage]).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                element.textContent = translations[currentLanguage][key];
                
                // Update placeholders for input fields
                if (key.includes('Placeholder')) {
                    const inputId = key.replace('Placeholder', '');
                    const inputElement = document.getElementById(inputId);
                    if (inputElement) {
                        inputElement.placeholder = translations[currentLanguage][key];
                    }
                }
            }
        });
    }
}

// Modal Functions
function openModal(type) {
    authModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    if (type === 'login') {
        switchAuthTab('login');
    } else {
        switchAuthTab('signup');
    }
}

function closeModal() {
    authModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function switchAuthTab(tab) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
    
    document.querySelector(`.tab:nth-child(${tab === 'login' ? '1' : '2'})`).classList.add('active');
    document.getElementById(`${tab}Form`).classList.add('active');
    
    document.getElementById('modalTitle').textContent = tr('modalTitle', 'Welcome to LogiHub');
}

function selectRole(element, role, type = 'login') {
    const parent = element.parentElement;
    parent.querySelectorAll('.role-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    
    element.classList.add('selected');
    
    if (type === 'login') {
        document.getElementById('loginRole').value = role;
    } else {
        document.getElementById('signupRole').value = role;
    }
}

// Show Notification
function showNotification(message, type = 'success') {
    if (!notification) return;
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    
    setTimeout(() => {
        if (notification) notification.style.display = 'none';
    }, 3000);
}

// Initialize application
function initializeApp() {
    // If this file is included on a page missing the expected DOM, don't break the whole page.
    if (!languageSelect || !loginForm || !signupForm || !authModal) {
        bindThemeToggle();
        bindAuthButtonsToggle();
        return;
    }

    // Event Listeners
    languageSelect.addEventListener('change', changeLanguage);
    bindThemeToggle();
    bindAuthButtonsToggle();
    addListenerById('loginBtn', 'click', () => openModal('login'));
    addListenerById('signupBtn', 'click', () => openModal('signup'));
    addListenerById('getStartedBtn', 'click', () => openModal('signup'));
    const watchDemoBtn = document.getElementById('watchDemoBtn');
    if (watchDemoBtn) {
        watchDemoBtn.addEventListener('click', scrollToFeatures);
    }
    const closeModalBtn = document.querySelector('.close-modal');
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    addListenerById('loginTab', 'click', () => switchAuthTab('login'));
    addListenerById('signupTab', 'click', () => switchAuthTab('signup'));
    addListenerById('logoutBtnCustomer', 'click', logout);
    addListenerById('logoutBtnDriver', 'click', logout);
    addListenerById('logoutBtnAgent', 'click', logout);
    addListenerById('logoutBtnManager', 'click', logout);
    addListenerById('calculateFareBtn', 'click', calculateFare);
    addListenerById('confirmBookingBtn', 'click', confirmBooking);
    addListenerById('aiRecommendBtn', 'click', getShipmentRecommendation);
    addListenerById('aiRouteBtn', 'click', getRouteDelayInsights);
    addListenerById('aiEtaBtn', 'click', explainEtaDelays);

    // Role selection handlers
    document.querySelectorAll('.role-option[data-role="customer"]').forEach(el => {
        el.addEventListener('click', (e) => {
            const formType = e.currentTarget.closest('#signupForm') ? 'signup' : 'login';
            selectRole(e.currentTarget, 'customer', formType);
        });
    });
    
    document.querySelectorAll('.role-option[data-role="driver"]').forEach(el => {
        el.addEventListener('click', (e) => {
            const formType = e.currentTarget.closest('#signupForm') ? 'signup' : 'login';
            selectRole(e.currentTarget, 'driver', formType);
        });
    });
    
    document.querySelectorAll('.role-option[data-role="agent"]').forEach(el => {
        el.addEventListener('click', (e) => {
            const formType = e.currentTarget.closest('#signupForm') ? 'signup' : 'login';
            selectRole(e.currentTarget, 'agent', formType);
        });
    });
    
    document.querySelectorAll('.role-option[data-role="manager"]').forEach(el => {
        el.addEventListener('click', (e) => {
            const formType = e.currentTarget.closest('#signupForm') ? 'signup' : 'login';
            selectRole(e.currentTarget, 'manager', formType);
        });
    });
    
    document.querySelectorAll('.role-option[data-role="admin"]').forEach(el => {
        el.addEventListener('click', (e) => {
            const formType = e.currentTarget.closest('#signupForm') ? 'signup' : 'login';
            selectRole(e.currentTarget, 'admin', formType);
        });
    });

    // Form Submission - Login (prefer /api, fallback to local demo auth)
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const role = document.getElementById('loginRole').value;
        
        // Try MongoDB/JWT auth first
        let result = null;
        try {
            const api = await apiJson('/api/auth/login', {
                method: 'POST',
                auth: false,
                body: { email, password, role }
            });

            if (api && api.ok && api.token && api.user) {
                setAuthToken(api.token);
                persistSessionForUi(api.user, role);
                result = { success: true, user: api.user };
            }
        } catch (err) {
            result = null;
        }

        // Fallback to centralized local auth system (offline/demo)
        if (!result || !result.success) {
            let localResult = auth.login(email, password, role);

            // Legacy fallback: migrate old demo users into centralized auth
            if (!localResult.success) {
                const legacyUser = database.users.find(u =>
                    u.email.toLowerCase() === email.toLowerCase() &&
                    u.password === password &&
                    u.role === role
                );

                if (legacyUser) {
                    const signupResult = auth.signup({
                        name: legacyUser.name,
                        email: legacyUser.email,
                        phone: legacyUser.phone || '',
                        password: legacyUser.password,
                        role: legacyUser.role
                    });

                    if (signupResult.success) {
                        localResult = signupResult;
                    }
                }
            }

            result = localResult;
        }
        
        if (result.success) {
            currentUser = result.user;
            showNotification(`${tr('notificationWelcome', 'Welcome back, ')}${result.user.name}!`, 'success');
            closeModal();
            
            // Redirect based on role
            setTimeout(() => {
                window.location.href = safeRoleRedirectUrl(role);
            }, 500);
        } else {
            showNotification(result.error || tr('notificationInvalidCred', 'Invalid credentials. Please try again.'), 'error');
        }
    });

    // Form Submission - Signup (prefer /api, fallback to local demo auth)
    signupForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('signupName').value;
        const email = document.getElementById('signupEmail').value;
        const phone = document.getElementById('signupPhone').value;
        const password = document.getElementById('signupPassword').value;
        const role = document.getElementById('signupRole').value;
        
        let result = null;
        try {
            const api = await apiJson('/api/auth/signup', {
                method: 'POST',
                auth: false,
                body: { name, email, phone, password, role }
            });

            if (api && api.ok && api.token && api.user) {
                setAuthToken(api.token);
                persistSessionForUi(api.user, role);
                result = { success: true, user: api.user };
            }
        } catch (err) {
            result = null;
        }

        if (!result || !result.success) {
            result = auth.signup({ name, email, phone, password, role });
        }
        
        if (result.success) {
            currentUser = result.user;
            showNotification(tr('notificationAccountCreated', 'Account created successfully!'), 'success');
            closeModal();
            
            // Redirect based on role
            setTimeout(() => {
                window.location.href = safeRoleRedirectUrl(role);
            }, 500);
        } else {
            showNotification(result.error || tr('notificationEmailExists', 'Registration failed. Please try again.'), 'error');
        }
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === authModal) {
            closeModal();
        }
    });

    // Initialize language
    const browserLang = navigator.language.split('-')[0];
    if (translations[browserLang]) {
        currentLanguage = browserLang;
        languageSelect.value = browserLang;
    }
    changeLanguage();
    
    // Initialize role selection
    document.querySelectorAll('.role-option[data-role="customer"]').forEach(opt => {
        opt.classList.add('selected');
    });
    
    // Update placeholders
    updatePlaceholders();
}

// Show Dashboard
function showDashboard(role) {
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelector('.hero').style.display = 'none';
    document.querySelector('.features').style.display = 'none';
    
    document.getElementById(`${role}Dashboard`).classList.add('active');
}

// Update Dashboard with user data
function updateDashboard(user) {
    const avatarElement = document.getElementById(`${user.role}Avatar`);
    const nameElement = document.getElementById(`${user.role}Welcome`);
    
    if (avatarElement) {
        avatarElement.textContent = user.name.charAt(0).toUpperCase();
    }
    
    if (nameElement) {
        const key = `${user.role}Welcome`;
        const langPack = (translations && translations[currentLanguage]) ? translations[currentLanguage] : {};
        const enPack = (translations && translations.en) ? translations.en : {};
        const welcomeText = (langPack && langPack[key]) || (enPack && enPack[key]) || 'Welcome, ';
        nameElement.textContent = `${String(welcomeText).split(',')[0]}, ${user.name}!`;
    }
    
    if (user.role === 'customer') {
        document.getElementById('customerEmailDisplay').textContent = user.email;
    } else if (user.role === 'driver') {
        document.getElementById('driverTruck').textContent = `${tr('driverTruck', 'Truck:')} ${user.truckAssigned || 'Not Assigned'}`;
    } else if (user.role === 'agent') {
        document.getElementById('agentId').textContent = `${tr('agentId', 'Agent ID:')} ${user.employeeId || 'AGT' + user.id}`;
    } else if (user.role === 'manager') {
        document.getElementById('managerId').textContent = `${tr('managerId', 'Manager ID:')} ${user.employeeId || 'MGR' + user.id}`;
    }
}

// Logout Function (using centralized auth system)
function logout() {
    clearAuthToken();
    if (typeof auth !== 'undefined' && auth && typeof auth.logout === 'function') {
        auth.logout();
    } else {
        localStorage.removeItem(UI_CURRENT_USER_KEY);
        localStorage.removeItem(UI_SESSION_KEY);
        localStorage.removeItem('userRole');
    }
    
    currentUser = null;
    
    document.querySelectorAll('.dashboard-section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelector('.hero').style.display = 'block';
    document.querySelector('.features').style.display = 'block';
    
    loginForm.reset();
    signupForm.reset();
    
    showNotification(tr('notificationLogout', 'Logged out successfully!'), 'success');
    
    // Redirect to home page
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 500);
}

// Truck Logistics Functions
async function calculateFare() {
    const pickup = document.getElementById('pickupLocation').value;
    const drop = document.getElementById('dropLocation').value;
    const weight = parseFloat(document.getElementById('weightSelect').value);
    
    if (!pickup || !drop || !weight) {
        showNotification(tr('notificationFillFields', 'Please fill all fields'), 'error');
        return;
    }
    
    const distance = Math.floor(Math.random() * 500) + 50;
    
    let truckType, people;
    if (weight <= 3.5) {
        truckType = 'LCV';
        people = 2;
    } else if (weight <= 7.5) {
        truckType = 'MCV';
        people = 4;
    } else {
        truckType = 'HCV';
        people = 8;
    }
    
    const pricing = database.pricing[truckType];
    const baseFare = pricing.baseRate;
    const distanceFare = distance * pricing.perKm;
    const tollTax = distance * 2.5;
    const subtotal = baseFare + distanceFare + tollTax;
    const gst = subtotal * 0.18;
    const total = subtotal + gst;
    
    const fareDetails = document.getElementById('fareDetails');
    fareDetails.innerHTML = `
        <p><strong>${tr('distanceLabel', 'Distance:')}</strong> ${distance} km</p>
        <p><strong>${tr('truckTypeLabel', 'Truck Type:')}</strong> ${truckType}</p>
        <p><strong>${tr('peopleRequiredLabel', 'People Required:')}</strong> ${people}</p>
        <hr>
        <p><strong>${tr('baseFareLabel', 'Base Fare:')}</strong> ₹${baseFare}</p>
        <p><strong>${tr('distanceFareLabel', 'Distance Fare:')}</strong> ₹${distanceFare.toFixed(2)}</p>
        <p><strong>${tr('tollTaxLabel', 'Toll Tax:')}</strong> ₹${tollTax.toFixed(2)}</p>
        <p><strong>${tr('subtotalLabel', 'Subtotal:')}</strong> ₹${subtotal.toFixed(2)}</p>
        <p><strong>${tr('gstLabel', 'GST (18%):')}</strong> ₹${gst.toFixed(2)}</p>
        <h3><strong>${tr('totalFareLabel', 'Total Fare:')}</strong> ₹${total.toFixed(2)}</h3>
    `;
    
    const trucksList = document.getElementById('trucksList');
    const trucks = database.trucks[truckType];
    trucksList.innerHTML = `<h4>${tr('availableTrucksLabel', 'Available Trucks:')}</h4>`;
    
    trucks.forEach(truck => {
        trucksList.innerHTML += `
            <div class="truck-card">
                <h5>${truck.name}</h5>
                <p><strong>${tr('truckNumberLabel', 'Truck Number:')}</strong> ${truck.number}</p>
            </div>
        `;
    });
    
    const qrCodeDiv = document.getElementById('qrCode');
    qrCodeDiv.innerHTML = `
        <div style="width: 200px; height: 200px; background: #f0f0f0; display: flex; align-items: center; justify-content: center; margin: 0 auto; border-radius: 10px;">
            <div style="text-align: center;">
                <i class="fas fa-qrcode" style="font-size: 80px; color: #333;"></i>
                <p style="margin-top: 10px;">${tr('upiLabel', 'UPI:')} logihub@upi</p>
                <p>${tr('amountLabel', 'Amount:')} ₹${total.toFixed(2)}</p>
            </div>
        </div>
    `;
    
    document.getElementById('fareResult').classList.add('active');
    document.getElementById('qrCodeSection').style.display = 'block';
    
    window.currentBooking = {
        pickup,
        drop,
        weight,
        distance,
        truckType,
        total: total.toFixed(2),
        trucks: database.trucks[truckType]
    };
}

async function confirmBooking() {
    if (!window.currentBooking) {
        showNotification(tr('notificationCalculateFirst', 'Please calculate fare first'), 'error');
        return;
    }

    if (!currentUser) {
        showNotification('Please login to confirm booking.', 'error');
        openModal('login');
        return;
    }

    const userKey = currentUser.email || currentUser.id;

    // Prefer creating the shipment in MongoDB (requires JWT)
    const token = getAuthToken();
    if (token) {
        try {
            const weightTons = Number(window.currentBooking.weight);
            const weightKg = Number.isFinite(weightTons) ? weightTons * 1000 : NaN;

            const api = await apiJson('/api/shipments/create', {
                method: 'POST',
                body: {
                    origin: window.currentBooking.pickup,
                    destination: window.currentBooking.drop,
                    truckType: window.currentBooking.truckType,
                    weightKg,
                    distanceKm: window.currentBooking.distance
                }
            });

            if (api && api.ok && api.shipment && api.shipment.trackingId) {
                window.lastTrackingId = api.shipment.trackingId;
                window.lastShipmentStatus = api.shipment.status || 'confirmed';
                window.lastRouteSummary = `${window.currentBooking.pickup} → ${window.currentBooking.drop}`;

                const etaBtn = document.getElementById('aiEtaBtn');
                if (etaBtn) etaBtn.style.display = '';
                setAiText('aiEtaOutput', '');

                const shipmentLocal = {
                    id: database.shipments.length + 1,
                    customerEmail: currentUser.email,
                    customerName: currentUser.name,
                    trackingId: api.shipment.trackingId,
                    ...window.currentBooking,
                    status: api.shipment.status || 'confirmed',
                    date: new Date().toISOString(),
                    paymentStatus: (api.order && api.order.paymentStatus) || 'pending',
                    total: (api.shipment.pricing && api.shipment.pricing.totalFare != null) ? api.shipment.pricing.totalFare : window.currentBooking.total
                };
                database.shipments.push(shipmentLocal);

                const myShipments = database.shipments.filter(s => (s.customerEmail || s.customerId) === userKey);
                document.getElementById('customerShipments').textContent = myShipments.length;
                document.getElementById('customerActiveOrders').textContent = myShipments.filter(s => s.status === 'confirmed' || s.status === 'created').length;
                const totalSpent = myShipments.reduce((sum, s) => sum + Number(s.total || 0), 0);
                document.getElementById('customerSpent').textContent = totalSpent.toFixed(2);

                showNotification(`Booking confirmed! Tracking ID: ${api.shipment.trackingId}`, 'success');

                document.getElementById('pickupLocation').value = '';
                document.getElementById('dropLocation').value = '';
                document.getElementById('weightSelect').value = '';
                // Keep the result card visible so the user can request ETA explainability.
                // This highlights the AI value add in the demo.
                return;
            }
        } catch (err) {
            // Fall back to demo/local mode below.
        }
    }
    
    const shipment = {
        id: database.shipments.length + 1,
        customerId: currentUser.id,
        customerEmail: currentUser.email,
        customerName: currentUser.name,
        ...window.currentBooking,
        status: 'confirmed',
        date: new Date().toISOString(),
        paymentStatus: 'pending'
    };
    
    database.shipments.push(shipment);

    // Demo tracking id for explainability even in offline mode.
    window.lastTrackingId = shipment.trackingId || `LH-DEMO-${String(Date.now()).slice(-6)}`;
    window.lastShipmentStatus = shipment.status || 'confirmed';
    window.lastRouteSummary = `${window.currentBooking.pickup} → ${window.currentBooking.drop}`;
    const etaBtn = document.getElementById('aiEtaBtn');
    if (etaBtn) etaBtn.style.display = '';
    setAiText('aiEtaOutput', '');
    
    const customerShipments = document.getElementById('customerShipments');
    const myShipments = database.shipments.filter(s => (s.customerEmail || s.customerId) === userKey);
    customerShipments.textContent = myShipments.length;
    
    const customerActiveOrders = document.getElementById('customerActiveOrders');
    customerActiveOrders.textContent = myShipments.filter(s => s.status === 'confirmed').length;
    
    const customerSpent = document.getElementById('customerSpent');
    const totalSpent = myShipments.reduce((sum, s) => sum + parseFloat(s.total), 0);
    customerSpent.textContent = totalSpent.toFixed(2);
    
    showNotification(tr('notificationBookingConfirmed', 'Booking confirmed successfully!'), 'success');
    
    document.getElementById('pickupLocation').value = '';
    document.getElementById('dropLocation').value = '';
    document.getElementById('weightSelect').value = '';
    // Keep the result card visible so the user can request ETA explainability.
}

// Scroll to features
function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

function updatePlaceholders() {
    const inputs = document.querySelectorAll('input[placeholder], select');
    inputs.forEach(input => {
        const id = input.id;
        if (id) {
            const placeholderKey = id + 'Placeholder';
            const langPack = (translations && translations[currentLanguage]) ? translations[currentLanguage] : null;
            const enPack = (translations && translations.en) ? translations.en : null;
            if (langPack && langPack[placeholderKey]) {
                input.placeholder = langPack[placeholderKey];
            } else if (enPack && enPack[placeholderKey]) {
                input.placeholder = enPack[placeholderKey];
            }
        }
    });
}

// Fallback translations
function getFallbackTranslations() {
    return {
        navHome: "Home",
        navAbout: "About",
        navContact: "Contact",
        loginText: "Login",
        signupText: "Sign Up",
        authToggleLabel: "Show Login/Sign Up",
        heroTitle: "Revolutionizing Truck Logistics",
        heroSubtitle: "Smart, Efficient, and Reliable Transportation Solutions",
        getStartedText: "Get Started",
        watchDemoText: "Watch Demo",
        featuresTitle: "Why Choose LogiHub?",
        feature1Title: "AI-Powered Allocation",
        feature1Desc: "Intelligent truck and crew allocation based on weight, distance, and availability",
        feature2Title: "Multi-Language Support",
        feature2Desc: "Support for 22+ Indian languages including Hindi, Bengali, Tamil, and more",
        feature3Title: "Real-time Tracking",
        feature3Desc: "Live GPS tracking of your shipments with automated distance calculation",
        feature4Title: "Instant QR Payments",
        feature4Desc: "Secure UPI payments with auto-generated QR codes for seamless transactions",
        feature5Title: "Role-Based Access",
        feature5Desc: "Dedicated portals for Customers, Drivers, Agents, and Managers",
        feature6Title: "Smart Analytics",
        feature6Desc: "Comprehensive dashboard with insights and performance metrics",
        modalTitle: "Welcome to LogiHub",
        loginTab: "Login",
        signupTab: "Sign Up",
        loginEmailLabel: "Email Address",
        loginEmailPlaceholder: "Enter your email",
        loginPasswordLabel: "Password",
        loginPasswordPlaceholder: "Enter your password",
        selectRoleLabel: "Select Role",
        roleCustomer: "Customer",
        roleDriver: "Truck Driver",
        roleAgent: "Delivery Agent",
        roleManager: "Delivery Manager",
        roleAdmin: "Admin",
        loginSubmitText: "Login to Dashboard",
        signupNameLabel: "Full Name",
        signupNamePlaceholder: "Enter your full name",
        signupEmailLabel: "Email Address",
        signupEmailPlaceholder: "Enter your email",
        signupPhoneLabel: "Phone Number",
        signupPhonePlaceholder: "Enter your phone number",
        signupPasswordLabel: "Password",
        signupPasswordPlaceholder: "Create a password",
        selectYourRoleLabel: "Select Your Role",
        signupRoleCustomer: "Customer",
        signupRoleDriver: "Truck Driver",
        signupRoleAgent: "Delivery Agent",
        signupRoleManager: "Delivery Manager",
        signupRoleAdmin: "Admin",
        signupSubmitText: "Create Account",
        customerWelcome: "Welcome, Customer!",
        logoutTextCustomer: "Logout",
        totalShipmentsLabel: "Total Shipments",
        activeOrdersLabel: "Active Orders",
        totalSpentLabel: "Total Spent",
        bookShipmentTitle: "Book New Shipment",
        pickupLabel: "Pickup Location",
        pickupPlaceholder: "Enter pickup address",
        dropLabel: "Drop Location",
        dropPlaceholder: "Enter delivery address",
        weightLabel: "Weight (Tons)",
        selectWeightOption: "Select Weight",
        weight35Option: "Up to 3.5 Ton (LCV - 2 People)",
        weight75Option: "Up to 7.5 Ton (MCV - 4 People)",
        weight16Option: "Up to 16 Ton (HCV - 8 People)",
        calculateFareText: "Calculate Fare",
        fareDetailsTitle: "Fare Details",
        makePaymentTitle: "Make Payment",
        scanQRText: "Scan QR code to pay via UPI",
        confirmBookingText: "Confirm Booking",
        driverWelcome: "Welcome, Driver!",
        logoutTextDriver: "Logout",
        todayTripsLabel: "Today's Trips",
        earningsLabel: "Earnings Today",
        ratingLabel: "Rating",
        currentAssignmentTitle: "Current Assignment",
        noAssignmentText: "No active assignments",
        agentWelcome: "Welcome, Agent!",
        logoutTextAgent: "Logout",
        assignedOrdersLabel: "Assigned Orders",
        pendingActionsLabel: "Pending Actions",
        revenueLabel: "Today's Revenue",
        managerWelcome: "Welcome, Manager!",
        logoutTextManager: "Logout",
        totalTrucksLabel: "Total Trucks",
        activeDriversLabel: "Active Drivers",
        managerRevenueLabel: "Today's Revenue",
        footerPrivacy: "Privacy Policy",
        footerTerms: "Terms of Service",
        footerContact: "Contact Us",
        footerSupport: "Support",
        footerCopyright: "© 2024 LogiHub. All rights reserved.",
        notificationWelcome: "Welcome back, ",
        notificationInvalidCred: "Invalid credentials. Please try again.",
        notificationEmailExists: "Email already registered. Please login.",
        notificationAccountCreated: "Account created successfully!",
        notificationLoggedOut: "Logged out successfully",
        notificationFillFields: "Please fill all fields",
        notificationCalculateFirst: "Please calculate fare first",
        notificationBookingConfirmed: "Booking confirmed successfully!"
    };
}

// ==================== CHATBOT FUNCTIONALITY ====================

// Chatbot state
let chatbotState = {
    isOpen: false,
    messages: [],
    sessionId: null,
    conversationStartTime: null
};

// Initialize Firebase configuration (replace with your Firebase config)
const firebaseConfig = {
    apiKey: "YOUR_FIREBASE_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeChatbot();
});

function initializeChatbot() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotInput = document.getElementById('chatbotInput');
    
    if (!chatbotToggle) return;
    
    // Generate session ID
    chatbotState.sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    chatbotState.conversationStartTime = new Date().toISOString();
    
    // Toggle chatbot window
    chatbotToggle.addEventListener('click', function() {
        chatbotState.isOpen = !chatbotState.isOpen;
        chatbotWindow.classList.toggle('active');
        
        if (chatbotState.isOpen) {
            chatbotInput.focus();
            const badge = document.getElementById('chatbotBadge');
            if (badge) badge.style.display = 'none';
        }
    });
    
    // Close chatbot
    chatbotClose.addEventListener('click', function() {
        chatbotState.isOpen = false;
        chatbotWindow.classList.remove('active');
    });
    
    // Send message on button click
    chatbotSend.addEventListener('click', sendChatMessage);
    
    // Send message on Enter key
    chatbotInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendChatMessage();
        }
    });
    
    // Set initial message time
    updateMessageTime();
}

function sendChatMessage() {
    const chatbotInput = document.getElementById('chatbotInput');
    const message = chatbotInput.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    chatbotInput.value = '';
    
    // Store message in state
    chatbotState.messages.push({
        role: 'user',
        content: message,
        timestamp: new Date().toISOString()
    });
    
    // Show typing indicator
    showTypingIndicator();
    
    // Get AI response
    getAIResponse(message);
}

function addMessageToChat(message, type) {
    const messagesContainer = document.getElementById('chatbotMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${type === 'user' ? 'user-message' : 'bot-message'}`;
    
    const currentTime = new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    messageDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-${type === 'user' ? 'user' : 'robot'}"></i>
        </div>
        <div class="message-content">
            <p>${escapeHtml(message)}</p>
            <span class="message-time">${currentTime}</span>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatbotMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chatbot-message bot-message';
    typingDiv.id = 'typingIndicator';
    
    typingDiv.innerHTML = `
        <div class="message-avatar">
            <i class="fas fa-robot"></i>
        </div>
        <div class="message-content">
            <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

async function getAIResponse(userMessage) {
    try {
        const token = getAuthToken();
        const headers = { 'Content-Type': 'application/json' };
        if (token) headers.Authorization = `Bearer ${token}`;

        const response = await fetch('/api/ai/insight', {
            method: 'POST',
            headers,
            body: JSON.stringify({
                type: 'customer_support',
                context: {
                    message: userMessage,
                    language: currentLanguage,
                    user: currentUser ? { name: currentUser.name, email: currentUser.email, role: currentUser.role } : null,
                    recentMessages: chatbotState.messages.slice(-6)
                }
            })
        });

        if (!response.ok) throw new Error('AI service unavailable');

        const data = await response.json();
        const aiResponse = (data && data.ok && data.text) ? String(data.text) : getContextualResponse(userMessage);
        
        removeTypingIndicator();
        addMessageToChat(aiResponse, 'bot');
        
        // Store bot message in state
        chatbotState.messages.push({
            role: 'assistant',
            content: aiResponse,
            timestamp: new Date().toISOString()
        });
        
        // Save to database after every interaction
        saveChatSummaryToDatabase();
        
    } catch (error) {
        console.error('AI Error:', error);
        removeTypingIndicator();
        
        // Fallback to contextual responses
        const fallbackResponse = getContextualResponse(userMessage);
        addMessageToChat(fallbackResponse, 'bot');
        
        chatbotState.messages.push({
            role: 'assistant',
            content: fallbackResponse,
            timestamp: new Date().toISOString()
        });
        
        saveChatSummaryToDatabase();
    }
}

function getContextualResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    // LogiHub specific responses
    if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('fare')) {
        return "Our pricing varies based on truck type and distance. LCV trucks start at ₹1500 base fare, MCV at ₹3500, and HCV at ₹7000. Additional charges apply based on distance traveled. Would you like to calculate a specific fare?";
    }
    
    if (lowerMessage.includes('book') || lowerMessage.includes('shipment')) {
        return "To book a shipment, please log in to your customer account and navigate to the 'Book New Shipment' section. You'll need to provide pickup location, drop location, and cargo weight. Would you like me to guide you through the process?";
    }
    
    if (lowerMessage.includes('track') || lowerMessage.includes('tracking')) {
        return "You can track your shipment in real-time through your customer dashboard. Each booking gets a unique tracking ID that you can use to monitor your delivery's progress.";
    }
    
    if (lowerMessage.includes('truck') || lowerMessage.includes('vehicle')) {
        return "We offer three types of trucks: LCV (up to 3.5 tons, 2 people), MCV (up to 7.5 tons, 4 people), and HCV (up to 16 tons, 8 people). All our trucks are well-maintained and GPS-enabled.";
    }
    
    if (lowerMessage.includes('payment') || lowerMessage.includes('pay')) {
        return "We accept UPI payments through QR codes for seamless transactions. Payment is processed securely, and you'll receive a confirmation once completed.";
    }
    
    if (lowerMessage.includes('login') || lowerMessage.includes('account') || lowerMessage.includes('register')) {
        return "You can create an account or login using the buttons in the header. We have different portals for Customers, Drivers, Agents, and Managers. Which role are you interested in?";
    }
    
    if (lowerMessage.includes('language')) {
        return "LogiHub supports 22+ Indian languages including Hindi, Bengali, Tamil, and more. You can change the language using the language selector in the header.";
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('support') || lowerMessage.includes('contact')) {
        return "I'm here to help! You can ask me about pricing, booking shipments, tracking, truck types, or any other LogiHub services. For detailed support, you can also contact our support team through the footer link.";
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
        return "Hello! 👋 Welcome to LogiHub. How can I assist you with your logistics needs today?";
    }
    
    if (lowerMessage.includes('thank')) {
        return "You're welcome! Feel free to ask if you have any other questions about LogiHub services. 😊";
    }
    
    // Default response
    return "I'm LogiHub Assistant, here to help with your logistics needs. I can assist you with booking shipments, pricing information, tracking, and more. What would you like to know?";
}

async function saveChatSummaryToDatabase() {
    try {
        // Generate chat summary
        const summary = generateChatSummary();
        
        // Save to localStorage as a fallback/demo
        const existingChats = JSON.parse(localStorage.getItem('logihub_chat_summaries') || '[]');
        existingChats.push(summary);
        localStorage.setItem('logihub_chat_summaries', JSON.stringify(existingChats));
        localStorage.setItem('logihub_chat_summary_latest', JSON.stringify(summary));
        
        // Option 1: Save to Firebase Firestore
        // Uncomment and configure when Firebase is set up
        /*
        if (typeof firebase !== 'undefined' && firebase.firestore) {
            await firebase.firestore().collection('chat_summaries').add(summary);
        }
        */
        
        // Option 2: Save to LogiHub backend API (MongoDB).
        // MongoDB adds real value here: durable analytics + admin review across devices.
        try {
            const token = getAuthToken();
            const headers = { 'Content-Type': 'application/json' };
            if (token) headers.Authorization = `Bearer ${token}`;

            await fetch('/api/chat-summaries', {
                method: 'POST',
                headers,
                body: JSON.stringify(summary)
            });
        } catch (_) {
            // Keep localStorage as a graceful fallback (offline/demo).
        }
        
        console.log('Chat summary saved:', summary);
        
    } catch (error) {
        console.error('Error saving chat summary:', error);
    }
}

function generateChatSummary() {
    const userMessages = chatbotState.messages.filter(m => m.role === 'user');
    const botMessages = chatbotState.messages.filter(m => m.role === 'assistant');
    
    // Extract topics/keywords
    const allUserText = userMessages.map(m => m.content).join(' ').toLowerCase();
    const topics = [];
    
    const topicKeywords = {
        'Pricing': ['price', 'cost', 'fare', 'charge'],
        'Booking': ['book', 'shipment', 'order'],
        'Tracking': ['track', 'status', 'location'],
        'Trucks': ['truck', 'vehicle', 'lcv', 'mcv', 'hcv'],
        'Payment': ['payment', 'pay', 'upi'],
        'Account': ['login', 'account', 'register', 'signup'],
        'Support': ['help', 'support', 'contact']
    };
    
    for (const [topic, keywords] of Object.entries(topicKeywords)) {
        if (keywords.some(keyword => allUserText.includes(keyword))) {
            topics.push(topic);
        }
    }
    
    return {
        sessionId: chatbotState.sessionId,
        timestamp: chatbotState.conversationStartTime,
        endTime: new Date().toISOString(),
        messageCount: chatbotState.messages.length,
        userMessageCount: userMessages.length,
        topics: topics.length > 0 ? topics : ['General Inquiry'],
        firstUserMessage: (userMessages[0] && userMessages[0].content) || '',
        lastUserMessage: (userMessages[userMessages.length - 1] && userMessages[userMessages.length - 1].content) || '',
        conversationLength: chatbotState.messages.length,
        userInfo: currentUser ? {
            name: currentUser.name,
            email: currentUser.email,
            role: currentUser.role
        } : { name: 'Anonymous', email: 'N/A', role: 'guest' },
        messages: chatbotState.messages,
        summary: `User inquired about: ${topics.join(', ') || 'General information'}. Total messages: ${chatbotState.messages.length}`
    };
}

function updateMessageTime() {
    const timeElements = document.querySelectorAll('.message-time');
    const currentTime = new Date().toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    if (timeElements.length > 0 && !timeElements[0].textContent) {
        timeElements[0].textContent = currentTime;
    }
}

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

async function callAiInsight(type, context) {
    const token = getAuthToken();
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch('/api/ai/insight', {
        method: 'POST',
        headers,
        body: JSON.stringify({ type, context })
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data || !data.ok) throw new Error('AI unavailable');
    return data;
}

async function getShipmentRecommendation() {
    if (!window.currentBooking) {
        showNotification('Calculate fare first to get AI recommendations.', 'error');
        return;
    }

    setAiText('aiRecommendOutput', 'Thinking…');
    try {
        const weightTons = Number(window.currentBooking.weight);
        const weightKg = Number.isFinite(weightTons) ? weightTons * 1000 : null;

        const data = await callAiInsight('shipment_recommendation', {
            origin: window.currentBooking.pickup,
            destination: window.currentBooking.drop,
            weightKg,
            truckType: window.currentBooking.truckType,
            distanceKm: window.currentBooking.distance
        });

        setAiText('aiRecommendOutput', data.text);
    } catch (e) {
        setAiText('aiRecommendOutput', 'AI recommendations are unavailable right now. You can still proceed with booking; try again later for route/delay insights.');
    }
}

async function explainEtaDelays() {
    const trackingId = window.lastTrackingId;
    if (!trackingId) {
        showNotification('Create a shipment first to explain ETA.', 'error');
        return;
    }

    setAiText('aiEtaOutput', 'Analyzing ETA drivers…');
    try {
        const data = await callAiInsight('eta_explain', {
            trackingId,
            status: window.lastShipmentStatus || 'confirmed',
            routeSummary: window.lastRouteSummary || `${window.currentBooking?.pickup || 'origin'} → ${window.currentBooking?.drop || 'destination'}`
        });
        setAiText('aiEtaOutput', data.text);
    } catch (e) {
        setAiText('aiEtaOutput', 'ETA explanation is unavailable right now. Typical drivers: traffic, route restrictions, loading/unloading dwell time, and maintenance/driver rest.');
    }
}

async function getRouteDelayInsights() {
    if (!window.currentBooking) {
        showNotification('Calculate fare first to get route insights.', 'error');
        return;
    }

    setAiText('aiRouteOutput', 'Analyzing route risk…');
    try {
        const data = await callAiInsight('route_delay_insight', {
            routeSummary: `${window.currentBooking.pickup} → ${window.currentBooking.drop}`,
            constraints: `TruckType=${window.currentBooking.truckType}, WeightTons=${window.currentBooking.weight}`
        });
        setAiText('aiRouteOutput', data.text);
    } catch (e) {
        setAiText('aiRouteOutput', 'Route insights unavailable right now. Tip: schedule pickups earlier, avoid peak-city hours, add buffer for toll plazas, and proactively message customers if delays exceed 30–45 minutes.');
    }
}