const express = require("express");
const router = express.Router();
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');
const companyControllers = require('../../controllers/companyPostController');
// const [ getAllCompanyPost,companyNewPost,updateCompanyPost,deleteCompanyPost, getCompanyPOst] = companyControllers;
// user  request




router.route('/')
    .get(companyControllers.getAllCompanyPost)
    // post to the database
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),companyControllers.companyNewPost)
    // update
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Editor),companyControllers.updateCompanyPost)
    // delate post
    .delete(verifyRoles(ROLES_LIST.Admin),companyControllers.deleteCompanyPost)
    
    router.route('/:id')
        .get(companyControllers.getCompanyPOst);


    module.exports = router;