export default class NotesApI {
    static getAllNotes() {

        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");
        return notes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    static saveNote(NoteToSave) {

        const notes = NotesApI.getAllNotes();
        const existing = notes.find(note => note.id == NoteToSave.id);

        if (existing) {

            existing.title = NoteToSave.title;
            existing.body = NoteToSave.body;
            existing.update = new Date().toISOString();

        }
        else {

            NoteToSave.id = Math.floor(Math.random() * 1000000);
            NoteToSave.updated = new Date().toISOString();

            notes.push(NoteToSave);

        }


        localStorage.setItem("notesapp-notes", JSON.stringify(notes));

    }

    static deleteNote(id) {

        const notes = NotesApI.getAllNotes();
        const newNotes = notes.filter(note => note.id!= id);

        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));

    }
}