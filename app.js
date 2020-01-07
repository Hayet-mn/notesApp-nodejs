const fs=require('fs');
const yargs=require('yargs');
const notes=require('./notes.js');


const argv=yargs.command('add','Add a new note.')
.command('list','List all notes')
.command('read','Read a note')
.command('remove','Remove a note')
.help()
.argv;


var command=argv._[0];

if(command === 'add'){

  var note=notes.addNote(argv.title,argv.body);
  
  if(note){
    console.log('Note Created Successfully');
    notes.logNote(note);
  }
  else {
    console.log('Note Title already taken');
  }
}
else if (command === 'list') {
  var allNotes=notes.getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach((note)=>notes.logNote(note));
}
else if (command ==='read') {
  var note=notes.getNote(argv.title);
  if(note){
    console.log('Note Found');
    notes.logNote(note);
  }
  else {
    console.log('Note not found');
  }
}
else if(command ==='remove'){
  var noteRemoved=notes.removeNote(argv.title);
  var message=noteRemoved?'Note was removed':'Note not found';
  console.log(message);
}
else {
  console.log('Command not recognized');
}