const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs')

const notes = require('./notes');

const titleOptions = {
  describe: 'title of new note',
  demand: true,
  alias: 't',
};

const bodyOptions = {
  describe: 'body text of new note',
  demand: true,
  alias: 'b',
};

const argv = yargs
  .command('add', 'add a new note', {
    title: titleOptions,
    body: bodyOptions,
  })
  .command('list', 'list all notes')
  .command('read', 'read a note', {
    title: titleOptions,
  })
  .command('remove', 'note to remove', {
    title: titleOptions,
  })
  .help()
  .argv

const command = argv._[0];

switch (command) {
  case 'add':
    const note = notes.addNote(argv.title, argv.body)
      .then((note) =>
        note ?
          notes.logNote('Note created', note) :
          console.log('Note title already exists'))
      .catch(err => console.log('Error adding note: ', err));
    break;
  case 'list':
    const allNotes = notes.getAll()
      .then((data) => {
        console.log(`Printing ${data.length} note(s).\n`);
        data.forEach(item => notes.logNote('Notes', item));
      })
      .catch(err => console.log('Error getting all notes: ', err));
    break;
  case 'read':
    const noteRetrieved = notes.getNote(argv.title)
      .then(note => notes.logNote('Note retrieved', note))
      .catch(err => console.log('Note not found'));
    break;
  case 'remove':
    const noteRemoved = notes.removeNote(argv.title)
      .then(noteRemoved =>
        noteRemoved ? console.log('Note was removed') : console.log('Note not found'))
      .catch(err => console.log('Error remove note: ', err));
    break;
  default:
    console.log('Command not recognized');  
}
