const express = require('express');
const router = express.Router();
const prisma = require('../prismaclient');
const authenticateToken = require('./authenticate-token');

router.post('/create', authenticateToken, async (req, res) => {
  // const { challenge_id, type, wpm, accuracy, time_taken, date, user_id } =
  //   req.body;

  async function main() {
    await prisma.statistics.create({
      data: req.body,
    });
  }

  main()
    .then(async () => {
      await prisma.$disconnect();
      return res.status(201).json({ message: 'Results submitted' });
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      return res
        .status(500)
        .json({ message: 'Error: Results failed to submit' });
    });
});

router.get('/', authenticateToken, (req, res) => {});

module.exports = router;
