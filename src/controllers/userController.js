const userModel = require("../models/userModel")
//const validator = require('../validators/validator')



// //--------------------------functions---------------------------//

const isValid = function (value) {
    if (typeof (value) === 'undefined' || typeof (value) === 'null') { return false } 
    if (typeof (value) === 'string' && value.trim().length > 0) { return true } 
}

const isValidRequestBody = function (requestBody) {
    return Object.keys(requestBody).length > 0
}



const createUser = async function (req, res) {
    try {
        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: 'Invalid request parameters. Please provide user details' })
        }
       
        const {  name, phone, email, DOB, gender } = requestBody; 
       
        
        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: 'name is required or check key and value' })
        }
        if (!isValid(phone)) {
            return res.status(400).send({ status: false, message: 'phone is required or check key' })
        }

        // if (!/^[0-9]\d{9}$/gi.test(mobile)) {
    if (!/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(phone.trim())) {
        //if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(mobile)) {
          res.status(400).send({
            status: false,
            message: `Phone should be a valid number`
          });
          return;
        }
        const isphoneNumberAlreadyUsed = await userModel.findOne({ phone }); 


        if (isphoneNumberAlreadyUsed) {
            res.status(400).send({ status: false, message: `${phone} phone number is already registered`, });
            return;
        }

        //....................................................

       
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: `Email is required` })
        }

        //.......................................

        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            return res.status(400).send({ status: false, message: `Email should be a valid email address` })
        }
        const isEmailAlreadyUsed = await userModel.findOne({ email }); 
        if (isEmailAlreadyUsed) {
            return res.status(400).send({ status: false, message: `email address is already registered` })
        }
        if (!isValid(DOB)) {
            return res.status(400).send({ status: false, message: 'name is required or check key and value' })
        }
        if (!isValid(gender)) {
            return res.status(400).send({ status: false, message: 'name is required or check key and value' })
        }
        const userData = {  name, phone, email, DOB,gender }
        const newUser = await userModel.create(userData);
        res.status(201).send({ status: true, message: `User created successfully`, data: newUser });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
}


//.....................................................

const loginUser = async function (req, res) {


    try {
        let requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, msg: "enter a valid request body" });
        }

        const { phone } = requestBody;

        
        const user = await userModel.find({ phone: phone});  

        if (!user) {
            return null
        }else {
            res.status(200).send({ status: true, msg: "phone  exist",data: user })
        
        }
    } catch (error) {
        res.status(500).send({ status: false, msg: error.msg});
    }
}

module.exports = {
    createUser, loginUser
}