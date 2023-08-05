import { Profile } from '@liff/get-profile';
import liff from '@line/liff';
import { LiffMockPlugin } from '@line/liff-mock';
import axios from 'axios';
import React, { useEffect } from 'react';
// interface LineLoginProps {
//   clientId: string;
//   redirectUri: string;
// }

// LIFFの初期化

// ログインが完了するまでは「ログイン中」を表示、ログイン後はユーザー情報を表示

// ユーザー情報の表示

const LineLogin: React.FC = () => {
  const [userProfile, setUserProgfile] = React.useState<Profile | null>(null);
  liff.use(new LiffMockPlugin());

  const apiUrl = process.env.REACT_APP_API_URL;
  const addFriendUrl = process.env.REACT_APP_LINE_FRIEND_URL;

  if (!apiUrl || !addFriendUrl) {
    console.error('環境変数が設定されていません');
  }

  // liffId: import.meta.env.VITE_LIFF_ID

  useEffect(() => {
    const isMock = process.env.NODE_ENV === 'development' ? true : false;
    liff
      .init({
        liffId: '1661050349-93ygRPP8',
        // @ts-ignore
        mock: isMock,
      })
      .then(async () => {
        if (!liff.isLoggedIn()) {
          liff.login();
        }
        const idToken = liff.getIDToken();
        // setMessage('LIFF init succeeded.');
        const profile = await liff.getProfile();
        console.log({ profile });
        setUserProgfile(profile);

        axios.post(apiUrl + '/line-inflow', {
          idToken,
          params: window.location.search,
        });

        if (addFriendUrl) {
          liff.openWindow({
            url: addFriendUrl,
            external: true,
          });
        }
      })
      .catch((e: Error) => {
        console.log(e);
        // setMessage('LIFF init failed.');
        // setError(`${e}`);
        // 友達追加URLに遷移
        if (addFriendUrl) {
          liff.openWindow({
            url: addFriendUrl,
            external: true,
          });
        }
      });
  }, [addFriendUrl, apiUrl]);

  return (
    <div>
      ログイン {userProfile ? userProfile.displayName : null}
    </div>
  );
};

export default LineLogin;
