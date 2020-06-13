import { NumberFormat } from "intl";

export class NumberUtil {
    
    static toNumber(value: string): number | null {
        
        if (!value) {
            return null;
        }

        value = value.replace('.', '').replace(',', '.');

        return Number(value.replace(/[^\d.]/g, ''));
    }

    static toCurrency(number: number) : string {
        return "R$ " + NumberUtil.toString(number);
    }

    static toPercent(number: number) : string {
        return NumberUtil.toString(number) + "%";
    }

    static toString(number: number, digits = 2) : string {
        let formatter = NumberFormat('pt-BR', {minimumFractionDigits: digits});
        return formatter.format(number);
    }

}