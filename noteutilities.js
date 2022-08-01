

import Note from "./models.js";


const NOTES_MAIN_STORE = "MAIN_STORE";
const NOTES_DELETED_STORE = "DELETED_STORE";
const root= document.getElementById('populate');

let somefunction = function () {
    let note = new Note(1, 't', 't');
}

//************ EVENTS ******************** */
populateData();
// DeleteNote(1);
// When Add button clicked
document.getElementById('add').addEventListener('click',()=>{
    let id = 0;
    let title = document.getElementById("text1").value;
    let desc = document.getElementById('desc').value;
    if (title == '') { alert('First enter title') }
    else {
        let note = new Note(id, title, desc);
        addNotes(note);
        populateData();
        document.getElementById("text1").value = '';
        document.getElementById('desc').value = '';
        alert('Note Added');
    }
});

// when delete button clicked

root.getElementsByClassName('_delete').forEach(element =>{
    element.addEventListener('click',()=>{
        const doDelete= confirm('Are you sure?');
        if(doDelete){
            DeleteNote(element.dataset.deleteId);
        }
    });
});

function onEditNoteClick(id) {

}



function onDeleteNotesClick(holderControl) {
    //evaluate all the checkboxes that are checked 
}
//***************************** END OF EVENTS  ********************** */

/**
 * This function will add notes to the collection
 * 
 */
function populateData() {
    
    let main_data_array = JSON.parse(localStorage.getItem(NOTES_MAIN_STORE) || '[]');
   
    if (main_data_array != null) {
        let str = "";
        main_data_array.forEach((element) => {
            str = str +
                `<div class="box2-2"><h3>${element.id}</h3>
            <h3 class="note-title">${element.title}</h3>
            <p class="note">${element.desc}</p>
            <button class="_delete" data-delete-id="${element.id}">Delete Note</button>
            <button class="edit">Edit Note</button>
            <p class="date">${element._date} </p>
            </div>`
        });

        root.innerHTML = str;
    }
}


function addNotes(note) {
    //Increment the latest ID 
    note._date = new Date().toLocaleString();
    let main_data_array = JSON.parse(localStorage.getItem(NOTES_MAIN_STORE) || '[]');
    
    note.id = GetMaxIdFromNotes(main_data_array) + 1;
    main_data_array.push(note);
    localStorage.setItem(NOTES_MAIN_STORE, JSON.stringify(main_data_array));
}

function GetMaxIdFromNotes(main_data_array) {
    let id = 0;
    for (let i = 0; i < main_data_array.length; i++) {
        id = main_data_array[i].id > id ? main_data_array[i].id : id;
    }
    // for (let i = 0; i < deleted_array.length; i++)
    //     id = main_data_array[i].id > id ? deleted_array[i].id : id;
    return id;
}
// function GetMaxIdFromDelete(){
//     let id=0;
//     for (let i = 0; i < deleted_array.length; i++)
//     id = main_data_array[i].id > id ? deleted_array[i].id : id;
//     return id;
// }



/**
 * This function will add notes to the collection
 * 
 */
function UpdateNotes(note) {

    //get the data from local storage
}


/**
 * This function will add notes to the collection
 * 
 */
function DeleteNote(id) {
    //get the data from local storage
    let main_data_array = JSON.parse(localStorage.getItem(NOTES_MAIN_STORE) || '[]');
    let deleted_array = JSON.parse(localStorage.getItem(NOTES_DELETED_STORE) || '[]');
    // let newArray= main_data_array.filter(t => t.id!==id);
    // localStorage.setItem(NOTES_MAIN_STORE,JSON.stringify(newArray));
    let searched_item = main_data_array.filter(t => t.id == id);
    let index = main_data_array.findIndex(x => x.Id === id);
    if (searched_item != null) {
        deleted_array.push(searched_item);
        main_data_array.splice(index, 1);
        //apply remove logic
    }
    // //after this step we will have id populated with max id value.
    // note.id = GetMaxIdFromNotes(main_data_array) +1;
    // main_data_array.push(note);
    localStorage.setItem(NOTES_MAIN_STORE, JSON.stringify(main_data_array));
    localStorage.setItem(NOTES_DELETED_STORE, JSON.stringify(deleted_array));
}


/**
 * This function will add notes to the collection
 * ids - .Comma separted ids
 */
function DeleteNotes(ids) {

    let x = [];
    x.includes

    const arr_numeric = ids.split(',').map(element => {
        return Number(element);
    });

    //getItem the data from local storage
    let main_data_array = JSON.parse(localStorage.getItem(NOTES_MAIN_STORE) || '[]');
    let deleted_array = JSON.parse(localStorage.getItem(this.NOTES_DELETED_STORE) || '[]');

    let searched_items = main_data_array.filter(function (e) {

        return arr_numeric.includes(t.id);
    });

    let indexes = main_data_array.findIndex(function (e) {

        return arr_numeric.includes(t.id);
    });

    //let index = main_data_array.findIndex( x => x.Id === id );

    if (searched_item != null && searched_items.length > 0) {

        deleted_array.push(searched_items);

        for (let i = 0; i < indexes.length; i++) {
            main_data_array.splice(indexes[i], 1);
        }
        //apply remove logic
    }


    //after this step we will have id populated with max id value.
    note.id = this.getMaxIdFromNotes(main_data_array, deleted_array) + 1;
    main_data_array.push(note);

    localStorage.setItem(NOTES_MAIN_STORE, JSON.stringify(main_data_array));
    localStorage.setItem(this.NOTES_DELETED_STORE, JSON.stringify(deleted_array));
}

