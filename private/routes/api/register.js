const express = require('express');
const router = express();

const {body} = require("express-validator"); 
const { registerNewUser } = require('../../controllers/registerController');


router.route("^/$|/register(.html)?/")


    .post(
        [
            body("citizenName").notEmpty().withMessage("username need to be set"),
            body("citizenEmail").isEmail().withMessage("email address"),
            body("passCode").notEmpty().withMessage("passCode"),
            body("confirmPwd").notEmpty().withMessage("retype passcode"),
            body("status").notEmpty().withMessage("status not set")
        ], registerNewUser
    )

module.exports = router; 