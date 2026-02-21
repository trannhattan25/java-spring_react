import logo from './logo.svg';
import './App.css';
import { use, useEffect, useState } from 'react';

function App() {
  const [users,setUsers] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:8080/users")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("エラー発生:", error);
      });
  }, []);

  return (
    <div>
      <h1>ユーザー一覧</h1>
      <ul>
        {users.map(user=>(
          <li key={user.id}>{user.name}-{user.email}</li>
        ))}
        </ul> 
    </div>
  )
}
export default App;
