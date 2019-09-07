const chalk = require("chalk");
const yargs = require("yargs");
const notes = require("./notes");

//Version number
yargs.version("1.0.1");

//commands
yargs.command({
  command: "add",
  describe: "Add a note",
  builder: {
    title: {
      describe: "Title of the Note",
      demandOption: true,
      type: "string"
    },
    body: {
      describe: "Content of the Note",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv){
    notes.addNote(argv.title, argv.body)
  }
});

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Title of the Note",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv){
    notes.removeNote(argv.title)
  }
});

yargs.command({
  command: "read",
  describe: "View a note",
  builder: {
    title: {
      describe: "Title of the Note",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.readNote(argv.title)
  }
});

yargs.command({
  command: "list",
  describe: "List all available notes",
  handler() {
    console.log(chalk.bold.blue("Your Notes...."));
    notes.listNotes()
  }
});

yargs.parse();
