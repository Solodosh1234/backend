require('dotenv').config();


const app_secret_key = process.env.APP_SECRET_KEY;

const verifyKey = (req,res,next)=>{
  const appkey = req.header('x-secret-key');
  if (!appkey ||appkey !== app_secret_key) {
    return res.status(401).json({
      message:"  Unauthorised"
    });
  }
  next();
};

module.exports = verifyKey;