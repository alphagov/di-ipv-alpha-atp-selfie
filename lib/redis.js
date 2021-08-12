module.exports = () => {
  if (!process.env.REDIS_SESSION_URL) {
    return {};
  }

  const host = process.env.REDIS_SESSION_URL;
  const port = process.env.REDIS_PORT || 6379;
  const scheme = "redis";

  return {
    connectionString: `${scheme}://${host}:${port}`
  };
}
