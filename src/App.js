import { useState, useRef, useEffect } from "react"
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { firebaseConfig,colRef } from "./firebase"
import {
  addDoc
} from "firebase/firestore"

function App() {
  useEffect(() => {
    document.title = "Home Page"
  },[])
  const formRef = useRef()
  const [input, setInput] = useState({
    title: "",
    position:""
  })
  
  const [user, setUser] = useState({
    title: "",
    position:""
})

  const handleChange = (e) => {
    if (input.title) {
      setInput({...input,title: input.title})
    }
    if (input.position) {
      setInput({...input, position: input.position})
    }
    
  }

 
  const handleSubmit = async (e) => {
    e.preventDefault()

    setUser(input.title && input.position ? {
      position:input.position,
      title: input.title
    } : null)
    try {
      if (user.title && user.position) {
        const addToDb = await addDoc(colRef, user)
        addToDb ? formRef.current.reset && console.log('form submission succesful') : 
          console.log("submission failed")
      }
    
    } catch (error) {
    console.log(error.message)
    
   }
 
  }
 
  console.log(input.title, input.position, user)

  
  return (
    <div className="App">
      <form className="w-50 m-auto" onSubmit={handleSubmit} ref={formRef}>
        <div className="form-group d-flex align-center mt-5">
        <label className="form-label m-3" htmlFor="title">Enter Your Title</label>
          <input type="text" name="title" className="form-control  d-inline"
            placeholder="Enter Your title" onChange={handleChange} />
        </div> 
        <div className="form-group d-flex align-center mt-3">
        <label className="form-label m-3" htmlFor="name">Enter Your Name</label>
        <input type="text" name="name" className="form-control  d-inline" placeholder="Enter Your title" onChange = {handleChange} />
        </div> 
        <button className="btn btn-primary h2 d-flex mt-5 align-center justify-center" >
          Add Item
        </button>

      </form>
    </div>
  );
}

export default App;
