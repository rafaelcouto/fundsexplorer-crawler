import { FundExplorerCrawler } from "./FundExplorerCrawler";
import { AbstractCrawler } from "./AbstractCrawler";

export class CrawlerFactory {

    create(name: string): AbstractCrawler {
        
        switch(name) {
            case "fundsexplorer":
                return new FundExplorerCrawler()
        }

        throw new Error("Crawler not implemented");

    }

}