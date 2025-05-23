require('dotenv/config');
const { Client, IntentsBitField, messageLink } = require('discord.js');
const { CommandKit } = require('commandkit');
const path = require('path');
const cron = require('node-cron');

// Intents
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
  ],
});

// CommandKit
new CommandKit({
  client,
  commandsPath: path.join(__dirname, 'commands'),
  eventsPath: path.join(__dirname, 'events'),
  devGuildIds: ['928381935523348480'],
  devRoleIds: [
    '962333171893035008',
    '962333160329343096',
    '962331434557788191',
    '937462060172849173',
  ],
  skipBuiltInValidations: true,
  bulkRegister: true,
});

/*------------------
// SCHEDULED TASKS
------------------*/

const ADMIN_ID = '1317257762597634149';

// SCHEDULE 44th Skirmisher Friday

cron.schedule('1 0 15 * * 5', () => {
  client.channels.fetch('1317264796000714862').then((channel) => {
    channel
      .send(
        `<@&${ADMIN_ID}> The **44th Skrimisher Event** starts at (<t:1711652400:t>), thumbs up if you can admin! \n-# 44th Events Bot - 44th | Henderson`
      )
      .then((sentMessage) => {
        sentMessage.react('✅');
        sentMessage.react('❌');
        sentMessage.react('❔');
      }); // Reactions
  });
  console.log('Sent message "44th Skrimisher Event"');
});

// SCHEDULE 44th Skirmisher Friday Signups

cron.schedule('1 0 17 * * 5', () => {
  client.channels.fetch('1317261981799153674').then((channel) => {
    channel.send(
      '<@&1317262633031700534>\n# SIGN UP TIME! #\nRemember to use the template below. Signups will close at <t:1731091200:t>\nRifle numbers will be listed on the balance sheet!\n```\nRegiment:\nExpected Numbers:\nWould you like rifles?:\n```\n-# 44th Events Bot - 44th | Henderson'
    );
  });
  console.log('Sent message "44th Skrimisher Event Signups"');
});

// LOGIN
client.login(process.env.TOKEN);

client.on('ready', () => {
  client.user.setActivity({
    name: 'Event Schedule',
    type: 3,
  });
  /*
  client.channels.fetch('1020417511394648184').then((channel) => {
    channel.send('<@&1285433225522446517>\n# SIGN UP TIME! #\nRemember to use the template below. Signups will close at <t:1730486400:t>\nRifle numbers will be listed on the balance sheet!\n```\nRegiment:\nExpected Numbers:\nWould you like rifles?:\n```\n-# 44th Events Bot - 44th | Henderson').then((sentMessage) => {
      sentMessage.react('✅');
      sentMessage.react('❌');
      sentMessage.react('❔');
    });
    console.log('Sent Test Message');
  });
  */
});
