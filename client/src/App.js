import "./App.css";
import { useState, useEffect, useId } from "react";
import Axios from "axios";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import Modal from "./Modal";
import { v4 as uuid } from "uuid";
import DeleteModal from "./deleteModal";
// import DeleteModal from './deleteModal';

function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [notesBody, setNotesBody] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showDeleteModal, setDeleteModal] = useState(false);
  const [searchInfo, setSearchInfo] = useState("")
  var date = new Date().toLocaleString();
  const id = uuid();

  useEffect(() => {
    Axios.get("http://localhost:3001/getNotes").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const createUser = () => {
    if (title === "" || notesBody === "") {
      setShowAlert(true);
      setErrorMsg("Inputs are empty");
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } else {
      Axios.post("http://localhost:3001/createNote", {
        title,
        notesBody,
        date,
        id,
      }).then(() => {
        setListOfUsers([...listOfUsers, { title, notesBody, date, id }]);
      });
      Axios.get("http://localhost:3001/getNotes").then((response) => {
        setListOfUsers(response.data);
      });
      Axios.get("http://localhost:3001/getNotes").then((response) => {
        setListOfUsers(response.data);
      });
      setTitle("");
      setNotesBody("");
      setShowModal(false);
      setShowAlert(false);
    }
  };

  const buttonClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setShowAlert(false);
  };

  return (
    <div className="App">
      <button className="add" onClick={buttonClick}>
        <AiFillPlusCircle size={24} />
      </button>
      <h1>Welcome to Notes app</h1>
      <div className="search-bar">
        <input className="search"
          type="search"
          placeholder="Search here"
          value={searchInfo}
          onChange={(e) => {
            e.preventDefault()
            setSearchInfo(e.target.value)
            console.log(searchInfo)
          }} />
      </div>
      <Modal
        show={showModal}
        onClose={closeModal}
        name={title}
        age={notesBody}
        setName={(e) => setTitle(e.target.value)}
        setAge={(e) => setNotesBody(e.target.value)}
        createCard={createUser}
        error={errorMsg}
        showAlert={showAlert}
        removeMsg={() => setShowAlert(false)}
      />
      <div className="notes">
        {listOfUsers.map((note, notes) => {
          if (note._id === undefined) {
            Axios.get("http://localhost:3001/getNotes").then((response) => {
              setListOfUsers(response.data);
            });
          }
            return (
              <div className="users" key={notes}>
                <div className="note-info">
                  <h1>{note.title}</h1>
                  <li>{note.notesBody}</li>
                </div>
                <div className="notes-footer">
                  <li>{note.date}</li>
                  <button
                    onClick={() => {
                      Axios.delete(
                        `http://localhost:3001/deleteNote/${note._id}`
                      ).then(() => {
                        setListOfUsers(
                          listOfUsers.filter((val) => {
                            return val._id !== note._id;
                          })
                        );
                        Axios.get("http://localhost:3001/getNotes").then(
                          (response) => {
                            setListOfUsers(response.data);
                          }
                        );
                        Axios.get("http://localhost:3001/getNotes").then(
                          (response) => {
                            setListOfUsers(response.data);
                          }
                        );
                      });
                      setDeleteModal(true);
                    }}
                    id="delete-button"
                  >
                    <BsFillTrashFill size={24} />
                  </button>
                </div>
              </div>
            )
        })
        }
      </div>
    </div>
  );
}

export default App;
