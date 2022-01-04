import './App.css';
import { UserCard } from './components/UserCard';
import { useAllUsers } from "./hooks/useAllUsers"
// import { userProfile } from "./types/userProfile"
// import axios from "axios"
// import { User } from "./types/api/users"
// import { useState } from 'react';

function App() {
  const { getUsers, userProfile, loading, error } = useAllUsers();

  const onClickChange = () => {
    getUsers()
  }
  return (
    <div className="App">
      <button onClick={onClickChange}>データ取得</button>
      <br />
      {error ?  <p>データの取得に失敗しました</p> : loading? <p>loading...</p> : (
        <>
        {userProfile.map((user) => (
        <UserCard key={user.id} user={user}/>
      ))}
        </>
      )}
    </div>
  );
}

export default App;
