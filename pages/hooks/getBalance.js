import Web3 from "web3";

export const getBalance = async (setWebProvider,setError,setBalance) => {
 
  if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await ethereum.request({ method: "eth_requestAccounts" })
        let web3 = new Web3(ethereum)
        setWebProvider(web3)
        const balance = await web3?.eth?.getBalance(accounts[0])
        setBalance(balance);
      } catch (err) {
        console.log(err)
      }
    } else {
      setError("Please install MetaMask")
    }
  };

