const express = require('express');
const router = express.Router();
const prisma = require('../prismaclient');
const authenticateToken = require('./authenticate-token');

router.post('/loadout/create', authenticateToken, async (req, res) => {
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
        return res.status(201).json({ message: 'Loadout created' });
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        throw e;
      });
  } catch (error) {
    return res.status(500).json({ message: 'Error: Loadout not created' });
  }
});

router.get('/loadout', authenticateToken, async (req, res) => {
  try {
    var loadouts = [];
    //console.log(req.query);
    async function main() {
      const user = await prisma.users.findUniqueOrThrow({
        where: {
          name: req.query.data,
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
        return res.status(200).json({ loadouts: loadouts });
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        throw e;
      });
  } catch (e) {
    return res.status(500).json({ loadouts: [] });
  }
});

router.put('/loadout/update', authenticateToken, async (req, res) => {
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

router.delete('/loadout/delete', authenticateToken, async (req, res) => {
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
