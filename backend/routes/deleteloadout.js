const express = require('express');
const router = express.Router();
const prisma = require('../prismaclient');

router.delete('/', checkAuthenticated, async (req, res) => {
  try {
    async function main() {
      await prisma.loadouts.delete({
        where: {
          id: Number(req.query.data),
        },
      });
    }
    main()
      .then(async () => {
        await prisma.$disconnect();
        return res.status(201).json({ message: 'Delete successful' });
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        throw e;
      });
  } catch (error) {
    return res.status(500).json({ message: 'Loadout does not exist.' });
  }
});

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send('Please log in');
}

module.exports = router;
