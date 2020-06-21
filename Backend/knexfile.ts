// Update with your config settings.
import path from 'path';
module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename:  path.resolve(__dirname,'src','database','database.sqlite')
    },
    migrations: {
      directory: path.resolve(__dirname,'src','database','migrations'),     
      extension: 'ts'
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'onlyscraping',
      user:     'postgres',
      password: 'breno17091997'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.resolve(__dirname,'src','database','migrations'),     
      extension: 'ts'
    },
  }

};
