const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');

bot.once('ready', () => {
	console.log('Login successful.');
});

client.on('message', message => {
	if (message.content === '!ping') {
		message.channel.send('Pong.');
	}
});

bot.login(config.token);