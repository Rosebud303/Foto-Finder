let bottomHalf = getClass('.bottom-half');
let viewFavoriteButton = getClass('.view-favorites-button');
let addToAlbum = getClass('.add-to-album');
let searchInput = getClass('.search-input')
let fullCard = getClass('.full-card')
let album = [];
let heartCounter = 0;
addToAlbum.addEventListener('click', addPhoto);
viewFavoriteButton.addEventListener('click', something);
searchInput.addEventListener('keyup', search);
bottomHalf.addEventListener('focusout', updateText);


window.onload = function() {
  var keys = Object.keys(localStorage);
  for(var i = 0; i < keys.length; i++) {
    var parsedObj = JSON.parse(localStorage.getItem(keys[i]));
    newCard = new Photo(parsedObj.id, parsedObj.title, parsedObj.caption, parsedObj.file, parsedObj.favorite);
    appendCard(parsedObj);
    album.push(newCard);
    savedFavoriteCounter(newCard);
  }
}

function something(event) {
  event.preventDefault();
  let showFavorite = album.filter(function(photo){
    return !photo.favorite;
  });
  showFavorite.forEach(function(card) {
      document.querySelector(`[data-id="${card.id}"]`).classList.add('hidden');
      console.log(document.querySelector(`[data-id="${card.id}"]`));
  });
}

function addPhoto() {
  const titleValue = getClass('.title-input').value;
  const captionValue = getClass('.caption-input').value;
  const fileImage = getClass('#image-id').files[0];
  const createPho = new Photo(Date.now(), titleValue, captionValue, URL.createObjectURL(fileImage), false);
  createPho.saveToStorage();
  album.push(createPho);
  appendCard(createPho);
  clearInputs();  
}

function clearInputs() {
  getClass('.title-input').value = '';
  getClass('.caption-input').value = '';
}

function deleteCard(id) {
  let element = getClass(`[data-id="${id}"]`)
  element.remove();
  let deletePhoto = album.find(function(photo) {
    return id === photo.id;
  });
  deletePhoto.deleteFromStorage();
  let deleteIndex = album.findIndex(function(photo){
  return id === photo.id
  });
  album.splice(deleteIndex, 1); 
}

function favoriteCard(id) {
  let element = getClass(`[data-id="${id}"]`);
  let favPhoto = album.find(function(photo) {
    return id === photo.id;
  });
  favPhoto.favorite = !favPhoto.favorite;
  favPhoto.saveToStorage();
  counterCounter(favPhoto);
}

function counterCounter(photo){
  if (photo.favorite === true) {
    heartCounter++;
  } else {
    heartCounter--;
  }
  getClass('.num-of-favs').innerHTML = heartCounter;
}


function savedFavoriteCounter(photo) {
  if (photo.favorite === true) {
    heartCounter++
  }
  getClass('.num-of-favs').innerHTML = heartCounter;
}

function search(event) {
  event.preventDefault();
  var searchInput = document.querySelector('.search-input').value.toUpperCase();
  var filteredPhotos = album.filter(function(photo){
  var upperCaseTitle = photo.title.toUpperCase();
  var upperCaseCaption = photo.caption.toUpperCase();
      return upperCaseTitle.includes(searchInput) || upperCaseCaption.includes(searchInput);
   });

   document.querySelector('.bottom-half').innerHTML = '';
   filteredPhotos.forEach(function(eachPhoto) {
       appendCard(eachPhoto);
   })
}

function updateText(event) {
  event.preventDefault();
  let index = album.findIndex(function(photo){
    return photo.id == event.target.closest('article').dataset.id;
  });
  if (event.target.classList.contains('title-card')) {
   album[index].updatePhoto(event.target.innerText, 'title-card');
  } else {
    album[index].updatePhoto(event.target.innerText, 'caption-card');
  }
    album[index].saveToStorage();
}

function appendCard(photo) {
  event.preventDefault();
  var cardHtml =
    `<article class="full-card" data-id="${photo.id}">
      <div class="card-display">
        <h2 contenteditable="true" class="title-card">${photo.title}</h2>
        <img src="${photo.file}" class="image">
        <p contenteditable="true" class="edit caption-card">${photo.caption}</p>
        <div class="trash-fav-button">
          <img onclick="deleteCard(${photo.id})" src="delete.svg" class="favorite-svg svg">
          <img onclick="favoriteCard(${photo.id})" src="favorite.svg" class="favorite-button svg">
        </div>
     </div>
    </article>`
  bottomHalf.innerHTML += cardHtml; 
}