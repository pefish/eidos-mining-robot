
import Starter from '@pefish/js-util-starter'
import { EosWallet } from '@pefish/js-coin-eos'
import ConfigUtil from '@pefish/js-util-config'
import TimeUtil from '@pefish/js-util-time'

const config = ConfigUtil.loadYamlConfig({
  secretEnvName: `NODE_SECRET`,
})
const privateKey = config.pkey
const account = `laijiyong123`

Starter.startAsync(async () => {
  const wallet = new EosWallet()
  await wallet.initRemoteClient(`https://eos.newdex.one`)
  await wallet.installPrivateKey(privateKey)
  while (true) {
    try {
      const tx = await wallet.buildTransaction(
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
      console.log(tx.txId)
    } catch (err) {
      console.error(err)
      await TimeUtil.sleep(1000)
    }
  }
}, null, false)
