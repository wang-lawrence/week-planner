const $addEntryButton = document.querySelector('#add-entry-button');
const $pageContainer = document.querySelector('.page-container');
const $days = document.querySelector('#days');

const $timeInput = document.querySelector('.time-input');
const $notesInput = document.querySelector('.notes-input');
const $dayDropdown = document.querySelector('.day-dropdown');
const $form = document.querySelector('.form');

$addEntryButton.addEventListener('click', openModal);

let data = {
  editing: null,
  entries: [],
  nextId: 1
};

const previousData = localStorage.getItem('javascript-local-storage');
if (previousData != null) {
  data = JSON.parse(previousData);
}

window.addEventListener('beforeunload', function (event) {
  const jsonData = JSON.stringify(data);
  localStorage.setItem('javascript-local-storage', jsonData);
});

function openModal(event) {
  $pageContainer.classList.remove('hidden');
}

$form.addEventListener('submit', () => {
  event.preventDefault();

  if (data.editing == null) {
    const newEntries = {
      day: $dayDropdown.value,
      time: $timeInput.value,
      notes: $notesInput.value,
      id: data.nextId
    };
    data.entries.push(newEntries);
    data.nextId++;
    $scheduleText.textContent = 'Scheduled Events for ' + $dayDropdown.value.toUpperCase();
    removeChildren($tBody);
    displayDayEntries($dayDropdown.value.toLowerCase());
  } else {
    const editEntryId = data.editing.id;
    for (let i = 0; i < data.entries.length; i++) {
      if (editEntryId === data.entries[i].id) {
        const editEntryObjIndex = i;
        const editEntryObj = {
          day: $dayDropdown.value,
          time: $timeInput.value,
          notes: $notesInput.value,
          id: data.editing.id
        };
        data.entries.splice(editEntryObjIndex, 1, editEntryObj);
        break;
      }
    }
    $scheduleText.textContent = 'Scheduled Events for ' + $dayDropdown.value.toUpperCase();
    removeChildren($tBody);
    displayDayEntries($dayDropdown.value.toLowerCase());
    data.editing = null;
    $form.reset();
  }
  $pageContainer.classList.add('hidden');

});

const $scheduleText = document.querySelector('.scheduled-events-text');

$days.addEventListener('click', function (event) {
  if (event.target.matches('.days-of-the-week')) {
    // for (let i = 0; i < $daysOfWeek.length; i++) {
    if (event.target.getAttribute('data-view') === 'sun-view') {
      $scheduleText.textContent = 'Scheduled Events for Sunday';
      removeChildren($tBody);
      displayDayEntries('sunday');
    } else if (event.target.getAttribute('data-view') === 'mon-view') {
      $scheduleText.textContent = 'Scheduled Events for Monday';
      removeChildren($tBody);
      displayDayEntries('monday');
    } else if (event.target.getAttribute('data-view') === 'tue-view') {
      $scheduleText.textContent = 'Scheduled Events for Tuesday';
      removeChildren($tBody);
      displayDayEntries('tuesday');
    } else if (event.target.getAttribute('data-view') === 'wed-view') {
      $scheduleText.textContent = 'Scheduled Events for Wednesday';
      removeChildren($tBody);
      displayDayEntries('wednesday');
    } else if (event.target.getAttribute('data-view') === 'thu-view') {
      $scheduleText.textContent = 'Scheduled Events for Thursday';
      removeChildren($tBody);
      displayDayEntries('thursday');
    } else if (event.target.getAttribute('data-view') === 'fri-view') {
      $scheduleText.textContent = 'Scheduled Events for Friday';
      removeChildren($tBody);
      displayDayEntries('friday');
    } else if (event.target.getAttribute('data-view') === 'sat-view') {
      $scheduleText.textContent = 'Scheduled Events for Saturday';
      removeChildren($tBody);
      displayDayEntries('saturday');
    }
    // }
  }
});

const $tBody = document.querySelector('tbody');

function renderEntry(entry) {
  const $tr = document.createElement('tr');
  const $tdTime = document.createElement('td');
  const $tdDescription = document.createElement('td');
  const $tdUpdate = document.createElement('td');
  const $updateButton = document.createElement('button');

  $tr.setAttribute('class', entry.day);
  $updateButton.setAttribute('data-entry-id', entry.id);
  $updateButton.textContent = 'Update';

  $tdTime.textContent = entry.time;
  $tdDescription.textContent = entry.notes;

  $tBody.appendChild($tr);
  $tr.append($tdTime, $tdDescription, $tdUpdate);
  $tdUpdate.append($updateButton);

}

function displayDayEntries(day) {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].day === day) {
      renderEntry(data.entries[i]);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // for (let i = 0; i < data.entries.length; i++) {
  //   renderEntry(data.entries[i]);
  // }
  $scheduleText.textContent = 'Scheduled Events for Monday';
  displayDayEntries('monday');
});

function removeChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

$tBody.addEventListener('click', editEntry);

function editEntry(event) {
  const editEntryId = event.target.getAttribute('data-entry-id');
  for (let i = 0; i < data.entries.length; i++) {
    if (+editEntryId === data.entries[i].id) {
      data.editing = data.entries[i];
      $dayDropdown.value = data.editing.day;
      $timeInput.value = data.editing.time;
      $notesInput.value = data.editing.notes;
    }
  }
  $pageContainer.classList.remove('hidden');
}
