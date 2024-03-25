import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  BackHandler,
  Alert,
  TouchableOpacity, Text,
} from "react-native";

import { DocumentView, RNPdftron } from "@pdftron/react-native-pdf";
import DocumentPicker from 'react-native-document-picker';

type Props = {};
type State = {
  documentPath: string | null;
};
export default class App extends Component<Props> {

  constructor(props: Props) {
    super(props);

    this.state = {
      documentPath: null,
    } ;

    RNPdftron.enableJavaScript(true);
  }

  onLeadingNavButtonPressed = () => {
    console.log("leading nav button pressed");
    if (Platform.OS === "ios") {
      Alert.alert(
          "App",
          "onLeadingNavButtonPressed",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: true }
      );
    } else {
      BackHandler.exitApp();
    }
  };

  handleFilePick = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      this.setState({ documentPath: res[0].uri });
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the file picker');
      } else {
        console.error('Error while picking the file', err);
      }
    }
  };


  render(){

    const { documentPath } = this.state;

    return (
        <>
          <DocumentView
              ref={(c) => this._viewer = c}
              hideAnnotationToolbarSwitcher={false}
              hideTopToolbars={false}
              hideTopAppNavBar={false}
              document={documentPath ? documentPath : "https://pdftron.s3.amazonaws.com/downloads/pl/PDFTRON_mobile_about.pdf"}
              padStatusBar={true}
              showLeadingNavButton={true}
              leadingNavButtonIcon={Platform.OS === 'ios' ? 'ic_close_black_24px.png' : 'ic_arrow_back_white_24dp'}
              onLeadingNavButtonPressed={this.onLeadingNavButtonPressed}
              readOnly={false}
              openOutlineList = {true}
          />
          <TouchableOpacity style={styles.selectButton} onPress={this.handleFilePick}>
            <Text style={styles.buttonText}>Select File</Text>
          </TouchableOpacity>
        </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  selectButton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    borderRadius: 50,
    backgroundColor: '#52b8f7',
    padding: 10,
    zIndex: 1,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
