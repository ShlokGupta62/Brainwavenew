// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

// Check for saved theme
const currentTheme = localStorage.getItem('theme') || 'light';
root.setAttribute('data-theme', currentTheme);
themeToggle.checked = currentTheme === 'dark';

themeToggle.addEventListener('change', function() {
    if (this.checked) {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        root.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
});

// Get modal elements
const journeyModal = document.getElementById('journeyModal');
const allocationsModal = document.getElementById('allocationsModal');
const startJourneyBtn = document.getElementById('startJourneyBtn');
const newAllocationsBtn = document.getElementById('newAllocationsBtn');
const confirmJourney = document.getElementById('confirmJourney');
const confirmAllocations = document.getElementById('confirmAllocations');
const modalCloseBtns = document.querySelectorAll('.modal-cancel');

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

// Redirect to external journey page on click
startJourneyBtn.addEventListener('click', () => {
    // Direct user to the live journey page
    window.location.href = 'https://prismatic-cassata-cb6780.netlify.app/';
});

// Redirect to external allocations page on click
newAllocationsBtn.addEventListener('click', () => {
    // Direct user to the allocations page
    window.location.href = 'https://golden-crepe-7a220d.netlify.app/';
});

// Handle journey confirmation with premium animation
confirmJourney.addEventListener('click', () => {
    startJourneyBtn.innerHTML = '<i class="fas fa-check-circle btn-icon"></i> JOURNEY LAUNCHED';
    startJourneyBtn.style.background = 'linear-gradient(135deg, #00A86B, #00C278)';
    startJourneyBtn.style.cursor = 'default';
    
    // Add celebration effect
    startJourneyBtn.style.animation = 'pulse 1s 3';
    
    setTimeout(() => {
        alert('🚀 PREMIUM JOURNEY LAUNCHED!\n\nReal-time tracking activated. Redirecting to journey dashboard...');
        journeyModal.style.display = 'none';
    }, 800);
});

// Handle allocations confirmation with premium animation
confirmAllocations.addEventListener('click', () => {
    newAllocationsBtn.innerHTML = '<i class="fas fa-check-circle btn-icon"></i> ALLOCATIONS VIEWED';
    newAllocationsBtn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    newAllocationsBtn.style.cursor = 'default';
    
    // Add celebration effect
    newAllocationsBtn.style.animation = 'pulse 1s 3';
    
    setTimeout(() => {
        alert('📊 ALLOCATIONS DASHBOARD\n\nRedirecting to premium fleet management system...');
        allocationsModal.style.display = 'none';
    }, 800);
});

// Close modals
modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        journeyModal.style.display = 'none';
        allocationsModal.style.display = 'none';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === journeyModal) {
        journeyModal.style.display = 'none';
    }
    if (e.target === allocationsModal) {
        allocationsModal.style.display = 'none';
    }
});

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