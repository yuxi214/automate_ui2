import React, { PropTypes } from 'react';
import CodeEditor from './codeEditor/CodeEditor';

const Editor = ({ initialText, onTextChange, name, style }) => (
  <div style={style}>
    <div
      style={{
        boxShadow: '0px 0px 2px 0.1px black',
        width: '100%',
      }}
    >
      <CodeEditor
        onTextChange={onTextChange}
        initialText={initialText}
        name={name}
      />
    </div>
  </div>
);

Editor.propTypes = {
  name: PropTypes.string,
  initialText: PropTypes.string,
  onTextChange: PropTypes.func,
  style: PropTypes.object,
};

export default Editor;

