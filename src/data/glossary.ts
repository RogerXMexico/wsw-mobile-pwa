export const GLOSSARY: Record<string, string> = {
    "Delta": "The amount an option price changes for a $1 move in the stock. Also a proxy for probability (0.50 Delta = ~50% chance ITM).",
    "Gamma": "The rate of change of Delta. High Gamma means your P&L swings wildly. Highest for ATM options near expiration.",
    "Theta": "Time decay. The amount of value the option loses every day as it approaches expiration.",
    "Vega": "Sensitivity to Implied Volatility. Long Vega means you profit if IV rises (fear increases).",
    "Rho": "Sensitivity to interest rates. Usually minor unless trading LEAPS.",
    "IV": "Implied Volatility. The market's forecast of a likely movement range. High IV = Expensive options.",
    "Strike": "The specific price at which the option holder can buy (Call) or sell (Put) the stock.",
    "Premium": "The market price of the option contract.",
    "Assignment": "When the option seller is forced to fulfill their obligation (sell/buy stock) because the buyer exercised.",
    "ITM": "In-The-Money. An option that has intrinsic value.",
    "OTM": "Out-Of-The-Money. An option with no intrinsic value, consisting only of time value.",
    "ATM": "At-The-Money. Strike price is equal to current stock price.",
    "LEAP": "Long-Term Equity Anticipation Security. Options expiring in >1 year.",
    "Debit": "You pay money to enter the trade.",
    "Credit": "You receive money to enter the trade."
};
