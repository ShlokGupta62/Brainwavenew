// Load translations from language.json
let translations = {};
let currentLanguage = 'en';

// Fetch translations
fetch('language.json')
    .then(response => response.json())
    .then(data => {
        translations = data;
        initializeLanguage();
        updateCurrentDay();
        setupEventListeners();
    })
    .catch(error => {
        console.error('Error loading language file:', error);
        // Fallback to English translations
        translations = {
            en: {
                // ... (same English translations as before, but truncated for brevity)
                // In actual deployment, you would keep the full English translations here
            }
        };
        initializeLanguage();
    });

// Initialize language
function initializeLanguage() {
    // Check browser language or use English as default
    const browserLang = navigator.language.split('-')[0];
    if (translations[browserLang]) {
        currentLanguage = browserLang;
        document.getElementById('languageSelect').value = browserLang;
    }
    changeLanguage();
}

// Change language function
function changeLanguage() {
    const select = document.getElementById('languageSelect');
    currentLanguage = select.value;
    
    // Update all text elements
    if (translations[currentLanguage]) {
        Object.keys(translations[currentLanguage]).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                if (key === 'officeAddress') {
                    element.innerHTML = translations[currentLanguage][key].replace(/\n/g, '<br>');
                } else {
                    element.textContent = translations[currentLanguage][key];
                }
            }
        });
    }
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
}

// Open live chat
function openLiveChat() {
    showNotification('LIVE CHAT FEATURE COMING SOON!', 'success');
}

// Get directions
function getDirections() {
    const address = encodeURIComponent("LogiHub Tower, Sector 18, Gurugram, Haryana 122015");
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
}

// Open Google Maps
function openGoogleMaps() {
    const address = encodeURIComponent("LogiHub Tower, Sector 18, Gurugram, Haryana 122015");
    window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
}

// Show current day
function updateCurrentDay() {
    const days = ['sundayLabel', 'mondayLabel', 'tuesdayLabel', 'wednesdayLabel', 'thursdayLabel', 'fridayLabel', 'saturdayLabel'];
    const today = new Date().getDay();
    
    // Remove current class from all days
    document.querySelectorAll('.hour-item').forEach(item => {
        item.classList.remove('current');
    });
    
    // Add current class to today
    const todayElement = document.getElementById(days[today]);
    if (todayElement) {
        todayElement.parentElement.classList.add('current');
    }
}

// Add ripple effect to buttons
function addRippleEffect(button) {
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
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Language selector
    document.getElementById('languageSelect').addEventListener('change', changeLanguage);
    
    // Form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('THANK YOU FOR YOUR MESSAGE! WE WILL CONTACT YOU WITHIN 24 HOURS.', 'success');
        this.reset();
    });
    
    // Live chat button
    document.getElementById('liveChatBtn').addEventListener('click', openLiveChat);
    document.getElementById('helplineChatLink').addEventListener('click', function(e) {
        e.preventDefault();
        openLiveChat();
    });
    
    // Directions button
    document.getElementById('directionsBtn').addEventListener('click', getDirections);
    
    // Google Maps button
    document.getElementById('googleMapsBtn').addEventListener('click', openGoogleMaps);
    
    // Form submit button
    document.getElementById('submitFormBtn').addEventListener('click', function(e) {
        // Form submission is handled by the form's submit event
    });
    
    // Add ripple effect to all buttons
    document.querySelectorAll('.btn, .whatsapp-btn').forEach(button => {
        addRippleEffect(button);
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Functions that need DOM elements will be called after translations are loaded
    // The actual initialization happens in the fetch callback
});