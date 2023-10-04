/* eslint-disable no-unused-vars */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000; // Set the desired port number

// Sample user data (replace this with your actual data or database implementation)
const User = props => {
const user = props.location.state;

let users = [
  { id: user.uid, isApproved: false },
  { id: user.uid, isApproved: true },
];

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API endpoint to update multiple users' approval status
app.put('/api/users/approve', (req, res) => {
  const { userUpdates } = req.body;

  // Update the approval status for each user
  userUpdates.forEach((update) => {
    const user = users.find((u) => u.id === update.id);

    if (user) {
      user.isApproved = update.isApproved;
    }
  });

  res.json({ message: 'Users approval status updated successfully' });
});

// API endpoint to fetch all users
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
}
