const Discord = require('discord.js');
const axios = require('axios');

const client = new Discord.Client();
const PREFIX = '!';

const CONTABO_CLIENT_ID = 'INT-12680701';
const CONTABO_CLIENT_SECRET = '8Pd2FzzmdTAn9b9Zglb0DOOxJzALxQbX';

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'createvps') {
    try {
      // Request an access token using client credentials
      const tokenResponse = await axios.post('https://api.contabo.com/token', {
        client_id: CONTABO_CLIENT_ID,
        client_secret: CONTABO_CLIENT_SECRET,
        grant_type: 'client_credentials'
      });

      const accessToken = tokenResponse.data.access_token;

      // Use the access token to create a VPS
      const vpsResponse = await axios.post(
        'https://api.contabo.com/vps/v1/create',
        {
          apiKey: accessToken,
          machineType: 'vps',
          // Add other parameters as needed for VPS creation
        }
      );

      const vpsData = vpsResponse.data;
      message.channel.send(`VPS created successfully!\nID: ${vpsData.id}\nIP: ${vpsData.ip}`);
    } catch (error) {
      console.error('Error creating VPS:', error.response.data);
      message.channel.send('Error creating VPS. Please try again later.');
    }
  }
});

client.login('MTIxMzc0NTIxMDMyOTI3MjM1MQ.GpdcGG._ypVXZuNLrJqU-LfMbUBF_WFycQt9BspikxSn0');
