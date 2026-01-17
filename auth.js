/**
 * LogiHub Centralized Authentication System
 * This file handles all authentication logic across the platform
 * Database: LocalStorage (Browser-based storage)
 */

// Authentication Database Key
const AUTH_DB_KEY = 'logihub_users_db';
const CURRENT_USER_KEY = 'logihub_current_user';
const SESSION_KEY = 'logihub_session';

// Initialize Authentication System
class AuthSystem {
    constructor() {
        this.initializeDatabase();
    }

    // Initialize database with default users
    initializeDatabase() {
        let users = this.getUsers();
        
        // If no users exist, create default users
        if (users.length === 0) {
            const defaultUsers = [
                {
                    id: 1,
                    email: 'customer@logihub.com',
                    password: 'customer123',
                    role: 'customer',
                    name: 'John Customer',
                    phone: '+91 9876543210',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    email: 'driver@logihub.com',
                    password: 'driver123',
                    role: 'driver',
                    name: 'Raj Singh',
                    phone: '+91 9876543211',
                    license: 'DL1234567890',
                    truckAssigned: 'AB 01C 1234',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 3,
                    email: 'agent@logihub.com',
                    password: 'agent123',
                    role: 'agent',
                    name: 'Priya Sharma',
                    phone: '+91 9876543212',
                    employeeId: 'AGT001',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 4,
                    email: 'manager@logihub.com',
                    password: 'manager123',
                    role: 'manager',
                    name: 'Amit Patel',
                    phone: '+91 9876543213',
                    employeeId: 'MGR001',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 5,
                    email: 'admin@logihub.com',
                    password: 'admin123',
                    role: 'admin',
                    name: 'Admin User',
                    phone: '+91 9876543214',
                    employeeId: 'ADM001',
                    createdAt: new Date().toISOString()
                }
            ];
            
            this.saveUsers(defaultUsers);
        }
    }

    // Get all users from localStorage
    getUsers() {
        try {
            const users = localStorage.getItem(AUTH_DB_KEY);
            return users ? JSON.parse(users) : [];
        } catch (error) {
            console.error('Error reading users from database:', error);
            return [];
        }
    }

    // Save users to localStorage
    saveUsers(users) {
        try {
            localStorage.setItem(AUTH_DB_KEY, JSON.stringify(users));
            return true;
        } catch (error) {
            console.error('Error saving users to database:', error);
            return false;
        }
    }

    // Login function
    login(email, password, role) {
        const users = this.getUsers();
        const user = users.find(u => 
            u.email.toLowerCase() === email.toLowerCase() && 
            u.password === password && 
            u.role === role
        );

        if (user) {
            // Create session
            const session = {
                userId: user.id,
                email: user.email,
                role: user.role,
                name: user.name,
                phone: user.phone,
                loginTime: new Date().toISOString()
            };

            // Store session
            try {
                localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
                localStorage.setItem(SESSION_KEY, JSON.stringify(session));
                localStorage.setItem('userRole', user.role);
                
                // Role-specific flags for backward compatibility
                localStorage.setItem(`${user.role}LoggedIn`, 'true');
                
                return { success: true, user: user };
            } catch (error) {
                console.error('Error creating session:', error);
                return { success: false, error: 'Session creation failed' };
            }
        }

        return { success: false, error: 'Invalid credentials' };
    }

    // Signup function
    signup(userData) {
        const { name, email, phone, password, role } = userData;
        
        // Validate input
        if (!name || !email || !phone || !password || !role) {
            return { success: false, error: 'All fields are required' };
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return { success: false, error: 'Invalid email format' };
        }

        const users = this.getUsers();
        
        // Check if email already exists
        const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (existingUser) {
            return { success: false, error: 'Email already registered' };
        }

        // Create new user
        const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            email: email.toLowerCase(),
            password,
            role,
            name,
            phone,
            createdAt: new Date().toISOString()
        };

        // Add role-specific fields
        if (role === 'driver') {
            newUser.license = '';
            newUser.truckAssigned = '';
        } else if (role === 'agent' || role === 'manager' || role === 'admin') {
            newUser.employeeId = `${role.toUpperCase().substring(0, 3)}${String(newUser.id).padStart(3, '0')}`;
        }

        users.push(newUser);
        
        if (this.saveUsers(users)) {
            // Auto-login after signup
            return this.login(email, password, role);
        }

        return { success: false, error: 'Failed to create account' };
    }

    // Get current logged-in user
    getCurrentUser() {
        try {
            const userStr = localStorage.getItem(CURRENT_USER_KEY);
            return userStr ? JSON.parse(userStr) : null;
        } catch (error) {
            console.error('Error getting current user:', error);
            return null;
        }
    }

    // Get current session
    getSession() {
        try {
            const sessionStr = localStorage.getItem(SESSION_KEY);
            return sessionStr ? JSON.parse(sessionStr) : null;
        } catch (error) {
            console.error('Error getting session:', error);
            return null;
        }
    }

    // Check if user is logged in
    isLoggedIn() {
        return this.getCurrentUser() !== null && this.getSession() !== null;
    }

    // Check if user has specific role
    hasRole(role) {
        const user = this.getCurrentUser();
        return user && user.role === role;
    }

    // Logout function
    logout() {
        try {
            const user = this.getCurrentUser();
            
            // Clear all authentication data
            localStorage.removeItem(CURRENT_USER_KEY);
            localStorage.removeItem(SESSION_KEY);
            localStorage.removeItem('userRole');
            localStorage.removeItem('logihub_jwt');
            
            // Clear role-specific flags
            if (user) {
                localStorage.removeItem(`${user.role}LoggedIn`);
            }
            
            // Clear all possible role flags
            ['customer', 'driver', 'agent', 'manager', 'admin'].forEach(role => {
                localStorage.removeItem(`${role}LoggedIn`);
            });
            
            return true;
        } catch (error) {
            console.error('Error during logout:', error);
            return false;
        }
    }

    // Update user profile
    updateUser(userId, updates) {
        const users = this.getUsers();
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) {
            return { success: false, error: 'User not found' };
        }

        // Don't allow email or role changes
        delete updates.email;
        delete updates.role;
        delete updates.id;
        
        users[userIndex] = { ...users[userIndex], ...updates, updatedAt: new Date().toISOString() };
        
        if (this.saveUsers(users)) {
            // Update current user if it's the same user
            const currentUser = this.getCurrentUser();
            if (currentUser && currentUser.id === userId) {
                localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(users[userIndex]));
            }
            return { success: true, user: users[userIndex] };
        }

        return { success: false, error: 'Failed to update user' };
    }

    // Get user by ID
    getUserById(userId) {
        const users = this.getUsers();
        return users.find(u => u.id === userId);
    }

    // Get users by role
    getUsersByRole(role) {
        const users = this.getUsers();
        return users.filter(u => u.role === role);
    }

    // Require authentication (for protected pages)
    requireAuth(allowedRoles = []) {
        if (!this.isLoggedIn()) {
            window.location.href = 'index.html';
            return false;
        }

        if (allowedRoles.length > 0) {
            const user = this.getCurrentUser();
            if (!allowedRoles.includes(user.role)) {
                alert('Access denied. You do not have permission to view this page.');
                window.location.href = 'index.html';
                return false;
            }
        }

        return true;
    }

    // Get role-specific redirect URL
    getRoleRedirectUrl(role) {
        const redirectUrls = {
            'customer': 'Shlok_ Consumer.html',
            'driver': 'driver_interface.html',
            'agent': 'ShlokAgent/index.html',
            'manager': 'JuhiManager/index.html',
            'admin': 'admin.html'
        };

        return redirectUrls[role] || 'index.html';
    }

    // Display user info in UI
    displayUserInfo(elementSelectors) {
        const user = this.getCurrentUser();
        if (!user) return;

        if (elementSelectors.name) {
            const nameEl = document.querySelector(elementSelectors.name);
            if (nameEl) nameEl.textContent = user.name;
        }

        if (elementSelectors.email) {
            const emailEl = document.querySelector(elementSelectors.email);
            if (emailEl) emailEl.textContent = user.email;
        }

        if (elementSelectors.phone) {
            const phoneEl = document.querySelector(elementSelectors.phone);
            if (phoneEl) phoneEl.textContent = user.phone;
        }

        if (elementSelectors.role) {
            const roleEl = document.querySelector(elementSelectors.role);
            if (roleEl) roleEl.textContent = user.role.charAt(0).toUpperCase() + user.role.slice(1);
        }
    }
}

// Create global auth instance
const auth = new AuthSystem();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AuthSystem, auth };
}
