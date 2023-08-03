import liff from '@line/liff';
import { Profile } from "@liff/get-profile";
import { LiffMockPlugin } from '@line/liff-mock';
import React, { useEffect, useState } from 'react';

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

  // liffId: import.meta.env.VITE_LIFF_ID

  useEffect(() => {
    console.log('ログインします');
    // if (!liff.isInClient()) liff.login();
    liff
      .init({
        liffId: '1661050349-93ygRPP8',
        // @ts-ignore
        mock: false // enable mock mode
      })
      .then(async () => {
        if (!liff.isLoggedIn()) {
          liff.login();
        }
        console.log('成功');
        // setMessage('LIFF init succeeded.');
        const profile = await liff.getProfile();
        console.log({ profile });
        setUserProgfile(profile);
      })
      .catch((e: Error) => {
        console.log(e);
        // setMessage('LIFF init failed.');
        // setError(`${e}`);
      });
  }, []);

  // const state = Math.random().toString(36).substring(7);
  // console.log(redirectUri, encodeURIComponent(redirectUri));
  // const loginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
  //   redirectUri
  // )}&scope=profile+openid&state=${state}&bot_prompt=aggressive&initial_amr_display=lineqr&disable_auto_login=true`;
  return <div>ログイン {userProfile ? userProfile.displayName : null}</div>;
};

export default LineLogin;
