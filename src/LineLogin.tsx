import React from 'react';

interface LineLoginProps {
  clientId: string;
  redirectUri: string;
}

const LineLogin: React.FC<LineLoginProps> = ({ clientId, redirectUri }) => {
  const loginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&scope=profile+openid`;
  return <a href={loginUrl}>LINEでログイン</a>;
};

export default LineLogin;
