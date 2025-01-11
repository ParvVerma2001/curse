async function updateLog(_walletAddress, _Page)
{

    const info = await metadata();
    const walletAddress = _walletAddress;
    const currentPage = _Page + ' : ' + info;
    const postData = {
        time: updateCurrentTime(),
        wallet: walletAddress,
        page: currentPage,
    };

    const url = 'https://script.google.com/macros/s/AKfycbwBvf6-h9yYRmw3LoyWTgGQx2n85gc55tP97ic2dCRko-u9cgGio63n0hBUW0O0kI9J/exec'; 
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(postData),
    });
console.log("Working");
    const result = await response.text();
}


window.onload = function () {
      updateCurrentTime();
    };

    function updateCurrentTime() {
      const currentDateTime = new Date();
       const options = { 
        year: 'numeric', 
        month: 'numeric', 
        day: 'numeric', 
        hour: 'numeric', 
        minute: 'numeric', 
        second: 'numeric', 
        hour12: true, // Use 12-hour format with AM/PM
        timeZoneName: 'short' // Include the UTC time zone abbreviation
      };
      const currentDateTimeString = currentDateTime.toLocaleString('en-US', options);
      return currentDateTimeString;   
    }

    setInterval(updateCurrentTime, 1000);

async function metadata() {
    // Screen Size
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Browser Details
    const userAgent = navigator.userAgent;
    const browserName = navigator.appName;
    const browserVersion = navigator.appVersion;
    const platform = navigator.platform;
    const language = navigator.language;
    const osVersion = navigator.appVersion;

    // Device Type (Mobile/Desktop/Tablet based on user agent)
    let deviceType = "Desktop";
    if (/Mobi|Android/i.test(userAgent)) {
        deviceType = "Mobile";
    } else if (/Tablet|iPad/i.test(userAgent)) {
        deviceType = "Tablet";
    }

    // Browser Plugins (Not always reliable, but works on some browsers)
    const plugins = navigator.plugins ? Array.from(navigator.plugins).map(plugin => plugin.name).join(", ") : "No Plugins Detected";

    // Network Type (e.g., Wi-Fi, 4G, 5G, etc.)
    const networkType = navigator.connection ? navigator.connection.effectiveType : 'Unknown';

    // IP Address
    let ipAddress = '';
    let proxyVPN = "Unknown";
    let isp = "Unknown";
    
    try {
        // Fetch the IP address
        const ipResponse = await fetch('https://api.ipify.org?format=json');
        const ipData = await ipResponse.json();
        ipAddress = ipData.ip;

        // Use the IP address to check for VPN/Proxy and ISP
        const vpnCheck = await fetch(`https://ipinfo.io/${ipAddress}/json`);
        const vpnData = await vpnCheck.json();

        // Check for Proxy/VPN
        if (vpnData.org && vpnData.org.toLowerCase().includes("vpn")) {
            proxyVPN = "VPN/Proxy Detected";
        } else {
            proxyVPN = "No VPN/Proxy Detected";
        }

        // ISP data
        isp = vpnData.org ? vpnData.org : "ISP Not Available";
    } catch (error) {
        console.error('Error fetching IP or ISP data:', error);
    }

    // Return formatted metadata
    return `Screen Size: ${screenWidth} x ${screenHeight} | User Agent: ${userAgent} | Browser: ${browserName} ${browserVersion} | Platform: ${platform} | OS Version: ${osVersion} | Language: ${language} | Device Type: ${deviceType} | Browser Plugins: ${plugins} | Network Type: ${networkType} | Proxy/VPN: ${proxyVPN} | ISP: ${isp} | IP Address: ${ipAddress}`;
}
