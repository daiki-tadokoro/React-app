import './App.css';
import { UserCard } from './components/UserCard';
import { userProfile } from "./types/userProfile"
import axios from "axios"
import { User } from "./types/api/users"
import { useState } from 'react';

function App() {
  const [userProfile, setUserProfile ] = useState<Array<userProfile>>([])
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  const onClickChange = () => {
    setLoading(true);
    setError(false);
    axios.get<Array<User>>("https://jsonplaceholder.typicode.com/usersssss").then((res) => {
      const data = res.data.map((user) => ({
        id: user.id,
        name: `${user.name}(${user.username})`,
        email: user.email,
        address: `${user.address.city}${user.address.suite}${user.address.street}`
      }));
      setUserProfile(data)
    }).catch((err) => {
      console.log(err);
      setError(true);
    })
      .finally(() => {
      setLoading(false);
    });
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
