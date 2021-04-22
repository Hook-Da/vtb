import { observable } from 'mobx'
import {  FinalCurrencyObj } from './../Model/Currency'

class AppStore {
    @observable currencyItems:  Array<FinalCurrencyObj> = []
    @observable title: String = "Hello World!!!"
    @observable errorOccured: Boolean = false
}
const store = new AppStore()
export { store }