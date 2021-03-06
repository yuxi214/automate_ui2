import fetch from 'isomorphic-fetch';

const getWithSequences = ({ AUTOMATE_CORE_URL }, { refresh }) => {
  const SEQUENCES_URL = `${AUTOMATE_CORE_URL}/sequences`;

  const getAllSequences = async () => {
    const response = await fetch(SEQUENCES_URL, {
      mode: 'cors',
      method: 'GET',
      headers: {
        Accept: 'application/json',
      }
    });
    const data = await response.json();
    return data.sequences;
  }
  const addSequence = async (sequenceName, actions) => {
    await fetch(`${SEQUENCES_URL}/modify/sequences/${sequenceName}`, {
      headers: new Headers({
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }),
      method: 'POST',
      body: JSON.stringify({
        actions,
      }),
    });
  };
  const deleteSequence = async (sequenceName) => {
    await fetch(`${SEQUENCES_URL}/sequences/${sequenceName}`, {
      method: 'DELETE',
    });
  };

  return {
    lifecycle: {
      getData: getAllSequences,
    },
    props: {
      addSequence: async (sequenceName, actions) => {
        await addSequence(sequenceName, actions);
        refresh();
      },
      deleteSequence: async (sequenceName) => {
        await deleteSequence(sequenceName);
        refresh();
      },
    }
  }
}

export default getWithSequences;