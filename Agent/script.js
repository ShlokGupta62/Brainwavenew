// Indian Cities Data
const indianCities = [
    'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Surat',
    'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane', 'Bhopal', 'Visakhapatnam',
    'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad', 'Ludhiana', 'Agra', 'Nashik', 'Faridabad',
    'Meerut', 'Rajkot', 'Kalyan-Dombivli', 'Vasai-Virar', 'Varanasi', 'Srinagar', 'Aurangabad',
    'Dhanbad', 'Amritsar', 'Navi Mumbai', 'Allahabad', 'Ranchi', 'Howrah', 'Coimbatore', 'Jabalpur'
];

// Parse CSV functions
function parseCsvLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }

    result.push(current);
    return result.map(value => value.trim());
}

function parseCsv(text) {
    const lines = text.trim().split(/\r?\n/).filter(line => line.trim());
    const headers = parseCsvLine(lines[0]);

    return lines.slice(1).map(line => {
        const values = parseCsvLine(line);
        const row = {};
        headers.forEach((header, index) => {
            row[header] = values[index] ?? '';
        });
        return row;
    });
}

function normalizeList(value) {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    return String(value)
        .split(',')
        .map(item => item.trim())
        .filter(Boolean);
}

// Initialize Logistics System
class LogiHubSystem {
    constructor() {
        // Initialize from localStorage or use default data
        this.trucks = JSON.parse(localStorage.getItem("logihub-trucks")) || [
            {
                "id": "TRK-001",
                "regNo": "MH12AB1234",
                "type": "Container Truck",
                "capacity": "15.0 tons",
                "status": "available",
                "location": "Mumbai",
                "fuel": "Diesel",
                "owner": "National Freight Co.",
                "insurance": "2024-12-31",
                "fitness": "2024-12-31",
                "addedDate": "2024-01-01"
            },
            {
                "id": "TRK-002",
                "regNo": "DL01CD5678",
                "type": "Trailer",
                "capacity": "22.0 tons",
                "status": "on-trip",
                "location": "Delhi",
                "fuel": "Diesel",
                "owner": "Delhi Cargo Movers",
                "insurance": "2025-06-30",
                "fitness": "2025-06-30",
                "addedDate": "2024-01-03"
            },
            {
                "id": "TRK-003",
                "regNo": "KA05EF9012",
                "type": "Refrigerated Truck",
                "capacity": "12.0 tons",
                "status": "available",
                "location": "Bangalore",
                "fuel": "Diesel",
                "owner": "FreshChain Logistics",
                "insurance": "2025-03-15",
                "fitness": "2025-03-15",
                "addedDate": "2024-01-05"
            },
            {
                "id": "TRK-004",
                "regNo": "TS09GH3456",
                "type": "Lorry",
                "capacity": "10.0 tons",
                "status": "available",
                "location": "Hyderabad",
                "fuel": "CNG",
                "owner": "SouthLine Transport",
                "insurance": "2025-01-10",
                "fitness": "2025-01-10",
                "addedDate": "2024-01-06"
            },
            {
                "id": "TRK-005",
                "regNo": "TN10JK7890",
                "type": "Container Truck",
                "capacity": "18.0 tons",
                "status": "on-trip",
                "location": "Chennai",
                "fuel": "Diesel",
                "owner": "Coastal Freight Pvt Ltd",
                "insurance": "2025-02-28",
                "fitness": "2025-02-28",
                "addedDate": "2024-01-08"
            }
        ];

        this.drivers = JSON.parse(localStorage.getItem("logihub-drivers")) || [
            {
                "id": "DRV-001",
                "name": "Rajesh Kumar",
                "phone": "+91 9876543210",
                "license": "DL-123456789",
                "licenseType": "HCV",
                "experience": "8 years",
                "status": "available",
                "location": "Mumbai",
                "languages": ["Hindi", "English"],
                "preferredTrucks": ["Container", "Trailer"],
                "emergency": "Ramesh Kumar (+91 9876543211)",
                "addedDate": "2024-01-01"
            },
            {
                "id": "DRV-002",
                "name": "Vikram Singh",
                "phone": "+91 9988776655",
                "license": "DL-987654321",
                "licenseType": "HCV",
                "experience": "11 years",
                "status": "on-trip",
                "location": "Delhi",
                "languages": ["Hindi", "Punjabi"],
                "preferredTrucks": ["Trailer", "Container"],
                "emergency": "Suresh Singh (+91 9988776644)",
                "addedDate": "2024-01-03"
            },
            {
                "id": "DRV-003",
                "name": "Arjun Nair",
                "phone": "+91 9123456789",
                "license": "KA-556677889",
                "licenseType": "MCV",
                "experience": "6 years",
                "status": "available",
                "location": "Bangalore",
                "languages": ["Kannada", "English", "Hindi"],
                "preferredTrucks": ["Refrigerated", "Container"],
                "emergency": "Naveen Nair (+91 9123456790)",
                "addedDate": "2024-01-05"
            },
            {
                "id": "DRV-004",
                "name": "Mohd. Irfan",
                "phone": "+91 9012345678",
                "license": "TS-223344556",
                "licenseType": "MCV",
                "experience": "7 years",
                "status": "available",
                "location": "Hyderabad",
                "languages": ["Telugu", "Hindi", "English"],
                "preferredTrucks": ["Lorry", "Container"],
                "emergency": "Sajid Khan (+91 9012345670)",
                "addedDate": "2024-01-06"
            },
            {
                "id": "DRV-005",
                "name": "Sathish Kumar",
                "phone": "+91 9445566778",
                "license": "TN-334455667",
                "licenseType": "MCV",
                "experience": "5 years",
                "status": "on-trip",
                "location": "Chennai",
                "languages": ["Tamil", "English"],
                "preferredTrucks": ["Container", "Refrigerated"],
                "emergency": "Ravi Kumar (+91 9445566779)",
                "addedDate": "2024-01-08"
            }
        ];

        this.shipments = JSON.parse(localStorage.getItem('logihub-shipments')) || [
            {
                id: "SH-2024-001",
                origin: "Mumbai",
                destination: "Delhi",
                weight: "14 tons",
                type: "general",
                status: "In Transit",
                truck: "TRK-002",
                driver: "Vikram Singh",
                driverId: "DRV-002",
                priority: "High",
                pickupDate: "2024-02-01",
                deliveryDate: "2024-02-04",
                created: "2024-02-01"
            },
            {
                id: "SH-2024-002",
                origin: "Bangalore",
                destination: "Chennai",
                weight: "9 tons",
                type: "perishable",
                status: "Delivered",
                truck: "TRK-003",
                driver: "Arjun Nair",
                driverId: "DRV-003",
                priority: "Normal",
                pickupDate: "2024-02-02",
                deliveryDate: "2024-02-03",
                created: "2024-02-02"
            },
            {
                id: "SH-2024-003",
                origin: "Hyderabad",
                destination: "Pune",
                weight: "10 tons",
                type: "general",
                status: "In Transit",
                truck: "TRK-005",
                driver: "Sathish Kumar",
                driverId: "DRV-005",
                priority: "Normal",
                pickupDate: "2024-02-03",
                deliveryDate: "2024-02-06",
                created: "2024-02-03"
            }
        ];

        this.activities = JSON.parse(localStorage.getItem('logihub-activities')) || [];

        this.updateStats();
        this.saveToLocalStorage();
    }

    addTruck(truckData) {
        const newId = `TRK-${String(this.trucks.length + 1).padStart(3, '0')}`;
        const newTruck = {
            id: newId,
            ...truckData,
            status: 'available',
            addedDate: new Date().toISOString().split('T')[0]
        };

        this.trucks.push(newTruck);
        this.logActivity(`New truck ${newTruck.regNo} added`, newId, truckData.location);
        this.saveToLocalStorage();
        this.updateStats();

        return newTruck;
    }

    addDriver(driverData) {
        const newId = `DRV-${String(this.drivers.length + 1).padStart(3, '0')}`;
        const newDriver = {
            id: newId,
            ...driverData,
            status: 'available',
            addedDate: new Date().toISOString().split('T')[0]
        };

        this.drivers.push(newDriver);
        this.logActivity(`New driver ${newDriver.name} added`, newId, driverData.location);
        this.saveToLocalStorage();
        this.updateStats();

        return newDriver;
    }

    allocateAI(shipmentData) {
        const suitableTrucks = this.trucks.filter(truck => {
            if (truck.status !== 'available') return false;
            if (truck.location !== shipmentData.originCity) return false;

            const truckCapacity = parseFloat(truck.capacity);
            const shipmentWeight = parseFloat(shipmentData.weight);
            
            if (shipmentWeight > truckCapacity) return false;

            if (shipmentData.type === 'perishable' && truck.type !== 'Refrigerated Truck') return false;
            if (shipmentData.type === 'hazardous' && truck.type === 'Mini Truck') return false;

            return true;
        });

        if (suitableTrucks.length === 0) return null;

        const allocations = [];

        suitableTrucks.forEach(truck => {
            const suitableDrivers = this.drivers.filter(driver => {
                if (driver.status !== 'available') return false;
                if (driver.location !== shipmentData.originCity) return false;

                const exp = parseInt(driver.experience);
                if (exp < 1) return false;

                const truckType = truck.type.toLowerCase();
                const canDrive = driver.preferredTrucks.some(pref => 
                    truckType.includes(pref.toLowerCase())
                );

                return canDrive;
            });

            suitableDrivers.forEach(driver => {
                let score = 0;

                const exp = parseInt(driver.experience);
                score += Math.min(exp * 2, 50);

                const capacity = parseFloat(truck.capacity);
                const weight = parseFloat(shipmentData.weight);
                const utilization = weight / capacity;
                if (utilization > 0.8 && utilization < 1) score += 20;

                score += driver.languages.length * 5;

                allocations.push({
                    truck,
                    driver,
                    score,
                    efficiency: (utilization * 100).toFixed(1) + '%'
                });
            });
        });

        allocations.sort((a, b) => b.score - a.score);

        return allocations.length > 0 ? allocations[0] : null;
    }

    logActivity(description, resourceId, location) {
        const activity = {
            id: Date.now(),
            description,
            resourceId,
            location,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            date: new Date().toLocaleDateString()
        };

        this.activities.unshift(activity);
        if (this.activities.length > 10) this.activities.pop();
        this.saveToLocalStorage();
    }

    updateStats() {
        const stats = {
            totalTrucks: this.trucks.length,
            availableTrucks: this.trucks.filter(t => t.status === 'available').length,
            totalDrivers: this.drivers.length,
            availableDrivers: this.drivers.filter(d => d.status === 'available').length,
            activeShipments: this.shipments.filter(s => s.status === 'In Transit').length
        };

        localStorage.setItem('logihub-stats', JSON.stringify(stats));
        return stats;
    }

    saveToLocalStorage() {
        localStorage.setItem('logihub-trucks', JSON.stringify(this.trucks));
        localStorage.setItem('logihub-drivers', JSON.stringify(this.drivers));
        localStorage.setItem('logihub-shipments', JSON.stringify(this.shipments));
        localStorage.setItem('logihub-activities', JSON.stringify(this.activities));
    }

    getRecentActivities() {
        return this.activities.slice(0, 5);
    }
}

// Global rendering functions
let renderTrucksGrid, renderDriversGrid, renderShipmentsGrid, renderActivityTable, renderDashboardShipments, updateSheetsInfo;

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    const system = new LogiHubSystem();
    initializeUI(system);
});

function initializeUI(system) {
    // Theme Switching
    const themeToggle = document.getElementById('themeToggle');
    const themeText = document.getElementById('themeText');
    const htmlElement = document.documentElement;

    themeToggle.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        htmlElement.setAttribute('data-theme', newTheme);
        themeText.textContent = newTheme === 'light' ? 'Dark Mode' : 'Light Mode';
        themeToggle.querySelector('i').className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';

        localStorage.setItem('logihub-theme', newTheme);
    });

    // Initialize theme
    const savedTheme = localStorage.getItem('logihub-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    themeText.textContent = savedTheme === 'light' ? 'Dark Mode' : 'Light Mode';
    themeToggle.querySelector('i').className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';

    // Tab Switching
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetTab = tab.getAttribute('data-tab');

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === targetTab) {
                    content.classList.add('active');
                }
            });

            // Refresh content for active tab
            if (targetTab === 'trucks' && renderTrucksGrid) renderTrucksGrid();
            if (targetTab === 'drivers' && renderDriversGrid) renderDriversGrid();
            if (targetTab === 'shipments' && renderShipmentsGrid) renderShipmentsGrid();
            if (targetTab === 'sheets' && updateSheetsInfo) updateSheetsInfo();
        });
    });

    // Populate Indian cities in dropdowns
    function populateIndianCities() {
        const citySelects = document.querySelectorAll('select[id$="City"], select[id$="Location"]');

        citySelects.forEach(select => {
            // Clear existing options except first
            while (select.options.length > 1) {
                select.remove(1);
            }

            // Add Indian cities
            indianCities.forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                select.appendChild(option);
            });
        });
    }

    // Define renderTrucksGrid function
    renderTrucksGrid = function() {
        const grid = document.getElementById('trucksGrid');
        const stats = system.updateStats();

        grid.innerHTML = system.trucks.map(truck => `
            <div class="resource-card">
                <div class="resource-header">
                    <div class="resource-id">${truck.id}</div>
                    <span class="status status-${truck.status === 'available' ? 'available' : truck.status === 'on-trip' ? 'ontrip' : 'unavailable'}">
                        ${truck.status === 'available' ? 'Available' : truck.status === 'on-trip' ? 'On Trip' : 'Unavailable'}
                    </span>
                </div>
                <div class="resource-details">
                    <div class="detail-item">
                        <span class="detail-label">Registration</span>
                        <span class="detail-value">${truck.regNo}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Type</span>
                        <span class="detail-value">${truck.type}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Capacity</span>
                        <span class="detail-value">${truck.capacity}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Location</span>
                        <span class="detail-value">${truck.location}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Fuel</span>
                        <span class="detail-value">${truck.fuel}</span>
                    </div>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button class="btn btn-sm btn-outline" onclick="editTruck('${truck.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm ${truck.status === 'available' ? 'btn-warning' : 'btn-success'}" 
                            onclick="toggleTruckStatus('${truck.id}')">
                        <i class="fas fa-exchange-alt"></i> ${truck.status === 'available' ? 'Mark Busy' : 'Mark Available'}
                    </button>
                </div>
            </div>
        `).join('');

        // Update stats
        document.getElementById('totalTrucks').textContent = stats.totalTrucks;
        document.getElementById('trucksSheetCount').textContent = stats.totalTrucks;
        document.getElementById('trucksSheetTime').textContent = 'Just now';
    };

    // Define renderDriversGrid function
    renderDriversGrid = function() {
        const grid = document.getElementById('driversGrid');
        const stats = system.updateStats();

        grid.innerHTML = system.drivers.map(driver => `
            <div class="resource-card">
                <div class="resource-header">
                    <div class="avatar">${driver.name.charAt(0)}</div>
                    <span class="status status-${driver.status === 'available' ? 'available' : driver.status === 'on-trip' ? 'ontrip' : 'unavailable'}">
                        ${driver.status === 'available' ? 'Available' : driver.status === 'on-trip' ? 'On Trip' : 'Unavailable'}
                    </span>
                </div>
                <div class="resource-details">
                    <div class="detail-item">
                        <span class="detail-label">Name</span>
                        <span class="detail-value">${driver.name}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">License</span>
                        <span class="detail-value">${driver.licenseType}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Experience</span>
                        <span class="detail-value">${driver.experience}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Location</span>
                        <span class="detail-value">${driver.location}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Phone</span>
                        <span class="detail-value">${driver.phone}</span>
                    </div>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button class="btn btn-sm btn-outline" onclick="editDriver('${driver.id}')">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn btn-sm ${driver.status === 'available' ? 'btn-warning' : 'btn-success'}" 
                            onclick="toggleDriverStatus('${driver.id}')">
                        <i class="fas fa-exchange-alt"></i> ${driver.status === 'available' ? 'Mark Busy' : 'Mark Available'}
                    </button>
                </div>
            </div>
        `).join('');

        // Update stats
        document.getElementById('totalDrivers').textContent = stats.totalDrivers;
        document.getElementById('driversSheetCount').textContent = stats.totalDrivers;
        document.getElementById('driversSheetTime').textContent = 'Just now';
    };

    // Define updateSheetsInfo function
    updateSheetsInfo = function() {
        const stats = system.updateStats();
        const preview = document.getElementById('sheetPreview');

        // Clear existing rows except header
        const rows = preview.querySelectorAll('.sheet-row:not(.sheet-header)');
        rows.forEach(row => row.remove());

        // Add recent trucks to preview
        system.trucks.slice(0, 5).forEach(truck => {
            const row = document.createElement('div');
            row.className = 'sheet-row';
            row.innerHTML = `
                <div class="sheet-cell">${truck.id}</div>
                <div class="sheet-cell">${truck.type}</div>
                <div class="sheet-cell">${truck.status}</div>
                <div class="sheet-cell">${truck.location}</div>
            `;
            preview.appendChild(row);
        });

        // Update counts
        document.getElementById('shipmentsSheetCount').textContent = system.shipments.length;
        document.getElementById('shipmentsSheetTime').textContent = 'Just now';

        // Update active shipments count
        document.getElementById('activeShipments').textContent = stats.activeShipments;
    };

    // Define renderActivityTable function
    renderActivityTable = function() {
        const table = document.getElementById('activityTable');
        const activities = system.getRecentActivities();

        if (activities.length === 0) {
            table.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align: center; padding: 40px; color: var(--text-secondary);">
                        <i class="fas fa-history" style="font-size: 48px; margin-bottom: 20px; opacity: 0.3;"></i>
                        <p>No activity yet. Add trucks or drivers to see activity here.</p>
                    </td>
                </tr>
            `;
        } else {
            table.innerHTML = activities.map(activity => `
                <tr>
                    <td style="font-weight: 500;">${activity.description}</td>
                    <td style="color: var(--accent); font-weight: 600;">${activity.resourceId}</td>
                    <td>${activity.location}</td>
                    <td><span class="status status-available">Completed</span></td>
                    <td style="color: var(--text-secondary);">${activity.timestamp}</td>
                </tr>
            `).join('');
        }
    };

    // Define renderDashboardShipments function
    renderDashboardShipments = function() {
        const container = document.getElementById('dashboardShipments');
        const activeShipments = system.shipments.filter(s => s.status === 'In Transit').slice(0, 3);

        if (activeShipments.length === 0) {
            container.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px; color: var(--text-secondary);">
                    <i class="fas fa-shipping-fast" style="font-size: 60px; margin-bottom: 15px; opacity: 0.3;"></i>
                    <h3 style="margin-bottom: 10px;">No Active Allocations</h3>
                    <p>Create shipments using AI Allocation to see them here.</p>
                    <button class="btn btn-primary" onclick="document.querySelector('.tab[data-tab=\\'allocation\\']').click()" style="margin-top: 20px;">
                        <i class="fas fa-robot"></i> Create Allocation
                    </button>
                </div>
            `;
            return;
        }

        container.innerHTML = activeShipments.map(shipment => `
            <div class="resource-card">
                <div class="resource-header">
                    <div class="resource-id">${shipment.id}</div>
                    <span class="status status-ontrip">
                        <i class="fas fa-truck-moving"></i> In Transit
                    </span>
                </div>
                <div class="resource-details">
                    <div class="detail-item">
                        <span class="detail-label"><i class="fas fa-route"></i> Route</span>
                        <span class="detail-value">${shipment.origin} → ${shipment.destination}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label"><i class="fas fa-truck"></i> Truck</span>
                        <span class="detail-value">${shipment.truck || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label"><i class="fas fa-user-tie"></i> Driver</span>
                        <span class="detail-value">${shipment.driver || 'N/A'}</span>
                    </div>
                </div>
                <button class="btn btn-sm btn-success btn-block" onclick="completeShipment('${shipment.id}')" style="margin-top: 15px;">
                    <i class="fas fa-check"></i> Mark Complete
                </button>
            </div>
        `).join('') + (system.shipments.filter(s => s.status === 'In Transit').length > 3 ? `
            <div style="display: flex; align-items: center; justify-content: center;">
                <button class="btn btn-outline" onclick="document.querySelector('.tab[data-tab=\\'shipments\\']').click()">
                    <i class="fas fa-ellipsis-h"></i> View All Shipments
                </button>
            </div>
        ` : '');
    };

    // Define renderShipmentsGrid function
    renderShipmentsGrid = function(filter = 'all') {
        const grid = document.getElementById('shipmentsGrid');

        let shipments = system.shipments;
        if (filter !== 'all') {
            shipments = shipments.filter(s => s.status === filter);
        }

        if (shipments.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px; color: var(--text-secondary);">
                    <i class="fas fa-shipping-fast" style="font-size: 80px; margin-bottom: 20px; opacity: 0.3;"></i>
                    <h3 style="margin-bottom: 10px;">No Shipments Found</h3>
                    <p>Create shipments using AI Allocation to see them here.</p>
                </div>
            `;
            return;
        }

        grid.innerHTML = shipments.map(shipment => {
            const isActive = shipment.status === 'In Transit';
            const statusClass = isActive ? 'status-ontrip' : shipment.status === 'Delivered' ? 'status-available' : 'status-unavailable';

            return `
                <div class="resource-card">
                    <div class="resource-header">
                        <div class="resource-id">${shipment.id}</div>
                        <span class="status ${statusClass}">
                            <i class="fas fa-${isActive ? 'truck-moving' : shipment.status === 'Delivered' ? 'check-circle' : 'times-circle'}"></i>
                            ${shipment.status}
                        </span>
                    </div>
                    <div class="resource-details">
                        <div class="detail-item">
                            <span class="detail-label"><i class="fas fa-route"></i> Route</span>
                            <span class="detail-value">${shipment.origin} → ${shipment.destination}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label"><i class="fas fa-weight-hanging"></i> Weight</span>
                            <span class="detail-value">${shipment.weight}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label"><i class="fas fa-box"></i> Type</span>
                            <span class="detail-value">${shipment.type}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label"><i class="fas fa-truck"></i> Truck</span>
                            <span class="detail-value">${shipment.truck || 'N/A'}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label"><i class="fas fa-user-tie"></i> Driver</span>
                            <span class="detail-value">${shipment.driver || 'N/A'}</span>
                        </div>
                        <div class="detail-item">
                            <span class="detail-label"><i class="fas fa-calendar"></i> Created</span>
                            <span class="detail-value">${shipment.created}</span>
                        </div>
                        ${shipment.pickupDate ? `
                        <div class="detail-item">
                            <span class="detail-label"><i class="fas fa-calendar-check"></i> Pickup</span>
                            <span class="detail-value">${shipment.pickupDate}</span>
                        </div>
                        ` : ''}
                        ${shipment.deliveryDate ? `
                        <div class="detail-item">
                            <span class="detail-label"><i class="fas fa-calendar-day"></i> Delivery</span>
                            <span class="detail-value">${shipment.deliveryDate}</span>
                        </div>
                        ` : ''}
                    </div>
                    ${isActive ? `
                        <div style="display: flex; gap: 10px; margin-top: 20px;">
                            <button class="btn btn-sm btn-success" onclick="completeShipment('${shipment.id}')">
                                <i class="fas fa-check"></i> Complete
                            </button>
                            <button class="btn btn-sm btn-danger" onclick="cancelShipment('${shipment.id}')">
                                <i class="fas fa-times"></i> Cancel
                            </button>
                        </div>
                    ` : ''}
                </div>
            `;
        }).join('');
    };

    // Modal handlers
    const addTruckModal = document.getElementById('addTruckModal');
    const addDriverModal = document.getElementById('addDriverModal');
    const allocationResultModal = document.getElementById('allocationResultModal');

    // Open add truck modal
    document.getElementById('addTruckModalBtn').addEventListener('click', () => {
        addTruckModal.classList.add('active');
        populateIndianCities();
    });

    document.getElementById('addTruckBtn').addEventListener('click', () => {
        addTruckModal.classList.add('active');
        populateIndianCities();
    });

    // Open add driver modal
    document.getElementById('addDriverModalBtn').addEventListener('click', () => {
        addDriverModal.classList.add('active');
        populateIndianCities();
    });

    document.getElementById('addDriverBtn').addEventListener('click', () => {
        addDriverModal.classList.add('active');
        populateIndianCities();
    });

    // Close modals
    document.getElementById('closeTruckModal').addEventListener('click', () => {
        addTruckModal.classList.remove('active');
    });

    document.getElementById('closeDriverModal').addEventListener('click', () => {
        addDriverModal.classList.remove('active');
    });

    document.getElementById('closeAllocationModal').addEventListener('click', () => {
        allocationResultModal.classList.remove('active');
    });

    // Close modal on outside click
    [addTruckModal, addDriverModal, allocationResultModal].forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
            }
        });
    });

    // Truck form submission
    document.getElementById('truckForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const truckData = {
            regNo: document.getElementById('truckRegNo').value,
            type: document.getElementById('truckType').value,
            capacity: document.getElementById('truckCapacity').value + ' tons',
            fuel: document.getElementById('truckFuel').value,
            location: document.getElementById('truckLocation').value,
            owner: document.getElementById('truckOwner').value,
            insurance: document.getElementById('truckInsurance').value,
            fitness: document.getElementById('truckFitness').value
        };

        const newTruck = system.addTruck(truckData);

        Swal.fire({
            title: 'Truck Added!',
            text: `Truck ${newTruck.id} has been added successfully`,
            icon: 'success',
            confirmButtonText: 'Great!'
        });

        addTruckModal.classList.remove('active');
        e.target.reset();
        renderTrucksGrid();
        renderActivityTable();
    });

    // Driver form submission
    document.getElementById('driverForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const driverData = {
            name: document.getElementById('driverName').value,
            phone: document.getElementById('driverPhone').value,
            license: document.getElementById('driverLicense').value,
            licenseType: document.getElementById('driverLicenseType').value,
            experience: document.getElementById('driverExperience').value + ' years',
            location: document.getElementById('driverLocation').value,
            languages: Array.from(document.getElementById('driverLanguages').selectedOptions).map(o => o.value),
            preferredTrucks: Array.from(document.getElementById('driverPreferredTruck').selectedOptions).map(o => o.value),
            emergency: document.getElementById('driverEmergency').value
        };

        const newDriver = system.addDriver(driverData);

        Swal.fire({
            title: 'Driver Added!',
            text: `Driver ${newDriver.name} has been added successfully`,
            icon: 'success',
            confirmButtonText: 'Excellent!'
        });

        addDriverModal.classList.remove('active');
        e.target.reset();
        renderDriversGrid();
        renderActivityTable();
    });

    // Allocation form submission
    document.getElementById('allocationForm').addEventListener('submit', (e) => {
        e.preventDefault();

        const shipmentData = {
            originCity: document.getElementById('originCity').value,
            destinationCity: document.getElementById('destinationCity').value,
            weight: document.getElementById('cargoWeight').value,
            type: document.getElementById('cargoType').value,
            instructions: document.getElementById('instructions').value
        };

        const allocation = system.allocateAI(shipmentData);

        if (allocation) {
            const resultContent = document.getElementById('allocationResultContent');
            // Store allocation data in dataset for confirm button
            resultContent.dataset.truckId = allocation.truck.id;
            resultContent.dataset.driverId = allocation.driver.id;
            resultContent.dataset.driverName = allocation.driver.name;

            resultContent.innerHTML = `
                <div style="text-align: center; margin-bottom: 30px;">
                    <div style="font-size: 48px; color: var(--success); margin-bottom: 20px;">
                        <i class="fas fa-check-circle"></i>
                    </div>
                    <h3 style="font-size: 24px; font-weight: 700; margin-bottom: 10px;">Perfect Match Found!</h3>
                    <p style="color: var(--text-secondary);">AI Score: <strong style="color: var(--success);">${allocation.score}/200</strong></p>
                </div>
                
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                    <div style="background: var(--bg-primary); padding: 20px; border-radius: 12px;">
                        <h4 style="margin-bottom: 15px; color: var(--accent); font-weight: 600;">
                            <i class="fas fa-truck"></i> Recommended Truck
                        </h4>
                        <div style="font-size: 20px; font-weight: 700; margin-bottom: 10px;">${allocation.truck.id}</div>
                        <div style="color: var(--text-secondary); margin-bottom: 5px;">${allocation.truck.type} • ${allocation.truck.capacity}</div>
                        <div style="color: var(--text-secondary);">Location: ${allocation.truck.location}</div>
                        <div style="color: var(--text-secondary);">Efficiency: ${allocation.efficiency}</div>
                    </div>
                    
                    <div style="background: var(--bg-primary); padding: 20px; border-radius: 12px;">
                        <h4 style="margin-bottom: 15px; color: var(--accent); font-weight: 600;">
                            <i class="fas fa-user-tie"></i> Recommended Driver
                        </h4>
                        <div style="font-size: 20px; font-weight: 700; margin-bottom: 10px;">${allocation.driver.name}</div>
                        <div style="color: var(--text-secondary); margin-bottom: 5px;">${allocation.driver.licenseType} • ${allocation.driver.experience}</div>
                        <div style="color: var(--text-secondary);">Location: ${allocation.driver.location}</div>
                        <div style="color: var(--text-secondary);">Languages: ${allocation.driver.languages.join(', ')}</div>
                    </div>
                </div>
                
                <div style="background: var(--bg-gradient); color: white; padding: 20px; border-radius: 12px; text-align: center;">
                    <h4 style="margin-bottom: 10px; font-weight: 600;">Route Summary</h4>
                    <div style="font-size: 18px; margin-bottom: 5px;">
                        ${shipmentData.originCity} → ${shipmentData.destinationCity}
                    </div>
                    <div style="font-size: 14px; opacity: 0.9;">
                        Cargo: ${shipmentData.weight} tons • Type: ${shipmentData.type}
                    </div>
                </div>
                
                <div style="display: flex; gap: 15px; margin-top: 30px;">
                    <button class="btn btn-success btn-block" onclick="confirmAllocation()">
                        <i class="fas fa-check"></i> Confirm Allocation
                    </button>
                    <button class="btn btn-outline btn-block" onclick="document.getElementById('closeAllocationModal').click()">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                </div>
            `;

            allocationResultModal.classList.add('active');
        } else {
            Swal.fire({
                title: 'No Allocation Found',
                text: 'Sorry, no suitable truck-driver combination found for your requirements',
                icon: 'warning',
                confirmButtonText: 'Try Again'
            });
        }
    });

    // Quick action buttons
    document.getElementById('quickAllocationBtn').addEventListener('click', () => {
        document.querySelector('.tab[data-tab="allocation"]').click();
    });

    document.getElementById('viewSheetsBtn').addEventListener('click', () => {
        document.querySelector('.tab[data-tab="sheets"]').click();
    });

    // Sync sheets button
    document.getElementById('syncSheetsBtn').addEventListener('click', () => {
        Swal.fire({
            title: 'Syncing Data...',
            text: 'Updating all data sheets with latest information',
            icon: 'info',
            showConfirmButton: false,
            timer: 1500
        });

        setTimeout(() => {
            updateSheetsInfo();
            Swal.fire({
                title: 'Sync Complete!',
                text: 'All data sheets have been updated',
                icon: 'success',
                timer: 2000
            });
        }, 1600);
    });

    // Generate report button
    document.getElementById('generateReportBtn').addEventListener('click', () => {
        const stats = system.updateStats();
        Swal.fire({
            title: 'Generating Report...',
            html: `
                <div style="text-align: left; margin: 20px 0;">
                    <div style="margin-bottom: 10px;">
                        <i class="fas fa-check-circle" style="color: var(--success); margin-right: 10px;"></i>
                        Total Trucks: ${stats.totalTrucks}
                    </div>
                    <div style="margin-bottom: 10px;">
                        <i class="fas fa-check-circle" style="color: var(--success); margin-right: 10px;"></i>
                        Active Drivers: ${stats.totalDrivers}
                    </div>
                    <div style="margin-bottom: 10px;">
                        <i class="fas fa-check-circle" style="color: var(--success); margin-right: 10px;"></i>
                        Shipments This Month: ${system.shipments.length}
                    </div>
                </div>
            `,
            showConfirmButton: true,
            confirmButtonText: 'Download Report'
        }).then(() => {
            exportAllData();
        });
    });

    // Initialize
    populateIndianCities();
    renderTrucksGrid();
    renderDriversGrid();
    renderShipmentsGrid();
    renderDashboardShipments();
    renderActivityTable();
    updateSheetsInfo();
}

// Global functions for buttons
window.toggleTruckStatus = function (truckId) {
    const system = new LogiHubSystem();
    const truck = system.trucks.find(t => t.id === truckId);

    if (truck) {
        truck.status = truck.status === 'available' ? 'on-trip' : 'available';
        system.logActivity(
            `Truck ${truckId} marked as ${truck.status === 'available' ? 'Available' : 'On Trip'}`,
            truckId,
            truck.location
        );
        system.saveToLocalStorage();

        Swal.fire({
            title: 'Status Updated!',
            text: `Truck ${truckId} is now ${truck.status === 'available' ? 'available' : 'on a trip'}`,
            icon: 'success',
            timer: 2000
        });

        renderTrucksGrid();
        renderActivityTable();
    }
};

window.toggleDriverStatus = function (driverId) {
    const system = new LogiHubSystem();
    const driver = system.drivers.find(d => d.id === driverId);

    if (driver) {
        driver.status = driver.status === 'available' ? 'on-trip' : 'available';
        system.logActivity(
            `Driver ${driver.name} marked as ${driver.status === 'available' ? 'Available' : 'On Trip'}`,
            driverId,
            driver.location
        );
        system.saveToLocalStorage();

        Swal.fire({
            title: 'Status Updated!',
            text: `Driver ${driver.name} is now ${driver.status === 'available' ? 'available' : 'on a trip'}`,
            icon: 'success',
            timer: 2000
        });

        renderDriversGrid();
        renderActivityTable();
    }
};

window.confirmAllocation = function () {
    const system = new LogiHubSystem();

    // Get the allocation data from the modal
    const modalContent = document.getElementById('allocationResultContent');
    const truckId = modalContent.dataset.truckId;
    const driverId = modalContent.dataset.driverId;
    const driverName = modalContent.dataset.driverName;

    if (!truckId || !driverId) {
        Swal.fire('Error', 'Allocation data not found', 'error');
        return;
    }

    // Create shipment from allocation
    const shipmentData = {
        id: `SH-${new Date().getFullYear()}-${String(system.shipments.length + 1).padStart(3, '0')}`,
        origin: document.getElementById('originCity').value,
        destination: document.getElementById('destinationCity').value,
        weight: document.getElementById('cargoWeight').value + ' tons',
        type: document.getElementById('cargoType').value,
        status: 'In Transit',
        truck: truckId,
        driver: driverName,
        driverId: driverId,
        priority: 'Normal',
        pickupDate: document.getElementById('pickupDate').value,
        deliveryDate: document.getElementById('deliveryDate').value,
        created: new Date().toISOString().split('T')[0],
        createdTime: new Date().toLocaleString()
    };

    // Update truck status
    const truck = system.trucks.find(t => t.id === truckId);
    if (truck) {
        truck.status = 'on-trip';
        truck.currentShipment = shipmentData.id;
    }

    // Update driver status
    const driver = system.drivers.find(d => d.id === driverId);
    if (driver) {
        driver.status = 'on-trip';
        driver.currentShipment = shipmentData.id;
    }

    // Add shipment
    system.shipments.push(shipmentData);

    // Log activity
    system.logActivity(
        `Shipment ${shipmentData.id} created: ${shipmentData.origin} → ${shipmentData.destination}`,
        shipmentData.id,
        shipmentData.origin
    );

    system.saveToLocalStorage();

    Swal.fire({
        title: 'Allocation Confirmed!',
        html: `<strong>Shipment ${shipmentData.id}</strong> created<br>
               Truck ${truckId} and driver ${driverName} assigned<br>
               Route: ${shipmentData.origin} → ${shipmentData.destination}`,
        icon: 'success',
        confirmButtonText: 'Excellent!'
    }).then(() => {
        // Refresh displays
        renderTrucksGrid();
        renderDriversGrid();
        renderActivityTable();
        renderShipmentsGrid();
        renderDashboardShipments();
    });

    document.getElementById('allocationResultModal').classList.remove('active');

    // Reset form
    document.getElementById('allocationForm').reset();
};

window.editTruck = function (truckId) {
    Swal.fire({
        title: 'Edit Truck',
        text: `Editing functionality for truck ${truckId} is coming soon!`,
        icon: 'info'
    });
};

window.editDriver = function (driverId) {
    Swal.fire({
        title: 'Edit Driver',
        text: `Editing functionality for driver ${driverId} is coming soon!`,
        icon: 'info'
    });
};

// Complete shipment
window.completeShipment = function (shipmentId) {
    Swal.fire({
        title: 'Complete Shipment?',
        text: `Mark shipment ${shipmentId} as delivered?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, Complete',
        confirmButtonColor: '#10b981'
    }).then((result) => {
        if (result.isConfirmed) {
            const system = new LogiHubSystem();

            // Find and update shipment
            const shipment = system.shipments.find(s => s.id === shipmentId);
            if (shipment) {
                shipment.status = 'Delivered';
                shipment.completedDate = new Date().toISOString().split('T')[0];

                // Free up truck
                if (shipment.truck) {
                    const truck = system.trucks.find(t => t.id === shipment.truck);
                    if (truck) {
                        truck.status = 'available';
                        truck.currentShipment = null;
                    }
                }

                // Free up driver
                if (shipment.driverId) {
                    const driver = system.drivers.find(d => d.id === shipment.driverId);
                    if (driver) {
                        driver.status = 'available';
                        driver.currentShipment = null;
                    }
                }

                system.logActivity(
                    `Shipment ${shipmentId} completed and delivered`,
                    shipmentId,
                    shipment.destination
                );

                system.saveToLocalStorage();

                Swal.fire({
                    title: 'Shipment Completed!',
                    text: `${shipmentId} has been marked as delivered`,
                    icon: 'success',
                    timer: 2000
                });

                renderShipmentsGrid();
                renderTrucksGrid();
                renderDriversGrid();
                renderActivityTable();
                renderDashboardShipments();
            }
        }
    });
};

// Cancel shipment
window.cancelShipment = function (shipmentId) {
    Swal.fire({
        title: 'Cancel Shipment?',
        text: `This will cancel shipment ${shipmentId} and free up resources`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Cancel It',
        confirmButtonColor: '#ef4444',
        cancelButtonText: 'No, Keep It'
    }).then((result) => {
        if (result.isConfirmed) {
            const system = new LogiHubSystem();

            // Find and update shipment
            const shipment = system.shipments.find(s => s.id === shipmentId);
            if (shipment) {
                shipment.status = 'Cancelled';

                // Free up truck
                if (shipment.truck) {
                    const truck = system.trucks.find(t => t.id === shipment.truck);
                    if (truck) {
                        truck.status = 'available';
                        truck.currentShipment = null;
                    }
                }

                // Free up driver
                if (shipment.driverId) {
                    const driver = system.drivers.find(d => d.id === shipment.driverId);
                    if (driver) {
                        driver.status = 'available';
                        driver.currentShipment = null;
                    }
                }

                system.logActivity(
                    `Shipment ${shipmentId} cancelled`,
                    shipmentId,
                    shipment.origin
                );

                system.saveToLocalStorage();

                Swal.fire({
                    title: 'Shipment Cancelled',
                    text: 'Resources have been freed up',
                    icon: 'info',
                    timer: 2000
                });

                renderShipmentsGrid();
                renderTrucksGrid();
                renderDriversGrid();
                renderActivityTable();
                renderDashboardShipments();
            }
        }
    });
};

// Filter shipments
window.filterShipments = function (status) {
    renderShipmentsGrid(status);
};

// Export to CSV/Excel functionality
window.exportToSpreadsheet = function (dataType, format = 'csv') {
    const system = new LogiHubSystem();
    let data = [];
    let headers = [];
    let filename = '';

    switch (dataType) {
        case 'trucks':
            headers = ['Truck ID', 'Registration No', 'Type', 'Capacity', 'Status', 'Location', 'Fuel', 'Owner', 'Insurance Valid', 'Fitness Valid', 'Added Date'];
            data = system.trucks.map(truck => [
                truck.id,
                truck.regNo,
                truck.type,
                truck.capacity,
                truck.status,
                truck.location,
                truck.fuel,
                truck.owner,
                truck.insurance,
                truck.fitness,
                truck.addedDate
            ]);
            filename = format === 'xlsx' ? 'LogiHub_Trucks_Database.xlsx' : 'LogiHub_Trucks_Database.csv';
            break;

        case 'drivers':
            headers = ['Driver ID', 'Name', 'Phone', 'License No', 'License Type', 'Experience', 'Status', 'Location', 'Languages', 'Preferred Trucks', 'Added Date'];
            data = system.drivers.map(driver => [
                driver.id,
                driver.name,
                driver.phone,
                driver.license,
                driver.licenseType,
                driver.experience,
                driver.status,
                driver.location,
                Array.isArray(driver.languages) ? driver.languages.join('; ') : '',
                Array.isArray(driver.preferredTrucks) ? driver.preferredTrucks.join('; ') : '',
                driver.addedDate
            ]);
            filename = format === 'xlsx' ? 'LogiHub_Drivers_Database.xlsx' : 'LogiHub_Drivers_Database.csv';
            break;

        case 'shipments':
            headers = ['Shipment ID', 'Origin', 'Destination', 'Weight', 'Cargo Type', 'Status', 'Truck ID', 'Driver', 'Priority', 'Created Date'];
            data = system.shipments.map(shipment => [
                shipment.id,
                shipment.origin,
                shipment.destination,
                shipment.weight,
                shipment.type,
                shipment.status,
                shipment.truck || 'N/A',
                shipment.driver || 'N/A',
                shipment.priority,
                shipment.created
            ]);
            filename = format === 'xlsx' ? 'LogiHub_Shipments_Log.xlsx' : 'LogiHub_Shipments_Log.csv';
            break;

        case 'all':
            exportAllData();
            return;
    }

    if (format === 'xlsx') {
        // Export as Excel using SheetJS
        const ws = XLSX.utils.aoa_to_sheet([headers, ...data]);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, dataType.charAt(0).toUpperCase() + dataType.slice(1));
        XLSX.writeFile(wb, filename);
    } else {
        // Export as CSV
        let csv = headers.join(',') + '\n';
        data.forEach(row => {
            csv += row.map(cell => {
                if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"') || cell.includes('\n'))) {
                    return '"' + cell.replace(/"/g, '""') + '"';
                }
                return cell;
            }).join(',') + '\n';
        });

        // Download CSV file
        downloadFile(csv, filename, 'text/csv');
    }

    Swal.fire({
        title: 'Export Complete!',
        text: `${dataType.charAt(0).toUpperCase() + dataType.slice(1)} data has been exported to ${filename}`,
        icon: 'success',
        confirmButtonText: 'Great!'
    });
};

window.exportAllData = function () {
    Swal.fire({
        title: 'Choose Export Format',
        text: 'Select the format for exporting all data',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: '<i class="fas fa-file-excel"></i> Excel (.xlsx)',
        cancelButtonText: '<i class="fas fa-file-csv"></i> CSV',
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#3b82f6'
    }).then((result) => {
        const format = result.isConfirmed ? 'xlsx' : result.dismiss === Swal.DismissReason.cancel ? 'csv' : null;

        if (format) {
            if (format === 'xlsx') {
                // Create multi-sheet Excel workbook
                const system = new LogiHubSystem();
                const wb = XLSX.utils.book_new();

                // Trucks sheet
                const trucksHeaders = ['Truck ID', 'Registration No', 'Type', 'Capacity', 'Status', 'Location', 'Fuel', 'Owner', 'Insurance Valid', 'Fitness Valid', 'Added Date'];
                const trucksData = system.trucks.map(truck => [
                    truck.id, truck.regNo, truck.type, truck.capacity, truck.status,
                    truck.location, truck.fuel, truck.owner, truck.insurance, truck.fitness, truck.addedDate
                ]);
                const trucksWs = XLSX.utils.aoa_to_sheet([trucksHeaders, ...trucksData]);
                XLSX.utils.book_append_sheet(wb, trucksWs, 'Trucks');

                // Drivers sheet
                const driversHeaders = ['Driver ID', 'Name', 'Phone', 'License No', 'License Type', 'Experience', 'Status', 'Location', 'Languages', 'Preferred Trucks', 'Added Date'];
                const driversData = system.drivers.map(driver => [
                    driver.id, driver.name, driver.phone, driver.license, driver.licenseType, driver.experience,
                    driver.status, driver.location,
                    Array.isArray(driver.languages) ? driver.languages.join('; ') : '',
                    Array.isArray(driver.preferredTrucks) ? driver.preferredTrucks.join('; ') : '',
                    driver.addedDate
                ]);
                const driversWs = XLSX.utils.aoa_to_sheet([driversHeaders, ...driversData]);
                XLSX.utils.book_append_sheet(wb, driversWs, 'Drivers');

                // Shipments sheet
                const shipmentsHeaders = ['Shipment ID', 'Origin', 'Destination', 'Weight', 'Cargo Type', 'Status', 'Truck ID', 'Driver', 'Priority', 'Created Date'];
                const shipmentsData = system.shipments.map(shipment => [
                    shipment.id, shipment.origin, shipment.destination, shipment.weight,
                    shipment.type, shipment.status, shipment.truck || 'N/A', shipment.driver || 'N/A',
                    shipment.priority, shipment.created
                ]);
                const shipmentsWs = XLSX.utils.aoa_to_sheet([shipmentsHeaders, ...shipmentsData]);
                XLSX.utils.book_append_sheet(wb, shipmentsWs, 'Shipments');

                // Download Excel file
                XLSX.writeFile(wb, 'LogiHub_Complete_Database.xlsx');

                Swal.fire({
                    title: 'Export Complete!',
                    html: 'Complete database exported to:<br><strong>LogiHub_Complete_Database.xlsx</strong><br>• Trucks Sheet<br>• Drivers Sheet<br>• Shipments Sheet',
                    icon: 'success',
                    confirmButtonText: 'Excellent!'
                });
            } else {
                // Export separate CSV files
                exportToSpreadsheet('trucks', 'csv');
                setTimeout(() => exportToSpreadsheet('drivers', 'csv'), 500);
                setTimeout(() => exportToSpreadsheet('shipments', 'csv'), 1000);

                setTimeout(() => {
                    Swal.fire({
                        title: 'Export Complete!',
                        html: 'All data has been exported as CSV:<br>• Trucks Database<br>• Drivers Database<br>• Shipments Log',
                        icon: 'success',
                        confirmButtonText: 'Excellent!'
                    });
                }, 1500);
            }
        }
    });
};

window.handleFileImport = function (event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    const fileExtension = file.name.split('.').pop().toLowerCase();

    reader.onload = function (e) {
        try {
            let importedData;

            if (fileExtension === 'json') {
                // Import JSON
                importedData = JSON.parse(e.target.result);

                Swal.fire({
                    title: 'Select Data Type',
                    text: 'What type of data are you importing?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonText: 'Trucks',
                    cancelButtonText: 'Drivers',
                    showDenyButton: true,
                    denyButtonText: 'Shipments'
                }).then((result) => {
                    const system = new LogiHubSystem();

                    if (result.isConfirmed) {
                        system.trucks = [...system.trucks, ...importedData];
                        system.saveToLocalStorage();
                        renderTrucksGrid();
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        system.drivers = [...system.drivers, ...importedData];
                        system.saveToLocalStorage();
                        renderDriversGrid();
                    } else if (result.isDenied) {
                        system.shipments = [...system.shipments, ...importedData];
                        system.saveToLocalStorage();
                    }

                    Swal.fire('Import Complete!', 'Data has been imported successfully', 'success');
                });

            } else if (fileExtension === 'csv') {
                // Import CSV
                const lines = e.target.result.split('\n');
                const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));

                Swal.fire({
                    title: 'CSV Detected',
                    html: `Found ${lines.length - 1} records<br>Headers: ${headers.join(', ')}`,
                    icon: 'info',
                    confirmButtonText: 'Import'
                });

            } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
                // Import Excel
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                const sheetNames = workbook.SheetNames;
                const system = new LogiHubSystem();
                let importedCount = 0;

                sheetNames.forEach(sheetName => {
                    const worksheet = workbook.Sheets[sheetName];
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                    if (jsonData.length > 1) {
                        const headers = jsonData[0];
                        const rows = jsonData.slice(1);

                        // Determine data type from sheet name or headers
                        if (sheetName.toLowerCase().includes('truck') || headers[0] === 'Truck ID') {
                            rows.forEach(row => {
                                if (row[0]) {
                                    system.trucks.push({
                                        id: row[0],
                                        regNo: row[1],
                                        type: row[2],
                                        capacity: row[3],
                                        status: row[4] || 'available',
                                        location: row[5],
                                        fuel: row[6],
                                        owner: row[7],
                                        insurance: row[8],
                                        fitness: row[9],
                                        addedDate: row[10] || new Date().toISOString().split('T')[0]
                                    });
                                    importedCount++;
                                }
                            });
                        } else if (sheetName.toLowerCase().includes('driver') || headers[0] === 'Driver ID') {
                            rows.forEach(row => {
                                if (row[0]) {
                                    system.drivers.push({
                                        id: row[0],
                                        name: row[1],
                                        phone: row[2],
                                        license: row[3],
                                        licenseType: row[4],
                                        experience: row[5],
                                        status: row[6] || 'available',
                                        location: row[7],
                                        languages: row[8] ? row[8].split(';').map(l => l.trim()) : [],
                                        preferredTrucks: row[9] ? row[9].split(';').map(t => t.trim()) : [],
                                        addedDate: row[10] || new Date().toISOString().split('T')[0]
                                    });
                                    importedCount++;
                                }
                            });
                        }
                    }
                });

                system.saveToLocalStorage();
                renderTrucksGrid();
                renderDriversGrid();

                Swal.fire({
                    title: 'Import Complete!',
                    text: `Successfully imported ${importedCount} records from ${sheetNames.length} sheet(s)`,
                    icon: 'success',
                    confirmButtonText: 'Great!'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Import Error',
                text: 'Failed to import file: ' + error.message,
                icon: 'error'
            });
        }

        // Reset file input
        event.target.value = '';
    };

    if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        reader.readAsArrayBuffer(file);
    } else {
        reader.readAsText(file);
    }
};

function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}