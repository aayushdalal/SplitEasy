require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { calculateSettlements } = require('./algorithm/splitwise');

// Initialize the app
const app = express();
const PORT = process.env.PORT ||8080;
// Middleware
app.use(cors()); // Allows requests from your frontend
app.use(express.json()); // Allows the server to understand JSON from request bodies

// --- Our In-Memory Database ---
// This is just an array that will reset every time the server restarts.
// It's perfect for now.
let transactions = [];

// --- API ROUTES ---

// Route 1: GET /transactions - To see all current transactions (for debugging)
app.get('/transactions', (req, res) => {
  res.json(transactions);
});

// Route 2: POST /transaction - To add a new expense from the frontend
app.post('/transaction', (req, res) => {
  // We expect the frontend to send a body like: { from: 'Person A', to: 'Person B', amount: 100 }
  const newTransaction = req.body;
  transactions.push(newTransaction);
  console.log('Added new transaction:', newTransaction);
  res.status(201).json({ message: 'Transaction added successfully' });
});

// Route 3: GET /settlements - The "Calculate" button will call this
app.get('/settlements', (req, res) => {
  const settlements = calculateSettlements(transactions);
  res.json(settlements);
});

// Route 4: DELETE /transactions - The "Clear" or "Resettle" button will call this
app.delete('/transactions', (req, res) => {
  transactions = []; // Reset our "database"
  console.log('All transactions cleared.');
  res.json({ message: 'All transactions cleared' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});