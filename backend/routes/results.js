const express = require('express');
const router = express.Router();
const prisma = require('../prismaclient');
const authenticateToken = require('./authenticate-token');

router.post('/create', authenticateToken, async (req, res) => {
  try {
    const {
      challenge_id,
      type,
      wpm,
      accuracy,
      time_taken,
      datetime,
      username,
    } = req.body;

    async function main() {
      const res = await prisma.users.findUniqueOrThrow({
        where: {
          name: username,
        },
        select: {
          id: true,
        },
      });

      await prisma.statistics.create({
        data: {
          challenge_id,
          type,
          wpm,
          accuracy,
          time_taken,
          datetime,
          user_id: res.id,
        },
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
        throw e;
      });
  } catch (error) {
    return res.status(500).json({ message: 'Error: Results failed to submit' });
  }
});

router.get('/', authenticateToken, (req, res) => {
  try {
    var stats = [];
    async function main() {
      const user = await prisma.users.findUniqueOrThrow({
        where: {
          name: req.query.user,
        },
      });

      stats = await prisma.statistics.findMany({
        where: {
          user_id: user.id,
        },
      });
    }
    main()
      .then(async () => {
        await prisma.$disconnect();
        return res.status(200).json({ stats });
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        throw e;
      });
  } catch (e) {
    return res.status(500).json({ stats: [] });
  }
});

module.exports = router;
