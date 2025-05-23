const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

// ON EXCEPTION
process.on('uncaughtException', function (err) {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    console.error(`[${new Date().toDateString()} @ ${formattedTime}UTC]: Exeception: ${err}`);
    console.log(`[${new Date().toDateString()} @ ${formattedTime}UTC]: Bot not crashing...`);
  });
  

module.exports = {
    /** @type {import('commandkit').CommandData}  */
    data: {
      name: 'coinflip',
      description: 'Flip a coin.',
    },
  
    /**
     * @param {import('commandkit').SlashCommandProps} param0
     */
    run: ({ interaction, client }) => {
      let side = ' ';
      let random = Math.round(Math.random());

      if (random == 1) {
        side = 'Heads';
      } else {
        side = 'Tails'
      }

      const coinflipEmbed = new EmbedBuilder()
        .setAuthor({ name: 'Coinflip' })
        .setTitle(`The side was ${side}`)
        .setTimestamp()
      ;

      interaction.reply({ embeds: [coinflipEmbed] });
    },
  
    /** @type {import('commandkit').CommandOptions} */
    options: {
      devOnly: false,
      deleted: false,
    },
  };
  