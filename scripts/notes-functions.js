'use strict'

//Read exising notes from Local Storage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')

    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    }
}

//Remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

//generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')
    // const button = document.createElement('button')

    //Setup the note title text
    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'Unnamed Content'
    }
    // textEl.setAttribute('href', `/edit.html#${note.id}`)
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    //setup the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    //setup the status message
    statusEl.textContent = generateLastEdited(note.updateAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)
    return noteEl
}

//Save the notes to Local Storage
const savedNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

//Sort your notes by one of three ways
const sortNotes = (notes, sortBy) => {
    if(sortBy === 'byEdited') {
        return notes.sort(function (a, b) {
            if (a.updatedAt > b.updatedAt) {
                return -1
            } else if (a.updatedAt < b.updatedAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if(a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetical') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase ()) {
                return -1
            } else if (a.title.toLowerCase () > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    } else {
        return notes
    }
}

//Render application notes
const renderNotes = (notes, filters) => {
    const notesEl = document.querySelector('#notes')
    notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML = ''
    if (filteredNotes.length > 0) {
        // console.log(filteredNotes)
        filteredNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    } else {
        const emptyNotes = document.createElement('p')
        emptyNotes.textContent = `You don't have notes here.`
        emptyNotes.classList.add('empty-notes')
        notesEl.appendChild(emptyNotes)
    }
}

// Generate the last edited messge
const generateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`
}