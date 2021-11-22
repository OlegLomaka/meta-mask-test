import {  useMemo, useEffect, useState } from 'react';
import Web3 from "web3";
import Container from '../components/container';

export default function Home() {
  const [webProvider, setWebProvider] = useState(null);
  const [error, setError] = useState('');
  const [balance, setBalance] = useState('');
  const [accountString, setAccountString] = useState('')

  useEffect(() => {  
    if (typeof window.ethereum !== 'undefined') {
      let web3 = new Web3(window.ethereum);
      setWebProvider(web3);
    }  
  }, []);
  
  const getBalance = async () => { 
    if (typeof window.ethereum === 'undefined') {
      setError("Please install MetaMask")
      return;      
    }

    try {
      const [account] = await ethereum.request({ method: "eth_requestAccounts" });
      setAccountString(account);
      
      const balance = await webProvider.eth.getBalance(account);
      setBalance(balance);      
    } catch (err) {
      console.error(err);
    }    
  };

  const clickHandler = () => {
    getBalance();
  };

  const errorElement = useMemo(() => {
    if (error) {
      return (
        <h2>{ error }</h2>
      );
    }

    return null;
  }, [error]);

  const balanceElement = useMemo(() => {
    if (balance && webProvider) {
      return (
        <h2>
          { webProvider.utils.fromWei(`${balance}`) } ETH
        </h2>
      );
    }

    return null;
  }, [webProvider, balance]);
  
  if (!balance) {
    return (
      <Container>
        <div className='flex flex-col items-center justify-center'>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded-full"
            onClick={clickHandler}>
            Connect to MetaMask
          </button>
          { errorElement }
        </div>
      </Container>
    )
  };

  return (
    <Container> 
      <div className="mb-4 shadow-md py-5 px-6 h-28 rounded w-108 bg-blue-100 text-center opacity-50 md:border-solid md:border-2 md:border-blue-800 flex flex-col items-center justify-center ">
        <img className="h-10 w-auto sm:h-10" src="/ethereum.svg" alt="Add your logo!" />
        <div>
          <span className="font-mono bg-white rounded text-sm">{ accountString }</span>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <strong>My Ethereum Wallet</strong>
        { balanceElement }
      </div>
    </Container>
  )
};
