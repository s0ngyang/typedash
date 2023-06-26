const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

router.post('/', async (req, res) => {
  try {
    const { name, switches, others, username } = req.body;

    const errors = [];

    if (!name) {
      errors.push({ message: 'Name cannot be empty' });
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    async function main() {
      const res = await prisma.users.findUnique({
        where: {
          name: username,
        },
        select: {
          id: true,
        },
      });

      await prisma.loadouts.create({
        data: {
          name: name,
          switches: switches,
          others: others,
          user_id: res.id,
        },
      });
    }
    main()
      .then(async () => {
        await prisma.$disconnect();
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });

    return res.status(201).json({ message: 'Loadout created' });
  } catch (error) {
    return res.status(500).json({ message: 'Error: Loadout not created' });
  }
});

module.exports = router;
