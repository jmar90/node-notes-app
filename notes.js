// Require fs module
const fs = require('fs');
const chalk = require('chalk');

// Create addNote function
const addNote = (title, body) => {
	const notes = loadNotes();  // Load in existing notes
	const duplicateNote = notes.find((note) => note.title === title)

	if (!duplicateNote){ //if NO duplicate note, run below code
		notes.push({  //push title & body (as object) provided by user into notes array 
			title: title,
			body: body
		})
		saveNotes(notes); //save new notes array
		console.log(chalk.green.inverse('New note added!'));
	} else {
		console.log(chalk.red.inverse('Note title taken!'));
	}
}

// Create removeNote function
const removeNote = (title) => {
	const notes = loadNotes(); 
	const notesToKeep = notes.filter((note) => { title !== note.title })

	if(notes.length > notesToKeep.length){ //If notes > notesToKeep, something was removed
		console.log(chalk.green.inverse('Note removed!'));
		saveNotes(notesToKeep);
	} else {
		console.log(chalk.red.inverse('No note found!'))
	}
}

// Create listNotes function
const listNotes = () => {
	const notes = loadNotes();
	console.log(chalk.cyan.inverse('Your notes:'));
	notes.forEach(note => {
		console.log(note.title);
	});
}

// Create readNotes function
const readNotes = (title) => {
	const notes = loadNotes();
	const noteToRead = notes.find(note => note.title === title);

	if(noteToRead){
		console.log(chalk.green.bold.underline(noteToRead.title));
		console.log(noteToRead.body);
	} else {
		console.log(chalk.red.inverse('No note found'));
	}
}

// Function that saves notes
const saveNotes = (notes) => {
	const dataJSON = JSON.stringify(notes); //turn JS object into JSON string
	fs.writeFileSync('notes.json', dataJSON); //save data into file
}

// Function that will load current notes, convert to buffer/binary then to string & finally to JS object
const loadNotes = () => {	
	try {
		const dataBuffer = fs.readFileSync('notes.json');
		const dataJSON = dataBuffer.toString();
		return JSON.parse(dataJSON);
	} catch(err){ //if try code fails error, catch block will run
		return []; //return empty array
	}
}

// Export properties from file
module.exports = {  //export properties
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNotes: readNotes
};