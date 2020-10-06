module.exports = {// eslint-disable-line no-undef 
    name: 'role',
    description: 'add or remove a role',
    aliases: ['r'],
    usage: ' [<role>] (you can execute the command without arguments to enter interactive mode)',
    execute(message, args, Discord) {
        const JsonFind = require('json-find'); // eslint-disable-line no-undef 
        const { allowed } = require('../info/selfRoles.json'); // eslint-disable-line no-undef
        const { errorReplies } = require('../info/json/errors.json'); // eslint-disable-line no-undef
        const embed = new Discord.MessageEmbed()
            .setTitle('Role')
            .setAuthor(message.member.nickname, message.author.avatarURL());
        if (args) {
            const role = JsonFind(allowed).checkKey(args[0]);
            if (!role) {
                embed
                    .setTitle('File an issue')
                    .setURL('https://joelne.digital/BBissue')
                    .setColor('#ff0000')
                    .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                    .addField('Error:', 'Role not found or insufficient permissions', true);
            } else {
                if (!message.member.roles.cache.has(role)) {
                    message.member.roles.add(role, 'self-role');
                    embed
                        .setColor('#00ff00')
                        .setDescription(`Gave @${message.member.guild.roles.resolve(role).name} to ${message.member.nickname}`);
                } else {
                    message.member.roles.remove(role, 'self-role');
                    embed
                        .setColor('#00ff00')
                        .setDescription(`Took @${message.member.guild.roles.resolve(role).name} from ${message.member.nickname}`);
                }
            }
        } else {
            message.channel.send("What role would you like to add/remove?");
            const filter = m => m.author.id === message.author.id && !message.content.startsWith('\\');
            const collector = message.channel.createMessageCollector(filter, { time: 60 });

            collector.on('collect', m => {
                const role = JsonFind(allowed).checkKey(m);
                if (!role) {
                    embed
                        .setTitle('File an issue')
                        .setURL('https://joelne.digital/BBissue')
                        .setColor('#ff0000')
                        .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                        .addField('Error:', 'Role not found or insufficient permissions', true);
                } else {
                    if (!message.member.roles.cache.has(role)) {
                        message.member.roles.add(role, 'self-role');
                        embed
                            .setColor('#00ff00')
                            .setDescription(`Gave @${message.member.guild.roles.resolve(role).name} to ${message.member.nickname}`);
                    } else {
                        message.member.roles.remove(role, 'self-role');
                        embed
                            .setColor('#00ff00')
                            .setDescription(`Took @${message.member.guild.roles.resolve(role).name} from ${message.member.nickname}`);
                    }
                }
                collector.stop();
            });
            collector.on('end', collected => {
                if (!collected) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle('File an issue')
                        .setURL('https://joelne.digital/BBissue')
                        .setColor('#ff0000')
                        .setAuthor(message.member.nickname, message.author.avatarURL())
                        .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                        .addField('Error:', 'Insufficient information')
                        .addField('Cause:', 'Time ran out');
                    message.channel.send(embed);
                }
            });
        }
        message.channel.send(embed);
    },
};