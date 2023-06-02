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
  nextId: 0
};

const previousData = localStorage.getItem('javascript-local-storage');
if (previousData !== null) {
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
  const newEntries = {
    day: $dayDropdown.value,
    time: $timeInput.value,
    notes: $notesInput.value,
    id: data.nextId
  };
  data.entries.push(newEntries);
  renderEntry(newEntries);
  data.nextId++;
  $pageContainer.classList.add('hidden');

});

// const $daysOfWeek = document.querySelectorAll('.days-of-the-week');
const $scheduleText = document.querySelector('.scheduled-events-text');

$days.addEventListener('click', function (event) {
  if (event.target.matches('.days-of-the-week')) {
    // for (let i = 0; i < $daysOfWeek.length; i++) {
    if (event.target.getAttribute('data-view') === 'sun-view') {
      $scheduleText.textContent = 'Scheduled Events for Sunday';
      displayDayEntries('sunday');
    } else if (event.target.getAttribute('data-view') === 'mon-view') {
      $scheduleText.textContent = 'Scheduled Events for Monday';
      displayDayEntries('monday');
    } else if (event.target.getAttribute('data-view') === 'tue-view') {
      $scheduleText.textContent = 'Scheduled Events for Tuesday';
      displayDayEntries('tuesday');
    } else if (event.target.getAttribute('data-view') === 'wed-view') {
      $scheduleText.textContent = 'Scheduled Events for Wednesday';
      displayDayEntries('wednesday');
    } else if (event.target.getAttribute('data-view') === 'thu-view') {
      $scheduleText.textContent = 'Scheduled Events for Thursday';
      displayDayEntries('thursday');
    } else if (event.target.getAttribute('data-view') === 'fri-view') {
      $scheduleText.textContent = 'Scheduled Events for Friday';
      displayDayEntries('friday');
    } else if (event.target.getAttribute('data-view') === 'sat-view') {
      $scheduleText.textContent = 'Scheduled Events for Saturday';
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

  $tr.setAttribute('class', entry.day);

  $tdTime.textContent = entry.time;
  $tdDescription.textContent = entry.notes;

  $tBody.appendChild($tr);
  $tr.append($tdTime, $tdDescription);

}

function displayDayEntries(day) {
  for (let i = 0; i < data.entries.length; i++) {
    if (data.entries[i].day === day) {
      renderEntry(data.entries[i]);
    } else {

    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  for (let i = 0; i < data.entries.length; i++) {
    renderEntry(data.entries[i]);
  }
});
