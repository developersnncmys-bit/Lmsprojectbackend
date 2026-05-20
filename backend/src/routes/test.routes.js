const router = require('express').Router();
const c = require('../controllers/test.controller');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', c.list);
router.post('/bulk-edit', c.bulkEdit);
router.post('/bulk-upload', c.bulkUpload);
router.get('/:id', c.get);
router.post('/', c.create);
router.put('/:id', c.update);
router.delete('/:id', c.remove);

module.exports = router;
