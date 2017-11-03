

const getLoginWithToken = (AUTOMATE_CORE_URL) => {
  const accountsUrl = `${AUTOMATE_CORE_URL}/accounts`;

  const loginWithToken = async token => {
    if (typeof(token) !== typeof('')){
      throw (new Error('token is undefined'));
    }

    const response = await fetch(`${accountsUrl}/login`, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({
        username: 'teset',  // need to use token instead
        password: 'password',
      }),
    });

    if (response.status === 200){
      return (await response.json()).token;
    }else{
      throw (new Error('invalid credentials'));
    }
  };
  return loginWithToken;
};

export default getLoginWithToken;