const express = require('express');
const router = express();
const {query,body} = require("express-validator"); 

const {getAllContent,newContent,getContentByID,deletContentByID,updateContentByID} = require('../../controllers/contentController');
const verifyJwt = require('../../middleware/verifyJWT');
// explore route this will show all the student or company post base on the geo location
router.route('^/$|/content(.html)?/')
    .get(query(),getAllContent)
    .post(
            [
            body("title").notEmpty().withMessage("fill in with title"),
            body("desc").notEmpty().isByteLength({min:30, max:250}).withMessage("fill in with 30 words min"),
            body("img").notEmpty().withMessage("fill in img"),
            body("color").notEmpty().withMessage("fill in  color"),
            body("tags").isArray({min:1, max:6}).withMessage("min length for tag is 1 max is 6"),
          ]
        ,newContent
    )
    // .patch(deleteContent)
// search intent by location or interest
router.route('^/$|/content(.html)?/:postId')
.get(getContentByID)
.patch(updateContentByID)
.delete(deletContentByID);

module.exports = router;