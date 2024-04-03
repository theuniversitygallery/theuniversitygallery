const validateInput = (input) => {
    // regular expression to match only alphabets and spaces 
    const regex = /^[A-Za-z\s]+$/;
    // check if the input is not empty and matches the regex 
    return input.trim() !== '' && regex.test(input);
}

    
const specChar = (input) => {
    // trim the input
    const username = input.trim();
    // check if the speacial characters
    const usernameRegex = /^([a-zA-Z0-9]+|[a-zA-Z0-9_]+)$/;    
    
    // if username conatins _ , numbers or no numbers return true
    if(usernameRegex.test(username)) return username;
    //   if username does not match any valiable  return false

    return ;
}

    if(!specChar(username)) return res.status(409);

const isEmailAddress = (email) =>{
    const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9_.]+$/;
    return pattern.test(email);
}
const isTheSamePass= (pass1,pass2) =>{
    
    return pass1 === pass2;
}


// export
module.exports = {isUserName,isEmailAddress,isTheSamePass};