const fs = require('fs');

const fetchNotes = () => new Promise((resolve, reject) =>
  fs.readFile('notes.json', 'utf8', (err, data) => {
    if (err) {
      reject([]);
    } else {
      resolve(JSON.parse(data));
    }
  }));

const saveNotes = (notes) => new Promise((resolve, reject) => {
  fs.writeFile('notes.json', JSON.stringify(notes), (err) => {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  })
});

const logNote = (prependedText, note) =>
  console.log(`${prependedText}\n--\nTitle: ${note.title}\nBody: ${note.body}\n`);

async function addNote(title, body) {
  let notes = [];
  const note = {
    title,
    body
  };

  try {
    // add existing notes from the existing file
    notes = await fetchNotes();
  } catch (err) {
    // file does not exist
  }

  if (notes.length) {
    // file exists and checking for duplicates by Title
    const duplicates = notes.filter(dataItem => dataItem.title === note.title);
    if (!duplicates.length) {
      // if there are no duplicates add the note to the file
      notes.push(note);
      await saveNotes(notes);
      return note;
    }
  } else {
    // Should only occur if the file does not exist
    await saveNotes([note]);
  }
}

const getAll = () => fetchNotes();

async function getNote(title) {
  let notes = [];
  try {
    notes = await fetchNotes();
  } catch (err) {
    
  }
  return notes.filter(note => note.title === title)[0];
}

async function removeNote(title) {
  let notes = [];
  try {
    notes = await fetchNotes();
  } catch (err) {

  }
  const filteredNotes = notes.filter(note => note.title !== title);
  saveNotes(filteredNotes);
  return notes.length !== filteredNotes.length;
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
};
