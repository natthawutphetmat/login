"use client";

import React, { useState, useEffect } from 'react';
import Items from './Items';
import Check from '../components/Check';


const App = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [name, setName] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState([]);

 
  useEffect(() => {
    fetch('https://api-post.myads.dev/get')
      .then((response) => response.json())
      .then((data) => setPosts(data))
       
  }, [0]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('name', name);
    formData.append('imgvdo', file);

    try {
      const response = await fetch('https://api-post.myads.dev/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Upload successful');
        console.log('Server response:', result);
      } else {
        setMessage('Upload failed: ' + result.error);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      setMessage('Upload failed due to an error.');
    }
  };

  return (
    <div>
    <Check/>

    <form onSubmit={handleSubmit} className="upload-form">
 <div className="text-center">
  <a href="/admin/fb">add</a>
 </div>
<div className="form-group">
   <label htmlFor="title">Title</label>
   <input
       type="text"
       id="title"
       name="title"
       value={title}
       onChange={(e) => setTitle(e.target.value)}
       required
   />
</div>
<div className="form-group">
   <label htmlFor="content">Content</label>
   <textarea
       id="content"
       name="content"
       value={content}
       onChange={(e) => setContent(e.target.value)}
       required
   ></textarea>
</div>
<div className="form-group">
   <label htmlFor="name">Name</label>
   <input
       type="text"
       id="name"
       name="name"
       value={name}
       onChange={(e) => setName(e.target.value)}
      
   />
</div>
<div className="form-group">
   <label htmlFor="file">Image/Video</label>
   <input
       type="file"
       id="file"
       name="file"
       onChange={(e) => setFile(e.target.files[0])}
      
   />
</div>
<button type="submit" className="submit-btn">Submit</button>
</form>

       {message && <p>{message}</p>}

       <div className="container " id='box'>
       <Items/>
       </div>
   </div>
  );
};

export default App;
