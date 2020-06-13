import { Fund } from "../models/Fund";

const Crawler = require("crawler");

export abstract class AbstractCrawler {

    protected uri: string;

    constructor(uri: string) {
        this.uri = uri;
    }

    read(funds: Fund[]): Promise<Fund[]> {
        
        funds = [...funds];

        return new Promise((resolve, reject) => {

            var crawler = new Crawler({
                maxConnections: 10,
            });

            funds.forEach((fund) => {
        
                crawler.queue([{
                    uri: `${this.uri}/${fund.name}`,
                    callback: (error: any, res: any, done: any) => {

                        if (error) {
                            reject(error);
                            return;
                        }

                        this.fill(fund, res.$);
                        
                        done();
                    }
                }]);
        
            });
        
            crawler.on('drain', () => {
                resolve(funds);
            });
        
        });

    }

    protected abstract fill(fund: Fund, $: any): any;

}