import { useEffect } from "react"
import Post from "../components/Post"
import { useState } from "react"


const IndexPage = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://efocaris.onrender.com/post').then(response => {
      response.json().then(posts => {
        setPosts(posts);
      });
    });
  }, [])
  
  return (
    <>
        {posts.length > 0 && posts.map(post => (
          <Post { ... post } />
        ))}
    </>
  )
}

export default IndexPage