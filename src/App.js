import React, {
  Component
} from 'react';
import './App.css';
import DropSection from './components/DropSection'

import 'semantic-ui-css/semantic.min.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      files: null
    }
  }

  changeFile(files) {
    this.setState({
      files
  })
  }

  render() {
    return ( <div className = "App" >
        <DropSection triggerFileChange={() => {this.changeFile.bind(this)}}>
          
        </DropSection>

      </div>
    );
  }
}

export default App;