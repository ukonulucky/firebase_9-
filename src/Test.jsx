import React, { useEffect } from 'react'

function Test() {
    useEffect(() => {
     document.title = "hello word"
    }, [])
    
  return (
      <div>
          this is a text
    </div>
  )
}

export default Test