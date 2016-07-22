import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Dropzone from 'react-dropzone';

class PaperSubmit extends Component {


  constructor(props){
    super(props);

    this.state = {
      error: '',
      files: []
     };

  };
  handleSubmit(event){
    event.preventDefault();
    Meteor.call('paper-submit.insert', this.refs.link.value, (error) => {
      if(error){
        this.setState({error: 'Enter a valid URL'});
      }
      else{
        this.setState({error: ''});
        this.refs.link.value = '';
      }
    });
  };


  onDrop(files) {
      console.log('Received files: ', files);

      this.setState({
        files: files
      });
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

        /*{this.state.files.length > 0 ? <div>
               <h2>Uploading {this.state.files.length} file...</h2>
               <div>{this.state.files.map((file) => <img src={file.preview} /> )}</div>
               </div> : null} */
          </div>

        </div>
      </div>

    );
  };
}

export default PaperSubmit;
