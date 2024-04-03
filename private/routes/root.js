const express = require("express");
const router = express();
const path = require('path');


router.get('^/$|/index(.html)', (req, res) => {
    res.sendFile(path.join(__dirname, '..','views','index.html'));
}),
// route.get('/create(.html)?', (req, res) => {
//     res.sendFile(path.join(__dirname, 'views','create.html'));

// });

router.get('/total(.html)?', (req, res) => {
    res.redirect(301,'/create.html');

});
router.get('/company(.html)?', (req, res) => {
    res.redirect(301,'/index.html');

});


module.exports = router;