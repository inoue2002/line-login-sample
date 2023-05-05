import axios from 'axios';
import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

interface CallbackProps {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

const Callback: React.FC<CallbackProps> = ({ clientId, clientSecret, redirectUri }) => {
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    if (!code) {
      return;
    }

    const getToken = async () => {
      const response = await axios.post('https://api.line.me/oauth2/v2.1/token', null, {
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        params: {
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri,
          client_id: clientId,
          client_secret: clientSecret,
        },
      });

      console.log(response.data);
      history.push('/');
    };

    getToken();
  }, [history, location.search, clientId, clientSecret, redirectUri]);

  return <div>ログイン処理中...</div>;
};

export default Callback;
