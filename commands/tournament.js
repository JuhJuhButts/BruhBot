/* eslint-disable no-case-declarations */
module.exports = { // eslint-disable-line no-undef
    name: 'tournament',
    description: 'Tournament commands. Creating a bracket is limited to @MasterOfPasta#9454 and @JuhJuhButt#3484. ',
    aliases: ['t', 'tourney', 'tournement', 'turnament', 'turnement', 'tournamant', 'tournement'],
    args: true,
    usage: ' has way too much stuff, use `/tournament help` instead',
    execute(message, args, Discord, mainEnmap, Enmap) { // eslint-disable-line no-unused-vars
        const { JuhJuhButtID, TannmannID } = require('../info/config.json'); // eslint-disable-line no-undef
        const errorReplies = require('../info/errors.json') // eslint-disable-line no-undef
        const tourneyEnmap = new Enmap({
            name: "tourney",
            dataDir: "../info/Enmap"
        })
        message.channel.send(args[0] + args[1] + args[2] + args[3]);
        switch (args[0]) {
            case 'b':
            case 'bracket':
                switch (args[1]) {
                    case 'c':
                    case 'create':
                        const allowedNumberOfFighters = [4, 16, 32, 64]
                        if (message.member.id === JuhJuhButtID || message.member.id === TannmannID) {
                            if (parseInt(args[2]).isNaN && allowedNumberOfFighters.has(parseInt(args[2]))) {
                                tourneyEnmap.set('fighterAmount', args[2]);
                                if ((args[3] === 'true' || args[3] === 'false')) {
                                    if (args[3] === 'true') {
                                        tourneyEnmap.set('isBoss', true);
                                    } else {
                                        tourneyEnmap.set('isBoss', false);
                                    }
                                } else {
                                    tourneyEnmap.set('isBoss', false);
                                }
                            } else {

                                message.channel.send("How many fighters will enter the tournament? (*must* be 4, 16, 32, or 64!)")
                                const filter = m => parseInt(m.content).isNaN && allowedNumberOfFighters.has(parseInt(m.content)) && !message.content.startsWith('\\') && m.author.id === message.author.id;
                                const collector = message.channel.createMessageCollector(filter, { time: 60 });

                                collector.on('collect', m => {
                                    tourneyEnmap.set('fighterAmount', m);
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
                                            .addField('Likely causes:', 'You sent an invalid value and/or time ran out');
                                        message.channel.send(embed);
                                    }
                                });

                                message.channel.send("Is there going to be a boss? (*must* be `true` or `false`!)")
                                const filter1 = m => (m.content === 'true' || m.content === 'false') && !message.content.startsWith('\\') && m.author.id === message.author.id;
                                const collector1 = message.channel.createMessageCollector(filter1, { time: 60 });

                                collector1.on('collect', m => {
                                    if (m.content === 'true') {
                                        tourneyEnmap.set('isBoss', true);
                                    } else {
                                        tourneyEnmap.set('isBoss', false);
                                    }
                                    collector1.stop();
                                });
                                collector1.on('end', collected => {
                                    if (!collected) {
                                        const embed = new Discord.MessageEmbed()
                                            .setTitle('File an issue')
                                            .setURL('https://joelne.digital/BBissue')
                                            .setColor('#ff0000')
                                            .setAuthor(message.member.nickname, message.author.avatarURL())
                                            .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                                            .addField('Error:', 'Insufficient information')
                                            .addField('Likely causes:', 'You sent an invalid value and/or time ran out');
                                        message.channel.send(embed);
                                    }
                                });
                                const embed1 = new Discord.MessageEmbed()
                                    .setTitle('Created bracket')
                                    .setColor('#00ff00')
                                    .setAuthor(message.member.nickname, message.author.avatarURL())
                                    .addField('Number of fighters:', tourneyEnmap.get('fighterAmount'));
                                if (tourneyEnmap.get(isBoss) === true) { // eslint-disable-line no-undef
                                    embed1.addField('Has boss battle:', ':white_check_mark:')
                                } else {
                                    embed1.addField('Has boss battle:', ':x:')
                                }
                                message.channel.send(embed1)
                            }
                        } else {
                            const embed = new Discord.MessageEmbed()
                                .setTitle('File an issue')
                                .setURL('https://joelne.digital/BBissue')
                                .setColor('#ff0000')
                                .setAuthor(message.member.nickname, message.author.avatarURL())
                                .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                                .addField('Error:', 'Insufficient permissions', true);
                            message.channel.send(embed);
                        }
                        break;
                    case 'a':
                    case 'add':
                        break;
                    default:
                        const embed = new Discord.MessageEmbed()
                            .setTitle('File an issue')
                            .setURL('https://joelne.digital/BBissue')
                            .setColor('#ff0000')
                            .setAuthor(message.member.nickname, message.author.avatarURL())
                            .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                            .addField('Error:', 'Command not found/invalid syntax', true);
                        message.channel.send(embed)
                        break;
                }

                break;
            case 'f':
            case 'fighter':
                switch (args[2]) {
                    case 'a':
                    case 'add':
                        // const name = await awaitReply({ message, question: "What is the fighter's name?", limit: 120000, });
                        // const description = await awaitReply({ message, question: "Describe the fighter.", limit: 300000, });
                        // const image = await awaitReply({ message, question: "Send a link to an image of them.", limit: 120000, });
                        // const INT = await awaitReply({ message, question: "Stats: on a scale of 1-100, how intelligent is this fighter?", limit: 120000, });
                        // const PWR = await awaitReply({ message, question: "Stats: on a scale of 1-100, how powerful is this fighter?", limit: 120000, });
                        // const DEF = await awaitReply({ message, question: "Stats: on a scale of 1-100, how well-defended is this fighter?", limit: 120000, });
                        // const SPD = await awaitReply({ message, question: "Stats: on a scale of 1-100, how fast is this fighter?", limit: 120000, });

                        const embed = new Discord.MessageEmbed()
                            .setTitle('Added fighter')
                            .setAuthor(message.member.nickname, message.author.avatarURL())
                            .setColor('#00ff00')
                            .addField('Name:')

                        message.channel.send(embed)
                        break;
                    case 'd':
                    case 'delete':

                        break;
                    case 'q':
                    case 'query':

                        break;
                    case 'p':
                    case 'profile':

                        break;
                    default:
                        const embed1 = new Discord.MessageEmbed()
                            .setTitle('File an issue')
                            .setURL('https://joelne.digital/BBissue')
                            .setColor('#ff0000')
                            .setAuthor(message.member.nickname, message.author.avatarURL())
                            .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                            .addField('Error:', 'Command not found/invalid syntax', true);
                        message.channel.send(embed1)
                        break;
                }
                break;
            case 'g':
            case 'group':
                switch (args[2]) {
                    case 'a':
                    case 'add':

                        break;
                    case 'd':
                    case 'delete':

                        break;
                    case 'p':
                    case 'place':

                        break;
                    case 'e':
                    case 'edit':

                        break;
                    default:
                        const embed = new Discord.MessageEmbed()
                            .setTitle('File an issue')
                            .setURL('https://joelne.digital/BBissue')
                            .setColor('#ff0000')
                            .setAuthor(message.member.nickname, message.author.avatarURL())
                            .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                            .addField('Error:', 'Command not found/invalid syntax', true);
                        message.channel.send(embed)
                        break;
                }
                break;
            // eslint-disable-next-line no-duplicate-case
            case 'b':
            case 'battle':
                switch (args[2]) {
                    case 's':
                    case 'start':

                        break;
                    case 'b':
                    case 'begin':

                        break;
                    case 'e':
                    case 'end':

                        break;
                    // eslint-disable-next-line no-duplicate-case
                    case 's':
                    case 'stop':

                        break;
                    default:
                        const embed = new Discord.MessageEmbed()
                            .setTitle('File an issue')
                            .setURL('https://joelne.digital/BBissue')
                            .setColor('#ff0000')
                            .setAuthor(message.member.nickname, message.author.avatarURL())
                            .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                            .addField('Error:', 'Command not found/invalid syntax', true);
                        message.channel.send(embed)
                        break;
                }
                break;
            case 'h':
            case 'help':
                message.channel.send('so basically this command isnt done yet. you should probably pay attention to joel when he says not to use it.')
                break;
            default:
                const embed = new Discord.MessageEmbed()
                    .setTitle('File an issue')
                    .setURL('https://joelne.digital/BBissue')
                    .setColor('#ff0000')
                    .setAuthor(message.member.nickname, message.author.avatarURL())
                    .setDescription(errorReplies[Math.floor(Math.random() * errorReplies.length)])
                    .addField('Error:', 'Command not found/invalid syntax', true);
                message.channel.send(embed)
                break;
        }
    },
};