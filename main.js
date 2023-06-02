const $addEntryButton = document.querySelector('#add-entry-button');
const $pageContainer = document.querySelector('.page-container');

const $timeInput = document.querySelector('.time-input');
const $notesInput = document.querySelector('.notes-input');
const $dayDropdown = document.querySelector('.day-dropdown');
const $form = document.querySelector('.form');

$addEntryButton.addEventListener('click', openModal);

const data = {
  editing: null,
  entries: [],
  nextId: 0
};

function openModal(event) {
  $pageContainer.classList.remove('hidden');
}

$form.addEventListener('submit', () => {
  event.preventDefault();
  const newEntries = {
    day: $dayDropdown.value,
    time: $timeInput.value,
    notes: $notesInput.value,
    id: data.nextId
  };
  data.entries.unshift(newEntries);
  const jsonData = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', jsonData);
  data.nextId++;
  $pageContainer.classList.add('hidden');

});
