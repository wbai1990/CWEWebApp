import React, { Component } from "react";
import "./App.css";
import DropSection from "./components/DropSection";
import "react-datasheet/lib/react-datasheet.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: null
    };
  }

  changeFile(files) {
    this.setState({
      files
    });
  }

  render() {
    return (
      <div className="App">
        <DropSection
          triggerFileChange={() => {
            this.changeFile.bind(this);
          }}
        />
      </div>
    );
  }
}

export default App;
