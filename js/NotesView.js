export default class NotesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `
        <div class="box1" >
            <h1 class="header">Your  Privacy In Your Hand</h1>
            <div class="box1-1">
                <input type="text" class="notes__title" id="text1" placeholder="Enter the title">
                <textarea class="text2" placeholder="Enter your note"></textarea>
                <button class="notes__add" id="add">Add Note</button>
            </div>
        </div>

        <div class = "box2"></div>

        `;

        const btnAddNote = this.root.querySelector(".notes__add");
        const inpTitle = this.root.querySelector(".notes__title");
        const inpBody = this.root.querySelector(".text2");

        btnAddNote.addEventListener("click", () => {
            this.onNoteAdd();
        });

        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", () => {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();

                this.onNoteEdit(updatedTitle, updatedBody);

            });
        });

        console.log(this._createListItemHTML(300, "Hey", "yeah", new Date()));


    }
    _createListItemHTML(id, title, body, updated) {
        const MAX_BODY_LENGTH = 60;

        return `
        <div data-note-id="${id}" >
            <h1>Your Notes</h1>
            <div class="box2-2">
                <h3 class="note-title">${title}</h3>
                <p class="note">
                ${body.substring(0, MAX_BODY_LENGTH)}
                ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </p>
                <button class="delete">Delete Note</button>
                <button class="edit">Edit Note</button>
                <h6 class="date">${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })} </h6>
            </div>
        </div>`
    }

    updateNoteList(notes) {

        const notesListContainer = this.root.querySelector(".box2");
        //Empty List
        notesListContainer.innerHTML = "";

        for (const note of notes) {
            const Html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));

            notesListContainer.insertAdjacentHTML("beforeend",Html);
        }

    }
}