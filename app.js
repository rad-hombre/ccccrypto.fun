const grabCoins = "BTC,ETH,ETC,XRP,LTC,DASH,BCH,XMR,QTUM,ZEC,BTG";
const url = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + grabCoins + '&tsyms=USD';
const coinNames = ["Bitcoin", "Ethereum", "Ethereum Classic", "Ripple", "Litecoin", "Dash",
  "Bitcoin Cash", "Monero", "Quantum", "ZCash", "Bitcoin Gold"];

const coinInfo = ["https://en.wikipedia.org/wiki/Bitcoin", "https://en.wikipedia.org/wiki/Ethereum",
  "https://en.wikipedia.org/wiki/Ethereum_Classic", "https://en.wikipedia.org/wiki/Ripple_(payment_protocol)",
  "https://en.wikipedia.org/wiki/Litecoin", "https://en.wikipedia.org/wiki/Dash_(cryptocurrency)",
  "https://en.wikipedia.org/wiki/Bitcoin_Cash", "https://en.wikipedia.org/wiki/Monero_(cryptocurrency)",
  "https://en.wikipedia.org/wiki/Qtum", "https://en.wikipedia.org/wiki/Zcash", "https://en.wikipedia.org/wiki/Bitcoin_Gold"];

// ./images/svg/
const coinImages = ["btc.svg", "eth.svg", "etc.svg", "xrp.svg", "ltc.svg", "dash.svg", "bch.svg",
  "xmr.svg", "qtum.svg", "zec.svg", "btg.svg"];

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
      let name, price, coinSymbol, coinDisplay, TwentyFourHrChange;
      let x = 0;

      let header = `<section class="hero is-primary is-medium">
        <div class="hero-body header"></div>
                <div class="container">
                <h1 class="title is-1">
                Cryptoprices.fun!
                </h1>
        <h2 class="subtitle">
            Here's some of the top cryptocurrency prices… 🍻
        </h2>
       </div> </section> `;
      main += header;

      for (const coin in coins) {
        if(coins.hasOwnProperty(coin)) {
          name = coin;
          price = coins[coin].USD.PRICE;
          TwentyFourHrChange = coins[coin].USD.CHANGE24HOUR;
          coinDisplay = `
            <div class='card coin'>
               <header class="card-header">
                <p class="name card-header-title">  
                     ${coinNames[x]}   (${name})
                </p>
              </header>
              
              <div class="card-content">
                  <div class="content">
                      <div class="media">
                        <div class="media-left">
                          <figure class="image is-96x96">       
                            <img src=./images/svg/${coinImages[x]} alt="Placeholder image">
                          </figure>
                        </div>
                        <div class="media-content coin-information">
                          <p class=""><strong>price ➤ </strong>${price.replace(/\s+/g, '')}</p>
                          <p class=""><strong>24hr change ➤ </strong>${TwentyFourHrChange.replace(/\s+/g, '')}</p>
                        </div>    
                        <div class="media-right">
                            <a class='little' href=${coinInfo[x]}>What is ${coinNames[x]}? </a>
                        </div>    
                       </div>
                       
                  </div>
               </div>
            </div>`
        }
        main += coinDisplay;
        x++;
      }
      const app = document.getElementsByClassName("app");
      const footer =  `<div class='little'>© 2018 <a href='http://mattheworndoff.com'>Matthew Orndoff</a></div>`;
      main += footer;
      app[0].innerHTML += main;
    });
  });
