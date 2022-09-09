import IMySql from "../Interfaces/IMySql"

const CONFIG = {
  ENV: process.env.NODE_ENV ? process.env.NODE_ENV : 'dev',
  DB: {
    host: process.env.DB_HOST ? process.env.DB_HOST : 'localhost:3306',
    user: process.env.MYSQL_USER ? process.env.MYSQL_USER : 'flf',
    password: process.env.MYSQL_PASSWORD ? process.env.MYSQL_PASSWORD : '123',
    database: process.env.MYSQL_DATABASE ? process.env.MYSQL_DATABASE : 'FLF',
  } as IMySql.DbParams,
} as const

export default CONFIG