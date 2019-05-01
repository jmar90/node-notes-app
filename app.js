// REQUIRE MODULES
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');  

// Customize yargs version
yargs.version('1.1.0');

// Create add command (access in terminal by typing: node app.js add)
yargs.command({
	command: 'add',
	describe: 'Add a new note',
	builder: {  //spcifiy options for command
		title: {	 //add title by typing: node app.js add --title="Shopping list"
			describe: 'Note title',
			demandOption: true,  //have to provide title for script to run
			type: 'string'  //title must always be a string
		},
		body: {
			describe: 'Body of note',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv){	//what code actually runs when 'add' command typed. argv = arguments.
		notes.addNote(argv.title, argv.body) 
			//the add command will run the addNote function defined in notes.js. Whatever values entered by the user in command
			//line for title & body will be what gets added to note (eg, node app.js add --title="shopping list" --body="eggs"
			//here, argv.title = shopping list & argv.body = eggs)
	}
})
	//Example syntax run in terminal: node app.js add --title="Shopping List" --body="Toilet paper"

// Create remove command
yargs.command({
	command: 'remove',
	describe: 'Remove a note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv){
		notes.removeNote(argv.title)
	}
})

// Create list command
yargs.command({
	command: 'list',
	describe: 'List your notes',
	handler(){
		notes.listNotes();
	}
})

// Create read command
yargs.command({
	command: 'read',
	describe: 'Read a note',
	builder: {
		title: {
			describe: 'Note title',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv){
		notes.readNotes(argv.title);
	}
})

yargs.parse(); //parses arguments with the configurations you provided
