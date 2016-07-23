import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';


class PaperSubmit extends Component {


  constructor(props){
    super(props);

    this.state = {
      error: '',
      files: []
     };

  };

  onDrop(files) {
      console.log('Received files: ', files);

      this.setState({
        files: files
      });

     var reader = new FileReader(); //create a reader according to HTML5 File API

    reader.onload = function(event){
      //var buffer = new Uint8Array(reader.result) // convert to binary

      buffer = reader.result;
      Meteor.call('paper.insert', buffer, () => {
        browserHistory.push(`/views/${paperId}`);
      });
    }

  //  reader.readAsArrayBuffer(files[0]); //read the file as arraybuffer
    reader.readAsDataURL(files[0]);


      // Meteor.call('paper.insert', files);
  };



  render () {
    return (
      <div>
      <label> Paper Submission</label>

        <div className = "container">
          <div className = "span12">
           <Dropzone ref="dropzone" className= "rc-dropzone" multiple = {false} accept = "application/pdf" onDrop={this.onDrop.bind(this)}>
             <div className="dz-message">Drop your Research paper in PDF form</div>
           </Dropzone>

          </div>

        </div>
      </div>

    );
  };
}
/*{this.state.files.length > 0 ? <div>
       <h2>Uploading {this.state.files.length} file...</h2>
       <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
       </div> : null} */
export default PaperSubmit;
