const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fs = require('fs');
let interaction;

module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: new SlashCommandBuilder()
    .setName('accept')
    .setDescription('Accepts a user into the great 44th!')
    .addMentionableOption((option) =>
      option
        .setName('enlistee')
        .setDescription('The enlistee you want to accept')
        .setRequired(true)
    ),

  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: ({ interaction, client, handler }) => {
    const targetUser = interaction.options.getMember('enlistee');

    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    const rolesToAdd = [
      '928480644881858630',
      '928382824002764851',
      '962128351756181565',
      '958108722968805436',
      '962326626287366204',
      '962327639979339796',
    ];
    const rolesToRemove = ['940744007062016011', '1142079770838970438'];

    // ACCEPT CODE

    // Check if user has "NaW Enlisted"
    if (targetUser.roles.cache.has('928480644881858630')) {
      interaction.reply({
        content: `"<@${targetUser.id}>" is already enlisted.`, // Reply
        ephemeral: true,
      });
      return; // End Code
    }

    // ADD/REMOVE ROLES
    targetUser.roles.add(rolesToAdd); // Add roles
    setTimeout(function () {
      targetUser.roles.remove(rolesToRemove); // Remove "Enlistee"
    }, 1000);

    // NICKNAME
    try {
      setTimeout(function () {
        let unCutName = `44th | Rct. ${targetUser.user.username}`;
        let cutName = unCutName.slice(0, 31);
        targetUser.setNickname(cutName); // Set Nickname
      }, 2000);
    } catch (error) {
      console.error(error);
    }

    // EMBED CODE
    const acceptEmbed = new EmbedBuilder()
      .setAuthor({ name: '44th Events Bot' })
      .setTitle('New Member Accepted!')
      .setDescription('A new member has joined the 44th, 44th On Top!')
      .addFields(
        { name: 'Who was enlisted?', value: `<@${targetUser.id}>` },
        { name: 'Who accepted them?', value: `<@${interaction.user.id}>` },
        { name: 'Enlistee Discord ID:', value: `${interaction.user.id}` }
      )
      .setTimestamp();

    //// MESSAGES

    // Reply
    interaction.reply({
      content: `You accepted: "<@${targetUser.id}>"`,
      ephemeral: true,
    });

    // Log Channel
    client.channels
      .fetch('1146929770559447100')
      .then((channel) => channel.send({ embeds: [acceptEmbed] }));

    // Console Log
    console.log(
      `[/accept @ ${new Date().toDateString()}  ${formattedTime}UTC]: "${
        interaction.user.username
      }" Enlisted: "${targetUser.user.username}"`
    );
    fs.appendFile(
      'acceptLog.txt',
      `[/accept @ ${new Date().toDateString()}  ${formattedTime}UTC]: "${
        interaction.user.username
      }" Enlisted: "${targetUser.user.username}"` + '\r\n',
      (err) => {
        if (err) throw err;
      }
    );
  },

  /** @type {import('commandkit').CommandOptions} */
  options: {
    devOnly: true,
    deleted: false,
    userPermissions: ['ManageRoles', 'ManageNicknames', 'Administrator'],
    botPermissions: ['ManageRoles', 'ManageNicknames', 'Administrator'],
  },
};
