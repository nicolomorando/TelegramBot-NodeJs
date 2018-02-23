var telegramBot = require('node-telegram-bot-api');
var sentiment = require('sentiment');
var username = require('username');


// pc station-host target.
username().then(username => {
    console.log(username);
});
//.

var permission = ['USERadmin001'];

var token ='499098435:AAEdqTCTBAsx6-QqY3msQak-2t5azJYCEUU';

var api = new telegramBot(token, {polling: true});


// bot information
api.onText(/\/info/, function(msg, match) {
  var fromId = msg.from.id;
  api.sendMessage(fromId, "<b>Informazioni Bot</b> \n <i>FactInsideBot</i> \n <code>Version 1.5, release data: 01/02/2018, last update data: 21/02/2018</code> \n  <a href=\"https://github.com/JuppiJ/TelegramBot-NodeJs\">Github Repo.</a> " ,{parse_mode : "HTML"});
});
// info


// author tool startup
api.onText(/\/author/, function(msg, match) {
  var fromId = msg.from.id;
  api.sendMessage(fromId, "<b>Informazioni Sviluppatore</b> \n <i>Nicolò Morando</i> \n <a href=\"http://www.fuckjupp.com/\">Website.</a> \n <code>Rimani aggiornato per ulteriori versioni.</code>" ,{parse_mode : "HTML"});
});
// author tool end.


// startup bot
api.onText(/\/start/, function(msg, match) {
  var fromId = msg.from.id;
  api.sendMessage(fromId, "<b>Introduzione</b> \n <i>Fact Inside Bot</i>" +
                          "\nComandi Disponibili:\n/author\n/vmintelligence\n/info" +
						  "\nPer rivisualizzare il messaggio:\n/start",{parse_mode : "HTML"});
});
// startup bot end.


var opts = {
  reply_markup: JSON.stringify(
    {
      force_reply: true
    }
  )};

  
// intelligence startup
api.onText(/\/vmintelligence/, function(msg, match) {
  var fromId = msg.from.id;  
  api.sendMessage(fromId, "\nScrivimi qualcosa (In inglese) così che io possa darti le mie opinioni.", opts)
  .then(function (sended) {
    var chatId = sended.chat.id;
    var messageId = sended.message_id;
    api.onReplyToMessage(chatId, messageId, function (message) {
      var sentival = sentiment(message.text)
	  if (sentival.score < 0) {
		api.sendMessage(fromId, "Frase negativa.");
	  } else if (sentival.score > 0) {
		api.sendMessage(fromId, "Frase positiva.");
	  } else {
		api.sendMessage(fromId, "Frase neutrale.");
	  }
	  });
  });    
// intelligence startup end.  
                          
});

console.log("bot run. Start conversations in your Telegram.");
