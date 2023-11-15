import React, { useEffect, useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import TooltipBasicLayout from '../../../templates/TooltipBasicLayout';
import Web3Modal from 'web3modal';
import Web3 from 'web3';

const useStyles = makeStyles((theme: Theme) => ({
  connectButton: {
    padding: theme.spacing(1),
    marginLeft: theme.spacing(2),
    backgroundColor: theme.palette.card.paper,
    borderRadius: 12,
    '&:hover': {
      backgroundColor: `${theme.palette.secondary.main}80`,
      color: theme.palette.text.primary
    }
  }
}));



const ConnectButton: React.FC = () => {
  const classes = useStyles();

  // code
const [web3Modal, setWeb3Modal] = useState({});
const [account, setAccount] = useState<string>("");

  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal({
        network: "mainnet", // Optional. Change to desired network
        cacheProvider: true, // Optional. Use to cache provider
        providerOptions: {} // Define wallet providers
      });

      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);

      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error("Could not connect to wallet:", error);
    }
  };

  return (
    <TooltipBasicLayout title="Connect">
      <Button
        className={classes.connectButton}
        onClick={connectWallet}
        color="secondary"
      >
        {account ? <p>Connected account: {account}</p> : "Connect"}
      </Button>
      
    </TooltipBasicLayout>
  )
}

export default ConnectButton;
