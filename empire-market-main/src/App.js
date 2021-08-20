import React from "react";
import "./App.css";
import { ConfigureStore } from "./redux/configureStore";
import { Provider } from 'react-redux';
import Main from "./main";

const store = ConfigureStore();

class App extends React.Component {
  render() {

    return (
      <Provider store={store}>
        <Main />
      </Provider>
    );
  }
}

export default App;
