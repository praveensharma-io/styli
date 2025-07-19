const express = require('express');
const router = express.Router();
const layoutController = require('../../controllers/layoutController');

router.get('/:pageType/:pageId', layoutController.getPageLayout);
router.post('/', layoutController.createPageLayout);
router.put('/:pageId', layoutController.updatePageLayout);
router.delete('/:pageId', layoutController.deletePageLayout);

module.exports = router; 