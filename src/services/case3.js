// Assigning seats for Sem examinations

const assignRooms3 = (roomNo, rollNumbers) => {
    try {
        let data =[];
        const allocatedRooms = {};
        let currentRoomIndex = 0;
        let subCode = rollNumbers.subCode;
        let RollNumbers = rollNumbers.Data
        let examDate = rollNumbers.Date;
        let examTime = rollNumbers.Time;
        RollNumbers.forEach((studentId, index) => {
            const currentRoom = roomNo[currentRoomIndex % roomNo.length];

            if (!allocatedRooms[currentRoom]) {
                allocatedRooms[currentRoom] = [];
            }

            const rollPrefix = studentId.substring(0, 2); // Extracts the first two characters

            let year, department;
            if (rollPrefix === "20") {
                year = 4;
                department = "CSE";
            } else if (rollPrefix === "21") {
                year = 3;
                department = "CSE";
            } else if (rollPrefix === "22") {
                year = 2;
                department = "CSE";
            } else if (rollPrefix === "23") {
                year = 1;
                department = "CSE";
            } else {
                year = "Unknown";
                department = "Unknown";
            }
            if (allocatedRooms[currentRoom].length < 24/2) {
                const seatNo = allocatedRooms[currentRoom].length * 2 + 1; // Increment seat number by 2
                allocatedRooms[currentRoom].push({ roll: studentId, seatNo, year, department,subCode,examDate,examTime });
            }

            if (allocatedRooms[currentRoom].length === 24/2) {
                currentRoomIndex++;
            }
        });

        console.log("CASE_3 Room allocation done ✅")
        data.push(allocatedRooms)
        return data;

    } catch (err) {
        throw err;
    }
}

module.exports = { assignRooms3 };
