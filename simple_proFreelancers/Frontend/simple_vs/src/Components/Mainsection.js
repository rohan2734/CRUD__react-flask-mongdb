import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Question from './Questions'
import { faCross, faTimes } from "@fortawesome/free-solid-svg-icons";

function Mainsection() {
  //  const [values,setValue]=useState('');
  const [title,setTitle]=useState('');
  const [sections,setSections]=useState({
    id:new Date().getTime().toString(),
    sectionTitle:'',
    itemsArray:[],
  })
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

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i,1);
    setFields(values);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
   // console.log(fields);
   console.log(sections)
  };

  const handleSave=()=>{
    //e.preventDefault();
    setSections({...sections,sectionTitle:title,itemsArray:fields})
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <section className="first">
          <h3>Enter Your Sections</h3>
          <input type="text" className="question"  value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
          <button className="buttons1" onClick={() => handleAdd()}>
            {" "}
            Add Options
          </button>
          <button className="buttons1" style={{marginLeft:'10px'}} 
          onClick={handleSave}
          >
            {" "}
            Save
          </button>

          {fields.map((field, idx) => {
            return (
              <div
                key={`${field}-${idx}`}
                style={{
                  position: "relative",
                  top: "30px",
                  left: "-220px",
                  padding: "5px",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                  placeholder="Enter text"
                  onChange={(e) => handleChange(idx, e)}
                  value={field.value}
                  style={{
                    width: "200px",
                    lineHeight: "2",
                    borderRadius: "5px",
                    padding: "6px",
                    outline: "none",
                    border: "2px solid #ef484f",
                  }}
                />
                <button
                  type="button"
                  style={{
                    padding: "10px",
                    color: "white",
                    cursor:'pointer',
                    backgroundColor: "#ffc93c",
                    border: "2px solid #ef484f",
                    borderRadius: "5px",
                    outline: "none"
                  }}
                  onClick={() => handleRemove(idx)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
            );
          })}
        </section>
        <div style={{position:'relative',top:'500px',paddingBottom:'10px'}}>
          {sections.itemsArray.map((headings)=>{
            return <Question sent={headings.value}  key={headings.value}/>
          })} 
        </div>
        
      </form>
    </>
  );
}

export default Mainsection;
