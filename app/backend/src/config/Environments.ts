const CONFIG = {
  ENV: process.env.NODE_ENV ? process.env.NODE_ENV : 'dev',
} as const

export default CONFIG