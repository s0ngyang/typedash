const express = require('express');
const router = express.Router();
const prisma = require('../prisma');

router.post('/', async (req, res) => {
  try {
    var loadouts = [];
    async function main() {
      const user = await prisma.users.findUniqueOrThrow({
        where: {
          name: req.body.name,
        },
      });

      loadouts = await prisma.loadouts.findMany({
        where: {
          user_id: user.id,
        },
      });
    }
    main()
      .then(async () => {
        await prisma.$disconnect();
        return res.status(201).json({ loadouts: loadouts });
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
      });
  } catch (e) {
    return res.status(500).json({ loadouts: [] });
  }
});

module.exports = router;
