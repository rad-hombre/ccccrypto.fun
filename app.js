const coinsToRequest = "BTC,ETH,ETC,XRP,LTC,DASH,BCH,XMR,QTUM,ZEC,BTG";
const url = 'https://min-api.cryptocompare.com/data/pricemultifull?fsyms=' + coinsToRequest + '&tsyms=USD';
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
      const coins = data.DISPLAY;
      let main = "";
      let name, price, coinSymbol, coinDisplay, twentyFourHrChange;
      let currentCoin = 0;

      let header = `
        <section class="hero is-primary is-medium">
        <div class="hero-body header">
                <h1 class="title is-pulled-left">Cryptoprices.fun!</h1>
                <h2 class="subtitle is-pulled-right">Some of the top cryptocurrency prices… 🍻</h2>
         </div> 
       </section> `;
      main += header;

      for (const coin in coins) {
        if(coins.hasOwnProperty(coin)) {
          name = coin;
          price = coins[coin].USD.PRICE;
          twentyFourHrChange = coins[coin].USD.CHANGE24HOUR;

          // Refactor this as a function.
          coinDisplay = `
            <div class='card'>
               <header class="card-header">
                <p class="name card-header-title is-centered">  
                     ${coinNames[currentCoin]}   (${name})
                </p>
              </header>
             <div class="card-content">
                <div class="media">
                  <div class="media-left">
                    <figure class="image is-96x96">       
                      <img src=./images/svg/${coinImages[currentCoin]} alt="Placeholder image">
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class=""><strong>Price = </strong>${price.replace(/\s+/g, '')}</p>
                    <p class=""><strong>24hr Change = </strong>${styleValue(twentyFourHrChange.replace(/\s+/g, ''))}</p>
                  </div>    
                  <div class="media-right">
                      <a class='shrink-me' href=${coinInfo[currentCoin]}>What is ${coinNames[currentCoin]}? </a>
                  </div>    
                </div>
              </div>
                       
            </div>`
        }
        main += coinDisplay;
        currentCoin++;
      }
      const app = document.getElementsByClassName("app");
      main +=  `<div class='shrink-me'>© 2018 <a href='http://mattheworndoff.com'>Matthew Orndoff</a></div>`;  // Add footer.
      app[0].innerHTML += main;
    });
  });


// I feel like this is doing too many things.  List out the things it's doing:
/*
1. Checks if the string/value is a negative
2. wraps string/value in appropriate html and returns it.
 */
function styleValue(str){
  if( isNegativeValue(str) ){
    return `<text class="red"> ☟ ${str} </text>`;
  } else {
    return `<text class="green"> ☝︎ ${str} </text>`;
  }
}

function isNegativeValue(str){
  return str.search(/([-])\w+/);
}

