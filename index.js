import Card from './Card.js';
import FormValidator from './FormValidator.js';

document.addEventListener('DOMContentLoaded', () => {
  // ######### PROFILE #########
  btnOpenModal.addEventListener('click', function () {
    modalEditProfile.style.display = 'flex';
    modalEditProfile.classList.add('modal-show');

    // get value from .profile__name and .profile__title
    const profileName = document.querySelector('.profile__name').textContent;
    const profileTitle = document.querySelector('.profile__title').textContent;

    // set the values to the form
    formOpen.querySelector('input[name="nama"]').value = profileName;
    formOpen.querySelector('input[name="title"]').value = profileTitle;

    // Close modal when Escape key is pressed
    const closeModal = function (event) {
      if (event.key === 'Escape') {
        modalEditProfile.style.display = 'none';
        document.removeEventListener('keydown', closeModal);
      }
    };

    document.addEventListener('keydown', closeModal);
  });

  // Add event listener to the form submit
  formOpen.addEventListener('submit', function (event) {
    // Prevent the default form submission
    event.preventDefault();

    // get value from .profile__name and .profile__title
    const profileName = document.querySelector('.profile__name').textContent;
    const profileTitle = document.querySelector('.profile__title').textContent;

    // Get the input values
    const namaInput =
      formOpen.querySelector('input[name="nama"]').value || profileName;
    const titleInput =
      formOpen.querySelector('input[name="title"]').value || profileTitle;

    // set the values to the profile
    document.querySelector('.profile__name').textContent = namaInput;
    document.querySelector('.profile__title').textContent = titleInput;

    // clear the form values
    formOpen.querySelector('input[name="nama"]').value = '';
    formOpen.querySelector('input[name="title"]').value = '';

    // Close the modal after form submission
    modalEditProfile.style.display = 'none';
  });

  // ######### CARD #########

  // staic card
  const initialCards = [
    {
      name: 'Lembah Yosemite',
      link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg',
    },
    {
      name: 'Danau Louise',
      link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg',
    },
    {
      name: 'Pegunungan Gundul',
      link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg',
    },
    {
      name: 'Gunung Latemar',
      link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg',
    },
    {
      name: 'Taman Nasional Vanoise',
      link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg',
    },
    {
      name: 'Lago di Braies',
      link: 'https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg',
    },
  ];

  // open create card
  btnCreateCard.addEventListener('click', function () {
    modalCreateCard.style.display = 'flex';
    modalCreateCard.classList.add('modal-show');

    // Close modal when Escape key is pressed
    const closeModal = function (event) {
      if (event.key === 'Escape') {
        modalCreateCard.style.display = 'none';
        document.removeEventListener('keydown', closeModal);
      }
    };

    document.addEventListener('keydown', closeModal);
  });

  // create new card
  formCreateCard.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get the input values
    const cardName = formCreateCard.querySelector(
      'input[name="nama_tempat"]',
    ).value;
    const cardLink = formCreateCard.querySelector(
      'input[name="link_gambar"]',
    ).value;

    // create card
    const card = new Card(cardLink, cardName);
    card.createCardHtml();

    // prepend new card
    if (cardLink && cardName) {
      document.querySelector('.card__container').prepend(card._cardElement);
    }

    // clear the form values
    formCreateCard.querySelector('input[name="nama_tempat"]').value = '';
    formCreateCard.querySelector('input[name="link_gambar"]').value = '';

    // Close the modal after form submission
    modalCreateCard.style.display = 'none';
  });

  // create card
  initialCards.forEach((item) => {
    const card = new Card(item.link, item.name);
    card.createCardHtml();
    if (item.link && item.name) {
      document.querySelector('.card__container').prepend(card._cardElement);
    }
  });

  // Run the enableValidation function
  new FormValidator({
    formSelector: '.form',
    inputSelector: '.input',
    submitButtonSelector: '.button',
    inactiveButtonClass: 'disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: '.error-message',
  });
});
