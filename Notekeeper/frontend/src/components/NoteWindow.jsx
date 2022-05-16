import { useEffect, useState } from "react";
import NoteEditor from "./NoteEditor";
import Sidebar from "./Sidebar";
import "../css/notes.css"
import axios from "axios";

function NotesWindow(props) {
    const [activeNote, setActiveNote] = useState(false);
    const notes_all = props.notes
    const [notes, setNotes] = useState(
        notes_all
    );

    const createNote = async () => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.get("http://localhost:8080/api/notes/new", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                let note = response.data
                note.last_modified = Date.now()
                setNotes([note, ...notes]);
                setActiveNote(note.id);
            })
        } catch (err) {
            console.error(err.message);
        }
    };

    const onAddNote = () => {
        createNote()
        console.log(notes)
    };

    const deleteNote = async (noteId) => {
        try {
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.delete("http://localhost:8080/api/notes/" + noteId, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
                setNotes(notes.filter(({ id }) => id !== noteId));
            })
        } catch (err) {
            console.error(err.message);
        }
    };

    const postNotes = async () => {
        try {
            console.log(notes)
            let token = JSON.parse(localStorage.getItem("user"));
            await axios.post("http://localhost:8080/api/notes/",notes, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then((response) => {
            })
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);


    const onDeleteNote = (noteId) => {
        deleteNote(noteId)
    };

    const onUpdateNote = (updatedNote) => {
        const updatedNotesArr = notes.map((note) => {
            if (note.id === updatedNote.id) {
                return updatedNote;
            }

            return note;
        });
        setNotes(updatedNotesArr);
    };

    const getActiveNote = () => {
        return notes.find(({ id }) => id === activeNote);
    };

    return (
        <div className="app">
            <Sidebar
                notes={notes}
                onAddNote={onAddNote}
                onDeleteNote={onDeleteNote}
                activeNote={activeNote}
                setActiveNote={setActiveNote}
                saveNotes = {postNotes}
            />
            <NoteEditor activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
        </div>
    );
}

export default NotesWindow;