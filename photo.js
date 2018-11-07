class Photo {
  constructor(id, title, caption, file, favorite) {
    this.id = id;
    this.title = title;
    this.caption = caption;
    this.file = file;
    this.favorite = favorite;
  }

  saveToStorage(photo) {
    localStorage.setItem(this.id, JSON.stringify(this));
  }

  deleteFromStorage() {
    localStorage.removeItem(this.id)
  }

  updatePhoto(newText, type) {
    if (type === 'title-card') {
        this.title = newText;
    } else if (type === 'caption-card') {
        this.caption = newText;  
    }
  }
}


