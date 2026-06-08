document.addEventListener('DOMContentLoaded', function() {
  const burger = document.getElementById('burger-btn');
  const nav = document.getElementById('main-nav');
  if (burger && nav) {
    burger.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
  }
});