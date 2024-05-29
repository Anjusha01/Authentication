import React, { useState } from 'react';

function Register() {
  // Initialize state with an empty object
  const [data, setData] = useState({ field1: '', field2: '', field3: '' });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Do whatever you need to do with the form data
    console.log('Form data submitted:', data);
    
    // Reset the form data by setting it back to the initial state
    setData({ field1: '', field2: '', field3: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="field1" value={data.field1} onChange={handleChange} />
      <input type="text" name="field2" value={data.field2} onChange={handleChange} />
      <input type="text" name="field3" value={data.field3} onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  );
}

export default Register;
