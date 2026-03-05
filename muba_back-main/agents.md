# Project Agents

This document provides conventions and patterns for developing this Node.js backend application.

---

## Tech Stack

- **Runtime (all phases)**: Node.js 20 LTS
- **Framework (all phases)**: Express 4 — REST API (JSON), OpenAPI/Swagger
- **Database (all phases)**:
  - PostgreSQL 15+
  - ORM: Prisma (versioned migrations, multi-tenant via `institucion_id`)

- **Beds dashboard updates**:
  - **Phase 1 (MVP)**: Polling from the frontend every 30 seconds against REST endpoints.
  - **Phase 3**: Socket.io (WebSocket) for real-time updates, replacing or complementing polling.

- **Authentication & security**:
  - **Phase 1 (demo)**:
    - Login with email + password.
    - Simple JWT without refresh token (basic expiration, e.g. 24h).
    - 3 fixed roles: `Admin`, `Recepcion`, `Direccion`.
    - HTTPS required.
  - **Phase 2 (initial production)**:
    - JWT + refresh token (short-lived access tokens).
    - Strong password policy, login-attempt lockout, session timeout.
    - Basic audit log.
  - **Phase 3 (enterprise)**:
    - Optional 2FA.
    - Granular permissions per module/action.
    - Full audit log with long-term retention, log export and formal ARCO support.

- **Jobs / Queue**:
  - **Phase 1**: No job queue (no batch processes).
  - **Phase 2**: Bull + Redis for batch jobs (e.g. monthly billing, notifications).

- **Cache / Sessions**:
  - **Phase 1**: No Redis; sessions handled statelessly with JWT.
  - **Phase 2**: Redis 7 for cache and advanced session management (token invalidation, rate limiting, etc.).

- **File storage**:
  - **Phase 1**: S3 or equivalent cloud storage for documents and images, with per-file size limits and per-institution storage caps as defined in the charter.
  - **Later phases**: Adjusted limits and retention policies according to SaaS plans and operational needs.

---

## File Structure

```
/root
├── api/                        # Controllers (route handlers)
├── config/                     # Configuration files
├── files/                      # File storage/uploads
├── helpers/                    # Utility functions (e.g., CustomError)
├── resources/                  # Resource-based modules
│   ├── Company/
│   │   ├── Company.Controller.mjs
│   │   ├── Company.Model.mjs
│   │   ├── Company.Router.mjs
│   │   ├── Company.Schema.mjs
│   │   └── Company.Constant.mjs
│   └── [other resources]/
├── app.mjs                     # Main application entry point
├── package.json                # Dependencies and scripts
└── startServer.mjs             # Server startup script
```

---

## Commands

```bash
pnpm install         # Install dependencies
pnpm start           # Start server (alias: node startServer.mjs)
```

---

## Controller Pattern

### Naming
- File: `Company.Controller.mjs`
- Export: `CompanyController`

### Structure

```javascript
import CompanyModel from './Company.Model.mjs'

const CompanyController = {
  create,
  find,
  findAll,
  update,
  remove,
  search
}
export default CompanyController

async function create (request, response) {
  try {
    const { body = {} } = request
    const data = await CompanyModel.create(body)
    return response.send({ status: 201, message: 'Created successfully', data })
  } catch (error) {
    response.status(error.statusCode).send(error)
  }
}
```

### Conventions
- **Signature**: `async function name(request, response)`
- **Response format**: `{ status, message, data }`
- **Error handling**: try/catch, uses `error.statusCode`
- **Request body**: Destructure from `request.body`

---

## Model Pattern

### Naming
- File: `Company.Model.mjs`
- Export: `CompanyModel`

### Structure

```javascript
import CompanySchema from './Company.Schema.mjs'
import CustomError from '../../helpers/CustomError.mjs'
import COMPANY_CONST from './Company.Constant.mjs'

const { CUSTOM_ERRORS } = COMPANY_CONST
const { COMPANY_NOT_FOUND } = CUSTOM_ERRORS

const CompanyModel = {
  create,
  update,
  find,
  findAll,
  search,
  remove
}
export default CompanyModel

async function create (attrs = {}) {
  try {
    const company = await CompanySchema.create(attrs)
    return company
  } catch (error) {
    console.error('Error while creating company', error)
    throw new CustomError(error)
  }
}
```

### Conventions
- **Signature**: `async function name(attrs = {})`
- **Error handling**: try/catch, throws `CustomError`
- **Logging**: `console.error()` for errors
- **Imports**: Schema, CustomError, Constants

---

## Router Pattern

### Naming
- File: `Company.Router.mjs`
- Export: `CompanyRouter`

### Structure

```javascript
import express from 'express'
import CompanyController from './Company.Controller.mjs'

const { create, find, findAll, remove, search, update } = CompanyController
const CompanyRouter = express.Router()

CompanyRouter.post('/', create)
CompanyRouter.get('/list', findAll)
CompanyRouter.get('/:id', find)
CompanyRouter.delete('/:id', remove)
CompanyRouter.post('/search', search)
CompanyRouter.put('/:id', update)

export default CompanyRouter
```

### Conventions
- **Framework**: Express
- **Creation**: `express.Router()`
- **RESTful routes**:
  - `POST /` - create
  - `GET /list` - findAll
  - `GET /:id` - find by ID
  - `DELETE /:id` - remove
  - `POST /search` - search
  - `PUT /:id` - update

---

## Routes Setup

### Structure

```javascript
import UserRouter from '../resources/User/User.Router.mjs'
import CompanyRouter from '../resources/Company/Company.Router.mjs'
// ... other imports

const Routes = [
  { path: '/web/api/user', router: UserRouter },
  { path: '/web/api/company', router: CompanyRouter },
  // ... other routes
]

Routes.init = app => {
  if (!app || !app.use) {
    console.error('[Error] Route Initialization failed: app / app.use is undefined')
    return process.exit(1)
  }
  Routes.forEach(route => app.use(route.path, route.router))
  app.use('*', (request, response, next) => {
    if (!request.isMatched) {
      const { method, originalUrl } = request
      const message = `Cannot ${method} ${originalUrl}`
      throw Error(message)
    }
    next()
  })
}

export default Routes
```

### Conventions
- **Route format**: Array of `{ path, router }` objects
- **Initialization**: Custom `.init(app)` method
- **Mounting**: `app.use(route.path, route.router)`
- **Wildcard catch-all**: Handles unmatched routes

---

## Config Pattern

### Naming
- File: In `/config` folder
- Export: `SERVER_CONFIG` or similar

### Structure

```javascript
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

const ALLOW_ORIGINS = ALLOW_CORS_ORIGIN.split(',')
const ALLOW_ORIGINS_REGEXP = ALLOW_ORIGINS.map(origin => new RegExp(_sanitizeRegExpStr(origin)))

const CORS_OPTIONS = {
  methods: ALLOW_CORS_METHODS,
  origin: ALLOW_ORIGINS_REGEXP,
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
```

### Conventions
- **Env vars with defaults**: `PORT = 8080`
- **Required validation**: Check required vars, `process.exit(1)` on failure
- **CORS**: Split by comma, convert to RegExp with wildcard support
- **Service info**: Pull from `npm_package_*` env vars
- **Private functions**: Prefix with `_`

---

## Naming Conventions

| Component | File Pattern | Export |
|-----------|--------------|--------|
| Controller | `Name.Controller.mjs` | `NameController` |
| Model | `Name.Model.mjs` | `NameModel` |
| Router | `Name.Router.mjs` | `NameRouter` |
| Schema | `Name.Schema.mjs` | `NameSchema` |
| Constants | `Name.Constant.mjs` | `NAME_CONST` |
| Config | `*.mjs` in `/config` | `*_CONFIG` |

---

## Error Handling

- Use `CustomError` class for application errors
- Controllers catch errors and set appropriate `statusCode`
- Models throw `CustomError` with wrapped original error
- Config validation exits process on missing required vars
