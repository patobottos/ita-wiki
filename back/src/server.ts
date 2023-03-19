import * as dotenv from 'dotenv' // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import Koa from 'koa'
import cors from '@koa/cors'
import helmet from 'koa-helmet'
import koaBody, { HttpMethodEnum } from 'koa-body'
import { appConfig } from './config/config'
import { errorMiddleware } from './middleware'

dotenv.config()

const app = new Koa()

app.use(cors())
app.use(helmet())
app.use(
  koaBody({
    parsedMethods: [
      HttpMethodEnum.POST,
      HttpMethodEnum.PUT,
      HttpMethodEnum.PATCH,
      HttpMethodEnum.DELETE,
    ],
  })
)
app.use(errorMiddleware)

app.listen(appConfig.port, () => {
  console.log(`🚀 Server ready at http://localhost:${appConfig.port}`)
})
