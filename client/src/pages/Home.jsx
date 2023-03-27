import React from 'react'
import { useState, useEffect } from "react";
import Axios from "axios";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { GrUpdate } from "react-icons/gr"
import { AuthContextProvider, UserAuth } from "../AuthContext";
import { Routes, Route } from "react-router-dom"
import Signup from "../pages/Signup";
import ModalPop from '../Modal';
import Alert from '../Alert';
import UpdateModal from '../UpdateModal';
function Home() {
    const [listOfUsers, setListOfUsers] = useState([]);
    const [title, setTitle] = useState("");
    const [notesBody, setNotesBody] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showAddAlert, setShowAddAlert] = useState(false);
    const [errorAddMsg, setErrorAddMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [setDeleteModal] = useState(false);
    const [searchInfo, setSearchInfo] = useState("");
    var [currentTitle, setCurrentTitle] = useState("")
    var [currentNoteBody, setCurrentNoteBody] = useState("")
    const [showUpdate, setShowUpdate] = useState(false)
    var [currentId, setCurrentId] = useState("")
    var date = new Date().toLocaleString();
    const { user } = UserAuth()
    var useremail
    if (user) {
        useremail = user.email
    }
    
    useEffect(() => {
        Axios.get("http://localhost:3001/getNotes").then((response) => {
            setListOfUsers(response.data);
        });
    }, [listOfUsers]);

    const shownList = listOfUsers.filter((val) => {
        return (val.useremail === useremail)
    })

    const filteredList = shownList.filter((val) => {
        return ((val.title.toLowerCase() + val.notesBody.toLowerCase()).replace("'", "")).includes(searchInfo.toLowerCase().replace(" ", "").replace("'", ""));
    });

    const createUser = () => {
        if (title.length === 0 || notesBody.length === 0) {
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
                useremail
            }).then(() => {
                setListOfUsers([...listOfUsers, { title, notesBody, date, useremail }]);
            });
            setTitle("");
            setNotesBody("");
            setShowModal(false);
            setShowAlert(false);
        }
    };

    const buttonClick = () => {
        if (!user) {
            setShowAddAlert(true)
            setErrorAddMsg("You need to log in")
            setTimeout(() => {
                setShowAddAlert(false);
            }, 2000);
        }
        else {
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
        setShowAlert(false);
    };

    const updateNote = (id) => {
        try{
            Axios.put("http://localhost:3001/update", {id: id, newNoteTitle: currentTitle, newNoteNotesBody: currentNoteBody})
        } catch (err) {
            console.log(err)
        }
        console.log(currentTitle)
        setShowUpdate(false)
    }

    return (
        <AuthContextProvider>
            <Routes>
                <Route path="/Signup" element={<Signup />}></Route>
            </Routes>
            <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <button className="add" onClick={buttonClick}>
                    <AiFillPlusCircle size={35} />
                </button>
            </div>
            <h1>Notes app</h1>
            <div className="search-bar">
                <input
                    className="search"
                    type="search"
                    placeholder="Search Note Title"
                    value={searchInfo}
                    onChange={(e) => {
                        e.preventDefault();
                        setSearchInfo(e.target.value);
                    }}
                />
            </div>
            <ModalPop
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
            <UpdateModal 
                show={showUpdate}
                onClose={() => {setShowUpdate(false)}}
                name={currentTitle}
                age={currentNoteBody}
                setName={(e) => setCurrentTitle(e.target.value)}
                setAge={(e) => setCurrentNoteBody(e.target.value)}
                updateNote={() => {updateNote(currentId)}}
            />
            {!user && <p><b>Please Sign in to start creating notes!</b></p>}
            {shownList.length === 0 && user && <p><b>Press the add icon to create your first note</b></p>}
            <Alert showAlertMsg={showAddAlert} message={errorAddMsg}></Alert>
            <div className="notes">
                {searchInfo.length === 0 &&
                    shownList.map((note, notes) => {
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
                                    <button className='delete-button' onClick={() => {
                                        setCurrentId(note._id)
                                        setCurrentTitle(note.title)
                                        setCurrentNoteBody(note.notesBody)
                                        console.log(currentTitle)
                                        setShowUpdate(true)
                                    }}>
                                        <GrUpdate size={24} />
                                    </button>
                                    <button
                                        onClick={() => {
                                            console.log(note._id)
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
                                        className="delete-button"
                                    >
                                        <BsFillTrashFill size={24} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}

                {searchInfo.length > 0 &&
                    filteredList.map((note, notes) => {
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
                                        className="delete-button"
                                    >
                                        <BsFillTrashFill size={24} />
                                    </button>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </AuthContextProvider>
    )
}

export default Home