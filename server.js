require('dotenv').config();
const express = require('express');
const request = require('request');
const LiveChatApi = require('livechatapi').LiveChatApi;

const liveChatEndpoint = 'https://api.livechatinc.com'
let apiReqDefaults = {
  headers: {'X-API-Version': 2},
  auth: {
    user: process.env.LIVECHAT_LOGIN,
    pass: process.env.LIVECHAT_API_KEY,
    sendImmediately: true
  }
}

const app = express();
app.set('port', (process.env.PORT || 3001));

// Serve static assets in Production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

/* Authentication */
const api = new LiveChatApi(process.env.LIVECHAT_LOGIN, process.env.LIVECHAT_API_KEY);

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

/* GET tags */
app.get('/api/tags', function(req, res, next) {
  apiReqDefaults.url = liveChatEndpoint + '/tags';
  request.get(apiReqDefaults, function(err, response, body) {
    if (err) return next(err);
    res.send(JSON.parse(body));
  })
});

/* GET single tag */
app.get('/api/tags/:tagName', function(req, res, next) {
  apiReqDefaults.url = liveChatEndpoint + '/chats?tag[]=' + req.params.tagName;
  request.get(apiReqDefaults, function(err, response, body) {
    if (err) return next(err);
    res.send(JSON.parse(body));
  })
});

// Listen
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
