// database
const data = {
    companyPostData : require("../models/company.json"),
    setcompanyPostData : function (data) {this.companyPostData = data}

}
// save the data in json file 
const fsPromises = require("fs").promises;
const path = require('path');

// get all post from the company database 
const getAllCompanyPost = (req,res)=>{
    res.json(data.companyPostData)
}

const companyNewPost = async (req, res) => {
    const newCompanyPost = {
        id: data.companyPostData?.length ? data.companyPostData[data.companyPostData.length - 1].id + 1 : 1,
        "compName": req.body.compName,
        "postTitle": req.body.postTitle,
        "description": req.body.description,
        "color":    req.body.color,
        "fields": req.body.fields,
        "deadline" : req.body.deadline
    }
    // check if field is not empty
    if (!newCompanyPost.postTitle || !newCompanyPost.fields || !newCompanyPost.deadline) {
        return res.status(400).json({ 'message': 'all fields are required.' });
    }
    // check duplicate || 
    /* 
        - when user login and the user make a[ost
        - check user ID and post postTitle
        = the date posted

    */
    const duplicate = data.companyPostData.find(post => post.postTitle === newCompanyPost.postTitle)
    if (duplicate) return res.sendStatus(409);
    data.setcompanyPostData([...data.companyPostData,newCompanyPost]);
    try {
        // merge the result newCompanyPost to companyPostData
        await fsPromises.writeFile (
            path.join(__dirname, '..','models','company.json'),
                JSON.stringify(data.companyPostData)
            );
            // data.setcompanyPostData([...data.companyPostData, newCompanyPost]);
            res.status(201).json({'success':`New POST ${newCompanyPost.postTitle} Created`});
    } catch (err) {
        res.status(500).json({'message': err.message})
    }
}

const updateCompanyPost = async (req, res) => {
    const post = data.companyPostData.find(comPost => comPost.id === parseInt(req.body.id));
    if (!post) {
        return res.status(400).json({ "message": ` ${req.body.id} not found` });
    }
    
    try {
        if (req.body.postTitle) post.postTitle = req.body.postTitle;
        if (req.body.description) post.description = req.body.description;
        if (req.body.color) post.color = req.body.color;
        if (req.body.deadline) post.deadline = req.body.deadline;
        // Create a filtered array without the company post to be updated
        const filteredArray = data.companyPostData.filter(comPost => comPost.id !== parseInt(req.body.id));

        // Add the updated company post to the filtered array
        const unsortedArray = [...filteredArray, post];

        // Sort the array based on the 'id' property in ascending order
        const sortedArray = unsortedArray.sort((a, b) => a.id - b.id);

        // Update the company post data
        data.setcompanyPostData(sortedArray);

        await fsPromises.writeFile (path.join(__dirname, '..','models','company.json'),JSON.stringify(data.companyPostData));
            
            // Send the updated company post data as response
        res.status(201).json({ success: `POST ID: ${post.id} UPDATED` });
    } catch (err) {
        res.status(500).json({'message': err.message})
    }
    
}

const deleteCompanyPost = async (req, res) => {
    const post = data.companyPostData.find(comPost => comPost.id === parseInt(req.body.id));
    if (!post) {
        return res.status(400).json({ "message": `post ID ${req.body.id} not found` });
    }
    try {
        
        const filteredArray = data.companyPostData.filter(emp => emp.id !== parseInt(req.body.id));
        data.setcompanyPostData([...filteredArray]);
        await fsPromises.writeFile (path.join(__dirname, '..','models','company.json'),JSON.stringify(data.companyPostData));
            
            // Send the updated company post data as response
        res.status(201).json({ success: `POST ID: ${post.id} UPDATED` });
    
    } catch (err) {
        res.status(500).json({'message': err.message})
    }
}

const getCompanyPOst = (req, res) => {
    const companyPostData = data.companyPostData.find(emp => emp.id === parseInt(req.params.id));
    if (!companyPostData) {
        return res.status(400).json({ "message": `Post ID ${req.params.id} not found` });
    }
    res.json(companyPostData);
}




/*
const companyNewPost = (req,res)=>{
    res.json({
        "compName": req.body.compName,
        "postTitle": req.body.postTitle,
        "description": req.body.description,
        "color":    req.body.color,
        "fields": req.body.fields,
        "deadline" : req.body.deadline
    })
}

const updateCompanyPost = (req,res)=>{
    res.json({
        "compName": req.body.compName,
        "postTitle": req.body.postTitle,
        "description": req.body.description,
        "color":    req.body.color,
        "fields": req.body.fields,
        "deadline" : req.body.deadline
    })
}

const deleteCompanyPost = (req,res)=>{
    res.json({

        "id": req.body.id
    })
}

// const getCompanyPOst = (req,res)=>{
//     res.json({"id": req.body.id})
// }
*/

module.exports= {
    getAllCompanyPost,
    companyNewPost,
    updateCompanyPost,
    deleteCompanyPost,
    getCompanyPOst
}