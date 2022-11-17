import React, { useEffect, useState } from 'react'
import './Feed.css'
import TweetBox from './TweetBox'
import Post from './Post'
import db from './firebase'
import FlipMove from 'react-flip-move'


function Feed() {
  // const [posts, setPosts] = useState([]);
  const [Listofposts,setListofposts ] = useState([])
  const [lastKey,setLastKey] = useState()

  const [isLoading, setLoading] = useState(false);
  const [isEmpty, setEmpty] = useState(false);

  useEffect(()=>{
    db.collection('posts')
    .orderBy('id', 'desc')
    .limit(3)
    .onSnapshot(collections => (
      updateState(collections)
      // setPosts(collections.docs.map( (doc) => doc.data() ))
    ))
  }, [])
  const updateState = (collections) => {
    const isCollectionEmpty = collections.size === 0
    if(!isCollectionEmpty){
      const posts = collections.docs.map((post)=>post.data())
      const Lastdoc = collections.docs[collections.docs.length - 1]
      setListofposts((Listofposts) => [...Listofposts, ...posts])
      setLastKey(Lastdoc)
    }else{
      setEmpty(true);
    }
    setLoading(false)
  }

  const fetchMorePosts = () =>{
    setLoading(true);
    db.collection('posts')
    .orderBy('id','asc')
    .startAfter(lastKey)
    .limit(3)
    .get()
    .then((collections)=>{
      updateState(collections);
    });
  }

  return (
    <div className="feed">
      <div className='feed__header'>
        <h1>Home</h1>
      </div>
        <TweetBox />

        <FlipMove>
          {Listofposts.map((post,index) => (
            <Post
              key={index}
              displayName={post.displayName}
              username={post.username}
              verified={post.verified}
              text={post.text}
              avatar={post.avatar}
              image={post.image}
              />

          ))
          }
        </FlipMove>
        {isLoading && <h1> Loading... </h1>}
        {!isLoading && !isEmpty && <button onClick={() => fetchMorePosts()} className="btn__default">More Posts</button> }
        {isEmpty && <h1> There are no more data </h1>}
    </div>
  )
}

export default Feed


