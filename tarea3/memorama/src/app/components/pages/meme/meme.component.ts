import { Component } from '@angular/core';


interface Card {
  image: string;
  color: string;
  number: number;
  flipped: boolean;
  matched: boolean;
}

@Component({
  selector: 'app-meme',
  standalone: true,
  imports: [],
  templateUrl: './meme.component.html',
  styleUrls: ['./meme.component.scss']
})
export class MemeComponent {
  cards: Card[] = [];
  firstCardIndex: number | null = null;
  secondCardIndex: number | null = null;
  attempts: number = 0;
  gameWon: boolean = false;

  constructor() {
    this.generateCards();
  }

  generateCards() {
    const symbols = [
      { image: 'meme_img/img1.jpeg', color: '#FF5733', number: 1 },
      { image: 'meme_img/img2.webp', color: '#33FF57', number: 2 },
      { image: 'meme_img/img3.png', color: '#3357FF', number: 3 },
      { image: 'meme_img/img4.jpg', color: '#FF33A6', number: 4 },
      { image: 'meme_img/img5.jpg', color: '#FF33A8', number: 5 }
      
    ];

    this.cards = [...symbols, ...symbols]  
      .map(card => ({ ...card, flipped: false, matched: false }))
      .sort(() => Math.random() - 0.5);  
    this.attempts = 0;
    this.gameWon = false;
  }

  flipCard(index: number) {
    const card = this.cards[index];

    if (card.flipped || card.matched) {
      return;  
    }

    card.flipped = true;

    if (this.firstCardIndex === null) {
      this.firstCardIndex = index;
    } else if (this.secondCardIndex === null) {
      this.secondCardIndex = index;
      this.attempts++;

   
      this.checkMatch();
    }
  }

  checkMatch() {
    const firstCard = this.cards[this.firstCardIndex!];
    const secondCard = this.cards[this.secondCardIndex!];

    if (firstCard.image === secondCard.image && firstCard.color === secondCard.color && firstCard.number === secondCard.number) {
      firstCard.matched = true;
      secondCard.matched = true;
    } else {
      setTimeout(() => {
        firstCard.flipped = false;
        secondCard.flipped = false;
      }, 1000);
    }

    this.firstCardIndex = null;
    this.secondCardIndex = null;

    this.checkGameWon();
  }

  checkGameWon() {
    this.gameWon = this.cards.every(card => card.matched);
  }

  resetGame() {
    this.generateCards();
  }
}
