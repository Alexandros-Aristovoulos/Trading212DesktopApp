# Trading212DesktopApp
### Description
The goal of this project is to get your Trading212 portfolio, calculate your returns and show everything clearly without having to log in to the Trading 212 website. 
This is achieved by getting the order information from a provided csv and searching in yahoo finance for the current prices of the stocks. This is a more interactive version
of my [Trading212Portfolio](https://github.com/alex999ar/Trading212Portfolio).

### Image example of program output
![](/example_output.png)
When you hover over a slice of the donut chart it shows you the stock ticker, the current value of this investment and the percentage of your portfolio it occupies.
Click on any any ticker in the legend under the chart to remove it or add it back in the chart.

### Information
**This project is designed for accounts with EURO currency**. It converts Usd, GBp, and Nok to euro. If you want to change it to your currency or add more conversions
follow the [instructions here](https://github.com/alex999ar/Trading212DesktopApp#Change_or_add_currencies)

### Installation
* Run the command `npx create-electron-app trading212_desktop_app` to create the skeleton of an electon app using electron forge.
* Delete the package.json file and src folder in your install location and replace them with my own files.
(Alternatively you can keep your package.json if you change `"main": "src/index.js"` to `"main": "src/main.js"`)
* Go to src\python (inside your install location) and replace my orders.csv with your own. (Don't forget to name it the same).

[Instructions on how to download your order data from Trading 212 here.](https://community.trading212.com/t/new-feature-export-your-investing-history/35612) 
**Select ONLY the orders as included data**.

### How to use
* Open `src\python\myPortfolio.py` and run it in order to make a local server
* Open a terminal and cd to your install location. Run the command `npm start`

### How to create a proper executable
* Open a terminal and cd to your install location. Run the command `npm run make`

### Change or add currencies
1. Go to the yahooInfo function of `src\python\stockAndCurrencyData.py` and locate where we get the currency rates
![](/rate_images/rates1.png)

* Here you can add more currency conversions. For example to get the conversion rate from Swedish Krona to Euro add `sekEuroRate = c.getRate('SEK', 'EUR')`
* If you want to change the currency from Euro to your currency (for example Usd) you need to change the commands like this:

`euroUsdRate = c.getRate('EUR', 'USD')`

`gbpUsdRate = c.getRate('GBP', 'USD')`

`nokUsdRate = c.getRate('NOK', 'USD')`

2. Locate where we convert everything to euros
 
![](/rate_images/rates2.png)

* To add your currency conversion add another elif statement after the last one. For example to use the `sekEuroRate` which we created in the above example you need to add

`elif currency == "SEK": 
    curPrice = sekEurRate*curPrice` 
    
(use the correct python spacing)
* To change the currency from Euro to your currency (for example Usd) you need to change the commands like this:

`            if currency == "EUR":
                curPrice = eurUsdRate*curPrice
            elif currency == "GBp":
                curPrice = gbpUsdRate*curPrice*0.01
            elif currency == "NOK":
                curPrice = nokUsdRate*curPrice` 

(use the correct python spacing)

### Dependencies
#### For Electron
- [Npm and Node.js](https://www.npmjs.com/get-npm)

#### For Python
- [Flask](https://flask.palletsprojects.com)
- [Pandas](https://pandas.pydata.org/pandas-docs/stable/getting_started/install.html)
- [BeautifulSoup 4](https://pypi.org/project/beautifulsoup4/)
- [Requests](https://pypi.org/project/requests/)
- [Yahoo finance](https://pypi.org/project/yahoo-fin/)
- [Forex python](https://pypi.org/project/forex-python/)
- [Numpy](https://numpy.org/install/)
