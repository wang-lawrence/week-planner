const $addEntryButton = document.querySelector('#add-entry-button');
const $pageContainer = document.querySelector('.page-container');

$addEntryButton.addEventListener('click', openModal);

function openModal(event) {
  $pageContainer.classList.remove('hidden');
}
