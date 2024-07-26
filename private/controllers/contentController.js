const fs = require("fs");
const fspromises = require("fs").promises;
const path = require('path');
const {validationResult, matchedData} = require("express-validator");
const content = require('../models/content.json'); 


//user creating new record
const newContent = async (req, res) => {
 let result = validationResult(req)
 if(!result.isEmpty()) return res.sendStatus(400).send({errors: result.array() })
  const data = matchedData(req);
 const {userID,title, desc,img,color,tags, date_created} = data;
  try {
    // read the data from the file async
    const readJson = fs.readFileSync(path.join(__dirname,"..",'models',"content.json"),'utf-8');
    // check last inserted id and add 1 to it for the next record
    
    let lastID = content.length > 0 ? content[content.length - 1].postID : 0 ;
    lastID = (lastID === null || lastID === "" || lastID === undefined) ? 1 : lastID + 1;

    // preparing the data for input. // data need to be sanitorized
    const jsonData = {
      "postID" : lastID,
      userID,title, desc,img,color,tags, date_created
    };

    const data = JSON.parse(readJson);
    data.push(jsonData)
    
    await fspromises.writeFile(path.join(__dirname,"..",'models',"content.json"), JSON.stringify(data));
    // after completing status code
    res.send(jsonData)
    res.status(200).json({ message: 'Content uploaded successfully' });
  } catch (err) {
    console.error(err)

    res.status(500).json({ message: 'content was not uploaded successfully' });
  }
}

//user deleting record
const getContentByID =  (req,res,next) => { 
  
  // res.send(req.cookies);
  validationResult(req).throw();
    const {
      params:{postId} 
      } = req;
      const parsedId = parseInt(postId);
      if (isNaN(parsedId)) return res.status(400).json({ message: 'Content does not exit: invalid ID' });   
      const findById = content.findIndex(post => post.postID === parsedId);
      if(findById === -1) return res.sendStatus(404);
      const findPostById = content[findById]
        return res.send(findPostById);
};

  // get all post from user
const getAllContent = async (req, res) => {
    // console.log(req.cookies);
    // res.send(req.cookies);
      // validationResult(req).throw();

    res.status(201).json(content);
}

const updateContentByID = async (req,res) =>{
  validationResult(req).throw();
    try {
      const {
        body,
        params:{postId} 
    } = req;
    const parsedId = parseInt(postId);
    if (isNaN(parsedId)) return res.status(400).json({ message: 'Content does not exit: invalid ID' });   
    const findById = content.findIndex(post => post.postID === parsedId);
    if(findById === -1) return res.sendStatus(404);
    // update content
    const update = content[findById] = {...content[findById], ...body}
    fs.writeFileSync(path.join(__dirname,"..",'models',"content.json"), JSON.stringify(content, null, 2));
    
    return res.status(200).json({message:`updated successfuly`});
  } catch (error) {
    throw(error)
  }
}

const deletContentByID = (req,res) => {
  validationResult(req).throw();
     try {
        const {
          params:{postId} 
      } = req;
      const parsedId = parseInt(postId);
      if (isNaN(parsedId)) return res.status(400).json({ message: 'Content does not exit: invalid ID' });   
      const findById = content.findIndex(post => post.postID === parsedId);
      if(findById === -1) return res.sendStatus(404);
      content.splice(findById,1);
      fs.writeFileSync(path.join(__dirname,"..",'models',"content.json"), JSON.stringify(content, null, 2));
      return res.status(204).json({message:`content deleted successfully`});
     } catch (error) {
      console.error(error)
     }

}


module.exports = {
  newContent,
  getContentByID,
  getAllContent,
  deletContentByID,
  updateContentByID
};