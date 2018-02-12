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
      let name, price, coinSymbol, coinDisplay;
      let x = 0;

      for (const coin in coins) {
        if(coins.hasOwnProperty(coin)) {
          name = coin;
          price = coins[coin].USD.PRICE;
          // coinSymbol = coins[coin].USD.FROMSYMBOL;
          // Display a symbol only if the coin has one.
          // if(name.replace(/\s+/, "")  == coinSymbol.replace(/\s+/, "") ) {
          //   coinSymbol = "";
          // } else {
          //   coinSymbol = "" + coinSymbol;
          // }
          // TODO Make this more responsive
          coinDisplay = `<div class='card coin'>
               <header class="card-header">
               <!--name class later maybe-->
                <p class="name card-header-title">  
                     ${coinNames[x]}   (${name})
                </p>
                <a href="#" class="card-header-icon" aria-label="more options">
                  <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                  </span>
                </a>
              </header>
              
              <div class="card-content">
                  <div class="content">
                      <div class="media">
                        <div class="media-left">
                          <figure class="image is-96x96">       
                            <img src=./images/svg/${coinImages[x]} alt="Placeholder image">
                          </figure>
                        </div>
                        </div>
                    <p> ${price} </p>
                    <a class='little' href=${coinInfo[x]}>What is ${coinNames[x]}? </a>
                  </div>
               </div>
            </div>`
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
