import Web3 from "web3";
import Web3Modal from "web3modal";
// import WalletConnectProvider from "@walletconnect/web3-provider";
import {useState} from "react";

export default function wallet() {
    const [loading, setLoading] = useState(false);
    return {
        web3Loading(){
            return loading;
        },
        async getWeb3(){
            setLoading(true);
            let web3Modal;
            let provider;
            let web3;
            let providerOptions;
            providerOptions = {
                metamask: {
                    id: "injected",
                    name: "MetaMask",
                    type: "injected",
                    check: "isMetaMask"
                }
            };
            web3Modal = new Web3Modal({
                network: "rinkeby",
                providerOptions,
                cacheProvider: false
            });
            provider = await web3Modal.connect();

            // Subscribe to accounts change
            provider.on("accountsChanged", (accounts) => {
                console.log(accounts);
            });
            
            // Subscribe to chainId change
            provider.on("chainChanged", (chainId) => {
                console.log(chainId);
            });
            
            // Subscribe to provider connection
            provider.on("connect", (info) => {
                console.log(info);
            });
            
            // Subscribe to provider disconnection
            provider.on("disconnect", (error) => {
                console.log(error);
            });
            web3 = new Web3(provider);
            setLoading(false);
            return web3;
        }
    }
}