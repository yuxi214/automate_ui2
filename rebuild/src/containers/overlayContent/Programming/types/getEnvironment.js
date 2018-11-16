import React from 'react';
import EnvironmentComponent from '../../../../components/overlayContent/programming/components/types/Environment/Environment';

const getEnvironment = WithEnv => (
    <WithEnv>
    {({ data, setEnv, deleteEnv }) => {
      const variables = Object.keys(data).map(variable => ({
        name: variable,
        value: data[variable],
      }))

      return (
        <EnvironmentComponent
          variables={variables}
          onDelete={(item, index) => {
            deleteEnv(item.name)
          }}
          onAdd={({ token, value }) => {
            setEnv(token, value);
          }}
        />
      )}}
    </WithEnv>
);

export default getEnvironment;