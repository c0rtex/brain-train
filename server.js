require('dotenv').config();
const express = require('express');
const LiveChatApi = require('livechatapi').LiveChatApi;

const app = express();
app.set('port', (process.env.PORT || 3001));

/* Authentication */
const api = new LiveChatApi(process.env.LIVECHAT_LOGIN, process.env.LIVECHAT_API_KEY);

/* GET home page */
app.get('/', function(req, res) {
  res.send('Brain Train API (integrates with LiveChat)');
});

/* GET agents */
app.get('/api/agents', function(req, res) {
  api.agents.list(function(agents) {
    res.send(agents);
  });
});

/* GET single agent */
app.get('/api/agents/:login', function(req, res) {
  api.agents.get(req.params.login, function(agent) {
    res.send(agent);
  });
});

/* GET chats */
app.get('/api/chats', function(req, res) {
  api.chats.list(function(chats) {
    res.send(chats);
  });
});

/* GET single chat */
app.get('/api/chats/:chatId', function(req, res) {
  api.chats.get(req.params.chatId, function(chat) {
    res.send(chat);
  });
});

// Listen
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});