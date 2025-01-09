const apiKey = '88f2353ed7457d71e16031d5';

document.getElementById('convert').addEventListener('click', function () {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;
    
    if (amount && fromCurrency && toCurrency) {
        convertCurrency(amount, fromCurrency, toCurrency);
    }
});

async function fetchCurrencies() {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/codes`);
    const data = await response.json();

    const currencies = data.supported_codes;
    
    const fromSelect = document.getElementById('from-currency');
    const toSelect = document.getElementById('to-currency');
    
    // Populate the "from" and "to" currency dropdowns
    currencies.forEach(currency => {
        const optionFrom = document.createElement('option');
        optionFrom.value = currency[0];
        optionFrom.textContent = currency[0];
        fromSelect.appendChild(optionFrom);
        
        const optionTo = document.createElement('option');
        optionTo.value = currency[0];
        optionTo.textContent = currency[0];
        toSelect.appendChild(optionTo);
    });
}

async function convertCurrency(amount, fromCurrency, toCurrency) {
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${fromCurrency}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.result === "success") {
        const exchangeRate = data.conversion_rates[toCurrency];
        const convertedAmount = (amount * exchangeRate).toFixed(2);
        document.getElementById('result').textContent = `Result: ${convertedAmount} ${toCurrency}`;
    } else {
        document.getElementById('result').textContent = 'Error in conversion... try again.';
    }
}

// Call fetchCurrencies to populate dropdowns when the page loads
fetchCurrencies();
