const express = require('express');
const router = express.Router();
const prisma = require('../prismaclient');

router.delete('/', async (req, res) => {
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

module.exports = router;
