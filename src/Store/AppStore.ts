import { observable } from 'mobx'
import { CurrencyItem } from './../Model/Currency'

class AppStore {
    @observable currencyItems: Array<CurrencyItem> = []
    @observable title: String = "Hello World!!!"
}
const store = new AppStore()
export { store }