import { useState } from 'react';
import Split from 'react-split';
import data from './data.jsx';
import { nanoid } from 'nanoid';
import Sidebar from './component/Sidebar.jsx';
import Editor from './component/Editor.jsx';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNodeId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ''
  );

  const createNewNote = () => {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here. ",
    };
    setNotes((prevNotes) => {
      return prevNotes.map((oldNote) => {
        return oldNote.id === currentNodeId
          ? { ...oldNote, body: text }
          : oldNote;
      });
    });
  };

  const updateNote = (text) => {
    setNotes((prevNotes) =>
      prevNotes.map((oldNote) => {
        return oldNote.id === currentNodeId
          ? { ...oldNote, body: text }
          : oldNote;
      })
    );
  };

  const findCurrentNote = () => {
    notes.find((note) => {
      return note.id === currentNodeId;
    }) || notes[0];
  };

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNode={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
          />
          {currentNodeId && notes.length > 0 && (
            <Editor currentNode={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button onClick={createNewNote} className="first-note">
            Create one now
          </button>
        </div>
      )}
    </main>
  );
};

export default App;
