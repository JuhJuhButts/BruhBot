module.exports = {
    name: 'role',
    description: 'add or remove a role',
    aliases: ['r'],
    usage: '<+ | -> <role>',
    args: true,
    execute(message, args, Discord) {
        const JsonFind = require('json-find');
        const { allowed } = require('../info/selfRoles.json');
        const role = JsonFind(allowed).checkKey(args[1]);
        const { errorReplies } = require('../info/errors.json');
        const embed = new Discord.MessageEmbed()
            .setTitle('Role')
            .setAuthor(message.member.nickname, message.author.avatarURL());

        if (!role) {
            embed
                .setTitle('File an issue')
                .setURL('https://joelne.digital/BBissue')
                .setColor('#ff0000')
                .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                .addField('Error:', 'Role not found or unavailable', true);
        } else {
            if (args[0] === '+') {
                message.member.roles.add(role, 'self-role');
                embed
                    .setColor('#00ff00')
                    .setDescription(`Gave ${message.author.username} @${message.member.guild.roles.resolve(role).name}`);
            } else {
                message.member.roles.remove(role, 'self-role')
                embed
                    .setColor('#00ff00')
                    .setDescription(`Took @${message.member.guild.roles.resolve(role).name} from ${message.author.username}`);
            }
        }
        message.channel.send(embed);
	},
};