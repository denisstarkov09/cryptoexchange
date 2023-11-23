import React from 'react';
import InProgress from '../../components/templates/InProgressLayout';
import { useNeedAuthorization } from '../../common/hooks/useNeedAuthorizePopup';

const DeFi: React.FC = () => {
  const {needAuthorizationComponent, shouldShowNeedAuthorizationComponent} = useNeedAuthorization();

  if(shouldShowNeedAuthorizationComponent){
    return needAuthorizationComponent;
  }

  return (
    <InProgress />
  )
}

export default DeFi