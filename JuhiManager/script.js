// ========== TRUCK DATABASE ==========
const truckDatabase = [
    { 
        id: "TRK-001", 
        license: "DL-01-AB-1234", 
        driver: "Rajesh Kumar", 
        status: "active", 
        location: "Delhi", 
        product: "Electronics", 
        goodsType: "Fragile", 
        customerId: "CUST-101", 
        lastUpdate: "10 min ago",
        mileage: 85000,
        health: "Good",
        coordinates: { lat: 28.7041, lng: 77.1025 }
    },
    { 
        id: "TRK-002", 
        license: "MH-02-CD-5678", 
        driver: "Suresh Patel", 
        status: "delayed", 
        location: "Mumbai", 
        product: "Clothing", 
        goodsType: "General Cargo", 
        customerId: "CUST-205", 
        lastUpdate: "25 min ago",
        mileage: 120000,
        health: "Warning",
        coordinates: { lat: 19.0760, lng: 72.8777 }
    },
    { 
        id: "TRK-003", 
        license: "KA-03-EF-9012", 
        driver: "Anil Reddy", 
        status: "active", 
        location: "Bangalore", 
        product: "Pharmaceuticals", 
        goodsType: "Temperature Controlled", 
        customerId: "CUST-312", 
        lastUpdate: "5 min ago",
        mileage: 45000,
        health: "Good",
        coordinates: { lat: 12.9716, lng: 77.5946 }
    },
    { 
        id: "TRK-004", 
        license: "WB-04-GH-3456", 
        driver: "Amit Das", 
        status: "maintenance", 
        location: "Kolkata", 
        product: "Industrial Equipment", 
        goodsType: "Oversized", 
        customerId: "CUST-418", 
        lastUpdate: "2 hours ago",
        mileage: 180000,
        health: "Critical",
        coordinates: { lat: 22.5726, lng: 88.3639 }
    },
    { 
        id: "TRK-005", 
        license: "TN-05-IJ-7890", 
        driver: "Karthik Raj", 
        status: "active", 
        location: "Chennai", 
        product: "Automotive Parts", 
        goodsType: "General Cargo", 
        customerId: "CUST-527", 
        lastUpdate: "15 min ago",
        mileage: 95000,
        health: "Good",
        coordinates: { lat: 13.0827, lng: 80.2707 }
    },
    { 
        id: "TRK-006", 
        license: "RJ-06-KL-1234", 
        driver: "Vikram Singh", 
        status: "delayed", 
        location: "Jaipur", 
        product: "Food Items", 
        goodsType: "Perishable", 
        customerId: "CUST-633", 
        lastUpdate: "40 min ago",
        mileage: 140000,
        health: "Warning",
        coordinates: { lat: 26.9124, lng: 75.7873 }
    },
    { 
        id: "TRK-007", 
        license: "GJ-07-MN-5678", 
        driver: "Jayesh Shah", 
        status: "active", 
        location: "Ahmedabad", 
        product: "Chemicals", 
        goodsType: "Hazardous", 
        customerId: "CUST-741", 
        lastUpdate: "8 min ago",
        mileage: 65000,
        health: "Good",
        coordinates: { lat: 23.0225, lng: 72.5714 }
    },
    { 
        id: "TRK-008", 
        license: "UP-08-OP-9012", 
        driver: "Rahul Verma", 
        status: "idle", 
        location: "Lucknow", 
        product: "Building Materials", 
        goodsType: "Dry Bulk", 
        customerId: "CUST-856", 
        lastUpdate: "12 min ago",
        mileage: 110000,
        health: "Warning",
        coordinates: { lat: 26.8467, lng: 80.9462 }
    },
    { 
        id: "TRK-009", 
        license: "TS-09-QR-3456", 
        driver: "Sai Kumar", 
        status: "active", 
        location: "Hyderabad", 
        product: "Electronics", 
        goodsType: "High Value", 
        customerId: "CUST-964", 
        lastUpdate: "3 min ago",
        mileage: 78000,
        health: "Good",
        coordinates: { lat: 17.3850, lng: 78.4867 }
    },
    { 
        id: "TRK-010", 
        license: "MH-10-ST-7890", 
        driver: "Raj Malhotra", 
        status: "delayed", 
        location: "Pune", 
        product: "Furniture", 
        goodsType: "Oversized", 
        customerId: "CUST-107", 
        lastUpdate: "55 min ago",
        mileage: 125000,
        health: "Warning",
        coordinates: { lat: 18.5204, lng: 73.8567 }
    },
    { 
        id: "TRK-011", 
        license: "DL-11-UV-1234", 
        driver: "Sanjay Gupta", 
        status: "active", 
        location: "Delhi", 
        product: "Medical Supplies", 
        goodsType: "Temperature Controlled", 
        customerId: "CUST-219", 
        lastUpdate: "7 min ago",
        mileage: 92000,
        health: "Good",
        coordinates: { lat: 28.4595, lng: 77.0266 }
    },
    { 
        id: "TRK-012", 
        license: "KA-12-WX-5678", 
        driver: "Mohan Reddy", 
        status: "active", 
        location: "Bangalore", 
        product: "Computers", 
        goodsType: "Fragile", 
        customerId: "CUST-325", 
        lastUpdate: "20 min ago",
        mileage: 105000,
        health: "Warning",
        coordinates: { lat: 12.2958, lng: 76.6394 }
    },
    { 
        id: "TRK-013", 
        license: "MH-13-YZ-9012", 
        driver: "Amit Sharma", 
        status: "active", 
        location: "Mumbai", 
        product: "Textiles", 
        goodsType: "General Cargo", 
        customerId: "CUST-432", 
        lastUpdate: "18 min ago",
        mileage: 88000,
        health: "Good",
        coordinates: { lat: 19.2183, lng: 72.9781 }
    },
    { 
        id: "TRK-014", 
        license: "DL-14-AA-3456", 
        driver: "Rohit Verma", 
        status: "active", 
        location: "Delhi", 
        product: "Consumer Goods", 
        goodsType: "General Cargo", 
        customerId: "CUST-548", 
        lastUpdate: "22 min ago",
        mileage: 115000,
        health: "Good",
        coordinates: { lat: 28.5355, lng: 77.3910 }
    },
    { 
        id: "TRK-015", 
        license: "TN-15-BB-7890", 
        driver: "Kumar Raja", 
        status: "active", 
        location: "Chennai", 
        product: "Electronics", 
        goodsType: "Fragile", 
        customerId: "CUST-662", 
        lastUpdate: "14 min ago",
        mileage: 67000,
        health: "Good",
        coordinates: { lat: 13.0827, lng: 80.2707 }
    },
    { 
        id: "TRK-016", 
        license: "GJ-16-CC-1234", 
        driver: "Hiren Patel", 
        status: "maintenance", 
        location: "Ahmedabad", 
        product: "Machinery", 
        goodsType: "Oversized", 
        customerId: "CUST-779", 
        lastUpdate: "1 hour ago",
        mileage: 195000,
        health: "Critical",
        coordinates: { lat: 23.0225, lng: 72.5714 }
    },
    { 
        id: "TRK-017", 
        license: "WB-17-DD-5678", 
        driver: "Somnath Banerjee", 
        status: "delayed", 
        location: "Kolkata", 
        product: "Agricultural Products", 
        goodsType: "Perishable", 
        customerId: "CUST-885", 
        lastUpdate: "35 min ago",
        mileage: 132000,
        health: "Warning",
        coordinates: { lat: 22.5726, lng: 88.3639 }
    },
    { 
        id: "TRK-018", 
        license: "RJ-18-EE-9012", 
        driver: "Mahendra Singh", 
        status: "active", 
        location: "Jaipur", 
        product: "Handicrafts", 
        goodsType: "Fragile", 
        customerId: "CUST-991", 
        lastUpdate: "9 min ago",
        mileage: 72000,
        health: "Good",
        coordinates: { lat: 26.9124, lng: 75.7873 }
    },
    { 
        id: "TRK-019", 
        license: "UP-19-FF-3456", 
        driver: "Alok Singh", 
        status: "idle", 
        location: "Lucknow", 
        product: "Furniture", 
        goodsType: "Oversized", 
        customerId: "CUST-112", 
        lastUpdate: "45 min ago",
        mileage: 98000,
        health: "Good",
        coordinates: { lat: 26.8467, lng: 80.9462 }
    },
    { 
        id: "TRK-020", 
        license: "TS-20-GG-7890", 
        driver: "Venkat Reddy", 
        status: "active", 
        location: "Hyderabad", 
        product: "IT Equipment", 
        goodsType: "High Value", 
        customerId: "CUST-223", 
        lastUpdate: "6 min ago",
        mileage: 56000,
        health: "Good",
        coordinates: { lat: 17.3850, lng: 78.4867 }
    },
    { 
        id: "TRK-021", 
        license: "MH-21-HH-1234", 
        driver: "Prakash Nair", 
        status: "active", 
        location: "Pune", 
        product: "Automotive Parts", 
        goodsType: "General Cargo", 
        customerId: "CUST-334", 
        lastUpdate: "11 min ago",
        mileage: 89000,
        health: "Good",
        coordinates: { lat: 18.5204, lng: 73.8567 }
    },
    { 
        id: "TRK-022", 
        license: "DL-22-II-5678", 
        driver: "Vikas Malhotra", 
        status: "maintenance", 
        location: "Delhi", 
        product: "Construction Material", 
        goodsType: "Dry Bulk", 
        customerId: "CUST-445", 
        lastUpdate: "3 hours ago",
        mileage: 210000,
        health: "Critical",
        coordinates: { lat: 28.7041, lng: 77.1025 }
    },
    { 
        id: "TRK-023", 
        license: "KA-23-JJ-9012", 
        driver: "Ramesh Iyer", 
        status: "active", 
        location: "Bangalore", 
        product: "Electronics", 
        goodsType: "Fragile", 
        customerId: "CUST-556", 
        lastUpdate: "4 min ago",
        mileage: 63000,
        health: "Good",
        coordinates: { lat: 12.9716, lng: 77.5946 }
    },
    { 
        id: "TRK-024", 
        license: "GJ-24-KK-3456", 
        driver: "Nitin Desai", 
        status: "delayed", 
        location: "Ahmedabad", 
        product: "Chemicals", 
        goodsType: "Hazardous", 
        customerId: "CUST-667", 
        lastUpdate: "50 min ago",
        mileage: 143000,
        health: "Warning",
        coordinates: { lat: 23.0225, lng: 72.5714 }
    },
    { 
        id: "TRK-025", 
        license: "WB-25-LL-7890", 
        driver: "Arun Chatterjee", 
        status: "active", 
        location: "Kolkata", 
        product: "Pharmaceuticals", 
        goodsType: "Temperature Controlled", 
        customerId: "CUST-778", 
        lastUpdate: "13 min ago",
        mileage: 76000,
        health: "Good",
        coordinates: { lat: 22.5726, lng: 88.3639 }
    }
];

// Global variables
let currentMap = null;
let currentMarker = null;
let scene, camera, renderer, controls, truckModel;
let isThreeJSInitialized = false;

// ========== ANIMATION EFFECTS ==========
// Add ripple effect to all buttons
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.btn, .quick-btn, .predict-btn, .truck-actions button').forEach(button => {
        button.classList.add('ripple');
        
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(67, 97, 238, 0.3);
                transform: scale(0);
                animation: ripple-animation 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Add animation for ripple effect
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
});

// ========== THEME TOGGLE FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const currentTheme = localStorage.getItem('theme') || 'light';

    // Set initial theme
    document.body.setAttribute('data-theme', currentTheme);
    themeToggle.checked = currentTheme === 'dark';

    // Theme toggle event
    themeToggle.addEventListener('change', () => {
        const newTheme = themeToggle.checked ? 'dark' : 'light';

        // Apply new theme
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        // Update Three.js scene if it exists
        if (isThreeJSInitialized && scene) {
            scene.background = newTheme === 'dark'
                ? new THREE.Color(0x0b0f0d)
                : new THREE.Color(0xf6f7fb);
        }

        // Show notification
        showNotification(`Switched to ${newTheme} theme`, 'success');
    });
});

// ========== INITIALIZE THREE.JS ==========
function initThreeJS() {
    if (isThreeJSInitialized) return;
    
    const container = document.getElementById('truckVisualization');
    if (!container) return;
    
    try {
        // Get current theme
        const currentTheme = document.body.getAttribute('data-theme');
        
        // Scene
        scene = new THREE.Scene();
        scene.background = currentTheme === 'dark' 
            ? new THREE.Color(0x0b0f0d) 
            : new THREE.Color(0xf6f7fb);
        
        // Camera
        camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(8, 8, 8);
        
        // Renderer
        renderer = new THREE.WebGLRenderer({ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);
        
        // Controls
        controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
        directionalLight.position.set(10, 20, 5);
        scene.add(directionalLight);
        
        // Create truck fleet visualization
        createTruckFleet();
        
        // Add a grid helper
        const gridColor = currentTheme === 'dark' ? 0x152a1c : 0x8ea199;
        const gridHelper = new THREE.GridHelper(20, 20, gridColor, gridColor);
        scene.add(gridHelper);
        
        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            
            controls.update();
            
            // Animate trucks
            scene.traverse(function(object) {
                if (object.userData.isTruck) {
                    object.rotation.y += 0.01;
                    object.position.y = Math.sin(Date.now() * 0.001 + object.userData.offset) * 0.1;
                }
            });
            
            renderer.render(scene, camera);
        }
        
        animate();
        
        // Handle window resize
        window.addEventListener('resize', function() {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        });
        
        isThreeJSInitialized = true;
        console.log('Three.js initialized successfully');
    } catch (error) {
        console.error('Three.js initialization error:', error);
        container.innerHTML = '<div style="color: var(--text-primary); padding: 2rem; text-align: center;">3D Visualization failed to load. Please refresh the page.</div>';
    }
}

function createTruckFleet() {
    const group = new THREE.Group();
    
    // Create multiple trucks
    for (let i = 0; i < 10; i++) {
        const truck = createSingleTruck();
        truck.position.x = (Math.random() - 0.5) * 15;
        truck.position.z = (Math.random() - 0.5) * 15;
        truck.userData = { isTruck: true, offset: Math.random() * Math.PI * 2 };
        group.add(truck);
    }
    
    scene.add(group);
}

function createSingleTruck() {
    const group = new THREE.Group();
    const currentTheme = document.body.getAttribute('data-theme');
    
    // Truck body (main part)
    const bodyGeometry = new THREE.BoxGeometry(2, 1.2, 1);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: currentTheme === 'dark' ? 0x20d24a : 0x20d24a,
        shininess: 100 
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.position.y = 0.6;
    group.add(body);
    
    // Truck cabin
    const cabinGeometry = new THREE.BoxGeometry(1, 1, 1);
    const cabinMaterial = new THREE.MeshPhongMaterial({ 
        color: currentTheme === 'dark' ? 0x12a63a : 0x12a63a,
        shininess: 100 
    });
    const cabin = new THREE.Mesh(cabinGeometry, cabinMaterial);
    cabin.position.set(-1.5, 1, 0);
    group.add(cabin);
    
    // Wheels
    const wheelGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.2, 16);
    const wheelMaterial = new THREE.MeshPhongMaterial({ 
        color: currentTheme === 'dark' ? 0x0b2e1a : 0x0b2e1a 
    });
    
    // Front wheels
    const wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel1.rotation.z = Math.PI / 2;
    wheel1.position.set(-1.8, 0.3, 0.6);
    group.add(wheel1);
    
    const wheel2 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel2.rotation.z = Math.PI / 2;
    wheel2.position.set(-1.8, 0.3, -0.6);
    group.add(wheel2);
    
    // Back wheels
    const wheel3 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel3.rotation.z = Math.PI / 2;
    wheel3.position.set(1.2, 0.3, 0.6);
    group.add(wheel3);
    
    const wheel4 = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel4.rotation.z = Math.PI / 2;
    wheel4.position.set(1.2, 0.3, -0.6);
    group.add(wheel4);
    
    // Add glow effect
    const glowGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const glowMaterial = new THREE.MeshBasicMaterial({ 
        color: currentTheme === 'dark' ? 0xf6c90e : 0xf6c90e, 
        transparent: true, 
        opacity: 0.3 
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    glow.position.set(0, 1.5, 0);
    group.add(glow);
    
    return group;
}

// ========== PANEL NAVIGATION ==========
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            // Update active nav item
            document.querySelectorAll('.nav-item').forEach(nav => {
                nav.classList.remove('active');
            });
            this.classList.add('active');
            
            // Get panel to show
            const panelId = this.getAttribute('data-panel');
            let panelTitle = this.querySelector('span').textContent;
            
            // Update panel title
            document.getElementById('panelTitle').textContent = panelTitle;
            
            // Hide all panels
            document.querySelectorAll('.content-panel').forEach(panel => {
                panel.classList.remove('active');
            });
            
            // Show selected panel
            document.getElementById(`${panelId}-panel`).classList.add('active');
            
            // Show notification
            showNotification(`Switched to ${panelTitle}`, 'success');
            
            // Initialize Three.js if needed
            if (panelId === 'demand') {
                setTimeout(initThreeJS, 100);
            }
            
            // Render trucks if trucks panel
            if (panelId === 'trucks') {
                renderAllTrucks();
            }
        });
    });
});

// ========== REFRESH BUTTON ==========
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('refreshBtn').addEventListener('click', function() {
        const btn = this;
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="spinner"></span> Refreshing...';
        btn.disabled = true;
        
        setTimeout(() => {
            updateDashboardStats(true);
            updateTruckDataRandomly();
            
            if (document.getElementById('trucks-panel').classList.contains('active')) {
                renderAllTrucks();
                showNotification('Truck list refreshed with updated data', 'success');
            }
            
            if (document.getElementById('health-panel').classList.contains('active')) {
                showNotification('Health prediction data refreshed', 'success');
            }
            
            if (document.getElementById('demand-panel').classList.contains('active')) {
                const forecastBtn = document.getElementById('forecastBtn');
                if (forecastBtn) forecastBtn.click();
            }
            
            btn.innerHTML = originalText;
            btn.disabled = false;
            showNotification('All data refreshed successfully', 'success');
        }, 1500);
    });
});

// ========== EXPORT BUTTON ==========
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('exportBtn').addEventListener('click', function() {
        const panelId = document.querySelector('.content-panel.active').id.replace('-panel', '');
        let fileName = `logistics_${panelId}_${new Date().toISOString().split('T')[0]}`;
        
        showNotification(`Exporting ${panelId} data...`, 'success');
        
        setTimeout(() => {
            const link = document.createElement('a');
            link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent('Sample export data for ' + panelId);
            link.download = fileName + '.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            showNotification(`Data exported as ${fileName}.csv`, 'success');
        }, 1000);
    });
});

function updateTruckDataRandomly() {
    truckDatabase.forEach(truck => {
        if (Math.random() > 0.7) {
            const statuses = ['active', 'delayed', 'idle'];
            truck.status = statuses[Math.floor(Math.random() * statuses.length)];
        }
        
        const minutes = Math.floor(Math.random() * 60);
        truck.lastUpdate = `${minutes} min ago`;
    });
}

function updateDashboardStats(refresh = false) {
    const totalTrucks = truckDatabase.length;
    const activeTrucks = truckDatabase.filter(t => t.status === 'active').length;
    const delayedTrucks = truckDatabase.filter(t => t.status === 'delayed').length;
    const maintenanceTrucks = truckDatabase.filter(t => t.status === 'maintenance').length;
    
    const onTimeDelivery = Math.floor(85 + Math.random() * 15);
    const avgDeliveryTime = (2.5 + Math.random() * 1.5).toFixed(1);
    
    document.getElementById('totalTrucks').textContent = totalTrucks;
    document.getElementById('activeTrucks').textContent = activeTrucks;
    document.getElementById('delayedTrucks').textContent = delayedTrucks;
    document.getElementById('maintenanceTrucks').textContent = maintenanceTrucks;
    document.getElementById('onTimeDelivery').textContent = `${onTimeDelivery}%`;
    document.getElementById('avgDeliveryTime').textContent = avgDeliveryTime;
}

// ========== TRUCK HEALTH PREDICTION ==========
document.addEventListener('DOMContentLoaded', function() {
    const vibrationSlider = document.getElementById('vibration');
    const vibrationValue = document.getElementById('vibrationValue');
    const brakeWearSlider = document.getElementById('brakeWear');
    const brakeWearValue = document.getElementById('brakeWearValue');
    const oilQualitySlider = document.getElementById('oilQuality');
    const oilQualityValue = document.getElementById('oilQualityValue');
    const demandSlider = document.getElementById('demandIndex');
    const demandValue = document.getElementById('demandValue');
    
    if (vibrationSlider) vibrationSlider.addEventListener('input', function() {
        vibrationValue.textContent = this.value;
    });
    
    if (brakeWearSlider) brakeWearSlider.addEventListener('input', function() {
        brakeWearValue.textContent = `${this.value}%`;
    });
    
    if (oilQualitySlider) oilQualitySlider.addEventListener('input', function() {
        oilQualityValue.textContent = `${this.value}%`;
    });
    
    if (demandSlider) demandSlider.addEventListener('input', function() {
        demandValue.textContent = parseFloat(this.value).toFixed(2);
    });
    
    // Load example data
    document.getElementById('loadCriticalBtn').addEventListener('click', function() {
        loadExampleData('critical');
        showNotification('Critical example loaded', 'warning');
    });
    
    document.getElementById('loadWarningBtn').addEventListener('click', function() {
        loadExampleData('warning');
        showNotification('Warning example loaded', 'warning');
    });
    
    document.getElementById('loadGoodBtn').addEventListener('click', function() {
        loadExampleData('good');
        showNotification('Good example loaded', 'success');
    });
});

function loadExampleData(type) {
    const examples = {
        critical: {
            company: 'Amazon India',
            area: 'North',
            mileage: '280000',
            engineTemp: '102',
            vibration: '4.2',
            fuelEff: '3.1',
            brakeWear: '78',
            oilQuality: '42',
            faultCodes: '4'
        },
        warning: {
            company: 'DHL Supply Chain',
            area: 'West',
            mileage: '150000',
            engineTemp: '85',
            vibration: '2.5',
            fuelEff: '5.0',
            brakeWear: '45',
            oilQuality: '85',
            faultCodes: '1'
        },
        good: {
            company: 'Blue Dart',
            area: 'South',
            mileage: '80000',
            engineTemp: '75',
            vibration: '1.2',
            fuelEff: '6.5',
            brakeWear: '25',
            oilQuality: '95',
            faultCodes: '0'
        }
    };
    
    const data = examples[type];
    
    document.getElementById('company').value = data.company;
    document.getElementById('area').value = data.area;
    document.getElementById('mileage').value = data.mileage;
    document.getElementById('engineTemp').value = data.engineTemp;
    document.getElementById('vibration').value = data.vibration;
    document.getElementById('vibrationValue').textContent = data.vibration;
    document.getElementById('fuelEff').value = data.fuelEff;
    document.getElementById('brakeWear').value = data.brakeWear;
    document.getElementById('brakeWearValue').textContent = `${data.brakeWear}%`;
    document.getElementById('oilQuality').value = data.oilQuality;
    document.getElementById('oilQualityValue').textContent = `${data.oilQuality}%`;
    document.getElementById('faultCodes').value = data.faultCodes;
}

// Predict health status
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('predictBtn').addEventListener('click', function() {
        const inputs = {
            company: document.getElementById('company').value,
            area: document.getElementById('area').value,
            mileage: parseInt(document.getElementById('mileage').value),
            engineTemp: parseInt(document.getElementById('engineTemp').value),
            vibration: parseFloat(document.getElementById('vibration').value),
            fuelEff: parseFloat(document.getElementById('fuelEff').value),
            brakeWear: parseInt(document.getElementById('brakeWear').value),
            oilQuality: parseInt(document.getElementById('oilQuality').value),
            faultCodes: parseInt(document.getElementById('faultCodes').value)
        };
        
        if (!validateHealthInputs(inputs)) {
            return;
        }
        
        const btn = document.getElementById('predictBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<span class="spinner"></span> Analyzing...';
        btn.disabled = true;
        
        setTimeout(() => {
            const prediction = predictHealth(inputs);
            displayResults(prediction, inputs);
            
            btn.innerHTML = originalText;
            btn.disabled = false;
            
            showNotification(`Prediction complete: ${prediction.status} status detected`, 'success');
        }, 1000);
    });
});

function validateHealthInputs(inputs) {
    if (inputs.mileage < 0 || inputs.mileage > 1000000) {
        showNotification('Mileage must be between 0 and 1,000,000 km', 'error');
        return false;
    }
    
    if (inputs.engineTemp < 0 || inputs.engineTemp > 200) {
        showNotification('Engine temperature must be between 0 and 200°C', 'error');
        return false;
    }
    
    if (inputs.faultCodes < 0 || inputs.faultCodes > 20) {
        showNotification('Fault codes must be between 0 and 20', 'error');
        return false;
    }
    
    return true;
}

function predictHealth(inputs) {
    let riskScore = 0;
    
    if (inputs.mileage > 250000) riskScore += 30;
    else if (inputs.mileage > 150000) riskScore += 15;
    else if (inputs.mileage < 50000) riskScore -= 10;
    
    if (inputs.engineTemp > 100) riskScore += 25;
    else if (inputs.engineTemp > 90) riskScore += 10;
    else if (inputs.engineTemp < 80) riskScore -= 5;
    
    if (inputs.vibration > 4.0) riskScore += 20;
    else if (inputs.vibration > 3.0) riskScore += 10;
    else if (inputs.vibration < 2.0) riskScore -= 5;
    
    if (inputs.fuelEff < 3.0) riskScore += 15;
    else if (inputs.fuelEff < 4.0) riskScore += 8;
    else if (inputs.fuelEff > 5.0) riskScore -= 5;
    
    if (inputs.brakeWear > 70) riskScore += 25;
    else if (inputs.brakeWear > 50) riskScore += 12;
    else if (inputs.brakeWear < 30) riskScore -= 8;
    
    if (inputs.oilQuality < 50) riskScore += 20;
    else if (inputs.oilQuality < 70) riskScore += 10;
    else if (inputs.oilQuality > 85) riskScore -= 5;
    
    riskScore += inputs.faultCodes * 8;
    
    let status;
    let criticalProb, warningProb, goodProb;
    
    if (riskScore > 50) {
        status = 'Critical';
        criticalProb = Math.min(95, 30 + riskScore);
        warningProb = 100 - criticalProb - 2;
        goodProb = 2;
    } else if (riskScore > 25) {
        status = 'Warning';
        warningProb = Math.min(85, 40 + riskScore);
        criticalProb = Math.max(5, riskScore - 25);
        goodProb = 100 - warningProb - criticalProb;
    } else {
        status = 'Good';
        goodProb = Math.min(95, 80 - riskScore);
        warningProb = 100 - goodProb - 2;
        criticalProb = 2;
    }
    
    return {
        status: status,
        criticalProbability: criticalProb,
        warningProbability: warningProb,
        goodProbability: goodProb,
        riskScore: Math.round(riskScore)
    };
}

function displayResults(prediction, inputs) {
    const resultSection = document.getElementById('resultSection');
    const statusIcon = document.getElementById('statusIcon');
    const resultTitle = document.getElementById('resultTitle');
    const resultMessage = document.getElementById('resultMessage');
    
    resultSection.style.display = 'block';
    resultSection.className = 'card result-section ' + prediction.status.toLowerCase();
    
    if (prediction.status === 'Critical') {
        statusIcon.innerHTML = '<i class="fas fa-exclamation-circle"></i>';
        resultTitle.textContent = '🚨 CRITICAL HEALTH STATUS';
        resultMessage.innerHTML = `
            <strong>🚨 IMMEDIATE MAINTENANCE REQUIRED!</strong><br><br>
            This truck is in critical condition and requires urgent attention.<br>
            <strong>Recommended Actions:</strong>
            <ul>
                <li>Schedule immediate maintenance inspection</li>
                <li>Check engine and braking systems</li>
                <li>Review all fault codes</li>
                <li>Do not operate until inspected</li>
            </ul>
        `;
    } else if (prediction.status === 'Warning') {
        statusIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
        resultTitle.textContent = '⚠️ WARNING HEALTH STATUS';
        resultMessage.innerHTML = `
            <strong>⚠️ PREVENTIVE MAINTENANCE RECOMMENDED</strong><br><br>
            This truck shows warning signs and needs preventive maintenance soon.<br>
            <strong>Recommended Actions:</strong>
            <ul>
                <li>Schedule maintenance within 2 weeks</li>
                <li>Monitor key metrics regularly</li>
                <li>Check oil quality and brake wear</li>
                <li>Review maintenance history</li>
            </ul>
        `;
    } else {
        statusIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
        resultTitle.textContent = '✅ GOOD HEALTH STATUS';
        resultMessage.innerHTML = `
            <strong>✅ NORMAL OPERATING CONDITION</strong><br><br>
            This truck is in good condition and operating normally.<br>
            <strong>Recommendations:</strong>
            <ul>
                <li>Continue regular maintenance schedule</li>
                <li>Monitor performance indicators</li>
                <li>Schedule next routine check in 3 months</li>
            </ul>
        `;
    }
    
    document.getElementById('criticalConfidence').textContent = `${prediction.criticalProbability.toFixed(1)}%`;
    document.getElementById('warningConfidence').textContent = `${prediction.warningProbability.toFixed(1)}%`;
    document.getElementById('goodConfidence').textContent = `${prediction.goodProbability.toFixed(1)}%`;
    document.getElementById('riskScore').textContent = prediction.riskScore;
    
    resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ========== TRUCK DEMAND FORECAST ==========
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('forecastBtn').addEventListener('click', function() {
        const inputData = {
            company: document.getElementById('demandCompany').value,
            area: document.getElementById('demandArea').value,
            season: document.getElementById('season').value,
            vehicleType: document.getElementById('vehicleType').value,
            year: parseInt(document.getElementById('year').value),
            demandIndex: parseFloat(document.getElementById('demandIndex').value)
        };
        
        document.getElementById('detailCompany').textContent = inputData.company;
        document.getElementById('detailArea').textContent = inputData.area;
        document.getElementById('detailSeason').textContent = inputData.season;
        document.getElementById('detailVehicle').textContent = inputData.vehicleType;
        document.getElementById('detailYear').textContent = inputData.year;
        document.getElementById('detailDemand').textContent = inputData.demandIndex.toFixed(2);
        
        const btn = document.getElementById('forecastBtn');
        const originalBtnText = btn.innerHTML;
        btn.innerHTML = '<span class="spinner"></span> Calculating...';
        btn.disabled = true;
        
        document.getElementById('predictionValue').textContent = "...";
        document.getElementById('predictionLabel').textContent = "Calculating forecast...";
        
        setTimeout(() => {
            const prediction = predictVehicleRequirement(inputData);
            
            animateNumber(document.getElementById('predictionValue'), prediction);
            
            let labelText = "Vehicles Required";
            let intensity = "";
            if (prediction < 100) {
                labelText = "Low Demand";
                intensity = "low";
            } else if (prediction < 150) {
                labelText = "Moderate Demand";
                intensity = "moderate";
            } else if (prediction < 200) {
                labelText = "High Demand";
                intensity = "high";
            } else {
                labelText = "Very High Demand";
                intensity = "very high";
            }
            
            document.getElementById('predictionLabel').textContent = `${labelText} (${intensity})`;
            
            btn.innerHTML = originalBtnText;
            btn.disabled = false;
            
            showNotification(`Demand forecast generated: ${prediction} vehicles required`, 'success');
        }, 800);
    });
});

function predictVehicleRequirement(inputData) {
    const companyBase = {
        "Amazon India": 145,
        "Flipkart": 140,
        "Reliance Retail": 130,
        "Blue Dart": 100
    };
    
    const areaMultiplier = {
        "North": 1.2,
        "South": 1.0,
        "East": 0.9,
        "West": 1.1
    };
    
    const seasonMultiplier = {
        "Winter": 0.9,
        "Summer": 1.0,
        "Monsoon": 1.1,
        "Festive": 1.5
    };
    
    const vehicleMultiplier = {
        "Mini Truck": 0.8,
        "Truck": 1.0,
        "Container": 1.3
    };
    
    const yearAdjustment = 1 + (inputData.year - 2020) * 0.03;
    
    let prediction = companyBase[inputData.company] || 120;
    prediction *= areaMultiplier[inputData.area] || 1.0;
    prediction *= seasonMultiplier[inputData.season] || 1.0;
    prediction *= vehicleMultiplier[inputData.vehicleType] || 1.0;
    prediction *= yearAdjustment;
    prediction *= inputData.demandIndex;
    
    prediction += (Math.random() * 30 - 15);
    
    return Math.max(50, Math.round(prediction));
}

function animateNumber(element, targetValue, duration = 800) {
    const startValue = parseInt(element.textContent) || 0;
    const increment = (targetValue - startValue) / (duration / 16);
    let current = startValue;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= targetValue) || 
            (increment < 0 && current <= targetValue)) {
            element.textContent = targetValue;
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// ========== TRUCK SEARCH & LIST ==========
function renderAllTrucks() {
    const trucksGrid = document.getElementById('trucksGrid');
    if (!trucksGrid) return;
    
    trucksGrid.innerHTML = '';
    
    truckDatabase.forEach(truck => {
        const truckCard = createTruckCard(truck);
        trucksGrid.appendChild(truckCard);
    });
}

function createTruckCard(truck) {
    const truckCard = document.createElement('div');
    truckCard.className = 'card truck-card';
    truckCard.dataset.truckId = truck.id;
    
    let statusClass = '';
    let statusText = '';
    
    if (truck.status === 'active') {
        statusClass = 'status-active';
        statusText = 'Active';
    } else if (truck.status === 'delayed') {
        statusClass = 'status-delayed';
        statusText = 'Delayed';
    } else if (truck.status === 'maintenance') {
        statusClass = 'status-maintenance';
        statusText = 'Maintenance';
    } else {
        statusClass = 'status-idle';
        statusText = 'Idle';
    }
    
    truckCard.innerHTML = `
        <div class="card-body">
            <div class="truck-header">
                <div class="truck-id">${truck.id}</div>
                <div class="truck-status ${statusClass}">${statusText}</div>
            </div>
            <div class="truck-info">
                <div class="truck-info-item">
                    <span class="info-label">License</span>
                    <span class="info-value">${truck.license}</span>
                </div>
                <div class="truck-info-item">
                    <span class="info-label">Driver</span>
                    <span class="info-value">${truck.driver}</span>
                </div>
                <div class="truck-info-item">
                    <span class="info-label">Location</span>
                    <span class="info-value">${truck.location}</span>
                </div>
                <div class="truck-info-item">
                    <span class="info-label">Product</span>
                    <span class="info-value">${truck.product}</span>
                </div>
                <div class="truck-info-item">
                    <span class="info-label">Customer ID</span>
                    <span class="info-value">${truck.customerId}</span>
                </div>
                <div class="truck-info-item">
                    <span class="info-label">Last Update</span>
                    <span class="info-value">${truck.lastUpdate}</span>
                </div>
            </div>
            <div class="truck-actions">
                <button class="primary ripple view-track-btn" data-truck-id="${truck.id}">
                    <i class="fas fa-map-marker-alt"></i> View & Track
                </button>
            </div>
        </div>
    `;
    
    truckCard.addEventListener('click', function(e) {
        if (!e.target.closest('.truck-actions button')) {
            showTruckDetails(truck.id);
        }
    });
    
    truckCard.querySelector('.view-track-btn').addEventListener('click', function(e) {
        e.stopPropagation();
        showTruckDetails(truck.id);
    });
    
    return truckCard;
}

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchTruckBtn').addEventListener('click', searchTruck);
    document.getElementById('truckSearch').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchTruck();
        }
    });
    
    document.getElementById('clearSearchBtn').addEventListener('click', function() {
        document.getElementById('truckSearch').value = '';
        renderAllTrucks();
        showNotification('Search cleared', 'success');
    });
});

function searchTruck() {
    const searchQuery = document.getElementById('truckSearch').value.trim().toUpperCase();
    const trucksGrid = document.getElementById('trucksGrid');
    
    if (!searchQuery) {
        renderAllTrucks();
        showNotification('Showing all trucks', 'info');
        return;
    }
    
    const filteredTrucks = truckDatabase.filter(truck => 
        truck.id.includes(searchQuery) || 
        truck.license.includes(searchQuery)
    );
    
    trucksGrid.innerHTML = '';
    
    if (filteredTrucks.length === 0) {
        trucksGrid.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-search"></i>
                <h3>No trucks found</h3>
                <p>No trucks found matching "${searchQuery}"</p>
                <button class="btn btn-outline ripple" style="margin-top: 1rem;" onclick="renderAllTrucks()">
                    Show All Trucks
                </button>
            </div>
        `;
        showNotification(`No trucks found for "${searchQuery}"`, 'warning');
        return;
    }
    
    filteredTrucks.forEach(truck => {
        const truckCard = createTruckCard(truck);
        trucksGrid.appendChild(truckCard);
    });
    
    showNotification(`Found ${filteredTrucks.length} truck(s)`, 'success');
}

// Show truck details in modal
function showTruckDetails(truckId) {
    const truck = truckDatabase.find(t => t.id === truckId);
    if (!truck) return;
    
    document.getElementById('modalTruckId').textContent = truck.id;
    document.getElementById('modalStatus').textContent = truck.status.charAt(0).toUpperCase() + truck.status.slice(1);
    document.getElementById('modalLocation').textContent = truck.location;
    document.getElementById('modalDriver').textContent = truck.driver;
    document.getElementById('modalProduct').textContent = truck.product;
    document.getElementById('modalGoodsType').textContent = truck.goodsType;
    document.getElementById('modalCustomerId').textContent = truck.customerId;
    document.getElementById('modalLicense').textContent = truck.license;
    document.getElementById('modalMileage').textContent = truck.mileage.toLocaleString() + ' km';
    document.getElementById('modalHealth').textContent = truck.health;
    document.getElementById('modalHealth').style.color = 
        truck.health === 'Good' ? 'var(--success)' : 
        truck.health === 'Warning' ? 'var(--warning)' : 'var(--danger)';
    
    document.getElementById('truckDetailsModal').classList.add('active');
    
    setTimeout(() => {
        initMap(truck.coordinates, truck.location);
    }, 100);
}

// Initialize Google Map
function initMap(coordinates, location) {
    const mapElement = document.getElementById('truckMap');
    if (!mapElement) return;
    
    if (currentMap) {
        currentMap.setCenter(coordinates);
        if (currentMarker) {
            currentMarker.setPosition(coordinates);
        }
        return;
    }
    
    try {
        const currentTheme = document.body.getAttribute('data-theme');
        const mapStyles = currentTheme === 'dark' ? [
            { elementType: "geometry", stylers: [{ color: "#0f1f14" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#0f1f14" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#a8b5ad" }] },
            {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#20d24a" }]
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#20d24a" }]
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#152a1c" }]
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#a8b5ad" }]
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#1a2e22" }]
            },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#152a1c" }]
            },
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#b6c2bb" }]
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#1a2e22" }]
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#152a1c" }]
            },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f2f5f0" }]
            },
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#152a1c" }]
            },
            {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#f6c90e" }]
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#0b0f0d" }]
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#b6c2bb" }]
            },
            {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#0b0f0d" }]
            }
        ] : [
            { elementType: "geometry", stylers: [{ color: "#f6f7fb" }] },
            { elementType: "labels.text.stroke", stylers: [{ color: "#f6f7fb" }] },
            { elementType: "labels.text.fill", stylers: [{ color: "#4a5568" }] },
            {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{ color: "#20d24a" }]
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{ color: "#20d24a" }]
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{ color: "#eef2f7" }]
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{ color: "#4a5568" }]
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{ color: "#ffffff" }]
            },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#e2e8f0" }]
            },
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca3af" }]
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{ color: "#dfe7e2" }]
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{ color: "#e2e8f0" }]
            },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{ color: "#6b7280" }]
            },
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{ color: "#eef2f7" }]
            },
            {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{ color: "#0b2e1a" }]
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#e8f2ea" }]
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{ color: "#9ca3af" }]
            },
            {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{ color: "#e8f2ea" }]
            }
        ];
        
        const map = new google.maps.Map(mapElement, {
            center: coordinates,
            zoom: 12,
            styles: mapStyles
        });
        
        const marker = new google.maps.Marker({
            position: coordinates,
            map: map,
            title: location,
            icon: {
                url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png"
            }
        });
        
        const infoWindow = new google.maps.InfoWindow({
            content: `<div style="color: var(--text-primary); padding: 10px;">
                <strong>${location}</strong><br>
                Truck ${(truckDatabase.find(t => t.coordinates.lat === coordinates.lat && t.coordinates.lng === coordinates.lng) || {}).id || ''} is currently in this area
            </div>`
        });
        
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
        
        currentMap = map;
        currentMarker = marker;
    } catch (error) {
        console.error('Google Maps error:', error);
        mapElement.innerHTML = '<div style="color: var(--text-primary); padding: 2rem; text-align: center;">Map failed to load. Please check your internet connection.</div>';
    }
}

// Close truck modal
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('closeModalBtn').addEventListener('click', function() {
        document.getElementById('truckDetailsModal').classList.remove('active');
    });
    
    document.getElementById('truckDetailsModal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
});

// ========== REPORTS DOWNLOAD ==========
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.download-report').forEach(btn => {
        btn.addEventListener('click', function() {
            const reportType = this.getAttribute('data-report');
            const reportName = this.closest('.report-item').querySelector('.report-title').textContent;
            
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="spinner"></span> Downloading...';
            this.disabled = true;
            
            setTimeout(() => {
                // Create a proper PDF download
                const pdfContent = `
                    %PDF-1.4
                    1 0 obj
                    << /Type /Catalog /Pages 2 0 R >>
                    endobj
                    2 0 obj
                    << /Type /Pages /Kids [3 0 R] /Count 1 >>
                    endobj
                    3 0 obj
                    << /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>
                    endobj
                    4 0 obj
                    << /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
                    endobj
                    5 0 obj
                    << /Length 100 >>
                    stream
                    BT
                    /F1 24 Tf
                    100 700 Td
                    (${reportName}) Tj
                    0 -48 Td
                    /F1 12 Tf
                    (Generated: ${new Date().toLocaleDateString()}) Tj
                    0 -24 Td
                    (Logistics Manager Report) Tj
                    0 -24 Td
                    (This is a sample PDF report generated for demonstration purposes.) Tj
                    ET
                    endstream
                    endobj
                    xref
                    0 6
                    0000000000 65535 f
                    0000000010 00000 n
                    0000000056 00000 n
                    0000000110 00000 n
                    0000000223 00000 n
                    0000000278 00000 n
                    trailer
                    << /Size 6 /Root 1 0 R >>
                    startxref
                    387
                    %%EOF
                `;
                
                const blob = new Blob([pdfContent], { type: 'application/pdf' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `${reportName.replace(/\s+/g, '_')}.pdf`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                
                this.innerHTML = originalText;
                this.disabled = false;
                
                showNotification(`"${reportName}" downloaded successfully`, 'success');
            }, 1500);
        });
    });
});

// ========== SETTINGS EDIT ==========
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.edit-setting').forEach(btn => {
        btn.addEventListener('click', function() {
            const settingType = this.getAttribute('data-setting');
            const settingTitle = this.closest('.setting-item').querySelector('.setting-title').textContent;
            
            const originalText = this.innerHTML;
            this.innerHTML = '<span class="spinner"></span> Opening...';
            this.disabled = true;
            
            setTimeout(() => {
                openSettingsModal(settingType, settingTitle);
                
                this.innerHTML = originalText;
                this.disabled = false;
            }, 800);
        });
    });
});

function openSettingsModal(settingType, settingTitle) {
    document.getElementById('settingsModalTitle').textContent = settingTitle;
    
    let settingsContent = '';
    
    switch(settingType) {
        case 'notifications':
            settingsContent = `
                <h4 style="margin-bottom: 1rem; color: var(--text-secondary);">Notification Preferences</h4>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Email Notifications</label>
                        <select style="width: 100%; padding: 0.75rem; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); color: var(--text-primary);">
                            <option>All Notifications</option>
                            <option>Critical Only</option>
                            <option>Disabled</option>
                        </select>
                    </div>
                    <button class="btn btn-primary ripple" style="margin-top: 1rem; width: 100%;" onclick="saveSettings('notifications')">
                        Save Settings
                    </button>
                </div>
            `;
            break;
            
        default:
            settingsContent = `
                <h4 style="margin-bottom: 1rem; color: var(--text-secondary);">${settingTitle}</h4>
                <div style="display: flex; flex-direction: column; gap: 1rem;">
                    <p>Configuration interface for ${settingTitle.toLowerCase()} would be displayed here.</p>
                    <button class="btn btn-primary ripple" style="width: 100%;" onclick="saveSettings('${settingType}')">
                        Save Settings
                    </button>
                </div>
            `;
    }
    
    document.getElementById('settingsModalContent').innerHTML = settingsContent;
    document.getElementById('settingsModal').classList.add('active');
}

function saveSettings(settingType) {
    showNotification(`${settingType.charAt(0).toUpperCase() + settingType.slice(1)} settings saved successfully`, 'success');
    document.getElementById('settingsModal').classList.remove('active');
}

// Close settings modal
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('closeSettingsModalBtn').addEventListener('click', function() {
        document.getElementById('settingsModal').classList.remove('active');
    });
    
    document.getElementById('settingsModal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
});

// ========== MODAL BUTTON FUNCTIONALITY ==========
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('getDirectionsBtn').addEventListener('click', function() {
        showNotification('Opening directions in Google Maps...', 'success');
        window.open('https://www.google.com/maps/dir//Current+Location', '_blank');
    });
    
    document.getElementById('callDriverBtn').addEventListener('click', function() {
        showNotification('Calling driver...', 'success');
    });
});

// ========== NOTIFICATION SYSTEM ==========
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const icon = notification.querySelector('.notification-icon');
    const title = notification.querySelector('.notification-title');
    const msg = notification.querySelector('.notification-message');
    
    notification.className = `notification ${type}`;
    
    if (type === 'success') {
        icon.className = 'fas fa-check-circle notification-icon';
        title.textContent = 'Success';
    } else if (type === 'warning') {
        icon.className = 'fas fa-exclamation-triangle notification-icon';
        title.textContent = 'Warning';
    } else if (type === 'error') {
        icon.className = 'fas fa-exclamation-circle notification-icon';
        title.textContent = 'Error';
    } else {
        icon.className = 'fas fa-info-circle notification-icon';
        title.textContent = 'Info';
    }
    
    msg.textContent = message;
    
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// ========== INITIALIZE APPLICATION ==========
document.addEventListener('DOMContentLoaded', function() {
    // Initial opacity animation
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
        
        // Add entrance animation to cards
        document.querySelectorAll('.card').forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 100);
        });
        
        // Render initial trucks list
        renderAllTrucks();
        
        // Update dashboard stats
        updateDashboardStats();
        
        // Initialize demand slider
        const demandSlider = document.getElementById('demandIndex');
        const demandValue = document.getElementById('demandValue');
        if (demandValue && demandSlider) demandValue.textContent = demandSlider.value;
        
        // Show welcome notification
        setTimeout(() => {
            showNotification('Welcome to Logistics Manager Dashboard', 'success');
        }, 1000);
    }, 100);
});

// Smooth scroll behavior
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Gemini-backed decision brief (cached server-side in MongoDB).
document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('aiDecisionBtn');
    const out = document.getElementById('aiDecisionOutput');
    const status = document.getElementById('aiDecisionStatus');
    if (!btn || !out) return;

    function getToken() {
        try { return localStorage.getItem('logihub_jwt'); } catch { return null; }
    }

    function computeLocalKpis() {
        const total = truckDatabase.length;
        const active = truckDatabase.filter(t => t.status === 'active').length;
        const delayed = truckDatabase.filter(t => t.status === 'delayed').length;
        const maintenance = truckDatabase.filter(t => t.status === 'maintenance').length;
        const idle = truckDatabase.filter(t => t.status === 'idle').length;

        const hotspots = truckDatabase
            .filter(t => t.status === 'delayed' || t.status === 'maintenance')
            .slice(0, 6)
            .map(t => ({
                truckId: t.id,
                status: t.status,
                location: t.location,
                lastUpdate: t.lastUpdate,
                health: t.health
            }));

        return {
            kpis: {
                totalTrucks: total,
                activeTrucks: active,
                delayedTrucks: delayed,
                maintenanceTrucks: maintenance,
                idleTrucks: idle
            },
            hotspots
        };
    }

    btn.addEventListener('click', async function () {
        btn.disabled = true;
        if (status) status.textContent = 'Generating…';
        out.textContent = '';

        const ctx = computeLocalKpis();

        try {
            const headers = { 'Content-Type': 'application/json' };
            const token = getToken();
            if (token) headers.Authorization = `Bearer ${token}`;

            const res = await fetch('/api/ai/insight', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    type: 'manager_decision_intel',
                    context: ctx
                })
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok || !data || !data.ok) throw new Error('AI unavailable');

            out.textContent = String(data.text || '').trim();
            if (status) status.textContent = data.cached ? 'Cached result' : 'Fresh result';
        } catch (e) {
            out.textContent = 'AI brief unavailable right now. Try again later, or set GEMINI_API_KEY + MONGODB_URI on the backend for full intelligence + caching.';
            if (status) status.textContent = '';
        } finally {
            btn.disabled = false;
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('demandAiSummaryBtn');
    const out = document.getElementById('demandAiSummaryOutput');
    const status = document.getElementById('demandAiSummaryStatus');
    if (!btn || !out) return;

    function getToken() {
        try { return localStorage.getItem('logihub_jwt'); } catch { return null; }
    }

    function collectDemandContext() {
        const company = document.getElementById('demandCompany')?.value;
        const area = document.getElementById('demandArea')?.value;
        const season = document.getElementById('season')?.value;
        const vehicleType = document.getElementById('vehicleType')?.value;
        const year = document.getElementById('year')?.value;
        const demandIndex = document.getElementById('demandIndex')?.value;
        const predictedVehicles = document.getElementById('predictionValue')?.textContent;

        return {
            windowDays: 30,
            scenario: { company, area, season, vehicleType, year, demandIndex, predictedVehicles }
        };
    }

    btn.addEventListener('click', async function () {
        btn.disabled = true;
        if (status) status.textContent = 'Summarizing…';
        out.textContent = '';

        try {
            const headers = { 'Content-Type': 'application/json' };
            const token = getToken();
            if (token) headers.Authorization = `Bearer ${token}`;

            const res = await fetch('/api/ai/insight', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    type: 'demand_forecast_summary',
                    context: collectDemandContext()
                })
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok || !data || !data.ok) throw new Error('AI unavailable');

            out.textContent = String(data.text || '').trim();
            if (status) status.textContent = data.cached ? 'Cached result' : 'Fresh result';
        } catch (e) {
            out.textContent = 'AI demand summary unavailable. For full forecasting summaries, set GEMINI_API_KEY and MONGODB_URI so the backend can summarize real order aggregates.';
            if (status) status.textContent = '';
        } finally {
            btn.disabled = false;
        }
    });
});