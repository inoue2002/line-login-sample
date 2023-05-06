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
  const [user, setUser] = React.useState<{ userId: string; displayName: string; pictureUrl: string } | null>(null);
  const [friendshipStatusChanged, setFriendshipStatusChanged] = React.useState<boolean>(false);

  const login = async (code: string, clientId: string, clientSecret: string, redirectUri: string) => {
    const getToken = async (code: string, clientId: string, clientSecret: string, redirectUri: string) => {
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
      //   history.push('/');
    };

    const getProfile = async () => {
      const response = await axios.get('https://api.line.me/v2/profile', {
        headers: { authorization: `Bearer ${code}` },
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

    await getToken(code, clientId, clientSecret, redirectUri);
    getProfile();
  };

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    if (!code) {
      return;
    }

    const friendship_status_changed = new URLSearchParams(location.search).get('friendship_status_changed');
    setFriendshipStatusChanged(friendship_status_changed === 'true');

    login(code, clientId, clientSecret, redirectUri);
  }, [history, location.search, clientId, clientSecret, redirectUri]);

  // ログインが完了するまでは「ログイン中」を表示、ログイン後はユーザー情報を表示
  return (
    <div>
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
