// const express = require('express');
// const app = express();

// // Middleware
// app.use(express.json());

// // Error handling middleware
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });

// app.get('/clients', (req, res) => {
//     try {
//         res.status(200).send({
//             message: 'Clients retrieved successfully',
//             data: clients
//         });
//     } catch (error) {
//         console.error("Error retrieving clients:", error);
//         res.status(500).send({ error: 'Internal server error' });
//     }
// });

// // Simple POST route to add clients
// app.post('/clients/add', (req, res) => {
//     try {
//         console.log("Received data:", req.body);
//         res.status(200).send({ message: 'Client added successfully!' });
//     } catch (error) {
//         console.error("Error processing request:", error);
//         res.status(500).send({ error: 'Internal server error' });
//     }
// });

// // Start the server
// const server = app.listen(3000, '127.0.0.1', () => {
//     console.log('Server running on 127.0.0.1:3000');
// });

// // Handle server errors
// server.on('error', (error) => {
//     if (error.code === 'EADDRINUSE') {
//         console.error('Port 3000 is already in use');
//     } else {
//         console.error('An error occurred:', error);
//     }
// });

// process.on('uncaughtException', (error) => {
//     console.error('Uncaught Exception:', error);
//     process.exit(1);
// });





////////////////////////////////////////////////////////

const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Test route to verify server is working
app.get('/test', (req, res) => {
    res.send('Server is working!');
});

// Simple GET route for clients
app.get('/clients', (req, res) => {
    res.json({ message: 'This is the clients endpoint', clients: [] });
});

// Simple POST route for clients
//app.post('/clients/add', (req, res) => {
    //console.log("Received data:", req.body);
    //res.json({ message: 'Client added successfully!' });
//}); 

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Insert new user into database
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, result) => {
        if (err) throw err;
        res.redirect('/login');
    });
});


// Start the server
app.listen(5500, '127.0.0.1', () => {
    console.log('Server running on 127.0.0.1:5500');
});
