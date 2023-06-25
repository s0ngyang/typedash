const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const prisma = require('../db');

router.post('/', async (req, res) => {
  try {
    const { name, email, password, password2 } = req.body;

    const errors = [];

    if (!name || !email || !password || !password2) {
      errors.push({ message: 'Please enter all fields' });
    }

    if (password.length < 6) {
      errors.push({ message: 'Password must be at least 6 characters long' });
    }

    if (password !== password2) {
      errors.push({ message: 'Passwords do not match' });
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    main()
      .then(async () => {
        await prisma.$disconnect();
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });

    return res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    return res.status(500).json({ message: 'Registration failed' });
  }
});

async function main() {
  await prisma.users.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });
}

module.exports = router;
