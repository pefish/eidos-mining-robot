import { observable, action } from 'mobx';
import CommonStore from './common_store';
import { IpcRenderUtil } from '@pefish/js-electron-common'

export default class HomeStore {

  private commonStore: CommonStore
  @observable
  private counter = 0;
  @observable
  private pkey = ``;
  @observable
  private account = ``;
  @observable
  private txid = ``;
  @observable
  private started = false;

  constructor (commonStore: CommonStore) {
    this.commonStore = commonStore
  }

  @action
  async start () {
    try {
      const txid = await IpcRenderUtil.sendAsyncCommand('eos', 'startEidos', {
        pkey: this.pkey,
        account: this.account,
      }, (err) => {
        // console.log(err)
      })
      this.txid = txid
      this.counter++
    } catch(err) {
      this.txid = err.message
      throw err
    }
  }
}
