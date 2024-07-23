async function getClientIp() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return null;
    }
}

async function getCountryCode(ip) {
    try {
        const response = await fetch(`https://ipwhois.app/json/${ip}?key=SUX3btwlpP5R3Gs8`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.country_code;
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        return 'UNKNOWN';
    }
}

async function main() {
    const clientIp = await getClientIp();
    if (clientIp === null) {
        console.error('Could not retrieve client IP address');
        return;
    }

    const countryCode = await getCountryCode(clientIp);

    //console.log('countryCode [' + countryCode + ']');

    if (['US'].includes(countryCode)) {
        if(window.location.href == 'https://www.qureskincare.com/pages/exclusive-holiday-bundle-deal')
        {
            window.location = 'https://www.qureskincare.com/pages/exclusive-holiday-bundle-deal-for-us';
        }
        else
        {
            window.location = 'https://www.qureskincare.com/collections/best-sellers';
        }
    }
}

main();