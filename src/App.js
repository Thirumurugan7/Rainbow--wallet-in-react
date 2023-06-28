import "./App.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";

import { useState, useEffect } from "react";

import Counter from "./counter.json";
function App() {
  const [count, setCount] = useState(0);
  const [provider, setProvider] = useState(null);
  const [contract, setContract] = useState(null);

  async function initialize() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      setProvider(provider);

      const CONTRACT_ADDRESS = "0x4CE4DACdae188ab957c9f572040d10949654110E";

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        Counter,
        provider.getSigner()
      );
      setContract(contract);
    }

    console.log(contract);
  }

  async function update() {
    const updatedCount = await contract?.getCount();
    setCount(updatedCount?.toNumber());
  }

  useEffect(() => {
    initialize();
    update();
  }, []);

  const handleIncrement = async () => {
    console.log("increment initiated");
    await contract?.increaseCount();
    const updatedCount = await contract?.getCount();
    console.log(updatedCount);
    setCount(updatedCount?.toNumber());
    update();
  };

  const handleDecrement = async () => {
    console.log("deceree");
    await contract?.decreaseCount();
    const updatedCount = await contract?.getCount();
    console.log(updatedCount);
    setCount(updatedCount?.toNumber());
    update();
  };

  return (
    <>
      <div className="App">
        <ConnectButton />
        <br />
      </div>

      <div className="py-32 text-center">
        <h1 className="text-3xl font-bold"> Counter App</h1>
        <p className="py-3">Count: {count}</p>
        <button
          className="text-white mr-2 bg-blue-600 rounded-lg
 px-4 py-3"
          onClick={handleIncrement}
        >
          Increment
        </button>
        <button
          className="text-white bg-blue-600 rounded-lg
 px-4 py-3"
          onClick={handleDecrement}
        >
          Decrement
        </button>
      </div>
    </>
  );
}

export default App;
