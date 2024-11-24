const bcrypt = require('bcrypt');

const testPassword = async () => {
  try {
    const originalPassword = 'Test123';

    // Hash the password
    const hashedPassword = await bcrypt.hash(originalPassword, 10);
    console.log('Original Password:', originalPassword);
    console.log('Hashed Password:', hashedPassword);

    // Compare the hashed password with the original password
    const isMatch = await bcrypt.compare(originalPassword, hashedPassword);
    console.log('Password Match Result:', isMatch);

    if (isMatch) {
      console.log('✅ Password comparison successful!');
    } else {
      console.log('❌ Password comparison failed!');
    }
  } catch (err) {
    console.error('Error testing bcrypt:', err.message);
  }
};

testPassword();
