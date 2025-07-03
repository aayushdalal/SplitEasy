# SplitEasy – Group Expense Management Platform

[Live Site](https://spliteasyyy.netlify.app/) 

SplitEasy is a full-stack web application that simplifies group debt settlement by minimizing the number of transactions required to settle complex shared expenses. It is ideal for use cases like trips, events, or shared living expenses. It works on custom greedy graph algorithm to compute net balances and optimize transactions between users (e.g., trip, event, or roommate expenses). 

Designed and deployed a modular ledger-based system architecture, where transactions are represented as edges in a graph; system computes who owes whom and by how much. 
Deployed backend on render and frontend on netlify 
## Features

### Expense Management
- Add transactions specifying who paid, how much, and who the expense was shared with.
- Calculate the minimum number of settlements needed using a custom greedy graph-based algorithm.
- Optimize transactions to minimize the total number of money transfers.

### Email Notifications via Nodemailer
- After calculating settlements, users can send personalized emails to participants.
- Each participant receives:
  - A list of whom they owe and the amount.
  - The UPI ID or phone number of the person they need to pay.

### Responsive UI
- Clean and modern interface using Bootstrap 5.
- Background illustrations and overlays for enhanced readability.

## Tech Stack

**Frontend**
- React
- Redux Toolkit
- Bootstrap
- Vite

**Backend**
- Node.js
- Express.js
- Nodemailer
- dotenv
- cors
- body-parser

## How It Works

1. Users add transactions such as "Aayush paid ₹1000 for Aayush and Anish."
2. The system calculates each participant's share and builds a net balance ledger.
3. A greedy algorithm computes the minimal set of required settlements like "Anish pays Aayush ₹500."
4. After settlements are calculated, the user can:
   - Enter email addresses for each participant.
   - Provide a UPI ID or phone number to receive payments.
5. On submission, each participant receives an email with the amount they owe and payment details.


