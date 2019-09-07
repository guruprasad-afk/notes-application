const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()

    const duplicateNote = notes.find( (note) => note.title === title )

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New Note Added'))
    }
    else{
        console.log(chalk.red.inverse('Title Already Taken'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()

    const notesToKeep = notes.filter( (note) => note.title !== title )

    if( notesToKeep.length < notes.length ) {
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse('Note Removed Successfully'))
    }
    else {
        console.log(chalk.red.inverse('No Note Found!!'))
    }
}

const listNotes = () => {
    const notes = loadNotes()

    notes.forEach( (note) => console.log(note.title) )
}

const readNote = (title) => {
    const notes = loadNotes()

    const foundNote = notes.find( (note) => note.title === title )

    if (foundNote) {
        console.log(chalk.bold.inverse(foundNote.title))

        console.log(foundNote.body)
    }
    else {
        console.log(chalk.red.inverse('No Note Found'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)

    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        return JSON.parse(dataBuffer.toString())
    } 
    catch(e){
        return []
    }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
}
