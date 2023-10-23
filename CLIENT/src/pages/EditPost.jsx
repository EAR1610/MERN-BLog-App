import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import { useEffect, useState } from "react";

const EditPost = () => {
    const { id } = useParams();
    const [title, settitle] = useState('');
    const [summary, setsummary] = useState('');
    const [content, setcontent] = useState('');
    const [files, setfiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch('http://localhost:4000/post/' + id)
            .then(response => {
                response.json().then(postInfo => {
                    settitle(postInfo.title);
                    setcontent(postInfo.content);
                    setsummary(postInfo.summary);
                })
            })
    }, [])
    

    const updatePost = async ev => {
        ev.preventDefault();

        const data = new FormData();
        data.set('title', title);
        data.set('summary',summary);
        data.set('content', content);
        data.set('id', id);

        if(files?.[0]) {
            data.set('file', files?.[0]);
        }

        const response = await fetch('http://localhost:4000/post', {
            method: 'PUT',
            body: data,
            credentials: 'include', 
        });

        if(response.ok) {
            setRedirect(true);
        }
    }
    if(redirect){
        return <Navigate to={'/post/'+id} />
    }


    return (
        <form onSubmit={updatePost}>
            <input type="title" placeholder={'título'} value={title} onChange={ ev => settitle(ev.target.value)} />
            <input type="summary" placeholder={'Descripción'} value={summary} onChange={ ev => setsummary(ev.target.value)}/>
            <input type="file" onChange={ ev => setfiles(ev.target.files)} />
            <Editor value={content} onChange={setcontent}/>
            <button style={{marginTop: '5px'}}>Editar Post</button>
        </form>
    )
}

export default EditPost