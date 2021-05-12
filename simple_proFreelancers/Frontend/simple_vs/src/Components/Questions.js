import React, { useState } from 'react'

const Questions=(props)=> {
    const [title,setTitle]=useState('');
    const [fields, setFields] = useState([{ value: null }]);

    function handleChange(i, event) {
      const values = [...fields];
      values[i].value = event.target.value;
      setFields(values);
    }
  
    function handleAdd() {
      if(fields.length<4)
      {
      const values = [...fields];
      values.push({ value: null });
      setFields(values);
      }
      else{
        alert("Maximum 4 options reached")
        return
      }
    }
  
    const handleSubmit = (e) => {
      e.preventDefault();
     // console.log(fields);
     //console.log(sections)
    };
  

    return (
        <div>
         <form onSubmit={handleSubmit}>
        <section className="subfirst">
          <h3>Enter Your Questions on {props.sent}</h3>
          <input type="text" className="question"  value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
          <button className="buttons1" onClick={() => handleAdd()}>
            {" "}
            Add a Question
          </button>
         </section>
      </form>
        </div>
    )
}

export default Questions
