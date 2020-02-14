'use strict'

let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy:'byEdited'
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', (e) => {
    // console.log(' button clicked', e)
    const id = uuidv4()
    const timestamp = moment().valueOf()
    notes.push({
        id: id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp
    })
    savedNotes(notes)
    location.assign(`/edit.html#${id}`)    
})

document.querySelector('#search-box').addEventListener('input', (e) => {
    // console.log(e.target.value)
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filtered-by').addEventListener('change', (e) => {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

window.addEventListener('storage', (e)  => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})
