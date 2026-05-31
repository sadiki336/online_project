const express = require('express');
const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');

const app = express();
const PORT = 5000;

// ==========================================
// MIDDLEWARE
// ==========================================
app.use(cors({
    origin: 'http://localhost:3000', // Update this to match your React app URL
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Express Session
app.use(session({
    secret: 'your_super_secret_session_key', // Change this to a secure random string
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 // 24 hours expiration
    }
}));

// ==========================================
// MYSQL CONNECTION POOL
// ==========================================
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', // Enter your MySQL password here if you have one
    database: 'team_task_board_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test database connection
db.getConnection()
    .then(connection => {
        console.log('✅ Connected to MySQL Database: team_task_board_db');
        connection.release();
    })
    .catch(err => {
        console.error('❌ Database connection failed: ', err.message);
    });

// ==========================================
// ROUTES (Authentication)
// ==========================================

// 1. REGISTER USER
app.post('/api/auth/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        // Check if username already exists
        const [existingUser] = await db.query('SELECT id FROM users WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'Username is already taken.' });
        }

        // Hash password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // Insert user into DB (Matching your structure: id, username, password_hash)
        await db.query('INSERT INTO users (username, password_hash) VALUES (?, ?)', [username, passwordHash]);

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// 2. LOGIN USER
app.post('/api/auth/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    try {
        // Find user by username
        const [users] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        const user = users[0];

        // Compare passwords
        const match = await bcrypt.compare(password, user.password_hash);
        if (!match) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        // Save user details to session
        req.session.user = { id: user.id, username: user.username };

        res.status(200).json({ message: 'Login successful!', user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// 3. LOGOUT USER
app.post('/api/auth/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to log out.' });
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        res.status(200).json({ message: 'Logged out successfully.' });
    });
});

// 4. CHECK USER SESSION STATUS
app.get('/api/auth/me', (req, res) => {
    if (req.session.user) {
        res.status(200).json({ authenticated: true, user: req.session.user });
    } else {
        res.status(401).json({ authenticated: false, error: 'Not authenticated.' });
    }
});

// ==========================================
// START SERVER
// ==========================================
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});