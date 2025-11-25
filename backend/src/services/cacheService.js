const Cache = require('../models/Cache');

class CacheService {
  async getCachedData(city) {
    try {
      const cachedData = await Cache.findValidCache(city);
      return cachedData ? cachedData.data : null;
    } catch (error) {
      console.error('Cache read error:', error);
      return null;
    }
  }

  async setCachedData(city, data) {
    try {
      const cacheEntry = await Cache.findOneAndUpdate(
        { city: city.toLowerCase() },
        { 
          city: city.toLowerCase(),
          data: data,
          timestamp: new Date()
        },
        { 
          upsert: true, 
          new: true,
          runValidators: true 
        }
      );

      // Cleanup old entries in background
      setImmediate(() => this.cleanupOldEntries());

      return cacheEntry;
    } catch (error) {
      console.error('Cache write error:', error);
      // Don't throw error for cache failures - continue without cache
    }
  }

  async cleanupOldEntries() {
    try {
      await Cache.cleanupOldEntries(1000);
    } catch (error) {
      console.error('Cache cleanup error:', error);
    }
  }

  async getCacheStats() {
    try {
      const totalEntries = await Cache.countDocuments();
      const oldestCache = await Cache.findOne().sort({ timestamp: 1 });
      const newestCache = await Cache.findOne().sort({ timestamp: -1 });
      
      return {
        totalEntries,
        oldest: oldestCache?.timestamp,
        newest: newestCache?.timestamp
      };
    } catch (error) {
      throw new Error('Failed to get cache statistics');
    }
  }

  async clearCache() {
    try {
      const result = await Cache.deleteMany({});
      return { deletedCount: result.deletedCount };
    } catch (error) {
      throw new Error('Failed to clear cache');
    }
  }
}

module.exports = new CacheService();