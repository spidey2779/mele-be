var express = require('express');
const emptyRooms = require('../controllers/rooms');
var router = express.Router();

const rooms = router.get('/empty',async (req,res)=>{
  try {
    console.log("Fetching data of Rooms Available...")
    const result = await emptyRooms();
    res.send(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = { rooms }
