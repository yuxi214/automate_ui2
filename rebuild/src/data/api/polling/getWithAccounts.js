import fetch from 'isomorphic-fetch';
import assert from 'assert';

const getWithAccounts = ({ AUTOMATE_CORE_URL }, { refresh }) => {
  const ACCOUNTS_URL = `${AUTOMATE_CORE_URL}/accounts`;

  const getAllAccounts = async () => {
    const response = await fetch(ACCOUNTS_URL, {
      mode: 'cors',
      method: 'GET',
      headers: {
        Accept: 'application/json',
      }
    });
    const accounts= await response.json();
    return accounts;
  }

  const isAccountCreationAdminOnly = async () => {
    const response = await fetch(`${ACCOUNTS_URL}/isAccountCreationAdminOnly`, {
      method: 'GET',
      mode: 'cors',
    });
    const isAccountCreationAdminOnly = await response.json();
    return isAccountCreationAdminOnly;
  };

  const addAccount = async (email, password, alias) => {
    assert(typeof(email), typeof(''));
    assert(typeof(password), typeof(''));
    assert(typeof(alias), typeof(''));

    const response = await fetch(`${ACCOUNTS_URL}/createUser`, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({
        email,
        password,
        alias,
      }),
    });
    return response;
  };

  const loginWithPassword = async (email, password) => {
    console.log('login: ');
    console.log('email: ', email);
    console.log('password: ', password);
    
    assert(typeof(email), typeof(''));
    assert(typeof(password), typeof(''));

    const response = await fetch(`${ACCOUNTS_URL}/login`, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({
        email,
        password,
      }),
    });

    if (response.status === 200) {
      return (await response.json()).token;
    }
    throw (new Error('invalid credentials'));
  };

  // @todo unused
  const requestResetPassword = async (email) => {
    assert(typeof(email), typeof(''));

    const response = await fetch(`${ACCOUNTS_URL}/requestPasswordReset`, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({
        email,
      }),
    });
    return response;
  };

  // @todo unused
  const confirmResetPassword = async (token, newPassword) => {
    assert(typeof(token), typeof(''));
    assert(typeof(newPassword), typeof(''));

    const response = await fetch(`${ACCOUNTS_URL}/confirmResetPassword`, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      body: JSON.stringify({
        token,
        new_password: newPassword,
      }),
    });

    if (response.status === 200) {
      return response;
    }
    throw (new Error('error resetting password'));
  };




  return {
    lifecycle: {
      getData: async () => {
        const accounts = await getAllAccounts();
        const isAccountCreation = await isAccountCreationAdminOnly();
        return {
         accounts,
         isAccountCreationAdminOnly: isAccountCreation,
       };
      },
    },
    props: {
      addAccount: async (email, password, alias) => {
        await addAccount(email, password, alias);
        refresh();
      },
      loginWithPassword,
    }
  }
}

export default getWithAccounts;