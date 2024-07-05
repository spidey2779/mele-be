// PE course special case jumble allocation for mid exams

const assignRooms5 = () => {
    let currentRoomIndex = 0;
    let lastAssignedSeatNo = 0;
    let allocatedRooms = {};

    const allocateSeats = (roomNo, rollNumbers) => {
        try {
            let subCode = rollNumbers.subCode;
            let RollNumbers = rollNumbers.Data;
            let examDate = rollNumbers.Date;
            let examTime = rollNumbers.Time;

            RollNumbers.forEach((studentId, index) => {
                const currentRoom = roomNo[currentRoomIndex % roomNo.length];

                if (!allocatedRooms[currentRoom]) {
                    allocatedRooms[currentRoom] = [];
                    lastAssignedSeatNo = 0; // Reset seat number for new room
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

                if(allocatedRooms[currentRoom].length < 24/2 && index !== RollNumbers.length - 1) {
                    // Increment the last assigned seat number and use it for the new seat number
                    lastAssignedSeatNo ++;
                    allocatedRooms[currentRoom].push({
                        roll: studentId,
                        seatNo: lastAssignedSeatNo,
                        year,
                        department,
                        subCode,
                        examDate,
                        examTime,
                    });
                    lastAssignedSeatNo++
                }

                if (allocatedRooms[currentRoom].length === 24/2 && index !== RollNumbers.length - 1) {
                    currentRoomIndex++;
                }
            });
            // console.log(allocatedRooms)
            console.log("PE rooms allocating...");
            return allocatedRooms;
        } catch (err) {
            throw err;
        }
    };

    return allocateSeats;
};

module.exports = { assignRooms5 };
