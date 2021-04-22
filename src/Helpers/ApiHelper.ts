import axios from 'axios'
import { CurrencyItem, Currency } from './../Model/Currency'

export interface ApiHelperInterface<T> {
    apiGet(endpoint: String, completion: (items: {[key: string] :T}) => {}, onError: (error: any) => {}) : void
}

class CurrencyApiHelper implements ApiHelperInterface<Currency> {
    private mainUrl = "https://poloniex.com/public?"
    private headers = {
        'Content-type': 'Application/json',
        Accept: 'Application/json'
    };

    apiGet(endpoint: String, completion: (items: { [key: string] : Currency }) => {}, onError: (error: any) => void) : void {
        console.log('%c++[   here     ]','background: brown', );

        let url = `${this.mainUrl}${endpoint}`
        axios.get(url, {
            headers: this.headers,
            timeout: 3000
        }).then((result: any) => {
            completion(result.data)
        }).catch((error) => {
            onError(error)
        })
    }
}


export { CurrencyApiHelper }