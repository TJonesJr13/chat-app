import React, { useState, useEffect, useRef } from 'react';
import { auth, db } from '../firebase.js';
import SendMessage from './SendMessage.jsx';
import SignOut from './SignOut';

const Chat = () => {
  const scroll = useRef();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    db.collection('Messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()))
    })
  }, [])
  return (
    <div>
      <SignOut />
      <div className='msgs'>
        {messages.map(({ id, text, photoURL, uid }) => (
          <div>
            <div key={id} className={`msg ${uid === auth.currentUser.uid ? 'sent' : 'received' }`}>
              <img src={photoURL} alt="" />
              <p>{text}</p>
            </div>
        </div>  
      ))}
     </div>
      <SendMessage scroll={scroll} />
      <div ref={scroll}></div>
    </div>
  )
}

export default Chat;