import React, {useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import Loader from '../components/LoaderComponent'
import {useAuth0} from '@auth0/auth0-react'
import {DefaultLayout} from '../components/theme-customizer';

const Callback = (props) => {
  
  const {user} = useAuth0()
  const id = window.location.pathname.split('/').pop()
  const defaultLayout= Object.keys(DefaultLayout);
  const layout= id ? id : defaultLayout
  useEffect(() => {
    if(user){
      localStorage.setItem("auth0_profile",JSON.stringify(user))
      localStorage.setItem("authenticated",true)
      window.location.href = `/dashboard/default/${layout}`;
    }
  })

  return (
    <div>
        <Loader/>
    </div>
  );

}

export default withRouter(Callback);