const express = require('express');
const router = express.Router();
const prisma = require('../prismaclient');
const authenticateToken = require('./authenticate-token');

router.put('/', authenticateToken, async (req, res) => {
  try {
    const { name, switches, others, id } = req.body;

    async function main() {
      await prisma.loadouts.update({
        where: {
          id: id,
        },
        data: {
          name: name,
          switches: switches,
          others: others,
        },
      });
    }
    main()
      .then(async () => {
        await prisma.$disconnect();
        return res.status(201).json({ message: 'Loadout updated' });
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        throw e;
      });
  } catch (error) {
    return res.status(500).json({ message: 'Error: Loadout not updated' });
  }
});

module.exports = router;
