interface Currency {
    id: number;
    last: String;
    lowestAsk: String;
    highestBid: String;
    percentChange: String;
    baseVolume: String;
    quoteVolume: String;
    isFrozen: String;
    postOnly: String;
    high24hr: String;
    low24hr: String;
}

export interface CurrencyItem {
    [key: String]: Currency;
}
