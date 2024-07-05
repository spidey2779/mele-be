const AdminSchema = require('../models/admin');
const bcrypt = require('bcrypt');

authenticateAdmin = async (username, password) => {
  console.log("authentication verifying...");
  try {
    const user = await AdminSchema.findOne({ username });

    if (!user) {
      console.log("No admin found ❌")
      return { success: false, message: 'Authentication failed. User not found.' };
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      console.log('Authentication failed ❌');
      return { success: false, message: 'Authentication failed. Incorrect password.' };
    }
    console.log("Authentication successful 🎉")
    return { success: true, message: 'Authentication successful.', };
  } catch (error) {
    throw new Error('Authentication failed. Error occurred.');
  }
}

module.exports = authenticateAdmin;
