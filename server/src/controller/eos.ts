
import { EosWallet } from '@pefish/js-coin-eos'

export default class Pkey {
  wallet: EosWallet

  async init() {
    this.wallet = new EosWallet()
    await this.wallet.initRemoteClient(`https://eos.newdex.one`)
  }

  async startEidos(args) {
    const { account, pkey } = args
    await this.wallet.installPrivateKey(pkey)
    const tx = await this.wallet.buildTransaction(
      [
        {
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
        }
      ],
      300,
      true,
      true
    )
    return tx.txId
  }
}
