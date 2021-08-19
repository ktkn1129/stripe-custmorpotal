import React from 'react';
import liff from '@line/liff';
import './App.css';


function App() {
  /* 追加: メッセージの送信 */
  const sendMessage = () => {
    liff.init({liffId: process.env.REACT_APP_LIFF_ID as string}) // LIFF IDを設定する
    .then(() => {
      if(!liff.isLoggedIn()) {
        liff.login({}) // ログインしてなければログインを行う
      } else if (liff.isInClient()){ // LIFFアプリをLIFFブラウザで起動すれば
        liff.sendMessages([{
          'type': 'text',
          'text': "You've successfully sent a message! Yeah!"
        }]).then(function(){
          window.alert('Message sent');
        }).catch(function(error){
          window.alert('Error sending message: ' + error);
        });
      }
    })
  }

  /* 追加: UserProfileをAlertで表示 */
  const getUserInfo = () => {
    liff.init({liffId: process.env.REACT_APP_LIFF_ID as string})
    .then(() => {
      if(!liff.isLoggedIn()) {
        liff.login({}) // ログインしてなければログインを行う
      } else if (liff.isInClient()){ // LIFFアプリをLIFFブラウザで起動すれば
        liff.getProfile() // ユーザー情報を取得する
        .then(profile =>{
          const userId: string = profile.userId
          const displayName: string = profile.displayName
          alert(`Name: ${displayName}, userId: ${userId}`)
        }).catch(function(error){
          window.alert('Error sending message: ' + error);
        });
      }
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <button className="button" onClick={sendMessage}>send message</button>
        <button className="button" onClick={getUserInfo}>get User Info</button>
      </header>
    </div>
  );
}

export default App;
