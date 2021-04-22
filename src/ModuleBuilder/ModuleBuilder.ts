import { CurrencyApiHelper } from "./../Helpers/ApiHelper";
import { CurrencyProvider } from "./../Provider/CurrencyProvider";

interface ModuleBuilderInterface {
    buildCurrencyProvider(): void
}

class ModuleBuilder implements ModuleBuilderInterface {
    buildCurrencyProvider() {
        let currencyApi = new CurrencyApiHelper()
        CurrencyProvider.getInstance().setApiProperty(currencyApi)
    }
}

export { ModuleBuilder }