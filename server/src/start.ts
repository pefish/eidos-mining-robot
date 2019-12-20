import '@pefish/js-node-assist'
import path from 'path'
import { App, ElectronRouteFactoryHelper } from '@pefish/js-electron-common'
import FileUtil from '@pefish/js-util-file'
import electron from 'electron'
import { Log4js } from '@pefish/js-helper-logger'
import ConfigUtil from '@pefish/js-util-config'
import os from 'os'

declare global {
  namespace NodeJS {
    interface Global {
      logger: any,
      config: { [x: string]: any };
      debug: boolean;
      app: App;
    }
  }
}

new ElectronRouteFactoryHelper().buildRoute(
  path.join(__dirname, './controller')
)

global.config = ConfigUtil.loadYamlConfig({
  configFilePath: path.join(FileUtil.getStartFilePath(), `../config/prod.json`),
})
global.debug = global.config.env !== 'prod'
const packageInfo = require(path.join(FileUtil.getStartFilePath(), '../package.json'))

global.app = new App(packageInfo)
global.app.start(
  async () => {
    global.logger = global.app.logger
  },
  path.join(FileUtil.getStartFilePath(), '../build/index.html'),
  global.debug
)

