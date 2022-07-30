import NotesApI from "./NotesAPI.js"
import NotesView from "./NotesView.js"

NotesApI.saveNote({
    title:"next note",
    body:"i am new note"
});

const app = document.getElementById("app");
const view = new NotesView(app,{
    onNoteAdd(){
        console.log("Note has been added!");
    },
    onNoteEdit(newTitle,newBody){

        console.log(newTitle);
        console.log(newBody);
    }
});

view.updateNoteList(NotesApI.getAllNotes());