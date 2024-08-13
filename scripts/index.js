document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const burgerButton = document.getElementById('burger');
  const toggleButton = document.getElementById('toggle');
  const menu = document.querySelector('.header__menu');
  const submenu = document.querySelector('.header__menu-select');
  const menuItems = document.querySelectorAll('.header__menu-item a, .header__menu-item button');
  const contactsLink = document.querySelector('.header__menu-link');
  const feedbackButton = document.querySelector('.header__menu-button');
  let isSubmenuOpen = false;

  header.classList.remove('header--nojs');

  function toggleSubmenu(event) {
    event.stopPropagation();
    isSubmenuOpen = !isSubmenuOpen;
    submenu.classList.toggle('active', isSubmenuOpen);

    if (isSubmenuOpen) {
      submenu.querySelector('a').focus();
    }
  }

  burgerButton.addEventListener('click', toggleSubmenu);

  document.addEventListener('click', (event) => {
    if (!submenu.contains(event.target) && !burgerButton.contains(event.target) && isSubmenuOpen) {
      submenu.classList.remove('active');
      isSubmenuOpen = false;
    }
  });

  toggleButton.addEventListener('click', (event) => {
    event.stopPropagation();
    menu.classList.toggle('show');
    toggleButton.classList.toggle('active');

    if (menu.classList.contains('show')) {
      menuItems[0].focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!menu.contains(event.target) && !toggleButton.contains(event.target)) {
      menu.classList.remove('show');
      toggleButton.classList.remove('active');
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      menu.classList.remove('show');
      toggleButton.classList.remove('active');
      submenu.classList.remove('active');
      isSubmenuOpen = false;
    }
  });

  menu.addEventListener('keydown', (event) => {
    if (event.key === 'Tab') {
      const focusableMenuItems = Array.from(menuItems).filter(item => item.offsetParent !== null);
      const focusedIndex = focusableMenuItems.indexOf(document.activeElement);

      if (event.shiftKey) {
        if (focusedIndex === 0) {
          focusableMenuItems[focusableMenuItems.length - 1].focus();
          event.preventDefault();
        }
      } else {
        if (focusedIndex === focusableMenuItems.length - 1) {
          focusableMenuItems[0].focus();
          event.preventDefault();
        }
      }
    }
  });

  function closeMenu() {
    menu.classList.remove('show');
    toggleButton.classList.remove('active');
  }

  contactsLink.addEventListener('click', closeMenu);
  feedbackButton.addEventListener('click', closeMenu);

  function handleKeyDown(event) {
    if (event.key === 'Enter' || event.key === ' ') {
      closeMenu();
    }
  }

  contactsLink.addEventListener('keydown', handleKeyDown);
  feedbackButton.addEventListener('keydown', handleKeyDown);

  submenu.addEventListener('click', (event) => {
    if (event.target.matches('.header__menu-go, .header__menu-go a')) {
      submenu.classList.remove('active');
      isSubmenuOpen = false;
    }
  });

  submenu.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      if (document.activeElement.matches('.header__menu-go, .header__menu-go a')) {
        submenu.classList.remove('active');
        isSubmenuOpen = false;
      }
    }
  });
});
