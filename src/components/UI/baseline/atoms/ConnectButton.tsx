import React, { useEffect } from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import TooltipBasicLayout from '../../../templates/TooltipBasicLayout';
import { useWeb3Modal } from '@web3modal/ethers5/react'

// import { Web3Auth } from "@web3auth/modal";
// import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";

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
  const { open } = useWeb3Modal()

  return (
    <TooltipBasicLayout title="Connect">
      <Button
        className={classes.connectButton}
        onClick={() => open({ view: 'Networks' })}
        color="secondary"
      >
        Connect
      </Button>
    </TooltipBasicLayout>
  )
}

export default ConnectButton;
