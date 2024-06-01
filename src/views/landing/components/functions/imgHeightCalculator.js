window.onload = function() {
  var image = document.querySelector('.desktop-chat-example');
  var featuresContainer = document.querySelector('.features-container'); // Select the features container

  var imageHeight = image.offsetHeight; // Get the height of the image

  featuresContainer.style.height = imageHeight + 'px'; // Apply the height as a bottom margin to the features container
}