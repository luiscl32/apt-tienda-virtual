module.exports = {
  db: process.env.MONGODB || 'mongodb://localhost:27017/shop',
  port: process.env.PORT || 3000,
  SECRET_TOKEN: 'okenuspertreces'
}
