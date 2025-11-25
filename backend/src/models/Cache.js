const mongoose = require('mongoose');

const cacheSchema = new mongoose.Schema({
  city: { 
    type: String, 
    required: true, 
    index: true,
    lowercase: true,
    trim: true
  },
  data: { 
    type: Object, 
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now, 
    index: true,
    expires: 1800  
  }
}, {
  timestamps: true
});

 
cacheSchema.index({ city: 1, timestamp: -1 });

 
cacheSchema.statics.findValidCache = function(city) {
  return this.findOne({ 
    city: city.toLowerCase(),
    timestamp: { $gte: new Date(Date.now() - 30 * 60 * 1000) } // 30 minutes
  });
};

 
cacheSchema.statics.cleanupOldEntries = async function(maxEntries = 1000) {
  const cacheCount = await this.countDocuments();
  
  if (cacheCount > maxEntries) {
    const oldestEntries = await this.find()
      .sort({ timestamp: 1 })
      .limit(cacheCount - maxEntries);
    
    const idsToDelete = oldestEntries.map(entry => entry._id);
    await this.deleteMany({ _id: { $in: idsToDelete } });
    
    console.log(`Cleaned up ${idsToDelete.length} old cache entries`);
  }
};

module.exports = mongoose.model('Cache', cacheSchema);