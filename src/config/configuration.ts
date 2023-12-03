export default () => ({
  database: {
    uri: process.env.MONGODB_URI,
  },
  jwtConstants: {
    secret: process.env.JWT_SECRET,
  },
});
