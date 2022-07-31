import { useState } from "react"
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import firebaseConfig from  "./firebase"
function App() {
  return (
    <div className="App">
      <form className="w-50 m-auto">
        <div className="form-group d-flex align-center mt-5">
        <label className="form-label m-3" htmlFor="title">Enter Your Title</label>
        <input type="text" name="title" className="form-control  w-25" placeholder="Enter Your title" />
        </div> 
        <div className="form-group d-flex align-center mt-3">
        <label className="form-label m-3" htmlFor="name">Enter Your Name</label>
        <input type="text" name="name" className="form-control  w-25" placeholder="Enter Your title" />
        </div> 
        <button className="btn btn-primary h2 d-flex mt-5 align-center justify-center">
          Add Item
        </button>

      </form>
    </div>
  );
}

export default App;
