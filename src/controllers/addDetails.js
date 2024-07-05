// Import necessary modules
const { CSEModel } = require('../models/rollNumbers');
const Rooms = require('../models/rooms');
const YearData = require('../models/yearSubjCode');

// Controller to drop existing data and save new CSE data
const dropAndSaveCSEData = async (req, res) => {
    try {
        // Drop existing CSE data
        await CSEModel.deleteMany({});

        // Save new CSE data
        const { year1, year2, year3, year4 } = req.body;
        const cseInstance = new CSEModel({
            year1,
            year2,
            year3,
            year4
        });
        await cseInstance.save();

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error in Dropping and Saving CSE Data', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

// Controller to drop existing room numbers and save new data
const dropAndSaveRoomNumbers = async (req, res) => {
    try {
        // Drop existing room numbers
        await Rooms.deleteMany({});

        // Save new room numbers
        const { WB, SB, EB } = req.body;
        const roomNumbers = new Rooms({
            WB,
            SB,
            EB
        });
        await roomNumbers.save();

        res.status(200).json({ success: true });
    } catch (error) {
        console.error('Error in Dropping and Saving Room Numbers:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};


// // Controller to drop existing subjects data and save new data
// const dropAndSaveSubjects = async (req, res) => {
//     try {
//         // Drop existing subjects data
//         await YearData.deleteMany({});

//         // Save new subjects data
//         const {_id, CSE1, CSE2, CSE3, CSE4 } = req.body;
//         const addingSubject = new YearData(
// _id,
//             {
//                 CSE1
//             },
//             {

//                 CSE2,
//             },
//             {

//                 CSE3,
//             },
//             {

//                 CSE4
//             }
//         );
//         await addingSubject.save();

//         res.status(200).json({ success: true });
//     } catch (error) {
//         console.error('Error in Dropping and Saving Subjects:', error);
//         res.status(500).json({ success: false, error: 'Internal Server Error' });
//     }
// };

// Export the controllers
module.exports = {
    dropAndSaveCSEData,
    dropAndSaveRoomNumbers,
};
