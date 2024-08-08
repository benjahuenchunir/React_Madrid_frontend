export function handleScroll() {
  let image = document.querySelector('.desktop-chat-scroll');
  let scrollPosition = window.scrollY;
  let windowWidth = window.innerWidth;
  let imageWidth = image.offsetWidth;
  let centeredRightValueInPx = (windowWidth - imageWidth) / 2;
  let centeredRightValue = centeredRightValueInPx / windowWidth * 100;

  // Calculate the right property based on the scroll position
  let right = Math.min(Math.max(-40, -20 + scrollPosition / 20), centeredRightValue);
  // Apply the calculated right property to the image
  image.style.right = right + '%';
}