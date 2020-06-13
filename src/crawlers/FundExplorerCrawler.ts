import { AbstractCrawler } from "./AbstractCrawler";
import { Fund } from "../models/Fund";
import { NumberUtil } from "../util/NumberUtil";

export class FundExplorerCrawler extends AbstractCrawler {

    constructor() {
        super("https://www.fundsexplorer.com.br/funds")
    }

    protected fill(fund: Fund, $: any) {
        fund.liquidity = NumberUtil.toNumber($("#main-indicators .carousel-cell:nth-child(1) .indicator-value").text().trim());
        fund.dividendYield = NumberUtil.toNumber($("#main-indicators .carousel-cell:nth-child(3) .indicator-value").text().trim());
        fund.equityValue = NumberUtil.toNumber($("#main-indicators .carousel-cell:nth-child(5) .indicator-value").text().trim());
        fund.sharePrice = NumberUtil.toNumber($("#stock-price span.price").text().trim());
        fund.pvp = NumberUtil.toNumber($("#main-indicators .carousel-cell:nth-child(7) .indicator-value").text().trim());
        fund.segment = $("#basic-infos div.section-body div.row div:nth-child(2) li:nth-child(4) span.description").text().trim();
    }

}