const form = document.querySelector('#add-note-form');
const noteList = document.querySelector('#note-list');

form.addEventListener('submit', event => {
  event.preventDefault();

  const title = form.querySelector('#note-title').value;
  const body = form.querySelector('#note-body').value;

  if (!title || !body) {
    return alert('Please enter a title and body for the note.');
  }

  const note = {
    title,
    body
  };

  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));

  form.reset();
  renderNotes();
});

noteList.addEventListener('click', event => {
  if (event.target.matches('.note-text')) {
    const noteText = event.target;
    noteText.classList.toggle('expanded');
  } else if (event.target.matches('.delete-note')) {
    const noteId = event.target.parentNode.dataset.id;
    let notes = JSON.parse(localStorage.getItem('notes'));
    notes = notes.filter((note, index) => index !== parseInt(noteId));
    localStorage.setItem('notes', JSON.stringify(notes));
    renderNotes();
  }
});

function renderNotes() {
  let notes = JSON.parse(localStorage.getItem('notes')) || [];
  noteList.innerHTML = '';
  notes.forEach((note, index) => {
    const noteText = document.createElement('div');
    noteText.classList.add('note-text');
    noteText.innerHTML = `
      <div class="note-title">${note.title}</div>
      <div class="note-body">${note.body}</div>
    `;
    const noteItem = document.createElement('li');
    noteItem.setAttribute('data-id', index);
    noteItem.appendChild(noteText);
    noteList.appendChild(noteItem);
  });
}

renderNotes();
