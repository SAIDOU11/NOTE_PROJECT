import { useEffect, useState } from 'react';
import Split from 'react-split';
import Sidebar from './component/Sidebar.jsx';
import Editor from './component/Editor.jsx';
import { addDoc, deleteDoc, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { notesCollection, db } from './firebase.js';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [currentNodeId, setCurrentNoteId] = useState('');
  const [tempNoteText, setTempNoteText] = useState('');

  const currentNote =
    notes.find((note) => note.id === currentNodeId) || notes[0];

  const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt);

  useEffect(
    () => {
      const unsubscribe = onSnapshot(notesCollection, (snapchot) => {
        // Sync up our local notes array with the snapchot data
        const notesArr = snapchot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setNotes(notesArr);
      });

      return () => unsubscribe;
    },
    [] // Every times the notes array changes.
  );

  useEffect(() => {
    if (!currentNodeId) {
      setCurrentNoteId(notes[0]?.id);
    }
  }, [notes]);

  useEffect(() => {
    if (currentNote) {
      setTempNoteText(currentNote.body);
    }
  }, [currentNote]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (tempNoteText !== currentNote.body) {
        updateNote(tempNoteText);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [tempNoteText]);

  const createNewNote = async () => {
    const newNote = {
      body: "# Type your markdown note's title here. ",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const newNoteRef = await addDoc(notesCollection, newNote);
    setCurrentNoteId(newNoteRef.id);
  };

  const updateNote = async (text) => {
    const docRef = doc(db, 'notes', currentNodeId);
    await setDoc(
      docRef,
      { body: text, updatedAt: Date.now() },
      { merge: true }
    );
  };

  const deleteNote = async (noteId) => {
    const docRef = doc(db, 'notes', noteId);
    await deleteDoc(docRef);
  };

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={sortedNotes}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />

          <Editor
            tempNoteText={tempNoteText}
            setTempNoteText={setTempNoteText}
          />
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

/*




*/
