function appendCard(player1, player2, winner) {

  var cardHtml = 
  `<article class ='generated-card'>
    <div class="card-challenger-names">
      <h4>${player1}</h4>
      <p class = 'vs-symbol'>vs</p>
      <h4>${player2}</h4>
    </div>
    <h1 class ='winner-chicken-dinner'>${winner}</h1>
    <p>WINNER</p>
    <div>
      <button class='delete-button'>X</button>
    </div>
    <div>
      <button class='favorite-button'><img src='#'></button>
    </div>
  </article>`;
  rightSide.innerHTML += cardHtml;
}