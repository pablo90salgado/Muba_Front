class CustomError extends Error {
  constructor (error) {
    const message = error?.message || 'Internal Server Error'
    const statusCode = error?.statusCode || 500
    const code = error?.code || 'INTERNAL_ERROR'
    const details = error?.details || null

    super(message)
    this.name = 'CustomError'
    this.statusCode = statusCode
    this.code = code
    this.details = details

    if (error?.stack) {
      this.stack = error.stack
    }
  }
}

export default CustomError
