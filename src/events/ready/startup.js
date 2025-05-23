module.exports = (client) => {
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const formattedTime = `${hours}:${minutes}`;
  console.log(
    `[${new Date().toDateString()} @ ${formattedTime}UTC]: ${
      client.user.tag
    } is online.`
  );
};
