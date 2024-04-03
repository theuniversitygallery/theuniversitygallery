const express = require("express");
const router = express();

const logout = require('../controllers/logoutController');

router.get('/',logout.handleLogout);

module.exports = router;

