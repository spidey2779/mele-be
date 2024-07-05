const { CSEModel } = require("../models/rollNumbers");
const YearData = require("../models/yearSubjCode");
const { assignRooms1 } = require("../services/case1")
const { assignRooms2 } = require("../services/case2");
const { assignRooms3 } = require("../services/case3");
const { assignRooms4 } = require("../services/case4");
const { assignRooms5 } = require("../services/case5");
const { mailData } = require("../services/smtp/mailData");
const { exeception } = require("./execption");

// Getting Dept Subcode year-wise from database 
const getAllData = async () => {
  try {
    const allData = await YearData.find({}).lean().exec();
    const filteredData = allData.map(doc => {
      for (const key in doc) {
        if (doc[key] === null) {
          delete doc[key]; // Removing fields with null values
        }
      }
      // console.log(doc);
      return doc;
    });

    if (filteredData && filteredData.length > 0) {
      console.log('Found Data ✅');
      return filteredData;
    } else {
      console.log('No data found ❌');
      return [];
    }
  } catch (err) {
    console.error('Error !!!', err);
    throw err;
  }
};


const deptExam = async (dataFromFrontend) => {

  const roomsNeeded = dataFromFrontend[0]; // Room numbers selected
  const data = dataFromFrontend[1]; // Dept write exam
  const date = dataFromFrontend[2].date; // retriving date
  let resultForCase;
  let roomNo = [];

  // Creating room numbers  
  if (roomsNeeded.WB) {
    roomNo = roomNo.concat(roomsNeeded.WB.map(room => `WB-${room}`));
  }
  if (roomsNeeded.SB) {
    roomNo = roomNo.concat(roomsNeeded.SB.map(room => `SB-${room}`));
  }
  if (roomsNeeded.EB) {
    roomNo = roomNo.concat(roomsNeeded.EB.map(room => `EB-${room}`));
  }

  let yearCSEData, yearCSEData1;

  //time conversion function
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12; // Convert to 12-hour format

    return `${displayHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${period}`;
  };

  // retriving time
  const formattedFromTime = formatTime(dataFromFrontend[2].fromtime);
  const formattedToTime = formatTime(dataFromFrontend[2].totime);
  const timeRange = `From ${formattedFromTime} to ${formattedToTime}`;
  // console.log(timeRange);

  const AllocSeats = dataFromFrontend[2].seating; // Continuously allocated or Jumble allocated
  // console.log(AllocSeats);


  //---------------------- Execption for PE subjects ------------------------------------------------------------------------

  let allocateSeats;
  let PEData, PE = [];
  if (data.CSE3 && data.CSE3.length > 0 && data.CSE3[0].includes("PE-1")) {
    
    if (AllocSeats === "continuous") {
      allocateSeats = assignRooms4(); // Get the allocateSeats function
      
      PEData = await exeception();
      yearCSEData = { Data: PEData.code1RollNumbers, subCode: "20CSE402", Date: date, Time: timeRange };
      yearCSEData1 = { Data: PEData.code1RollNumbers1, subCode: "20CSE403", Date: date, Time: timeRange };
      
      resultForCase = allocateSeats(roomNo, yearCSEData); // Allocate seats for the first set
      resultForCase = allocateSeats(roomNo, yearCSEData1); // Allocate seats for the second set

      PE.push(resultForCase);
      console.log("Case_4 Room allocation done ✅");
      // console.log(PE);
      mailData();
      return PE;

    } else {

      allocateSeats = assignRooms5(); 
      PEData = await exeception();
      yearCSEData = { Data: PEData.code1RollNumbers, subCode: "20CSE402", Date: date, Time: timeRange };
      yearCSEData1 = { Data: PEData.code1RollNumbers1, subCode: "20CSE403", Date: date, Time: timeRange };
      
      resultForCase = allocateSeats(roomNo, yearCSEData); // Allocate seats for the first set
      resultForCase = allocateSeats(roomNo, yearCSEData1); // Allocate seats for the second set

      PE.push(resultForCase);
      console.log("Case_5 Room allocation done ✅");
      // console.log(PE);
      mailData();
      return PE;
    }
  }

// ------------------------------------------------------------------------------------------------

  const CSE1 = async () => {
    console.log("CSE1 subject codes retrieved");
    const result = await CSEModel.findOne(
      { year1: { $exists: true, $ne: [] } },
      { _id: 0, year1: 1 }
    ).exec();
    return result ? result.year1 : [];
  };

  const CSE2 = async () => {
    console.log("CSE2 subject codes retrieved");
    const result = await CSEModel.findOne(
      { year2: { $exists: true, $ne: [] } },
      { _id: 0, year2: 1 }
    ).exec();
    return result ? result.year2 : [];
  };

  const CSE3 = async () => {
    console.log("CSE3 subject codes retrieved");
    const result = await CSEModel.findOne(
      { year3: { $exists: true, $ne: [] } },
      { _id: 0, year3: 1 }
    ).exec();
    return result ? result.year3 : [];
  };

  const CSE4 = async () => {
    console.log("CSE4 subject codes retrieved");
    const result = await CSEModel.findOne(
      { year4: { $exists: true, $ne: [] } },
      { _id: 0, year4: 1 }
    ).exec();
    return result ? result.year4 : [];
  };

  if (data.CSE1 && !data.CSE2 && !data.CSE3 && !data.CSE4) {

    // Only CSE1 data is present
    yearCSEData = { Data: await CSE1(), subCode: data.CSE1[0], Date: date, Time: timeRange }
    // console.log(yearCSEData)

  } else if (data.CSE2 && !data.CSE3 && !data.CSE4 && !data.CSE1) {

    // Only CSE2 data is present
    yearCSEData = { Data: await CSE2(), subCode: data.CSE2[0], Date: date, Time: timeRange }

  }
  if (data.CSE3 && !data.CSE1 && !data.CSE2 && !data.CSE4) {

    // Only CSE3 data is present
    yearCSEData = { Data: await CSE3(), subCode: data.CSE3[0], Date: date, Time: timeRange }

  }
  if (data.CSE4 && !data.CSE1 && !data.CSE2 && !data.CSE3) {

    // Only CSE4 data is present
    yearCSEData = { Data: await CSE4(), subCode: data.CSE4[0], Date: date, Time: timeRange }

  }


  if (data.CSE1 && data.CSE2 && !data.CSE3 && !data.CSE4) {
    // Both CSE1 and CSE2 data are present

    rollsCSE1 = { Data: await CSE1(), subCode: data.CSE1[0], Date: date, Time: timeRange }
    rollsCSE2 = { Data: await CSE2(), subCode: data.CSE2[0], Date: date, Time: timeRange }

    yearCSEData1 = { rollsCSE1, rollsCSE2 }
    console.log(yearCSEData1);

  }
  if (data.CSE1 && data.CSE3 && !data.CSE2 && !data.CSE4) {
    // Both CSE1 and CSE3 data are present

    rollsCSE1 = { Data: await CSE1(), subCode: data.CSE1[0] }
    rollsCSE3 = { Data: await CSE3(), subCode: data.CSE3[0] }

    yearCSEData1 = { rollsCSE1, rollsCSE3 }

  }
  if (data.CSE1 && data.CSE4 && !data.CSE2 && !data.CSE3) {
    // Both CSE1 and CSE4 data are present

    rollsCSE1 = { Data: await CSE1(), subCode: data.CSE1[0] }
    rollsCSE4 = { Data: await CSE4(), subCode: data.CSE4[0] }

    yearCSEData1 = { rollsCSE1, rollsCSE4 }

  }
  if (data.CSE2 && data.CSE3 && !data.CSE4 && !data.CSE1) {
    // Both CSE2 and CSE3 data are present

    rollsCSE2 = { Data: await CSE2(), subCode: data.CSE2[0] }
    rollsCSE3 = { Data: await CSE3(), subCode: data.CSE3[0] }

    yearCSEData1 = { rollsCSE2, rollsCSE3 }

  }
  if (data.CSE2 && data.CSE4 && !data.CSE1 && !data.CSE3) {
    // Both CSE2 and CSE4 data are present

    rollsCSE2 = { Data: await CSE2(), subCode: data.CSE2[0] }
    rollsCSE4 = { Data: await CSE4(), subCode: data.CSE4[0] }

    yearCSEData1 = { rollsCSE2, rollsCSE4 }

  }
  if (data.CSE3 && data.CSE4 && !data.CSE1 && !data.CSE2) {
    // Both CSE3 and CSE4 data are present

    rollsCSE3 = { Data: await CSE3(), subCode: data.CSE3[0] }
    rollsCSE4 = { Data: await CSE4(), subCode: data.CSE4[0] }
    // console.log(rollsCSE3)

    yearCSEData1 = { rollsCSE3, rollsCSE4 }

  }

  if (yearCSEData && Object.keys(yearCSEData).length > 0) {
    if (AllocSeats === "continuous") {
      resultForCase = assignRooms1(roomNo, yearCSEData); // Send data for case1
    } else {
      resultForCase = assignRooms3(roomNo, yearCSEData); //send data for case3
    }
  } else if (yearCSEData1 && Object.keys(yearCSEData1).length > 0) {
    resultForCase = assignRooms2(roomNo, yearCSEData1); // Send data for case2
  } else {
    // Handle a scenario where neither yearCSEData nor yearCSEData1 has valid data
    resultForCase = {}; // Set a default or handle it as needed
  }
  
  mailData();
  return resultForCase;
};

module.exports = {
  getAllData,
  deptExam
};
