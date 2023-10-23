
import { useState } from 'react';
import { Navigate } from "react-router-dom"
import 'react-quill/dist/quill.snow.css';
import Editor from '../components/Editor';

const CreatePostPage =  () => {

    const [title, settitle] = useState('');
    const [summary, setsummary] = useState('');
    const [content, setcontent] = useState('');
    const [files, setfiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    const createNewPost = async ev => {
      
      ev.preventDefault();

      const data = new FormData();
      // if(data.length <)
      console.log(data.size);
      console.log(data == undefined);
      data.set('title', title);
      data.set('summary',summary);
      data.set('content', content);
      data.set('file', files[0]);

      const response = await fetch('http://localhost:4000/post', {
          method: 'POST',
          body: data,
          credentials: 'include',
      });

      if(response.ok){
        setRedirect(true);
      }        
    }

    if(redirect) {
      return <Navigate to={'/'} />
    }

  return (
    <form onSubmit={createNewPost}>
        <input type="title" placeholder={'título'} value={title} onChange={ ev => settitle(ev.target.value)} />
        <input type="summary" placeholder={'Descripción'} value={summary} onChange={ ev => setsummary(ev.target.value)}/>
        <input type="file" onChange={ ev => setfiles(ev.target.files)} />
        <Editor value={content} onChange={setcontent}/>
        <button style={{marginTop: '5px'}}>Crear Post</button>
    </form>
  )
}

export default CreatePostPage