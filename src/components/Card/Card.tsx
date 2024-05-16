import React from 'react';
import { css, cva } from '../../../styled-system/css';
// Types
import { CardType } from '../../setup';

// A Panda CSS Recipe
const imgCard = cva({
  base: {
    transition: 'all 0.5s',
    backfaceVisibility: 'hidden',
    cursor: 'pointer',
    transformStyle: 'preserve-3d'
  },
  variants: {
    cardType: {
      frontCardIsFlipped: { zIndex: 2, transform: 'rotateY(0deg)' },
      frontCardIsNotFlipped: { zIndex: 1, transform: 'rotateY(180deg)' },
      backCardIsFlipped: { position: 'absolute', top: '0px', left: '0px', zIndex: 1, transform: 'rotateY(180deg)' },
      backCardIsNotFlipped: { position: 'absolute', top: '0px', left: '0px', zIndex: 2 }
    }
  },
  defaultVariants: {
    cardType: 'frontCardIsNotFlipped'
  }
});

type Props = {
  card: CardType;
  callback: (card: CardType) => void;
};

const Card: React.FC<Props> = ({ card, callback }) => {
  const handleClick = () => {
    if (!card.flipped) callback(card);
  };

  return (
    <div className={css({ perspective: '1000px' })} onClick={handleClick}>
      <img
        className={imgCard({ cardType: card.flipped ? 'frontCardIsFlipped' : 'frontCardIsNotFlipped' })}
        src={card.frontImage}
        alt='front-card'
      />
      <img
        className={imgCard({ cardType: card.flipped ? 'backCardIsFlipped' : 'backCardIsNotFlipped' })}
        src={card.backImage}
        alt='front-card'
      />
    </div>
  );
};

export default Card;
