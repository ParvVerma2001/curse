async function addTokenToMetamask() {
        const tokenAddress = "0x1ad0b9a38c636b7cb7702b95490c55b03ac41c10";
        const tokenSymbol = 'CURSE';
        const tokenDecimals = 18;
	
      try {
        // Check if MetaMask is installed
        if (window.ethereum) {
          await window.ethereum.enable();
          await window.ethereum.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address: tokenAddress,
                symbol: tokenSymbol,
                decimals: tokenDecimals,
              },
            },
          });

          alert('CURSE Token added to MetaMask!');
        } else {
          alert('MetaMask not found. Please install MetaMask to use this feature.');
        }
      } catch (error) {
        console.error('Error adding CURSE Token to MetaMask:', error);
        alert('Error adding CURSE Token to MetaMask. Please try again.');
      }
    }
