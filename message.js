const NodeCache = require('node-cache');

const sessionCache = new NodeCache({
  stdTTL: 120,
  checkperiod: 5,
});

module.exports = {
  // Create or overwrite a session
  set(sessionId, data = {}) {
    if (!sessionCache[sessionId]) return {};

    sessionCache.set(sessionId, data);
    return data;
  },

  // Always return an object
  get(sessionId) {
    if (!sessionId) return {};

    return sessionCache.get(sessionId) || {};
  },

  // Update or create session safely
  update(sessionId, key, value) {
    if (!sessionId || !key) return {};

    const current = sessionCache.get(sessionId) || {};

    const updated = {
      ...current,
      [key]: value
    };

    sessionCache.set(sessionId, updated);
    return updated;
  },

  // Clear session
  clear(sessionId) {
    if (!sessionId) return;
    sessionCache.del(sessionId);
  }
};