import {useState, useEffect} from "react";
import axios from "axios";
import NoteWindow from "./NoteWindow";
import {Spinner} from "react-bootstrap";
import React from "react";


export default function NotesWindow() {
    const [loading, setLoading] = useState(true)
    const [notes, setNotes] = useState([])
    const getNotes = async () => {
        try {

            console.log("tyt")
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/notes/", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                console.log(response.data)
                setNotes(response.data)
                setLoading(false)
            })
        } catch (err) {
            console.error(err.message);
        }
    };
    useEffect(() => {
        getNotes();
    }, []);
    return (
        <>
            {loading ? <Spinner animation="border" variant="primary" style={{width: '200', height: '200'}}/> :
                <NoteWindow notes={notes}/>
            }
        </>

    );
}