module.exports = {
	name: 'ping',
	description: 'Ping!',
	aliases: ['p'],
	guildOnly: false,
	args: false,
	execute(message, args) {
		message.channel.send('Pong!')
	},
};