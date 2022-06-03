require('dotenv').config();

const { Client, Intents, Collection } = require('discord.js');

const client = new Client({
    shards: 'auto',
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ]
});

client.slash = new Collection();

const handlers = ['loadEvents', 'loadCommands']
handlers.forEach((file) => {
    require(`./handlers/${file}`)(client);
});

(async () => {
    const token = process.env.TOKEN || ``;
    if (token) {
        await client.login(token);
    } else {
        console.log(`Please set a token in the .env file.`);
        process.exit(1);
    }
})();