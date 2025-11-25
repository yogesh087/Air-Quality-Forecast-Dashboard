const express = require('express');
const cacheController = require('../controller/cacheContoller');

const router = express.Router();

// Get cache statistics
router.get('/stats', cacheController.getCacheStats);

// Clear all cache entries
router.delete('/clear', cacheController.clearCache);

module.exports = router;