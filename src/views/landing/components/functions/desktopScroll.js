export function handleScroll() {
  var image = document.querySelector('.desktop-chat-example');
  var scrollPosition = window.scrollY;

  // Calculate the right property based on the scroll position
  var right = Math.min(Math.max(-40, -30 + scrollPosition / 20), 5);

  // Apply the calculated right property to the image
  image.style.right = right + '%';
}