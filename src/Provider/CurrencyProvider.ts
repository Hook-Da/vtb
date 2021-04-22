import { CurrencyItem, Currency } from './../Model/Currency'
import { ApiHelperInterface } from './../Helpers/ApiHelper';
import { store } from './../Store/AppStore';

export interface CurrencyProviderInterface {
    getCurrencyItems() : void
    setApiProperty(api: ApiHelperInterface<any>): void
    onSuccess(items: { [key: string] : Currency }): void
    onError(error: any): void
}

let INTERVAL_HANDLER = 0

class CurrencyProvider implements CurrencyProviderInterface {
    private static _shared: CurrencyProvider = new CurrencyProvider()

    private api?: ApiHelperInterface<CurrencyItem>

    private constructor() {}

    public static getInstance(): CurrencyProvider {
        return CurrencyProvider._shared
    }
    
    public setApiProperty(api: ApiHelperInterface<CurrencyItem>) {
        this.api = api
        return this
    }

    pageRemovedFromFocus = () => {
        clearInterval(INTERVAL_HANDLER)
    }

    getCurrencyItems = () => {
        if (INTERVAL_HANDLER) {
            clearInterval(INTERVAL_HANDLER)
        }
        let endpoint = "command=returnTicker"
        this.api?.apiGet(endpoint, this.onSuccess, this.onError)
        INTERVAL_HANDLER = setInterval(() => {
            console.log('%c++[   here  2   ]','background: lime', );
            this.api?.apiGet(endpoint, this.onSuccess, this.onError)
        }, 5000)
    }

    toggleError = (happened: Boolean) => {
        store.errorOccured = happened
    }

    onSuccess = (items: { [key: string] : Currency }) => {
        let keys = Object.keys(items)
        let currencyArray = keys.map((key) => {
            let changeDirection = +items[key].percentChange > 0
            let tempObj = { tickerName: key, changeDirection, ...items[key]}
            return tempObj
        })
        this.toggleError(false)
       store.currencyItems = currencyArray
    }

    onError = (error: any) => {
        this.toggleError(true)
        console.log('%c++[   here error     ]','background: red', error);
    }

}

export { CurrencyProvider }