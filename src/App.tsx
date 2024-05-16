import React from 'react';
import { grid } from '../styled-system/patterns';
import { container } from '../styled-system/patterns';
import Card from './components/Card/Card';
// Setup
import { createBoard } from './setup';
// Types
import { CardType } from './setup';

const App = () => {
  const [cards, setCards] = React.useState(createBoard());
  const [matchedPairs, setMatchedPairs] = React.useState(0);
  const [clickedCard, setClickedCard] = React.useState<undefined | CardType>(undefined);

  const gameWon = matchedPairs === cards.length / 2;

  const handleCardclick = (currentClickedCard: CardType) => {
    // Flip the clicked card
    setCards(prev => prev.map(card => (card.id === currentClickedCard.id ? { ...card, flipped: true } : card)));

    if (!clickedCard) {
      setClickedCard(currentClickedCard);
      return;
    }

    const isMatched = clickedCard.matchingCardId === currentClickedCard.id;

    setMatchedPairs(prev => prev + 1);

    // If it's not a match, wait one second and flip the cards back
    if (!isMatched) {
      setTimeout(() => {
        setCards(prev =>
          prev.map(card =>
            card.id === clickedCard.id || card.id === currentClickedCard.id ? { ...card, flipped: false } : card
          )
        );
      }, 1000);
    }

    setClickedCard(undefined);
  };

  return (
    <div className={container({ padding: 0, maxWidth: '800px' })}>
      <div className={grid({ columns: 4, gap: 4 })}>
        {cards.map(card => (
          <Card key={card.id} card={card} callback={handleCardclick} />
        ))}
      </div>
    </div>
  );
};

export default App;
