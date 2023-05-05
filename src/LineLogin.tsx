import React from 'react';

interface LineLoginProps {
  clientId: string;
  redirectUri: string;
}

const LineLogin: React.FC<LineLoginProps> = ({ clientId, redirectUri }) => {
  const loginUrl = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${clientId}&redirect_uri=https%3A%2F%2Fgoogle.com&scope=profile+openid`;
  //   const loginUrl =
  //     'https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1234567890&redirect_uri=https%3A%2F%2Fexample.com%2Fauth%3Fkey%3Dvalue&state=12345abcde&scope=profile%20openid&nonce=09876xyz';
  console.log(loginUrl);
  //https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=1661050349&redirect_uri=https%253A%252F%252Fgoogle.com&scope=profile+openid
  return <a href={loginUrl}>LINEでログイン</a>;
};

export default LineLogin;
