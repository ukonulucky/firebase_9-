import { useState, useRef, useEffect } from "react"
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { colRef,db } from "./firebase"
import {
  addDoc, deleteDoc,  doc, onSnapshot, query, where
} from "firebase/firestore"

function App() {
  useEffect(() => {
    document.title = "Home Page"
  },[])
  const formRef = useRef()
  const formDeleteRef = useRef()
 

// adding of books starts here //
const [input, setInput] = useState({
  title: "",
  position:""
})  
  const titleRef = useRef()
  const positionRef = useRef()
  const [user, setUser] = useState({
    title: "",
    position:""
})

  const handleChange = (e) => {
   
   setInput(positionRef.current.value && titleRef.current.value ? {...input, title:titleRef.current.value, position:positionRef.current.value}:{...input})
    console.log(input)
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    setUser(input.title && input.position ? { ...input } : null)
   
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

 // adding of books ends here //

  
  // delete state starts here //

  const [deleteId, setDeleteId] = useState("")
  const handleDeleteChange = (e) => {
      setDeleteId(e.target.value)
    console.log(deleteId)
  }


  const handleDeleteSubmit = async (e) => {
    e.preventDefault()
    const deleteRef = doc(db, "books", deleteId)
    console.log(deleteId)
   
    try {
      if (deleteId) {
         await deleteDoc(deleteRef) 
        formDeleteRef.current.reset()
        console.log("form deletion successful")
      }
    
    } catch (error) {
    console.log(error.message, "form deletion failed")
    
   }
 
  }

  // handling deletion ends here //
 
  // quering the dom starts here//
  const [queryData, setQueryData] = useState("")
  const dataQuery = query(colRef, where("position", "==", queryData))
 
  const formQueryRef = useRef()
  const queryRef = useRef()

  const handleSubmitQuery = (e) => {
    e.preventDefault()
    setQueryData(queryRef.current.value ? queryRef.current.value : "")
    console.log(queryData)
    if (queryData) {
      onSnapshot(dataQuery, (snaps) => {
       const queryAuthor = []
        snaps.docs.forEach(i =>    queryAuthor.push({
          ...i.data(), id:i.id
        }))
        console.log(queryAuthor)
      })
      formQueryRef.current.value = ""
      
    }
    

}
  // quering the dom ends here //
  return (
    <div className="App">
      <form className="w-50 m-auto" onSubmit={handleSubmit} ref={formRef}>
        <div className="form-group d-flex align-center mt-5">
        <label className="form-label m-3" htmlFor="title">Enter Your Title</label>
          <input type="text" name="title" ref={ titleRef}  className="form-control  d-inline"
            placeholder="Enter Your title" onChange={handleChange} />
        </div> 
        <div className="form-group d-flex align-center mt-3">
        <label className="form-label m-3" htmlFor="name">Enter Your Name</label>
          <input type="text" name="name" ref={ positionRef }  className="form-control  d-inline" placeholder="Enter Your title" onChange = {handleChange} />
        </div> 
        <input className="btn btn-primary h2 d-flex mt-5 align-center justify-center" type="submit" value={"Add Item"} /> 
          
        

      </form>
      <div className="mt-5">
      <form className="w-50 m-auto" onSubmit={handleDeleteSubmit} ref={formDeleteRef}>
        <div className="form-group d-flex align-center mt-5">
        <label className="form-label m-3" htmlFor="title">Enter book I.d</label>
          <input type="text" name="title" className="form-control  d-inline"
            placeholder="Enter i.d" onChange={handleDeleteChange} />
        </div> 
        
        <button className="btn btn-primary h2 d-flex mt-5 align-center justify-center" >
          Delete Item
        </button>

        </form>
        
        <form className="w-50 m-auto" onSubmit={handleSubmitQuery} ref={formQueryRef}>
        <div className="form-group d-flex align-center mt-5">
        <label className="form-label m-3" htmlFor="title">Enter Author</label>
          <input type="text" name="title" className="form-control  d-inline"
              ref={ queryRef } placeholder="Enter Author" onChange={handleSubmitQuery} />
        </div> 
        
        <button className="btn btn-primary h2 d-flex mt-5 align-center justify-center" >
          find Aurthor
        </button>

      </form>


      </div>
    </div>
  );
}

export default App;
