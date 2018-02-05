var telegramBot = require('node-telegram-bot-api');
var sentiment = require('sentiment');
var username = require('username');


// pc station-host target.
username().then(username => {
    console.log(username);
});
//.


var token ='499098435:AAEdqTCTBAsx6-QqY3msQak-2t5azJYCEUU';

var api = new telegramBot(token, {polling: true});



// author tool startup
api.onText(/\/author/, function(msg, match) {
  var fromId = msg.from.id;
  api.sendMessage(fromId, "Il mio sviluppatore si chiama: Morando Nicolò.\nAttualmente sono ancora in fase di sviluppo" + 
						  ", ma è stata aggiornata la versione ed ora posso risponderti dandoti le mie impressioni, " +
						  "tuttavia rimani aggiornato!\nVersione: 1.3, hostato sulla WStation dell'utente: '" + username.sync() + "',\nAuthor Website: http://www.fuckjupp.com/");
});
// author tool end.

// startup bot
api.onText(/\/start/, function(msg, match) {
  var fromId = msg.from.id;
  api.sendMessage(fromId, "Ciao! Io sono Fact Inside the bot!" + 
                          "\nAttualmente sono in fase di sviluppo, però sono già disponibili vari tools. "+
                          "\nCome ad esempio:\n/author\n/vmintelligence" +
						  "\nPer rivisualizzare il messaggio inserire il comando:\n/start" );
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
  api.sendMessage(fromId, "vmintelligence capisce la sintassi della tua frase in modo che io possa darti un'opinione da me relizzata e concreta."
						+ "\nScrivimi qualcosa (In inglese) così che io possa darti le mie opinioni.", opts)
  .then(function (sended) {
    var chatId = sended.chat.id;
    var messageId = sended.message_id;
    api.onReplyToMessage(chatId, messageId, function (message) {
      var sentival = sentiment(message.text)
	  if (sentival.score < 0) {
		api.sendMessage(fromId, "Perchè sei così pessimista, questa frase è troppo negativa! non sono d'accordo!");
	  } else if (sentival.score > 0) {
		api.sendMessage(fromId, "Ottima frase! Vedo che sei di ottimo umore!");
	  } else {
		api.sendMessage(fromId, "Frase neutra, nulla da dire a riguardo.");
	  }
	  });
  });    
// intelligence startup end.  
                          
});


console.log("bot run. Start conversations in your Telegram.");