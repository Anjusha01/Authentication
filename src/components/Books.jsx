import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Books = () => {
  const [data, setData] = useState({ bookName: '', author: '', publisher: '' });
  const [books, setBooks] = useState([]);
  const [refresh, setRefresh] = useState(true);
  let navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchData = async () => {
      let token = localStorage.getItem('token');
      try {
        let response = await axios.get('http://localhost:4000/view', {
          headers: {
            Authorization: token,
          },
        });
        console.log(response);
        setBooks(response.data);
      } catch (e) {
        console.log(e.response);
        navigate('/');
      }
    };
    fetchData();
  }, [refresh]);

  let logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post('http://localhost:4000/add', data);
      console.log(response);
      setRefresh(!refresh);
    } catch (e) {
      console.log(e.response);
    }
  };

  const handleDelete = async (id) => {
    try {
      let response = await axios.delete(`http://localhost:4000/delete/${id}`);
      console.log(response);
      setRefresh(!refresh);
    } catch (e) {
      console.log(e.response);
    }
  };

  return (
    <div className="fluid-container">
      <nav className=" navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className='container'>
        <a className="navbar-brand" href="#">Books</a>
          <div className="d-flex ms-auto">
            <button onClick={logout} className="btn btn-outline-danger">Logout</button>
        </div>
        </div>
          
      </nav>
      <div className='container'>

      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="form-group mb-3">
          <label>Book Name:</label>
          <input
            type="text"
            name="bookName"
            value={data.bookName}
            onChange={handleChange}
            className="form-control"
            />
        </div>
        <div className="form-group mb-3">
          <label>Author:</label>
          <input
            type="text"
            name="author"
            value={data.author}
            onChange={handleChange}
            className="form-control"
            />
        </div>
        <div className="form-group mb-3">
          <label>Publisher:</label>
          <input
            type="text"
            name="publisher"
            value={data.publisher}
            onChange={handleChange}
            className="form-control"
            />
        </div>
        <button type="submit" className="btn btn-primary">Add Book</button>
      </form>
      <h2>Books Details</h2>
      <ul className="list-group">
        {books.map((book, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <span>{book.bookName} by {book.author} (Publisher: {book.publisher})</span>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(book._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
</div>
  );
};

export default Books;
