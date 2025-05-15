export async function convertUsdtToNgn(usdtAmount: number): Promise<number> {
  try {
    // Fetch USDT to USD rate from CoinGecko
    const coingeckoResponse = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=tether&vs_currencies=usd'
    );
    
    if (!coingeckoResponse.ok) {
      throw new Error(`CoinGecko API error: ${coingeckoResponse.status} ${coingeckoResponse.statusText}`);
    }

    const coingeckoData = await coingeckoResponse.json();
    const usdtToUsdRate = coingeckoData?.tether?.usd;

    if (typeof usdtToUsdRate !== 'number') {
      throw new Error('Invalid USDT rate data from CoinGecko');
    }

    // Fetch USD to NGN rate from exchangerate.host
    const exchangeResponse = await fetch(
      'https://api.exchangerate.host/latest?base=USD&symbols=NGN'
    );

    if (!exchangeResponse.ok) {
      throw new Error(`Exchange rate API error: ${exchangeResponse.status} ${exchangeResponse.statusText}`);
    }

    const exchangeData = await exchangeResponse.json();
    const usdToNgnRate = exchangeData?.rates?.NGN;

    if (typeof usdToNgnRate !== 'number') {
      throw new Error('Invalid NGN rate data from exchange rate API');
    }

    // Calculate final amount
    const usdAmount = usdtAmount * usdtToUsdRate;
    const ngnAmount = usdAmount * usdToNgnRate;

    return ngnAmount;
  } catch (error) {
    console.error('Error in convertUsdtToNgn:', error);
    throw error;
  }
} 