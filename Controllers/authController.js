const bcrypt = require('bcryptjs');
const { User } = require('../models')
const {generateToken,generateRefreshToken} = require('../jwt')

  // Login Route
  const loginUser = async(req, res) => {
    try{
        // Extract username and password from request body
       const { email , password } = req.body;
        // const user = await Person.findOne({username: username});
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).send('Invalid email or password');


        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).send('Invalid email or password');

        // generate Token 
        const payload = {
            id: user.id,
            email: user.email
        }
        const token = generateToken(payload);

        // resturn token as response
        res.json({token})
    }catch(err){
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const logoutUser = async (req, res) => {
    // Logout is typically handled on the client by removing the token
    res.status(200).send('Logged out successfully');
  };

  const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return res.status(403).send('Refresh token is required');
  
    try {
      const token = generateRefreshToken(refreshToken)
      res.send({ token });
    } catch (error) {
      return res.status(403).send('Invalid refresh token');
    }
  };


  module.exports  =  { loginUser,logoutUser,refreshAccessToken }