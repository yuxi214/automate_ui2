import React from 'react';
import NumericTextfield from './transforms/NumericTextfield';
import Options from './transforms/Options';

const Transforms = ({ item, onChange, selectedValue }) => {
  const { type, ...otherProps } = item;

  const newProps = { ...otherProps, selectedValue, onChange };
  switch (type) {
    case 'options': {
      return <Options {...newProps} />;
    }
    case 'text': {
      return <NumericTextfield {...newProps} />;
    }
    default: {
      throw (new Error('Invalid transform type ', type));
    }
  }
};

export default Transforms;
