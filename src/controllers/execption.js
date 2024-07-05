const {execptionModel} = require("../models/execption");

const exeception = async() => {
    // Retrieve data
    console.log("Exception")
    try{
        const execptionData = await execptionModel.find({}, 'code1');
        // Extract code1 roll numbers from the result
        const code1RollNumbers = execptionData.map(item => item.code1).flat()

        const execptionData1 = await execptionModel.find({}, 'code2');
        // Extract code1 roll numbers from the result
        const code1RollNumbers1 = execptionData1.map(item => item.code2).flat()
        let PERollNumbers = {code1RollNumbers,code1RollNumbers1}

        return PERollNumbers;

    }
    catch(err){
        console.log(err)
        return err;
    }
    
    // return "execpt";
}

module.exports = {exeception}