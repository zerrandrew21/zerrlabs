import { useState, useEffect } from "react";
import { Box, Card, Grid, Typography } from "@mui/material";
import astronaut from "./astronaut.jpg"

interface CardData {
  id: number;
  img: string;
}

const splitImage = (imageUrl: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageUrl;
    image.crossOrigin = "anonymous"; // set crossOrigin to avoid CORS issues

    image.onload = () => {
      const parts = [];

      // Split the image into 3x3 equal parts
      const partWidth = Math.floor(image.width / 3);
      const partHeight = Math.floor(image.height / 3);
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          if (row !== 2 || col !== 2) { // skip the bottom right square
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d")!;
            canvas.width = partWidth;
            canvas.height = partHeight;
            ctx.drawImage(image, col * partWidth, row * partHeight, partWidth, partHeight, 0, 0, partWidth, partHeight);
            parts.push(canvas.toDataURL());
          }
        }
      }

      resolve(parts);
    };

    image.onerror = () => {
      reject(new Error("Failed to load image"));
    };
  });
}

const shuffleCards = (cards: CardData[]): CardData[] => {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

const PuzzleGame = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [, setEmptyCard] = useState<CardData>();
  const [win, setWin] = useState(false);

  useEffect(() => {
    // Load the image and split it into 3x3 parts
    const loadAndSplitImage = async () => {
      try {
        const parts = await splitImage(astronaut);
        const initialCards = parts.map((part, index) => ({
          id: index,
          img: part
        }));
        shuffleCards(initialCards);
        initialCards.push({ id: 8, img: "" }); // Add the empty card
        setCards(initialCards);
        setEmptyCard(initialCards.find(card => card.id === 8)!);
        setWin(false);
      } catch (error) {
        console.error(error);
      }
    }
    loadAndSplitImage();
  }, []);

  const handleClick = (card: CardData) => {
    if (win) {
      return;
    }

    const cardIndex = cards.findIndex(c => c.id === card.id);
    const emptyCardIndex = cards.findIndex(c => c.img === '');

    if (canMoveCard(cardIndex, emptyCardIndex)) {
      const newCards = [...cards];
      const emptyCard = newCards[emptyCardIndex];
      newCards[emptyCardIndex] = card;
      newCards[cardIndex] = emptyCard;
      setCards(newCards);
      setEmptyCard(card);
      if (checkWin(newCards)) {
        setWin(true);
      }
    }
  }

  const canMoveCard = (cardIndex: number, emptyCardIndex: number) => {
    const cardRow = Math.floor(cardIndex / 3);
    const cardCol = cardIndex % 3;
    const emptyRow = Math.floor(emptyCardIndex / 3);
    const emptyCol = emptyCardIndex % 3;
    return (Math.abs(cardRow - emptyRow) === 1 && cardCol === emptyCol) ||
           (Math.abs(cardCol - emptyCol) === 1 && cardRow === emptyRow);
  }

  const checkWin = (cards: CardData[]): boolean => {
    for (let i = 0; i < cards.length - 1; i++) {
      if (cards[i].id !== i) {
        return false;
      }
    }
    return true;
  }

  const cardStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
    maxHeight: '100px',
    maxWidth: '100px',
    cursor: 'pointer',
  };

  return (
    <Box sx={{justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
      <Grid container spacing={2} maxWidth={'450px'}>
        {cards.map((card) => (
          <Grid item key={card.id} xs={4}>
            {card.img && (
              <Card onClick={() => handleClick(card)} sx={cardStyles}>
                <img src={card.img} alt=""/>
              </Card>
            )}
          </Grid>
        ))}
        {win && (
          <Grid item xs={12}>
            <Typography variant="h4" align="center">
              Congratulations, you won!
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default PuzzleGame;