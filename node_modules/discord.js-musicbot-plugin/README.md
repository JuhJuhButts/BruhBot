# Discord MusicBot Plugin
[![NPM](https://nodei.co/npm/discord.js-musicbot-plugin.png)](https://nodei.co/npm/discord.js-musicbot-plugin/)

## About
An easy to use music addon for discord bots.  Uses Discord.js and YouTube.

## Installing via NPM
```
npm install discord.js-musicbot-plugin
```

## Adding to your bot
```js
const music = require('discord.js-musicbot-plugin');

// Pass in your Discord.js client and the voice channel ID
// This adds the music functions to the client object
music.init(client, voiceChannel);
```

## Commands
Commands can be called using the following syntax, make sure to pass in the message that requested the command as an argument.
```js
// client = Your Discord.js client
// command = The command you are trying to use
client.music.command(message);
```
The following commands are available:

| Command  | Description                          |
|----------|--------------------------------------|
| clear()  | Clears the queue                     |
| play()   | Adds a song or playlist to the queue |
| replay() | Restarts current song                |
| skip()   | Skips current song                   |
| volume() | Set/Display current volume           |


## Example usage
Here is an example of a simple bot using the play() command:
```js
// require Discord.js and create a new client
const Discord = require('discord.js');
const client = new Discord.Client();

// require musicbot plugin
const music = require('discord.js-musicbot-plugin');

// add musicbot functions to client object
music.init(client, voiceChannel);

// connect your bot to discord
client.login('your discord bot token');

// command handler
client.on('message', message => {
    if (message.content.startsWith('!play')) {
        // pass the message to the play command
        client.music.play(message);
    }
});
```