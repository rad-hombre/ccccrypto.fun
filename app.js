
var grabCoins = "BTC,ETH,ETC,XRP,LTC,DASH,BCH,XMR,QTUM,ZEC,BTG";
var url = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + grabCoins + '&tsyms=USD';
var coinNames = ["Bitcoin", "Ethereum", "Ethereum Classic", "Ripple", "Litecoin", "Dash",
  "Bitcoin Cash", "Monero", "Quantum", "ZCash", "Bitcoin Gold"];

var coinInfo = ["https://en.wikipedia.org/wiki/Bitcoin", "https://en.wikipedia.org/wiki/Ethereum",
  "https://en.wikipedia.org/wiki/Ethereum_Classic", "https://en.wikipedia.org/wiki/Ripple_(payment_protocol)",
  "https://en.wikipedia.org/wiki/Litecoin", "https://en.wikipedia.org/wiki/Dash_(cryptocurrency)",
  "https://en.wikipedia.org/wiki/Bitcoin_Cash", "https://en.wikipedia.org/wiki/Monero_(cryptocurrency)",
  "https://en.wikipedia.org/wiki/Quantum", "https://en.wikipedia.org/wiki/Zcash", "https://en.wikipedia.org/wiki/Bitcoin_Gold"];

fetch(url)
  .then(function(res){
    if (res.status !== 200) {
      console.log('There was a problem. Status Code: ' + res.status);
      return;
    }
    res.json().then(function(data) {
      console.log(data);
      var coins = data.DISPLAY;
      var main = "";
      var name, price, coinSymbol, coinDisplay;
      var x = 0;

      for (var coin in coins) {
        if(coins.hasOwnProperty(coin)) {
          name = coin;
          price = coins[coin].USD.PRICE;
          coinSymbol = coins[coin].USD.FROMSYMBOL;
          // Display a symbol only if the coin has one.
          if(name.replace(/\s+/, "")  == coinSymbol.replace(/\s+/, "") ) {
            coinSymbol = "";
          } else {
            coinSymbol = " " + coinSymbol;
          }
          coinDisplay = "<div class='coin'><p class='name'>"
            + coinNames[x] + " (" + name +  coinSymbol + ") "
            + "</p>" + "<p>" + price + "</p> "
            + "<a class='little' href="+ coinInfo[x] + ">" + "What is " + coinNames[x] + "?" + "</a>" + "</div>";
        }
        main += coinDisplay;
        x++;
      }
      var app = document.getElementsByClassName("app");
      var footer =  "<div class='little'><p>© 2018</p> <a class='little' href='http://mattheworndoff.com'>" + "Matthew Orndoff" + "</a>" + "</div>";
      main += footer;
      app[0].innerHTML += main;
    });
  });
