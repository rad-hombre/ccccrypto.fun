const grabCoins = "BTC,ETH,ETC,XRP,LTC,DASH,BCH,XMR,QTUM,ZEC,BTG";
const url = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + grabCoins + '&tsyms=USD';
const coinNames = ["Bitcoin", "Ethereum", "Ethereum Classic", "Ripple", "Litecoin", "Dash",
  "Bitcoin Cash", "Monero", "Quantum", "ZCash", "Bitcoin Gold"];

const coinInfo = ["https://en.wikipedia.org/wiki/Bitcoin", "https://en.wikipedia.org/wiki/Ethereum",
  "https://en.wikipedia.org/wiki/Ethereum_Classic", "https://en.wikipedia.org/wiki/Ripple_(payment_protocol)",
  "https://en.wikipedia.org/wiki/Litecoin", "https://en.wikipedia.org/wiki/Dash_(cryptocurrency)",
  "https://en.wikipedia.org/wiki/Bitcoin_Cash", "https://en.wikipedia.org/wiki/Monero_(cryptocurrency)",
  "https://en.wikipedia.org/wiki/Qtum", "https://en.wikipedia.org/wiki/Zcash", "https://en.wikipedia.org/wiki/Bitcoin_Gold"];

fetch(url)
  .then(function(res){
    if (res.status !== 200) {
      console.log('There was a problem. Status Code: ' + res.status);
      return;
    }
    res.json().then(function(data) {
      console.log(data);
      const coins = data.DISPLAY;
      let main = "";
      let name, price, coinSymbol, coinDisplay;
      let x = 0;

      for (const coin in coins) {
        if(coins.hasOwnProperty(coin)) {
          name = coin;
          price = coins[coin].USD.PRICE;
          coinSymbol = coins[coin].USD.FROMSYMBOL;
          // Display a symbol only if the coin has one.
          if(name.replace(/\s+/, "")  == coinSymbol.replace(/\s+/, "") ) {
            coinSymbol = "";
          } else {
            coinSymbol = "" + coinSymbol;
          }
          coinDisplay = `<div class='card coin'><p class='name'>
            ${coinNames[x]} (${name} ${coinSymbol})
            </p><p> ${price} </p>
            <a class='little' href=${coinInfo[x]}>What is ${coinNames[x]}? </a></div>`
        }
        main += coinDisplay;
        x++;
      }
      const app = document.getElementsByClassName("app");
      const footer =  "<div class='little'><p>© 2018</p> <a class='little' href='http://mattheworndoff.com'>" + "Matthew Orndoff" + "</a>" + "</div>";
      main += footer;
      app[0].innerHTML += main;
    });
  });
