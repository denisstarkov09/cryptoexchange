import React from 'react';
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import CoinListCard from '../../components/UI/coins/organisms/CoinListCard';
import { useNeedAuthorization } from '../../common/hooks/useNeedAuthorizePopup';

const useStyles = makeStyles((theme: Theme) => ({
  wrapper: {
    height: '100%',
    '& > .MuiGrid-item': {
      height: '100%'
    }
  }
}));

const Coins: React.FC = () => {
  const classes = useStyles();

  const {needAuthorizationComponent: needAuthorizationDialog, shouldShowNeedAuthorizationComponent: isNeedAuthorizationDialogOpened} = useNeedAuthorization();

  if(isNeedAuthorizationDialogOpened){
    return needAuthorizationDialog;
  }

  return (
    <Grid
      container
      className={classes.wrapper}
      spacing={3}
      direction="row"
      justify="center"
      alignItems="stretch"
    >
      <Grid item xs={12}>
        <CoinListCard />
      </Grid>
    </Grid>
  )
}

export default Coins