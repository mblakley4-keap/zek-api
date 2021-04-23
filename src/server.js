const { PORT } = require('./config')
const app = require('./app')
const logger = require('./utils/logger')

app.listen(PORT, () => {
  logger.info(`Server listening at http://localhost:${PORT}`)
})
