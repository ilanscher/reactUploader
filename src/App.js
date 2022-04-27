import React, { Component } from 'react';
import axios from 'axios';
import { Progress } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header";
import Footer from './components/Footer';
import styled from "styled-components";
import './App.css';

const theme = {
  blue: {
    default: "#3f51b5",
    hover: "#761fd5"
  }
};

const Button = styled.button`
  background-color: ${(props) => theme[props.theme].default};
  color: white;
  padding: 5px 15px;
  border-radius: 5px;
  outline: 0;
  text-transform: uppercase;
  margin: 10px 0px;
  cursor: pointer;
  transition: ease background-color 250ms;
  &:hover {
    background-color: ${(props) => theme[props.theme].hover};
  }
  &:disabled {
    cursor: default;
    opacity: 0.7;
  }
`;

Button.defaultProps = {
  theme: "blue"
};
class App extends Component {

  onChangeHandler = event => {
    console.log(event.target.files)
    this.setState({
      selectedFile: event.target.files,
      loaded: 0,
    })
  }
  
  fileUploadHandler = () => {
    const data = new FormData()
    for(var x = 0; x<this.state.selectedFile.length; x++) {
        data.append('file', this.state.selectedFile[x])
    }
 
    axios.post("http://localhost:8000/upload", data, {
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
      })
  },
})
 
 .then(res => { 
   console.log(res.statusText);
 })
 .then(res => { 
  toast.success('upload success')
})
.catch(err => { 
  toast.error('upload fail')
})
 }

 constructor(props) {
  super(props);
    this.state = {
      selectedFile: null,
      loaded:0
  }
}

checkMimeType=(event)=>{

  let files = event.target.files
  let err = [] // create empty array
  const types = ['image/png', 'image/jpeg', 'image/gif']
  for(var x = 0; x<files.length; x++) {
      if (types.every(type => files[x].type !== type)) {
      err[x] = files[x].type+' is not a supported format\n';
     // assign message to array
    }
  };
  for(var z = 0; z<err.length; z++) { // loop create toast massage
      event.target.value = null 
      toast.error(err[z])
  }
 return true;
}
  
checkFileSize=(event)=>{
  let files = event.target.files
  let size = 2000000 
  let err = []; 
  for(var x = 0; x<files.length; x++) {
  if (files[x].size > size) {
   err[x] = files[x].type+'is too large, please pick a smaller file\n';
 }
};
for(var z = 0; z<err.length; z++) {
 toast.error(err[z])
 event.target.value = null
}
return true;
}

  render() {
    return (
      
      <div className="container">
      <Header />
     <div className="row" style={{marginTop: "100px"}}>
       <div className="col-md-6">
       <div className="form-group">
          <ToastContainer />
     </div>
   
         <form method="post" id="#" encType="multipart/form-data" target='_blank'>
           <div className="form-group files">
             
             <label>Upload Your File or drug it into the box</label>
             
             <Button><input type="file" name="photos" className="form-control" multiple onChange={this.onChangeHandler} /></Button>

           </div>
           <div className="form-group">
             <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
           </div>
           <div className="col-md-6 pull-right">
             <Button width="100%" type="button" className="btn btn-info" target='_blank' onClick={this.fileUploadHandler}>Upload File</Button>
           </div>
         </form>
         <br/>
       </div>
     </div>
     <Footer />
   </div>
 );
}
}



export default App;