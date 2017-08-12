import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DatabaseComponent from '../components/database/Database';
import WithData from '../data/WithData';

const WithDatabases = WithData.polling.WithDatabases;

const getDialog = ({  isOpen, onRequestClose, onTextFieldChange, onSubmit }) => (
  <Dialog
    open={isOpen}
    onRequestClose={onRequestClose}
  >
    <TextField
      floatingLabelText="Enter Name"
      onChange={onTextFieldChange}
    />
    <div style={{ display: 'flex' }}>
      <FlatButton label="Cancel" onClick={onRequestClose} />
      <RaisedButton label="Submit" onClick={onSubmit} />
    </div>
  </Dialog>
);

class Database extends Component {
  state = {
    selectedIndex: 0,
    copyDialogOpen: false,
    createNewDialogOpen: false,
    showSetActiveDialogOpen: false,

    databaseNameToCopyTarget: undefined,
    databaseNameToCreate: undefined,
  }
  handleCopyDialogClose = () => {
    this.setState({
      copyDialogOpen: false,
    });
  }
  handleCreateNewDialogClose = () => {
    this.setState({
      createNewDialogOpen: false,
    })
  }
  handleCloseSetActiveDialog = () => {
    this.setState({
      showSetActiveDialogOpen: false,
    })
  }
  render() {
    return (
      <WithDatabases
        refresh={1000}
      >
        {({
          databases,
          setDatabaseAsActive,
          createNewDatabase,
          copyDatabase,
          uploadDatabase,
          deleteDatabase,
          downloadDatabase,
        }) => (

          <div>
            <DatabaseComponent
              onDatabaseSelected={selectedIndex => {
                this.setState({selectedIndex})
              }}
              selectedDatabaseIndex={this.state.selectedIndex}
              deleteDatabase={() => {
                const databaseName = databases[this.state.selectedIndex].name;
                deleteDatabase(databaseName);
              }}
              createNewDatabase={() => {
                this.setState({
                  createNewDialogOpen: true,
                })
              }}
              setDatabaseAsActive={async () => {
                const databaseName = databases[this.state.selectedIndex].name;
                console.log('db name active: ', databaseName);
                await setDatabaseAsActive(databaseName);
                this.setState({
                  showSetActiveDialogOpen: true,
                })
              }}
              onDownloadDatabase={async() => {
                const databaseName = databases[this.state.selectedIndex].name;
                downloadDatabase(databaseName);
              }}
              onCopyDatabase={() => {
                console.log('copy database: ', this.state.selectedIndex);
                this.setState({
                  copyDialogOpen: true,
                });
              }}
              onUploadDatabase={() => {
                document.querySelector('#file_upload').click();
              }}
              databases={databases}
            />
            <input
              style={{opacity: 0, width: 0, height: 0}}
              id="file_upload"
              type="file"
              name="myFiles"
              onChange={event => {
                const value = document.querySelector('#file_upload');
                const file = value.files[0]
                uploadDatabase(file.name, file);
              }}
            />
            {getDialog({
              isOpen: this.state.copyDialogOpen,
              onRequestClose: this.handleCopyDialogClose,
              onTextFieldChange:  (_, databaseNameToCopyTarget) => {
                this.setState({
                  databaseNameToCopyTarget,
                })
              },
              onSubmit: () => {
                const databaseNameToCopy = databases[this.state.selectedIndex].name;
                copyDatabase(databaseNameToCopy, this.state.databaseNameToCopyTarget);
                this.handleCopyDialogClose();
              }
            })}
            {getDialog({
              isOpen: this.state.createNewDialogOpen,
              onRequestClose: this.handleCreateNewDialogClose,
              onTextFieldChange:  (_, databaseNameToCreate) => {
                this.setState({
                  databaseNameToCreate,
                })
              },
              onSubmit: () => {
                createNewDatabase(this.state.databaseNameToCreate);
                this.handleCreateNewDialogClose();
              }
            })}
            <Dialog
              open={this.state.showSetActiveDialogOpen}
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div>The system will be loaded with the selected database when it is restarted.</div>
              <div>This is a current limitation that will be fixed.</div>
              <RaisedButton
                primary
                onClick={this.handleCloseSetActiveDialog}
                label={"OK"}
                fullWidth
                style={{ marginTop: 12 }}
              />
            </Dialog>
          </div>
        )}
      </WithDatabases>
    )
  }
}

export default Database;