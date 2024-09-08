// API routes
const express = require('express');
const router = express.Router();
const { logErr, logSuccess } = require('./logger.js');

const placeholderUser = { id: 1, email: 'user@example.com' };

// GET Index
router.get('/', (req, res) => {
  logSuccess('POST /');
  res.send('Welcome to Vulnerable API!');
});

// GET /users
router.get('/users', (req, res) => {
  logSuccess('GET /users');
  res
    .status(200)
    .json({
      success: true,
      users: [placeholderUser, placeholderUser, placeholderUser],
    });
});

// GET /users/:id
router.get('/users/:id', (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error('id parameter is required');
    }
    const user = { ...placeholderUser, id }; // TODO: example user
    logSuccess(`GET /users/${id}`, user);
    res.status(200).json({ success: true, user });
  } catch (err) {
    logErr('GET /users/:id', err);
    res.status(401).json({ error: err.message });
  }
});

// POST Login
// Params:  email, password
router.post('/login', (req, res) => {
  try {
    validateParams(req, 'email', 'password');
    // Do something with these
    const { email, password } = req.body;
    logSuccess('POST /login', JSON.stringify({ email, password }));

    res.status(200).json({ success: true, message: 'login successful' });
  } catch (err) {
    res
      .status(400)
      .json({ success: false, message: 'invalid request: ' + err.message });
  }
});

// POST Logout
router.post('/logout', (req, res) => {
  logSuccess('POST /logout');
  res.status(200).json({ success: true, message: 'logout successful' });
});

// POST Contact
// Params: email, name, message
router.post('/contact', (req, res) => {
  try {
    validateParams(req, 'email', 'name', 'message');
    // Do something with these
    const { email, name, message } = req.body;
    logSuccess('POST /contact', JSON.stringify({ email, name, message }));
    res.status(200).json({ success: true, message: 'Contact successful' });
  } catch (err) {
    logErr('POST /contact', err);
    res
      .status(400)
      .json({ success: false, message: 'invalid request: ' + err.message });
  }
});

// Validate body contains a list of required parameters
// Throws error if any parameters are not in request body.
const validateParams = (req, ...requiredParams) => {
  requiredParams.map((key) => {
    if (!req.body.hasOwnProperty(key)) {
      throw new Error(`missing required parameter: ${key}`);
    }
  });
};

module.exports = router;
