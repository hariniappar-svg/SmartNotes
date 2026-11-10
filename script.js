
let notes = JSON.parse(
    localStorage.getItem("notes")
) || [];

// Add Note
function addNote() {

    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;

    if (title.trim() === "" || content.trim() === "") {
        alert("Please enter title and content");
        return;
    }

    let note = {
        title: title,
        content: content
    };

    notes.push(note);

    saveNotes();
    displayNotes();

    document.getElementById("title").value = "";
    document.getElementById("content").value = "";
}

// Save Notes
function saveNotes() {
    localStorage.setItem("notes", JSON.stringify(notes));
}

// Display Notes
function displayNotes() {

    let notesList = document.getElementById("notesList");
    let search = document.getElementById("search").value.toLowerCase();

    notesList.innerHTML = "";

    for (let i = 0; i < notes.length; i++) {

        if (
            notes[i].title.toLowerCase().includes(search) ||
            notes[i].content.toLowerCase().includes(search)
        ) {

            let div = document.createElement("div");
            div.className = "note";

            let heading = document.createElement("h3");
            heading.textContent = notes[i].title;

            let paragraph = document.createElement("p");
            paragraph.textContent = notes[i].content;

            let button = document.createElement("button");
            button.textContent = "Delete";
            button.className = "delete";

            button.onclick = function() {
                deleteNote(i);
            };

            div.appendChild(heading);
            div.appendChild(paragraph);
            div.appendChild(button);

            notesList.appendChild(div);
        }
    }
}

// Delete Note
function deleteNote(index) {

    notes.splice(index, 1);

    saveNotes();
    displayNotes();
}

// Show saved notes when page opens
displayNotes();
