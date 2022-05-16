import ReactMarkdown from "react-markdown";

const NoteEditor = ({ activeNote, onUpdateNote }) => {
    const onEditField = (field, value) => {
        onUpdateNote({
            ...activeNote,
            [field]: value,
            last_modified: Date.now(),
        });
    };

    if (!activeNote) return <div className="no-active-note">No Active Note</div>;

    return (
        <div className="app-main">
            <div className="app-main-note-edit">
                <input
                    className="input-note"
                    type="text"
                    id="title"
                    placeholder="Note Title"
                    value={activeNote.title}
                    onChange={(e) => onEditField("title", e.target.value)}
                    autoFocus
                />
                <textarea
                    className="textarea-note"
                    id="text"
                    placeholder="Write your note here..."
                    value={activeNote.text}
                    onChange={(e) => onEditField("text", e.target.value)}
                />
            </div>
            <div className="app-main-note-preview">
                <h1 className="preview-title">{activeNote.title}</h1>
                <ReactMarkdown className="markdown-preview">
                    {activeNote.text}
                </ReactMarkdown>
            </div>
        </div>
    );
};

export default NoteEditor;