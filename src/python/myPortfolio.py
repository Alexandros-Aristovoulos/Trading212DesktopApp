import pandas as pd
import stockAndCurrencyData
from forex_python.converter import CurrencyRates
from flask import Flask

app = Flask(__name__)

#get only once the portfolio
dfFormattedPortfolio = stockAndCurrencyData.makeStats()                                 

@app.route("/investedPortfolio")
def investedPortfolio():
    return dfFormattedPortfolio.to_json(orient="records")

@app.route("/currentPortfolio")
def currentPortfolio():
    #get the live data from yahoo and forex (only if you have data)
    dfLivePositionValues = stockAndCurrencyData.yahooInfo(dfFormattedPortfolio)
    return dfLivePositionValues.to_json(orient="records")

if __name__ == "__main__":
    app.run()
