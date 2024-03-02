import bcrypt from 'bcrypt';

export default function hashPassword(password: string): Promise<string> {
  const saltRounds = 10; // Number of salt rounds

  return new Promise(async (resolve, reject) => {
    // Generate a salt
    const salt = await generateSalt(saltRounds);

    bcrypt.hash(password, salt, (err, hash) => {
      if (err) {
        console.error('Error hashing password:', err);
        reject(err);
        return;
      }

      // At this point, 'hash' contains the hashed password
      console.log('Salt:', salt);
      console.log('Hashed Password:', hash);

      resolve(hash);
      // Now, you can store the 'salt' and 'hash' in your database
      // ...
    });
  });
}

function generateSalt(saltNumber: number): Promise<string> {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(saltNumber, (err, salt) => {
      if (err) {
        reject(err);
      }

      resolve(salt);
    });
  });
}
