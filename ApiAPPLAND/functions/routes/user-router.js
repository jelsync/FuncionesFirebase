const { Router } = require('express');
const { createUser, getUserId, getUsers, deletUser, updateUser } = require('../controllers/user');
const router = Router();


router.post('/', createUser);
router.get('/:id', getUserId);
router.get('/', getUsers);
router.delete('/:id', deletUser);
router.put('/:id', updateUser);

module.exports = router;
