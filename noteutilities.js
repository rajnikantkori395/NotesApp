

import Note from "./models.js";


const NOTES_MAIN_STORE = "MAIN_STORE";
const NOTES_DELETED_STORE = "DELETED_STORE";
const root = document.getElementById('populate');
let cboxid="";



//************ EVENTS ******************** */
populateData();

// When Add button clicked
document.getElementById('add').addEventListener('click', () => {
    let id = 0;
    let title = document.getElementById("text1").value;
    let desc = document.getElementById('desc').value;
    if (title == '') { alert('First enter title') }
    else {
        let note = new Note(id, title, desc);
        addNotes(note);
        populateData();
        document.location.reload(true);
        document.getElementById("text1").value = '';
        document.getElementById('desc').value = '';
        alert('Note Added');
    }
});
// when delete button clicked

root.querySelectorAll('._delete').forEach(element => {
    element.addEventListener('click', () => {
        const doDelete = confirm('Are you sure?');
        if (doDelete) {
            deleteNote(element.dataset.deleteId);
            populateData();
            document.location.reload(true);
        }
    });
});

//when edit button is clicked
root.querySelectorAll('.edit').forEach(element => {
    element.addEventListener('click', () => {
        document.getElementById('add').disabled = true;
        let main_data_array = JSON.parse(localStorage.getItem(NOTES_MAIN_STORE) || '[]');
        let id = element.dataset.editId;
        if (id) {
            let searched_item = main_data_array.filter(t => t.id == id);
            if (searched_item != null) {
                document.getElementById("text1").value = searched_item[0].title;
                document.getElementById("desc").value = searched_item[0].desc;
                document.querySelector('.edt').addEventListener('click', () => {
                    let title = document.getElementById("text1").value;
                    let desc = document.getElementById('desc').value;
                    if (title == '') { alert('First enter title') }
                    else {
                        let note = new Note(id, title, desc);
                        UpdateNotes(note);
                        populateData();
                        document.getElementById("text1").value = '';
                        document.getElementById('desc').value = '';
                        alert('Note Updated');
                        document.location.reload(true);
                    }
                });

            }
        }
    });
});

 root.querySelectorAll(".cbox").forEach(element=>
    element.addEventListener('click',()=>{
        cboxid += element.dataset.checkId;
        let x=cboxid.split('');
        console.log(x);
        document.querySelector(".delselect").addEventListener('click',()=>{
         DeleteSelected(x);
         document.location.reload(true);
        });
        
    }));







function onDeleteNotesClick(holderControl) {
    //evaluate all the checkboxes that are checked 
}
//***************************** END OF EVENTS  ********************** */
document.querySelectorAll('.clr')[0].addEventListener('click', clr);
function clr() {
    localStorage.clear();
    populateData();
}



function populateData() {
    let main_data_array = JSON.parse(localStorage.getItem(NOTES_MAIN_STORE) || '[]');
    if (main_data_array.length!=0) {
        let str = "";
        let sNo = 1;
        main_data_array.sort((a, b) => {
            return new Date(a._date) > new Date(b._date) ? -1 : 1;
        });
        main_data_array.forEach((element) => {

            str = str +
                `<div class="box2-2" data-box-id="${element.id}">
                <h3><input type="checkbox" data-check-id="${element.id}" class="cbox">${sNo}</h3>
            <h3 class="note-title" >${element.title}</h3>
            <p class="note">${element.desc}</p>
            <button class="_delete" data-delete-id="${element.id}">Delete Note</button>
            <button class="edit" data-edit-id=${element.id} >Edit Note</button>
            <p class="date">${element._date} </p>
            </div>`

            sNo++;
        });
        root.innerHTML = str;

    }
    else{
        root.innerHTML = `<h1>No Notes Available<h1>`
    }

}

function GetMaxIdFromNotes(main_data_array) {
    let id = 0;
    for (let i = 0; i < main_data_array.length; i++) {
        id = main_data_array[i].id > id ? main_data_array[i].id : id;
    }
    return id;
}

function addNotes(note) {
    //Increment the latest ID 
    note._date = new Date().toLocaleString();
    let main_data_array = JSON.parse(localStorage.getItem(NOTES_MAIN_STORE) || '[]');

    note.id = GetMaxIdFromNotes(main_data_array) + 1;
    main_data_array.push(note);
    localStorage.setItem(NOTES_MAIN_STORE, JSON.stringify(main_data_array));
}

function deleteNote(id) {
    console.log(id);
    let main_data_array = JSON.parse(localStorage.getItem(NOTES_MAIN_STORE) || '[]');
    let deleted_array = JSON.parse(localStorage.getItem(NOTES_DELETED_STORE) || '[]');

    let searched_item = main_data_array.filter(t => t.id == id);
    // let index = main_data_array.findIndex(x => x.Id === id);
    if (searched_item != null) {
        deleted_array.push(searched_item[0]);
        // main_data_array.splice(index, 1);
        //apply remove logic
    }
    const newNotes = main_data_array.filter(note => note.id != id);
    localStorage.setItem(NOTES_MAIN_STORE, JSON.stringify(newNotes));
    localStorage.setItem(NOTES_DELETED_STORE, JSON.stringify(deleted_array));
}


function UpdateNotes(noteToSave) {

    
    let main_data_array = JSON.parse(localStorage.getItem(NOTES_MAIN_STORE) || '[]');
    
    const existing = main_data_array.find(note =>note.id==noteToSave.id);
    
     if (existing) {
        existing.title = noteToSave.title;
        existing.desc = noteToSave.desc;
        existing._date = new Date().toLocaleString();
    }

    localStorage.setItem(NOTES_MAIN_STORE, JSON.stringify(main_data_array));

}




function DeleteSelected(ids) {

    let main_data_array = JSON.parse(localStorage.getItem(NOTES_MAIN_STORE) || '[]');
     for(let id of ids){
        var delNotes = main_data_array.find(note=>note.id==id);
        console.log(delNotes);
     }
   let newArray  = main_data_array.filter(t=>t.id!=delNotes.id);
//    let newDelArray  = main_data_array.filter(t=>t.id==delNotes.id);
   localStorage.setItem(NOTES_MAIN_STORE, JSON.stringify(newArray));
     
    

}

document.querySelector('.archive').addEventListener('click',()=>{
    root.style.visibility= "hidden";
});
document.querySelector('.show').addEventListener('click',()=>{
root.style.visibility= "visible";
});


//when restore button is clicked...
document.querySelector('.restoreall').addEventListener('click', () => {
    let deleted_array = JSON.parse(localStorage.getItem(NOTES_DELETED_STORE) || '[]');
    let main_data_array = JSON.parse(localStorage.getItem(NOTES_MAIN_STORE) || '[]');
    for (let i of deleted_array) {
        main_data_array.push(i);
    }
    localStorage.setItem(NOTES_MAIN_STORE, JSON.stringify(main_data_array));
    localStorage.setItem(NOTES_DELETED_STORE, JSON.stringify([]));
    populateData();
    document.location.reload(true);
});


