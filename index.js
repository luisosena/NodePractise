// Import required modules
const express = require('express');
const path = require('path');

// Create Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Routes

// Home route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Express App</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        .container { max-width: 800px; margin: 0 auto; }
        .success { color: green; }
        .error { color: red; }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 Express Server is Running!</h1>
        <p>Your server is successfully running on port ${PORT}</p>
        
        <h2>Available Routes:</h2>
        <ul>
          <li><a href="/">Home</a> (GET)</li>
          <li><a href="/api/users">Users API</a> (GET)</li>
          <li><a href="/about">About</a> (GET)</li>
        </ul>
        
        <h2>Test POST Request:</h2>
        <form action="/api/data" method="POST">
          <input type="text" name="message" placeholder="Enter a message" required>
          <button type="submit">Send</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

// About route
app.get('/about', (req, res) => {
  res.json({
    message: 'About this Express API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API Routes

// GET all users
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  res.json({
    success: true,
    data: users,
    count: users.length
  });
});

// GET user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  
  if (isNaN(userId)) {
    return res.status(400).json({
      success: false,
      error: 'Invalid user ID'
    });
  }
  
  // Mock user data
  const user = { id: userId, name: `User ${userId}`, email: `user${userId}@example.com` };
  
  res.json({
    success: true,
    data: user
  });
});

// POST route to receive data
app.post('/api/data', (req, res) => {
  const { message } = req.body;
  
  if (!message) {
    return res.status(400).json({
      success: false,
      error: 'Message is required'
    });
  }
  
  res.json({
    success: true,
    message: 'Data received successfully!',
    received: message,
    timestamp: new Date().toISOString()
  });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: 'Something went wrong!'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`📁 Static files served from: ${path.join(__dirname, 'public')}`);
  console.log(`🕒 Started at: ${new Date().toISOString()}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

// Graceful shutdown handling
process.on('SIGINT', () => {
  console.log('\n👋 Server is shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n👋 Server is shutting down...');
  process.exit(0);
});