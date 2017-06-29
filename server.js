require('dotenv').config();
const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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

/* POST Update chat tags */
app.post('/api/chats/:chatId/tags', function(req, res, next) {
  /* @TODO: Needs to be fixed! */
  apiReqDefaults.url = liveChatEndpoint + '/chats/' + req.params.chatId + '/tags';
  apiReqDefaults.headers['Content-Type'] = 'text/json';
  apiReqDefaults.json = {
    "tag[]":"sales"
  }
  apiReqDefaults.method = 'PUT';

  request(apiReqDefaults, function(err, response, body) {
    if (err) return next(err);
    res.send(body);
  });
});

/* GET tags */
app.get('/api/tags', function(req, res, next) {
  apiReqDefaults.url = liveChatEndpoint + '/tags';
  request.get(apiReqDefaults, function(err, response, body) {
    if (err) return next(err);
    res.send(JSON.parse(body));
  });
});

/* GET single tag */
app.get('/api/tags/:tagName', function(req, res, next) {
  apiReqDefaults.url = liveChatEndpoint + '/chats?tag[]=' + req.params.tagName;
  request.get(apiReqDefaults, function(err, response, body) {
    if (err) return next(err);
    res.send(JSON.parse(body));
  });
});

/* POST create new tag */
app.post('/api/tags', function(req, res, next) {
  if (!req.body.tagName) {
    res.send({ error: 'No tag was provided.' })
    return;
  }

  apiReqDefaults.url = liveChatEndpoint + '/tags?tag=' + req.body.tagName;
  apiReqDefaults.form = {
    author: apiReqDefaults.auth.user,
    tag: req.body.tagName,
    group: 0
  }
  request.post(apiReqDefaults, function(err, response, body) {
    if (err) return next(err);
    res.send(JSON.parse(body));
  });
});

/* DELETE tag */
app.delete('/api/tags/:tagName', function(req, res, next) {
  apiReqDefaults.url = liveChatEndpoint + '/tags/' + req.params.tagName;
  apiReqDefaults.method = "DELETE";

  request(apiReqDefaults, function(err, response, body) {
    if (err) return next(err);
    res.end();
  });
})

// Listen
app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
});
