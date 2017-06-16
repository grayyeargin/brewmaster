'use strict'

module.exports = {
    name: 'brewmaster',
    version: '0.0.1',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8080,
    base_url: process.env.BASE_URL || 'http://localhost:8080',
    secret: 'beermaster',
    db: {
      uri: process.env.DB_CODE ? 'mongodb://'+ process.env.DB_CODE +':'+ process.env.DB_CODE +'@ds127842.mlab.com:27842/brewmaster' : 'mongodb://127.0.0.1:27017/brewmaster'
    }
}