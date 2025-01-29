import React, { useLayoutEffect } from 'react';
import axios from 'axios';
import qs from 'qs';
import WelcomePage from '@/Features/WelcomePage';
import { useUserContext } from '@/Context/ContextApi/UserContext';

const getAndRegisterEsriToken = async () => {
  return await createNewToken();
};

const createNewToken = async () => {
  const data = {
    username: import.meta.env.VITE_PORTAL_USERNAME,
    password: import.meta.env.VITE_PORTAL_PASSWORD,
    client: 'referer',
    referer: window.location.origin,
    expiration: 720,
    f: 'json',
  };

  try {
    const res = await axios({
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      },
      data: qs.stringify(data),
      url: `${import.meta.env.VITE_ESRI_TOKEN}`,
    });

    const rInfo = {
      expires: res.data.expires,
      token: res.data.token,
      userId: data.username,
    };
    return rInfo;
  } catch (error) {
    console.error('An error occurred while creating a new token:', error);
    return null;
  }
};


const EsriTokenComponent: React.FC = () => {
  const { esriToken, setEsriToken } = useUserContext();

  useLayoutEffect(() => {
    const fetchToken = async () => {
      try {
        const tokenInfo = await getAndRegisterEsriToken();
        if (tokenInfo) {
          setEsriToken(tokenInfo.token);
        }
      } catch (error) {
        console.error('An error occurred while fetching the token:', error);
      }
    };

    fetchToken();
  }, []);

  return <div>{!esriToken && <WelcomePage />}</div>;
};

export default EsriTokenComponent;
