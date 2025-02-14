import 'module-alias/register'
import * as dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/../.env` })
import 'reflect-metadata'
import * as Koa from 'koa'
import * as bodyParser from 'koa-bodyparser'
import { bootstrapControllers } from 'koa-ts-controllers'
import * as cors from '@koa/cors'
import { runMongo } from '@/models/index'
import * as Router from 'koa-router'

export const app = new Koa()
;(async () => {
  try {
    const router = new Router()
    await bootstrapControllers(app, {
      router,
      basePath: '/',
      controllers: [__dirname + '/controllers/*'],
      disableVersioning: true,
    })
    app.use(cors({ origin: '*' }))
    app.use(cors({ origin: '*' }))
    app.use(bodyParser())
    app.use(router.routes())
    app.use(router.allowedMethods())
  } catch (err) {
    console.log('Koa app starting error: ', err)
  }
})()
