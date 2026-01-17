const mongoose = require('mongoose');

// Serverless-friendly MongoDB connection reuse.
// MongoDB is used here because logistics platforms need durable, queryable state
// (shipments/orders/vehicles) and analytics (aggregations/indexes).

const globalCache = global;

if (!globalCache.__logihubMongoose) {
  globalCache.__logihubMongoose = { conn: null, promise: null };
}

async function connectDb() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error('Missing MONGODB_URI');
  }

  if (globalCache.__logihubMongoose.conn) return globalCache.__logihubMongoose.conn;

  if (!globalCache.__logihubMongoose.promise) {
    mongoose.set('strictQuery', true);
    globalCache.__logihubMongoose.promise = mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 8000,
        maxPoolSize: 10
      })
      .then((m) => m);
  }

  globalCache.__logihubMongoose.conn = await globalCache.__logihubMongoose.promise;
  return globalCache.__logihubMongoose.conn;
}

module.exports = { connectDb };
