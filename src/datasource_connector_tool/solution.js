var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
class Datasource {
    constructor() {}
    async getResponse() {
            var promiseObj = new Promise(function(resolve, reject){
               var xhr = new XMLHttpRequest();
               xhr.open("GET", "https://static.ngnrs.io/test/prices", true);
               xhr.send();
               xhr.onreadystatechange = function(){
               if (xhr.readyState === 4){
                  if (xhr.status === 200){
                     var resp = xhr.responseText;
                     var respJson = JSON.parse(resp);
                     resolve(respJson.data.prices);
                  } else {
                     reject(xhr.status);
                  }
               } 
            }
          });
          return promiseObj;
         }
         mid(){
            return (this.buy+this.sell)/200;
         }

         quote(){
            return this.pair.slice(-3)
         }
         async getPrices() {
            const prices = await this.getResponse();
            prices.forEach(price=>{
                price.mid=this.mid.bind(price);
                price.quote = this.quote.bind(price);
            })
            return prices
         }

   }
let ds = new Datasource();
ds.getPrices()
    .then(prices => {
        prices.forEach(price => {
            console.log(`Mid price for ${ price.pair } is ${ price.mid() } ${ price.quote() }.`);
        });
    }).catch(error => {
        console.error(error);
    });