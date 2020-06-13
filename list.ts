import { Fund } from "./src/models/Fund";
import { ListFunds } from './src/ListFunds';
import { CrawlerFactory } from "./src/crawlers/CrawlerFactory";
import { NumberUtil } from "./src/util/NumberUtil";

const args: any = require('minimist')(process.argv.slice(2));

const funds: Fund[] = require('./funds.json');

const crawlerFactory = new CrawlerFactory();
const crawler = crawlerFactory.create("fundsexplorer");

const listFunds = new ListFunds(funds, args)
listFunds.setCrawler(crawler);

listFunds.list().then((funds) => {

    const formattedFunds: any[] = [];

    funds.forEach((fund) => {

        formattedFunds.push({
            name: fund.name,
            liquidity: NumberUtil.toString(fund.liquidity),
            dividendYield: NumberUtil.toPercent(fund.dividendYield),
            equityValue: NumberUtil.toCurrency(fund.equityValue),
            sharePrice:NumberUtil.toCurrency(fund.sharePrice),
            pvp: NumberUtil.toString(fund.pvp),
            segment: fund.segment
        });

    });
    
    console.table(formattedFunds);

})