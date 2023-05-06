import React from 'react';

interface LineLoginProps {
  clientId: string;
  redirectUri: string;
}

const LineLogin: React.FC<LineLoginProps> = ({ clientId, redirectUri }) => {
  const state = Math.random().toString(36).substring(7);
  console.log(redirectUri, encodeURIComponent(redirectUri));
  const loginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=profile+openid&state=${state}&bot_prompt=aggressive&initial_amr_display=lineqr&disable_auto_login=true`;
  return <a href={loginUrl}>LINEでログイン</a>;
};

export default LineLogin;
