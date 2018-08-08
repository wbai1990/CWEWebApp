import React from "react";
import Dropzone from "react-dropzone";
import XLSX from "xlsx";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import DataSheet from './DataSheet';

class DropSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      message: "Upload a file to start validating",
      fileIsDropped: false,
      dropzoneActive: false,
    };
  }

  onDragEnter() {
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false
    });
  }

  onDrop(files) {
    const file = files[0]
    // console.log("Accepted Files :", file.name);
    this.setState({
      files: files,
      fileIsDropped: true,
      message: file.name + ". file size :" + file.size / 1000 + "k",
      dropzoneActive: false,
    });
    // console.log("all done");
  }

  fileReader(file) {
    const reader = new FileReader();
    reader.onload = () => {
      const fileAsBinaryString = reader.result;
      // do whatever you want with the file content
      const wb = XLSX.read(fileAsBinaryString, { type: "binary" });
      /*Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /*Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });

      /*update state*/

      console.log("data >>>" + data);
    };
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");

    reader.readAsBinaryString(file);
  }

  handleFileUploadClick(file) {
    const fileIsDropped = this.state.fileIsDropped;
    if (fileIsDropped) {
      console.log("test");
      this.fileReader(file);
    } else {
      this.setState({
        message: "please upload a file first!"
      });
    }
  }

  render() {
    const { accept, files, dropzoneActive } = this.state;
    const overlayStyle = {
      position: "absolute",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      padding: "2.5em 0",
      background: "rgba(0,0,0,0.5)",
      textAlign: "center",
      color: "#ffffff" ,
      
    };

    return (
      <div>
        <AppBar position="static" color = "default">
          <Toolbar>
            <Grid container spacing={24}>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleFileUploadClick.bind(this,files[0])}
                >
                  Upload
                </Button>
              </Grid>
            <Grid item xs={10} >
              <Typography variant="headline" component="h1">
                  {this.state.message}
              </Typography>
            </Grid>
          </Grid>
          </Toolbar>
        </AppBar>
        <div className="row">
          <Dropzone
            style={{ position: "relative" }}
            onDrop={this.onDrop.bind(this)}
            onDragEnter={this.onDragEnter.bind(this)}
            onDragLeave={this.onDragLeave.bind(this)}
            multiple={false}
            disableClick
            
          >
            {dropzoneActive && <div style={overlayStyle}>Drop file here</div>}
            <div className={'sheet-container'}>
              <DataSheet/>
            </div>
          </Dropzone>
        </div>
      </div>
    );
  }
}

export default DropSection;
