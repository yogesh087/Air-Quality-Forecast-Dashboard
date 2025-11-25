const cacheService = require('../services/cacheService');

class CacheController {
  async getCacheStats(req, res, next) {
    try {
      const stats = await cacheService.getCacheStats();
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      next(error);
    }
  }

  async clearCache(req, res, next) {
    try {
      const result = await cacheService.clearCache();
      res.json({
        success: true,
        message: `Cache cleared successfully`,
        data: result
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CacheController();