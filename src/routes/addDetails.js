var express = require('express');
var router = express.Router();
const {dropAndSaveCSEData ,dropAndSaveRoomNumbers} = require('../controllers/addDetails');

router.post('/rollNumbers', dropAndSaveCSEData); // for sending rollnumbers to database

router.post('/roomNumbers',dropAndSaveRoomNumbers); // for sending room numbers to database



module.exports = router;
