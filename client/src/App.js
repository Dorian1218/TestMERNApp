import './App.css';
import { useState, useEffect } from "react"
import Axios from "axios"
import { AiFillPlusCircle } from "react-icons/ai"
import Modal from './Modal';

function App() {

  const [listOfUsers, setListOfUsers] = useState([])
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [showAlert, setShowAlert] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")
  var date = new Date().toLocaleString()

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((response) => {
      setListOfUsers(response.data)
    })
  }, [])

  const createUser = () => {
    if (name === "" && age === "") {
      setShowAlert(true)
      setErrorMsg("Inputs are empty")
    }
    else {
      console.log(date)
      Axios.post("http://localhost:3001/createUser", { name, age, date }).then((response) => {
        setListOfUsers([...listOfUsers, { name, age, date }])
      })
      Axios.get("http://localhost:3001/getUsers").then((response) => {
        setListOfUsers(response.data)
      })
      setName("")
      setAge("")
      setShowModal(false)
      setShowAlert(false)
    }
  }

  const buttonClick = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setShowAlert(false)
  }

  return (
    <div className="App">
      <button className='add' onClick={buttonClick}><AiFillPlusCircle size={24} /></button>
      <h1>Welcome to Notes app</h1>
      <Modal show={showModal} onClose={closeModal} name={name} age={age} setName={(e) => setName(e.target.value)} setAge={(e) => setAge(e.target.value)} createCard={createUser} error={errorMsg} showAlert={showAlert} removeMsg={() => setShowAlert(false)} />
      <div className='notes'>
        {listOfUsers.map((user, users) => {
          return (
            <div className="users" key={users}>
              <div className='note-info'>
                <h1>{user.name}</h1>
                <li>{user.age}</li>
              </div>
              <div>
                <li>{user.date}</li>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
