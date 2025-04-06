// server/plugins/content.ts
import { createStorage } from 'unstorage'
import fsDriver from 'unstorage/drivers/fs'

export default defineNitroPlugin((nitroApp) => {
  const storage = createStorage({
    driver: fsDriver({ base: './content' }),
  })
  nitroApp.hooks.hook('request', (event) => {
    event.context.contentStorage = storage
  })
})
