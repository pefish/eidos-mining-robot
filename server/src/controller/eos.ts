
import { EosWallet } from '@pefish/js-coin-eos'
import RandomUtil from '@pefish/js-util-random'

export default class Pkey {
  wallet: EosWallet
  remoteUrls: string[] = [
    `https://eos.newdex.one`,
    `https://api.eossweden.org`,
    `https://eos.hyperion.eosrio.io`
  ]

  async init() {
    this.wallet = new EosWallet()
    await this.wallet.initRemoteClient(RandomUtil.getRandomFromList(this.remoteUrls))
  }

  async startEidos(args) {
    const { account, pkey, actionCount } = args
    try {
      await this.wallet.installPrivateKey(pkey)
      const actions = []
      for (let i = 0; i < actionCount; i++) {
        actions.push({
          account: 'eosio.token',
          name: 'transfer',
          authorization: [{ actor: account, permission: 'active' }],
          data:
          {
            from: account,
            to: 'eidosonecoin',
            quantity: '0.0001 EOS',
            memo: ''
          }
        })
      }
      const tx = await this.wallet.buildTransaction(
        actions,
        300,
        true,
        true
      )
      return tx.txId
    } catch (err) {
      await this.wallet.initRemoteClient(RandomUtil.getRandomFromList(this.remoteUrls))
      await this.wallet.installPrivateKey(pkey)
      throw err
    }
  }
}
