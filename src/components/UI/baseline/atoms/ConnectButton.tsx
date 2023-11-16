import React, { useEffect, useState } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Button, Typography, Tooltip } from '@material-ui/core';
import TooltipBasicLayout from '../../../templates/TooltipBasicLayout';
import Web3Modal from 'web3modal';
import Web3 from 'web3';
import { useAppDispatch } from '../../../../app/hooks';
import { setAccount as setAccountAction} from '../../../../features/authSlice';

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
  const [web3Modal, setWeb3Modal] = useState(new Web3Modal({
    network: "mainnet", // Optional. Change to desired network
    cacheProvider: true, // This enables caching of the provider
    providerOptions: {} // Define wallet providers
  }));
  const [account, setAccount] = useState<string>("");
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const loadAccount = async () => {
      if (web3Modal.cachedProvider) {
        try {
          const provider = await web3Modal.connect();
          const web3 = new Web3(provider);
          const accounts = await web3.eth.getAccounts();
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            dispatch(setAccountAction(accounts[0]))
          }else{
            dispatch(setAccountAction(""))
          }
        } catch (error) {
          console.error("Could not connect to wallet:", error);
        }
      }
    };

    loadAccount();
  }, [web3Modal]);
  
  

  const connectWallet = async () => {
    try {
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

  // Function to truncate the address
  const truncateAddress = (address: string) => {
    return `${address.substring(0, 5)}...${address.substring(address.length - 4)}`;
  };

  // Function to copy address to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Address copied to clipboard!");
  };

  return (
    <TooltipBasicLayout title= {account ? "Click to copy address" : "Connect"}>
      <Button
        className={classes.connectButton}
        onClick={connectWallet}
        color="secondary"
      >
        {account ? (
          <Typography
            style={{ cursor: 'pointer' }}
            onClick={() => copyToClipboard(account)}
          >
            {truncateAddress(account)}
          </Typography>
        ) : "Connect"}
      </Button>

    </TooltipBasicLayout>
  )
}

export default ConnectButton;
