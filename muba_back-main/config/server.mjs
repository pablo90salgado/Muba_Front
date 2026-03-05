import 'dotenv/config'

const {
  PORT = 8080,
  BODY_LIMIT = '5mb',
  ALLOW_CORS_ORIGIN = '',
  ALLOW_CORS_METHODS = '',
  NODE_ENV = ''
} = process.env

const REQUIRED_CONFIG = ['ALLOW_CORS_ORIGIN', 'ALLOW_CORS_METHODS', 'NODE_ENV']
REQUIRED_CONFIG.forEach(key => {
  if (!process.env[key]) {
    console.error('[Error] Missing SERVER Config:', key)
    return process.exit(1)
  }
})

const ALLOW_ORIGINS = ALLOW_CORS_ORIGIN
  .split(',')
  .map(origin => origin.trim().replace(/^['\"]|['\"]$/g, ''))
  .filter(Boolean)
const ALLOW_ORIGINS_REGEXP = ALLOW_ORIGINS.map(origin => new RegExp(_sanitizeRegExpStr(origin)))

const CORS_OPTIONS = {
  methods: ALLOW_CORS_METHODS,
  origin: (origin, callback) => {
    if (!origin) {
      return callback(null, true)
    }

    const isAllowed = ALLOW_ORIGINS_REGEXP.some(regexp => regexp.test(origin))
    return callback(null, isAllowed)
  },
  preflightContinue: false,
  credentials: true
}

const { npm_package_name: pkgName = '', npm_package_version: pkgVersion = '' } = process.env
const SERVICE = `${pkgName}@${pkgVersion}`

const SERVER_CONFIG = {
  PORT,
  BODY_LIMIT,
  CORS_OPTIONS,
  SERVICE,
  NODE_ENV
}

export default SERVER_CONFIG

function _sanitizeRegExpStr (string) {
  const escapedString = string.trim().replace(/[./]/g, '\\$&')
  const whildcardReplaced = escapedString.replace(/\*/g, '[0-9a-zA-Z.\\-_:]*')
  return `^${whildcardReplaced}$`.trim()
}
