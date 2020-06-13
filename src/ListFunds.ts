import { Fund } from "./models/Fund";
import { AbstractCrawler } from "./crawlers/AbstractCrawler";

export class ListFunds {

    private funds: Fund[];
    private args: any;
    private crawler: AbstractCrawler;

    constructor(funds: Fund[], args: any) {
        this.funds = [...funds];
        this.args = args;
    }

    setCrawler(crawler: AbstractCrawler) {
        this.crawler = crawler;
    }

    private applyFilters(): void {
        if (!(typeof this.args.portfolio === 'undefined')) {
            this.funds = this.funds.filter((fund) => Boolean(fund.portfolio) === Boolean(this.args.portfolio));
        }
    }

    private applySort(): void {

        const sortBy: string = this.args.sort;
        const direction: string = this.args.direction || 'asc';

        const property = (this.funds[0] as any)[sortBy];
        if (!property) {
            return;
        }

        if (typeof property === 'string') {
            this.funds.sort((a: any, b: any) => {
                return (direction === 'asc') ? a[sortBy].localeCompare(b[sortBy]) : b[sortBy].localeCompare(a[sortBy]);
            })
        }

        if (typeof property === 'number') {
            this.funds.sort((a: any, b: any) => {
                return (direction === 'asc') ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy];
            })
        }

    }
    
    async list(): Promise<Fund[]> {

        if (!this.crawler) {
            throw new Error("Crawler not defined");
        }

        this.applyFilters();

        this.funds = await this.crawler.read(this.funds);

        this.applySort();

        return this.funds;
    }

}