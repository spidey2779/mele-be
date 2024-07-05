const roomSchema = require('../models/rooms');

const emptyRooms = async () => {
  try {
    const rooms = await roomSchema.find({}).exec();
    if (rooms && rooms.length > 0) {
      console.log('Found Rooms ✅');
      return rooms;
    } else {
      console.log('No rooms found ❌');
      return [];
    }
  } catch (err) {
    console.error('Error:!!!!', err);
    throw err;
  }
};

module.exports = emptyRooms;
