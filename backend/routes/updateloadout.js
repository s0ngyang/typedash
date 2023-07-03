const express = require('express');
const router = express.Router();
const prisma = require('../prismaclient');

router.put('/', checkAuthenticated, async (req, res) => {
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

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send('Please log in');
}

module.exports = router;
