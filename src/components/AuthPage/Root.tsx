import { useState } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';

const Root = () => {
  const [signInPage, setSignInPage] = useState(true);

  if (signInPage) {
    return <SignIn setSignInPage={setSignInPage} />;
  } else {
    return <SignUp setSignInPage={setSignInPage} />;
  }
};
export default Root;
