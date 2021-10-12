const express = require('express')
const qrcode = require('qrcode-terminal')
const { Client, MessageMedia } = require('whatsapp-web.js')


const client = new Client({ puppeteer: {
	headless: false,
	args: [
		'--no-sandbox',
	]
}, clientId: 'kitech' })
client.initialize()

client.on('qr', qr => {
	// NOTE: This event will not be fired if a session is specified.
	console.log('QR RECEIVED', qr)
	qrcode.generate(qr, { small: true })
})

client.on('authenticated', () => {
	console.log('AUTHENTICATED')
})

client.on('auth_failure', msg => {
	// Fired if session restore was unsuccessfull
	console.error('AUTHENTICATION FAILURE', msg)
})

client.on('ready', () => {
	console.log('READY')
})

client.on('message', async msg => {
	console.log('MESSAGE RECEIVED', msg)
	if (msg.body === 'ping') {
		msg.reply('pong')
	}
})

client.on('change_state', state => {
	console.log('CHANGE STATE', state)
})

client.on('disconnected', (reason) => {
	console.log('Client was logged out', reason)
})

////////////////////////////////////////////////////////////////

const app = express()
const port = process.env.PORT || 5000

app.use(express.json({ limit: '50mb' }))

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`)
})

////////////////////////////////////////////////////////////////

// const chatId = process.env.PHONE.replace('+', '') + '@c.us'
const chatId = '972546313551' + '@c.us'

app.post('/api', (req, res) => {
	const { message, image } = req.body
	console.log(`${message}\ncontains image: ${!!image}`)
	if (image) {
		const media = new MessageMedia(image.type, image.data)
		client.sendMessage(chatId, media, { caption: message })
	}
	else {
		client.sendMessage(chatId, message)
	}
	res.send({ success: true })
})


// console.error(e)
// console.log('Error, app will restart in 1 hour')
// await new Promise(r => setTimeout(r, 3600000))
// heroku.delete('/apps/whatsapp-node-server/dynos')

// process.on('unhandledRejection', err => {
// 	// Handle the error safely
// 	console.log('oh my god')
// })


