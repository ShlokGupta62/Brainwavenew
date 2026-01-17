// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');

// Check for saved theme (match Home Page logic)
const currentTheme = localStorage.getItem('logihub-theme') || 'dark';
document.body.setAttribute('data-theme', currentTheme);

if(themeToggle) {
    themeToggle.checked = currentTheme === 'light'; // Checked = Light in Home Page

    themeToggle.addEventListener('change', function() {
        const newTheme = this.checked ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('logihub-theme', newTheme);
    });
}

// Get modal elements (dashboard-only; guard for other pages)
const journeyModal = document.getElementById('journeyModal');
const allocationsModal = document.getElementById('allocationsModal');
const startJourneyBtn = document.getElementById('startJourneyBtn');
const newAllocationsBtn = document.getElementById('newAllocationsBtn');
const confirmJourney = document.getElementById('confirmJourney');
const confirmAllocations = document.getElementById('confirmAllocations');
const modalCloseBtns = document.querySelectorAll('.modal-cancel, .close-modal');

// Add animation classes on load
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.animate-in');
    elements.forEach(el => {
        el.style.opacity = '0';
    });
    
    // Trigger animations with delay
    setTimeout(() => {
        elements.forEach(el => {
            el.style.opacity = '1';
        });
    }, 100);
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.stat-card, .truck-card, .route-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.02)';
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.zIndex = '1';
        });
    });
});

// Open Modals instead of direct redirect for better UX
if (startJourneyBtn && journeyModal) {
    startJourneyBtn.addEventListener('click', () => {
        journeyModal.style.display = 'flex';
    });
}

if (newAllocationsBtn && allocationsModal) {
    newAllocationsBtn.addEventListener('click', () => {
        allocationsModal.style.display = 'flex';
    });
}

// Handle journey confirmation with premium animation
if (confirmJourney && startJourneyBtn && journeyModal) {
    confirmJourney.addEventListener('click', () => {
        startJourneyBtn.innerHTML = '<i class="fas fa-check-circle btn-icon"></i> JOURNEY LAUNCHED';
        startJourneyBtn.style.background = 'linear-gradient(135deg, #00A86B, #00C278)';
        startJourneyBtn.style.cursor = 'default';
        
        // Add celebration effect
        startJourneyBtn.style.animation = 'pulse 1s 3';
        
        // Close modal and Redirect
        setTimeout(() => {
            journeyModal.style.display = 'none';
            window.location.href = 'journey.html';
        }, 800);
    });
}

// Handle allocations confirmation with premium animation
if (confirmAllocations && newAllocationsBtn && allocationsModal) {
    confirmAllocations.addEventListener('click', () => {
        newAllocationsBtn.innerHTML = '<i class="fas fa-check-circle btn-icon"></i> ALLOCATIONS VIEWED';
        newAllocationsBtn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        newAllocationsBtn.style.cursor = 'default';
        
        // Add celebration effect
        newAllocationsBtn.style.animation = 'pulse 1s 3';
        
        // Close modal and Redirect
        setTimeout(() => {
            allocationsModal.style.display = 'none';
            window.location.href = 'allocations.html';
        }, 800);
    });
}

// Close modals
if (modalCloseBtns && modalCloseBtns.length) {
    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (journeyModal) journeyModal.style.display = 'none';
            if (allocationsModal) allocationsModal.style.display = 'none';
        });
    });
}

// Close modal when clicking outside
if (journeyModal || allocationsModal) {
    window.addEventListener('click', (e) => {
        if (journeyModal && e.target === journeyModal) {
            journeyModal.style.display = 'none';
        }
        if (allocationsModal && e.target === allocationsModal) {
            allocationsModal.style.display = 'none';
        }
    });
}

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
    
    .action-btn:hover .btn-icon {
        animation: pulse 0.5s ease infinite;
    }
`;
document.head.appendChild(style);

// Language Selector Logic
const languageSelect = document.getElementById('languageSelect');
if(languageSelect) {
    languageSelect.addEventListener('change', function() {
        const selectedLang = this.options[this.selectedIndex].text;
        const notification = document.createElement('div');
        notification.style.cssText = "position:fixed;bottom:20px;right:20px;background:var(--gradient-primary);color:white;padding:15px 25px;border-radius:10px;box-shadow:var(--shadow-intense);z-index:9999;font-family:'Orbitron',sans-serif;font-weight:bold;opacity:0;transform:translateX(100%);transition:all 0.5s ease;";
        notification.innerHTML = `<i class="fas fa-language"></i> Language: ${selectedLang}`;
        document.body.appendChild(notification);
        setTimeout(() => { notification.style.opacity = '1'; notification.style.transform = 'translateX(0)'; }, 10);
        setTimeout(() => { notification.style.opacity = '0'; notification.style.transform = 'translateX(100%)'; setTimeout(()=>notification.remove(),500); }, 3000);
    });
}

// Safety Button Logic
const festiveJamBtn = document.getElementById('festiveJamBtn');
if(festiveJamBtn) {
    festiveJamBtn.addEventListener('click', () => {
        alert('🚦 FESTIVE JAM ALERT SYSTEM ACTIVATED\n\nScanning for high-traffic zones due to local festivals...\n\nNo major jams detected in your 50km radius.');
    });
}

const oneWayBtn = document.getElementById('oneWayBtn');
if(oneWayBtn) {
    oneWayBtn.addEventListener('click', () => {
        alert('⛔ ONE WAY ROUTE ALERT SYSTEM\n\nChecking route compliance...\n\nAlert: MG Road is currently One-Way (North to South) due to construction.');
    });
}

// File Upload Logic
function handleFileUpload(inputId, imgId, previewId) {
    const input = document.getElementById(inputId);
    const img = document.getElementById(imgId);
    
    // Find the file-name div inside the container
    const container = document.getElementById(previewId);
    let previewDiv = null;
    if (container) {
         // The structure is .upload-card -> [icon, input, .file-name] usually, 
         // but looking at HTML structure, the previewId is likely the container itself 
         // or we search adjacent. Let's look up the HTML context if needed.
         // Based on previous create loop, we likely didn't create a .file-name div 
         // explicitly inside the ID'd element if it's just a file input wrapper.
         // Actually in the previous turn we created:
         // <div class="upload-card" id="aadharPreview"> ... <p class="file-name"></p> ... </div>
         previewDiv = container.querySelector('.file-name');
    }

    if(input) {
        input.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Show file name
                if(previewDiv) {
                    previewDiv.style.display = 'block';
                    previewDiv.textContent = `Selected: ${file.name}`;
                    previewDiv.style.color = 'var(--accent)';
                }

                // Show preview if image
                if (file.type.startsWith('image/') && img) {
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        img.src = event.target.result;
                        img.style.display = 'block';
                    }
                    reader.readAsDataURL(file);
                } else if(img) {
                    img.style.display = 'none';
                }
                
                // Alert success
                alert(`✅ ${file.name} uploaded successfully for verification.`);
            }
        });
    }
}

handleFileUpload('aadharUpload', 'aadharImg', 'aadharPreview');
handleFileUpload('licenseUpload', 'licenseImg', 'licensePreview');
