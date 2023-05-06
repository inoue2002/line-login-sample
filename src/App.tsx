import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';

import Callback from './Callback';
import LineLogin from './LineLogin';

const clientId = process.env.REACT_APP_LINE_CLIENT_ID as string
const clientSecret = process.env.REACT_APP_LINE_CLIENT_SECRET as string
const redirectUri = process.env.REACT_APP_REDIRECT_URI as string
console.log(clientId, clientSecret, redirectUri)
if (!clientId || !clientSecret || !redirectUri) {
  throw new Error('環境変数が設定されていません');
}
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LineLogin clientId={clientId} redirectUri={redirectUri} />
        </Route>
        <Route exact path="/callback">
          <Callback clientId={clientId} clientSecret={clientSecret} redirectUri={redirectUri} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
