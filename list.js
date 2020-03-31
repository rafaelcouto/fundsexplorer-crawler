var Crawler = require("crawler");

const fs = require('fs');

let founds = require('./funds.json');

let promise = new Promise((resolve, reject) => {

    var c = new Crawler({
        maxConnections: 10,
    });

    founds.forEach((found) => {

        c.queue([{
            uri: 'https://www.fundsexplorer.com.br/funds/' + found.name,
            callback: function(error, res, done) {
                if (error) {
                    console.log(error);
                } else {
                    var $ = res.$;

                    found.liq = $("#main-indicators .carousel-cell:nth-child(1) .indicator-value").text().trim();
                    found.dy = $("#main-indicators .carousel-cell:nth-child(3) .indicator-value").text().trim();
                    found.vlpatr = $("#main-indicators .carousel-cell:nth-child(5) .indicator-value").text().trim();
                    found.vlcota = $("#stock-price span.price").text().trim();
                    found.pvp = $("#main-indicators .carousel-cell:nth-child(7) .indicator-value").text().trim();
                    found.segmento = $("#basic-infos div.section-body div.row div:nth-child(2) li:nth-child(4) span.description").text().trim();

                }
                done();
            }
        }]);

    });

    c.on('drain', function() {
        resolve();
    });

});

promise.then(() => {
    console.table(founds.sort((a, b) => b.pvp.localeCompare(a.pvp)));
});