// Note data storage
let notes = JSON.parse(localStorage.getItem("notes")) || [];

// Function to generate note list
function generateNoteList() {
    const noteGrid = document.querySelector(".note-grid");
    noteGrid.innerHTML = "";
    notes.forEach((note, index) => {
        const noteHTML = `
            <article>
                <h2>${note.title}</h2>
                <p>${note.content}</p>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </article>
        `;
        noteGrid.innerHTML += noteHTML;
    });
}

// Function to add new note
function addNote() {
    const noteTitle = document.getElementById("note-title").value.trim();
    const noteContent = document.getElementById("note-content").value.trim();

    if (noteTitle === "" || noteContent === "") {
        alert("Please fill in both title and description to add a note.");
        return;
    }

    notes.push({ title: noteTitle, content: noteContent });
    localStorage.setItem("notes", JSON.stringify(notes));
    generateNoteList();
    document.getElementById("note-form").reset();
}

// Function to delete note
function deleteNote(index) {
    notes.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    generateNoteList();
}

// Function to search notes
function searchNotes() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const noteGrid = document.querySelector(".note-grid");
    noteGrid.innerHTML = "";
    notes.forEach((note, index) => {
        if (note.title.toLowerCase().includes(searchInput) || note.content.toLowerCase().includes(searchInput)) {
            const noteHTML = `
                <article>
                    <h2>${note.title}</h2>
                    <p>${note.content}</p>
                    <button class="delete-btn" data-index="${index}">Delete</button>
                </article>
            `;
            noteGrid.innerHTML += noteHTML;
        }
    });
}

// Event listeners
document.getElementById("add-note-btn").addEventListener("click", addNote);
document.getElementById("note-content").addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter" || e.key === "Enter") {
        addNote();
    }
});
document.addEventListener("DOMContentLoaded", generateNoteList);
// ...

// Make notes clickable and expandable with animations
document.addEventListener("click", (e) => {
    if (e.target.tagName === "ARTICLE") {
        const notePosition = e.target.offsetLeft;
        const noteWidth = e.target.offsetWidth;
        const screenWidth = window.innerWidth;

        if (notePosition < screenWidth / 3) {
            // Note is on the left side
            e.target.classList.add("animate-from-left");
        } else if (notePosition > screenWidth * 2 / 3) {
            // Note is on the right side
            e.target.classList.add("animate-from-right");
        } else {
            // Note is in the center
            e.target.classList.add("animate-from-center");
        }

        e.target.classList.toggle("big");
    }
});
document.getElementById("search-input").addEventListener("input", searchNotes);