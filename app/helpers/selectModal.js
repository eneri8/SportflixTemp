import React from 'react';
import Avatar from 'components/Landing/Avatar/AvatarContainer';
import Card from 'components/Payment/Card';
import Create from 'components/Perfil/CreateContainer';
import SignUp from 'components/Landing/SignUp';
import Recover from 'components/Landing/Recover';
import SignIn from 'components/Landing/SignIn/SignInContainer';
import Plans from 'components/Plans';

export function selectModal({ api, closeModal, switchModal, currentModal, subscription_plans = [], location } = {}) {
  const modal = {
    signup: <SignUp api={ api } closeModal={ closeModal } />,
    signin: <SignIn api={ api } closeModal={ closeModal } switchModal={ switchModal } />,
    recover: <Recover api={ api } closeModal={ closeModal } switchModal={ switchModal } />,
    avatar: <Avatar closeModal={ closeModal } switchModal={ switchModal } />,
    card: <Card api={ api } closeModal={ closeModal } switchModal={ switchModal } />,
    create: <Create api={ api } closeModal={ closeModal } switchModal={ switchModal }/>,
    payment: <Plans data={ subscription_plans } location={ location } payment={ true } switchModal={ switchModal } />,
  };

  return modal[currentModal];
}
