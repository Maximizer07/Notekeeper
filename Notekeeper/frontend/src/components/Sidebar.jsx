const Sidebar = ({
                     notes,
                     onAddNote,
                     saveNotes,
                     onDeleteNote,
                     activeNote,
                     setActiveNote,
                 }) => {
    const sortedNotes = notes.sort((a, b) => b.last_modified - a.last_modified);

    return (
        <div className="app-sidebar">
            <div className="app-sidebar-header">
                <h1>Notes</h1>
                <button className="sidebar-btn" onClick={saveNotes}>Save</button>
                <button className="sidebar-btn" onClick={onAddNote}>Add</button>
            </div>
            <div className="app-sidebar-notes">
                {sortedNotes.map(({ id, title, text, last_modified }, i) => (
                    <div
                        className={`app-sidebar-note ${id === activeNote && "active"}`}
                        onClick={() => setActiveNote(id)}
                    >
                        <div className="sidebar-note-title">
                            <strong>{title}</strong>
                            <button className="sidebar-btn" onClick={(e) => onDeleteNote(id)}>Delete</button>
                        </div>

                        <p>{text && text.substr(0, 100) + "..."}</p>
                        <small className="note-meta">
                            Last Modified{" "}
                            {new Date(last_modified).toLocaleDateString("en-GB", {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </small>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;