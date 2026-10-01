const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Open navigation menu' : 'Close navigation menu');
  navLinks.classList.toggle('is-open', !isOpen);
});

navLinks.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
    navLinks.classList.remove('is-open');
  }
});

const today = new Date();
const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
const checkin = document.querySelector('#checkin');
const checkout = document.querySelector('#checkout');
const bookingForm = document.querySelector('#booking-form');
const formMessage = document.querySelector('#form-message');

checkin.min = localDate;
checkout.min = localDate;

checkin.addEventListener('change', () => {
  const nextDay = new Date(`${checkin.value}T12:00:00`);
  nextDay.setDate(nextDay.getDate() + 1);
  const minimumCheckout = new Date(nextDay.getTime() - nextDay.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  checkout.min = minimumCheckout;
  checkout.setCustomValidity(checkout.value && checkout.value < minimumCheckout ? 'Check-out must be after check-in.' : '');
  if (checkout.value && checkout.value < minimumCheckout) checkout.value = '';
  formMessage.textContent = '';
});

checkout.addEventListener('change', () => {
  checkout.setCustomValidity(checkout.value && checkin.value && checkout.value <= checkin.value ? 'Check-out must be after check-in.' : '');
  formMessage.textContent = '';
});

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  checkout.setCustomValidity(checkout.value && checkin.value && checkout.value <= checkin.value ? 'Check-out must be after check-in.' : '');
  if (!bookingForm.reportValidity()) return;
  formMessage.textContent = 'Your dates are ready. Get in touch to complete your booking.';
});

const galleryButtons = [...document.querySelectorAll('.gallery-item')];
const lightbox = document.querySelector('#lightbox');
const lightboxImage = document.querySelector('#lightbox-image');
const lightboxCaption = document.querySelector('#lightbox-caption');
let activeImage = 0;

function showGalleryImage(index) {
  activeImage = (index + galleryButtons.length) % galleryButtons.length;
  const button = galleryButtons[activeImage];
  lightboxImage.src = button.dataset.full;
  lightboxImage.alt = button.querySelector('img').alt;
  lightboxCaption.textContent = button.querySelector('span').textContent;
}

galleryButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    showGalleryImage(index);
    lightbox.showModal();
  });
});

document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
document.querySelector('.lightbox-prev').addEventListener('click', () => showGalleryImage(activeImage - 1));
document.querySelector('.lightbox-next').addEventListener('click', () => showGalleryImage(activeImage + 1));
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});
document.addEventListener('keydown', (event) => {
  if (!lightbox.open) return;
  if (event.key === 'ArrowLeft') showGalleryImage(activeImage - 1);
  if (event.key === 'ArrowRight') showGalleryImage(activeImage + 1);
});

document.querySelector('#year').textContent = new Date().getFullYear();
