module.exports = {
	name: 'ping',
	description: 'Ping!',
	aliases: ['p'],
	guildOnly: false,
	args: false,
	execute(message, args, Discord) {
		const { pingReplies } = require(`../info/randomMessages.json`);
		const randomMessage = pingReplies[Math.floor(Math.random() * pingReplies.length)];
		let then = new Date();
		message.channel.send('Pinging...');
		let now = new Date();
		let ping = now.getTime() - then.getTime();
		const embed = new Discord.MessageEmbed()
			.setColor('#03b1fc')
			.setTitle('Pong')
			.setDescription(randomMessage)
			.addField('Ping (ms)', ping, true);
		message.channel.send(embed);
	},
};