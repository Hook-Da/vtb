import { CurrencyItem } from './../Model/Currency'
import { ApiHelperInterface } from './../Helpers/ApiHelper';
import { store } from './../Store/AppStore';

export interface CurrencyProviderInterface {
    getCurrencyItems() : void
    setApiProperty(api: ApiHelperInterface<any>): void
    onSuccess(items: [CurrencyItem]): void
    onError(error: any): void
}

class CurrencyProvider implements CurrencyProviderInterface {
    private static _shared: CurrencyProvider = new CurrencyProvider()

    private api?: ApiHelperInterface<CurrencyItem>

    private constructor() {}

    public static getInstance(): CurrencyProvider {
        console.log('%c++[   here     ]','background: blue', );
        return CurrencyProvider._shared
    }
    
    public setApiProperty(api: ApiHelperInterface<CurrencyItem>) {
        this.api = api
        return this
    }

    getCurrencyItems(){
        let endpoint = "command=returnTicker"
        this.api?.apiGet(endpoint, this.onSuccess, this.onError)
    }


    onSuccess(items: [CurrencyItem]) {
        console.log('%c++[   here items     ]','background: lime', items);
    }

    onError(error: any) {
        console.log('%c++[   here error     ]','background: red', error);
    }

}

export { CurrencyProvider }