import { Avatar, Button } from '@material-ui/core'
import React, { useState } from 'react'
import "./TweetBox.css"
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"
import db from './firebase'

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");

  const sendTweet = e => {
    e.preventDefault();
    db.collection('posts').add({
      id: String(Date.now()),
      displayName: 'Varland Lengkong',
      avatar: 'https://avatars.githubusercontent.com/u/48589121?s=400&u=fe692dcf676b30b2eecd923d2ce9aaaf14964806&v=4',
      username: 'lansilvester',
      verified: true,
      text: tweetMessage,
      image: tweetImage
    })
    setTweetMessage("")
    setTweetImage("")
  }
  return (
    <div className='tweetBox'>
      <form>
        <div className='tweetBox__input'>
            <Avatar src='https://avatars.githubusercontent.com/u/48589121?s=400&u=fe692dcf676b30b2eecd923d2ce9aaaf14964806&v=4' />
            <input
            onChange={e => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's Happening?"
            type="text"/>
        </div>
        <input
          value={tweetImage}
          onChange={e => setTweetImage(e.target.value)}
          className="tweetBox__imageInput"
          placeholder="Optional: Enter Image URL"
          type="text"/>

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox_tweetButton">
          Tweet
        </Button>
      </form>
    </div>
  )
}

export default TweetBox
