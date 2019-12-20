
import Starter from '@pefish/js-util-starter'
import { EosWallet } from '@pefish/js-coin-eos'
import ConfigUtil from '@pefish/js-util-config'
import TimeUtil from '@pefish/js-util-time'
import RandomUtil from '@pefish/js-util-random'

const config = ConfigUtil.loadYamlConfig({
  secretEnvName: `NODE_SECRET`,
})
const privateKey = config.pkey
const account = `laijiyong123`

Starter.startAsync(async () => {
  const wallet = new EosWallet()
  const remoteUrls = [
    `https://eos.newdex.one`, 
    `https://api.eossweden.org`,
    `https://mainnet.eos.dfuse.io`
  ]
  await wallet.initRemoteClient(RandomUtil.getRandomFromList(remoteUrls), [privateKey])
  while (true) {
    try {
      const actionCount = RandomUtil.getRandomInt(3, 11)
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
      const tx = await wallet.buildTransaction(
        actions,
        300,
        true,
        true
      )
      console.log(tx.txId)
    } catch (err) {
      console.error(err)
      if (err.message.indexOf(`ETIMEDOUT`) != -1 || err.message.indexOf(`502`) != -1 || err.message.indexOf(`400`) != -1 || err.message.indexOf(`not found`) != -1) {
        await wallet.initRemoteClient(RandomUtil.getRandomFromList(remoteUrls), [privateKey])
      }
      await TimeUtil.sleep(1000)
    }
  }
}, null, false)
