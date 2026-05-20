const router = require('express').Router();
const c = require('../controllers/user.controller');
const { protect, allow } = require('../middleware/auth');

router.use(protect);

router.get('/', c.list);
router.get('/:id', c.get);
router.post('/', allow('Super Admin', 'Centre Admin'), c.create);
router.put('/:id', allow('Super Admin', 'Centre Admin'), c.update);
router.delete('/:id', allow('Super Admin'), c.remove);

module.exports = router;
