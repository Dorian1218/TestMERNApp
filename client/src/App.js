import './App.css';
import {useState, useEffect} from "react"
import Axios from "axios"
import {AiFillPlusCircle} from "react-icons/ai"

function App() {
  
  const [listOfUsers, setListOfUsers] = useState([])
  const [name, setName] = useState("")
  const [age, setAge] = useState(0)
  const [username, setUsername] = useState("")

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data)
    })
  }, [])

  const createUser = () => {
    Axios.post("http://localhost:3001/createUser", {name, age, username}).then((response) => {
      setListOfUsers([...listOfUsers, {name, age, username}])
    })
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data)
    })
  }

  return (
    <div className="App">
      <AiFillPlusCircle size={24}/>
      <h1>Welcome to Notes app</h1>
      <div className='notes'>
      {listOfUsers.map((user, users) => {
        return (
          <div className="users" key={users}>
            <li>{user.name}</li>
            <li>{user.age}</li>
            <li>{user.username}</li>
          </div>
        )
      })}
      </div>
      <div>
        <input className="input" type="text" placeholder='Title' onChange={(e) => setName(e.target.value)}/>
        <input className="input" type="text" placeholder='Note' onChange={(e) => setAge(e.target.value)}/>
        <input className="input" type="text" placeholder='Date' onChange={(e) => setUsername(e.target.value)}/>
        <button onClick={createUser}>Create User</button>
      </div>
    </div>
  );
}

export default App;
