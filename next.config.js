module.exports = {
  optimization: {
    minimize: false,
  },
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: "https://api.igdb.com/v4/:slug*",
      },
    ];
  },
  reactStrictMode: true,
};
