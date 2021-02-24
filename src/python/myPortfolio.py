import pandas as pd
import stockAndCurrencyData
from forex_python.converter import CurrencyRates
from flask import Flask

#choose your currency of the csv (examples: EUR, USD, GBP, NOK)
#THIS IS CASE SENSITIVE
USER_CURRENCY = "EUR"
#choose the symbol of your currency (examples: €, $, £, kr)
USER_SYMBOL = "€"


app = Flask(__name__)

@app.route("/currencySymbol")
def currencySymbol():
    return USER_SYMBOL

#get only once the portfolio
dfFormattedPortfolio = stockAndCurrencyData.makeStats(USER_CURRENCY)                                 

@app.route("/investedPortfolio")
def investedPortfolio():
    return dfFormattedPortfolio.to_json(orient="records")

@app.route("/currentPortfolio")
def currentPortfolio():
    #get the live data from yahoo and forex (only if you have data)
    dfLivePositionValues = stockAndCurrencyData.yahooInfo(dfFormattedPortfolio, USER_CURRENCY)
    return dfLivePositionValues.to_json(orient="records")

if __name__ == "__main__":
    app.run()
