const express = require('express');
const router = express.Router();
const prisma = require('../db');

router.post('/', async (res, req) => {
  try {
    const { name, switches, others, username } = req.body;

    const errors = [];

    if (!name) {
      errors.push({ message: 'Name cannot be empty' });
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
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
  } catch {
    return res.status(500).json({ message: 'Error: Loadout not created' });
  }
});

async function main() {
  await prisma.loadout.create({
    data: {
      name: name,
      switches: switches,
      others: others,
      user_id: {
        select: {
          id: {
            where: {
              name: {
                equals: username,
              },
            },
          },
        },
      },
    },
  });
}

module.exports = router;
