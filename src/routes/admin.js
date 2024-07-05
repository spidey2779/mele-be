var express = require('express');
const authenticateAdmin = require('../middleware/admin');
var router = express.Router();

const admin = router.post('/login',async (req,res)=>{
    const { username, password } = req.body;
    console.log("Got data from admin Login ✅");
  
  try {
    const result = await authenticateAdmin(username, password);
    res.send(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = { admin }
