var express = require('express');
const {getAllData, deptExam} = require('../controllers/yearSubjCode');
var router = express.Router();

const subCode = router.get('/code',async (req,res)=>{
  try {
    console.log("Fetching data for Subject Codes Year-Dept ...")
    const result = await getAllData();
    console.log(result)
    res.send(result);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

const deptYear = router.post('/allocRoom',async(req,res)=>{
  try{
    console.log("Got data from frontend ")
    const data = req.body;
    console.log(data);
    const result = await deptExam(data);
    res.send(result);
    // res.send(data);
  }catch(error){
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
})


module.exports = { subCode , deptYear}
