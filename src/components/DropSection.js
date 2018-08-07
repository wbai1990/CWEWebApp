import React from 'react';
import Dropzone from 'react-dropzone';
import XLSX from 'xlsx'



class UploadScreen extends React.Component {
    constructor(props){
        super(props)
        this.state={
            files:[]
        }
    }

    onDrop(acceptedFiles){

        console.log('Accepted Files :', acceptedFiles[0].name)
        this.setState({
            files:acceptedFiles
        })

        this.fileReader(acceptedFiles[0])

        console.log('all done')

    }

    fileReader(file){
        const reader = new FileReader();
        reader.onload = () => {
            const fileAsBinaryString = reader.result;
            // do whatever you want with the file content
            const wb = XLSX.read(fileAsBinaryString, {type:'binary'})
            /*Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /*Convert array of arrays */
            const data = XLSX.utils.sheet_to_csv(ws,{header:1})

            /*update state*/

            console.log("data >>>" + data)
        };
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');

        reader.readAsBinaryString(file);

    }

    render(){
        return(
            <div>
                <Dropzone
                    onDrop={(files) => {
                        this.onDrop(files)
                    }}
                >
                    <ul>
                        {this.state.files.map(f=> <li key={f.name}>{f.name} - {f.size} bytes</li>)}
                    </ul>
                    
                </Dropzone>
            </div>
        )
    }
}

export default UploadScreen