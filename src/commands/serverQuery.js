const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
let hostname = '<ip>';
let serverQueryPort = '<port>';

// ON EXECPTION
process.on('uncaughtException', function (err) {
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const formattedTime = `${hours}:${minutes}`;
  console.error(
    `[${new Date().toDateString()} @ ${formattedTime}UTC]: Exeception: ${err}`
  );
  console.log(
    `[${new Date().toDateString()} @ ${formattedTime}UTC]: Bot not crashing...`
  );
});

module.exports = {
  /** @type {import('commandkit').CommandData}  */
  data: {
    name: 'queryserver',
    description: 'Sends query request to 44th server to get server info.',
  },

  /**
   * @param {import('commandkit').SlashCommandProps} param0
   */
  run: ({ interaction, client }) => {
    try {
      const { queryGameServerInfo } = require('steam-server-query');
      const currentTime = new Date();
      const hours = currentTime.getHours().toString().padStart(2, '0');
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      const formattedTime = `${hours}:${minutes}`;
      // BEGIN QUERY
      console.log(
        `[${new Date().toDateString()} @ ${formattedTime}UTC]: Querying '${hostname}:${serverQueryPort}'...`
      );
      queryGameServerInfo(`${hostname}:${serverQueryPort}`).then(
        (infoResponse) => {
          //console.debug(infoResponse);
          // EMBED
          const queryEmbed = new EmbedBuilder()
            .setAuthor({ name: '44th Events Bot' })
            .setTitle(`Server Response (${hostname}:${serverQueryPort})`)
            .setFields(
              {
                name: 'Game/Version',
                value: `${infoResponse.game} / ${infoResponse.version}`,
              },
              { name: 'Server Name', value: `${infoResponse.name}` },
              { name: 'Current Map', value: `${infoResponse.map}` },
              {
                name: 'Players (Bugged)',
                value: `${infoResponse.players}/${infoResponse.maxPlayers}`,
              },
              { name: 'Server Visibility', value: `${infoResponse.visibility}` }
            )
            .setTimestamp();
          console.log(
            `[${new Date().toDateString()} @ ${formattedTime}UTC]: A2S Query Recieved and Sent!`
          );
          interaction.reply({ embeds: [queryEmbed] });
        }
      );
    } catch (error) {
      console.error(error);
    }
  },

  /** @type {import('commandkit').CommandOptions} */
  options: {
    devOnly: true,
    deleted: true,
  },
};
