async function updateLog(_walletAddress, _Page)
{

    const walletAddress = _walletAddress;
    const currentPage = _Page;
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

