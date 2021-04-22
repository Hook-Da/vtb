import axios from 'axios'
import { CurrencyItem } from './../Model/Currency'

export interface ApiHelperInterface<T> {
    apiGet(endpoint: String, completion: (items: [T]) => {}, onError: (error: any) => {}) : void
}

class CurrencyApiHelper implements ApiHelperInterface<CurrencyItem> {
    private mainUrl = "https://poloniex.com/public?"
    private headers = {
        'Content-type': 'Application/json',
        Accept: 'Application/json'
    };

    apiGet(endpoint: String, completion: (items: [CurrencyItem]) => {}, onError: (error: any) => void) : void {
        let url = `${this.mainUrl}${endpoint}`
        axios.get(url, {
            headers: this.headers,
            timeout: 3000
        }).then((result: any) => {
            console.log('%c++[    here result    ]','background: lime', result);
            completion(result.data)
        }).catch((error) => {
            onError(error)
        }).finally(() => {
            console.log('%c++[        ]','background: black', );
        })
        console.log('%c++[        ]','background: black', );
        fetch(url)
            .then(response => response.json())
            .then(data => console.log('%c++[   here     ]','background: pink', data))
            .catch((error) => console.log('%c++[    red     ]','background: ',error ))
    }
}


export { CurrencyApiHelper }