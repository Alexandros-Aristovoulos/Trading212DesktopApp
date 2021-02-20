var adress = 'http://127.0.0.1:5000//';

var currentPortfolioValue = document.getElementById("currentPortfolioValue")
var investedPortfolioValue = document.getElementById("investedPortfolioValue")
var returnValue = document.getElementById("returnValue")

var ctx = document.getElementById('chartArea').getContext('2d');

var stockRows = document.getElementById("stockRows")

var options = {
    responsive: true,
    aspectRatio: 1.25,
    legend: {
        position: 'bottom',
        labels: {
            fontColor: 'rgb(255, 255, 255)',
            fontSize: 20
        }
    },
    title: {
        display: true,
        text: 'Investments',
        fontColor: 'rgb(255, 255, 255)',
        fontSize: 40
    },
    animation: {
        animateScale: false,
        animateRotate: false
    },
    tooltips: {
        titleFontSize: 18,
        bodyFontSize: 18,
        callbacks: {
            label: function (tooltipItem, data) {
                var dataset = data.datasets[tooltipItem.datasetIndex];
                var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                var total = meta.total;
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = parseFloat((currentValue / total * 100).toFixed(1));
                return currentValue + ' (' + percentage + '%)';
            },
            title: function (tooltipItem, data) {
                return data.labels[tooltipItem[0].index];
            }
        }
    }
}

var chart = new Chart(ctx);

var colors = ['rgba(204, 0, 0, 1)', 'rgba(76, 153, 0, 1)', 'rgba(0, 0, 153, 1)', 'rgba(255, 255, 0, 1)', 'rgba(153, 0, 153, 1)',
    'rgba(204, 102, 0, 1)', 'rgba(0, 153, 153, 1)', 'rgba(0, 102, 0, 1)']

function addStockRow(parentEl, stock, price, quantity, profit) {
    let stockTable = document.createElement("table");
    stockTable.className = "stockTable";
    parentEl.appendChild(stockTable);

    let tr1 = document.createElement("tr");
    stockTable.appendChild(tr1);

    let td1 = document.createElement("td");
    td1.className = "stockItemTitle";
    td1.innerText = stock;
    tr1.appendChild(td1);

    let td2 = document.createElement("td");
    td2.className = "d-flex justify-content-end stockItemTitle";
    td2.innerText = price;
    tr1.appendChild(td2);

    let tr2 = document.createElement("tr");
    stockTable.appendChild(tr2);

    let td3 = document.createElement("td");
    td3.className = "stockItemInfo";
    td3.innerText = quantity;
    tr2.appendChild(td3);

    let td4 = document.createElement("td");
    td4.className = "d-flex justify-content-end stockItemInfo";
    td4.innerText = profit;
    tr2.appendChild(td4);
}

function initialiseStockRows() {
    $.get(adress + 'investedPortfolio', function (data) {
        obj = JSON.parse(data);

        let i;
        let newChild = document.createElement("div");
        for (i = 0; i < obj.length; i++) {
            addStockRow(newChild, "Loading...", "", "", "")
        }

        if (stockRows.firstChild) {
            oldChild = stockRows.firstChild
            stockRows.replaceChild(newChild, oldChild)
        } else {
            stockRows.appendChild(newChild)
        }
    });
}
initialiseStockRows()

function getPortfolioValue() {
    $.get(adress + 'currentPortfolio', function (data) {
        obj = JSON.parse(data);

        let i;
        let currentValue = 0;
        let profit = 0

        data = []
        labels = []
        backgroundColor = []

        let newChild = document.createElement("div");
        for (i = 0; i < obj.length; i++) {
            currentValue += obj[i]["Current Investment Value"];
            profit += obj[i]["Profit"];

            addStockRow(newChild, obj[i]["Stock"], "€" + parseFloat(obj[i]["Current Investment Value"]).toFixed(2), obj[i]["Quantity"], "€" + parseFloat(obj[i]["Profit"]).toFixed(2))

            data.push(parseFloat(obj[i]["Current Investment Value"]))
            labels.push(String(obj[i]["Stock"]))
            backgroundColor.push(colors[i % 8])
        }

        if (stockRows.firstChild) {
            oldChild = stockRows.firstChild
            stockRows.replaceChild(newChild, oldChild)
        } else {
            stockRows.appendChild(newChild)
        }



        datasets = [{ backgroundColor: backgroundColor, data: data }]
        config = { datasets: datasets, labels: labels }

        chart.destroy()

        chart = new Chart(ctx, {
            type: 'doughnut',
            data: config,
            options: options
        })

        currentPortfolioValue.innerHTML = "€" + currentValue.toFixed(2);
        returnValue.innerHTML = "€" + profit.toFixed(2);
    });
}
getPortfolioValue()

function getInvestedPortfolioValue() {
    $.get(adress + 'investedPortfolio', function (data) {
        obj = JSON.parse(data);

        let i;
        let invested = 0;

        for (i = 0; i < obj.length; i++) {
            invested = invested + obj[i]["Invested"] - obj[i]["Withdrew"] + obj[i]["Total Fees"];
        }
        investedPortfolioValue.innerHTML = "€" + invested.toFixed(2);

    });
}
getInvestedPortfolioValue()

//once every 15 seconds
setInterval(getPortfolioValue, 15 * 1000)
//once per hour
setInterval(getInvestedPortfolioValue, 3600 * 1000)

