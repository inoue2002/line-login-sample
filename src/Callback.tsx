import axios from 'axios';
import qs from 'qs';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface CallbackProps {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

const Callback: React.FC<CallbackProps> = ({ clientId, clientSecret, redirectUri }) => {
  //   const history = useHistory();
  const location = useLocation();
  const [user, setUser] = React.useState<{ userId: string; displayName: string; pictureUrl: string } | null>(null);
  const [idToken, setIdToken] = React.useState<string>('');
  const [friendshipStatusChanged, setFriendshipStatusChanged] = React.useState<boolean>(false);

  const login = async (code: string, clientId: string, clientSecret: string, redirectUri: string) => {
    const getToken = async (code: string, clientId: string, clientSecret: string, redirectUri: string) => {
      const data = {
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      };

      const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      };

      const response = await axios.post('https://api.line.me/oauth2/v2.1/token', qs.stringify(data), config);

      console.log(response.data);
      console.log(response.data.access_token, 'response.data.access_token');
      setIdToken(response.data.id_token);
      //   history.push('/');
      return response.data.access_token;
    };

    const getProfile = async (accessToken: string) => {
      console.log(accessToken, 'accessToken');
      const response = await axios.get('https://api.line.me/v2/profile', {
        headers: { authorization: `Bearer ${accessToken}` },
      });

      console.log(response.data);

      const { userId, displayName, pictureUrl } = response.data as {
        userId: string;
        displayName: string;
        pictureUrl: string;
      };
      console.log(userId, displayName, pictureUrl);
      setUser({ userId, displayName, pictureUrl });
    };

    const accessToken = await getToken(code, clientId, clientSecret, redirectUri);
    await getProfile(accessToken);
    console.log(idToken, 'idToken');
  };

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    if (!code) {
      return;
    }

    const friendship_status_changed = new URLSearchParams(location.search).get('friendship_status_changed');
    setFriendshipStatusChanged(friendship_status_changed === 'true');

    login(code, clientId, clientSecret, redirectUri);
  }, []);

  // ログインが完了するまでは「ログイン中」を表示、ログイン後はユーザー情報を表示
  return (
    <div>
      {window.location.href}
      {user ? (
        <div>
          {user.displayName} <div>友達追加状況：{friendshipStatusChanged}</div>
        </div>
      ) : (
        <div>ログイン中</div>
      )}
    </div>
  );
};

export default Callback;
