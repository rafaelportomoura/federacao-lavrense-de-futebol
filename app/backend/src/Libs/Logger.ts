
import winston from 'winston'
import CONFIG from '../config/Environments'

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const level = () => {
  const env = CONFIG.ENV || 'dev'
  const is_development = env === 'dev'
  return is_development ? 'debug' : 'warn'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
}

winston.addColors(colors)

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level}: ${info.message}`
  )
)


const colorize = winston.format.colorize({ all: true });

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(format, colorize),
  }),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
    format: winston.format.combine(format),
  }),
  new winston.transports.File({ filename: 'logs/all.log' })
]


const Logger = winston.createLogger({
  level: level(),
  levels,
  transports,
})


export default Logger