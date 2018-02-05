
var grabCoins = "BTC,ETH,ETC,XRP,LTC,DASH,BCH,XMR,QTUM,ZEC,BTG";
var url = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + grabCoins + '&tsyms=USD';

fetch(url)
  .then(function(res){
    if (res.status !== 200) {
      console.log('There was a problem. Status Code: ' + res.status);
      return;
    }
    res.json().then(function(data) {
      var coins = data.DISPLAY;
      var main = "";
      var name, price, coinSymbol, coinDisplay;
      for (var coin in coins) {
        if(coins.hasOwnProperty(coin)) {
          name = coin;
          price = coins[coin].USD.PRICE;
          coinSymbol = coins[coin].USD.FROMSYMBOL;
          // Display a symbol only if the coin has one.
          if(name.replace(/\s+/, "")  == coinSymbol.replace(/\s+/, "") ) {
            coinSymbol = "";
          }
          coinDisplay = "<div class='coin'><p class='name'>" + name + " " + coinSymbol + "</p>" + "<p>" + price + "</p>" + "</div>";
          console.log(coinDisplay);
        }
        main += coinDisplay;
      }
      var app = document.getElementsByClassName("app");
      app[0].innerHTML += main;
    });
  });

// think i'd like to use BULMA or something like that to prettify this.
// buy a url; quick-coins.com or something dumb.