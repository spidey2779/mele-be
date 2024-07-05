// Assigning seats for two year students at a time

const { assignRooms1 } = require("./case1");

const assignRooms2 = (roomsNeeded, yearCSEData1) => {

    let main = [];
    let combinedResult;

    if (yearCSEData1.rollsCSE1 && yearCSEData1.rollsCSE2) {

        const result = assignRooms1(roomsNeeded, yearCSEData1.rollsCSE1);
        const result2 = assignRooms1(roomsNeeded, yearCSEData1.rollsCSE2);
        combinedResult = main.concat(result, result2);

    }
    if (yearCSEData1.rollsCSE1 && yearCSEData1.rollsCSE3) {

        const result = assignRooms1(roomsNeeded, yearCSEData1.rollsCSE1);
        const result2 = assignRooms1(roomsNeeded, yearCSEData1.rollsCSE3);
         combinedResult = main.concat(result, result2);

    }
    if (yearCSEData1.rollsCSE1 && yearCSEData1.rollsCSE4) {

        const result = assignRooms1(roomsNeeded, yearCSEData1.rollsCSE1);
        const result2 = assignRooms1(roomsNeeded, yearCSEData1.rollsCSE4);
         combinedResult = main.concat(result, result2);

    }
    if (yearCSEData1.rollsCSE2 && yearCSEData1.rollsCSE3) {

        const result = assignRooms1(roomsNeeded, yearCSEData1.rollsCSE2);
        const result2 = assignRooms1(roomsNeeded, yearCSEData1.rollsCSE3);
         combinedResult = main.concat(result, result2);

    }
    if (yearCSEData1.rollsCSE2 && yearCSEData1.rollsCSE4) {

        const result = assignRooms1(roomsNeeded, yearCSEData1.rollsCSE2);
        const result2 = assignRooms1(roomsNeeded, yearCSEData1.rollsCSE4);
         combinedResult = main.concat(result, result2);

    }

    if (yearCSEData1.rollsCSE3 && yearCSEData1.rollsCSE4) {

        const result = assignRooms1(roomsNeeded, yearCSEData1.rollsCSE3);
        const result2 = assignRooms1(roomsNeeded, yearCSEData1.rollsCSE4);
         combinedResult = main.concat(result, result2);

    }
    console.log("CASE_2 Room allocation done ✅")
    return combinedResult;

}

module.exports = { assignRooms2 }