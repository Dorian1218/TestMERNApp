import React from 'react'
import { useState, useEffect, useId } from "react";
import Axios from "axios";
import { AiFillPlusCircle } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import Modal from "../Modal";
import { AuthContextProvider, UserAuth } from "../AuthContext";
import { Routes, Route } from "react-router-dom"
import Signup from "../pages/Signup";
import ModalPop from '../Modal';
import Alert from '../Alert';
function Home() {
    const [listOfUsers, setListOfUsers] = useState([]);
    const [title, setTitle] = useState("");
    const [notesBody, setNotesBody] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showAddAlert, setShowAddAlert] = useState(false);
    const [errorAddMsg, setErrorAddMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [showDeleteModal, setDeleteModal] = useState(false);
    const [searchInfo, setSearchInfo] = useState("");
    var date = new Date().toLocaleString();
    const { user } = UserAuth()
    var useremail
    if (user) {
        useremail = user.email
    }

    useEffect(() => {
        Axios.get("http://localhost:3001/getNotes").then((response) => {
            setListOfUsers(response.data);
            console.log(listOfUsers);
        });
    }, []);

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

    return (
        <AuthContextProvider>
            <Routes>
                <Route path="/Signup" element={<Signup />}></Route>
            </Routes>
            <div style={{display: "flex", justifyContent: "flex-start"}}>
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