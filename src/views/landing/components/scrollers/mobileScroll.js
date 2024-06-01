export function handleScroll() {
  var image = document.querySelector('.mobile-chat-example');
  var scrollPosition = window.scrollY;

  // Calculate the right property based on the scroll position
  var right = Math.min(Math.max(-20, -20 + scrollPosition / 20), 0);

  // Apply the calculated right property to the image
  image.style.right = right + '%';
}