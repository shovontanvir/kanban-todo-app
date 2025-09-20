var jwt = require('jsonwebtoken');
var User = require('../models/userModel');
var Token = require('../models/tokenModel');

require('dotenv').config();

const validateUser = async (req, res) => {
    const requestedUser = req.body;

    const user = await User.findOne({ email: requestedUser.email });

    if(!user) return res.status(404).send({message: 'User not found'});

    if(!!user && user.password !== requestedUser.password) return res.status(404).send({message: 'Incorrect Password'});
    
    const accessToken = jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });  

    const newToken = new Token({ userId: user._id, token: accessToken });
    await newToken.save();

    res.status(200).send({
    data: {
        user,
        accessToken, 
        message: 'Login successful'
    }});
}

module.exports = { validateUser };