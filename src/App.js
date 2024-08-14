import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const paragraphStyles = {
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  display: '-webkit-box',
};

const Canvas = () => {
  const [cards, setCards] = useState([]);

  const addCard = () => {
    setCards([
      ...cards,
      {
        id: Date.now(),
        x: 0,
        y: 0,
        width: 200,
        height: 200,
        text: 'This is some dummy text for the card. Click "Show More" to read more.',
        fullText: 'This is some dummy text for the card. Click "Show More" to read more. The full text goes here. This is to simulate a longer piece of content that would be displayed when the user clicks "Show More".',
        isOpen: false
      },
    ]);
  };

  const toggleText = (id) => {
    setCards(cards.map(card =>
      card.id === id ? { ...card, isOpen: !card.isOpen } : card
    ));
  };

  return (
    <div style={{ height: '100vh', overflow: 'scroll', backgroundColor: '#f0f0f0', position: 'relative' }}>
      <button onClick={addCard} style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}>
        Add Card
      </button>

      {cards.map((card) => (
        <Rnd
          key={card.id}
          default={{
            x: card.x,
            y: card.y,
            width: card.width,
            height: card.height,
          }}
          minWidth={150}
          minHeight={150}
          bounds="parent"
          dragHandleClassName="draggable"
          onDragStop={(e, data) => {
            setCards(cards.map(c => c.id === card.id ? { ...c, x: data.x, y: data.y } : c));
          }}
          onResizeStop={(e, direction, ref, delta, position) => {
            setCards(cards.map(c => c.id === card.id ? { ...c, width: ref.offsetWidth, height: ref.offsetHeight, ...position } : c));
          }}
          style={{ backgroundColor: 'white', borderRadius: '8px', padding: '10px', boxShadow: '0px 4px 6px rgba(0,0,0,0.1)' }}
        >
          <Card style={{ width: '100%', height: '100%' }} className="draggable">
            <Card.Body style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Card.Text style={card.isOpen ? {} : paragraphStyles}>
                {card.isOpen ? card.fullText : card.text}
              </Card.Text>
              <Button onClick={() => toggleText(card.id)}>{card.isOpen ? 'Read Less' : 'Read More'}</Button>
            </Card.Body>
          </Card>
        </Rnd>
      ))}
    </div>
  );
};

export default Canvas;

// import React, { useState } from 'react';
// import { Rnd } from 'react-rnd';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';

// const paragraphStyles = {
//   WebkitLineClamp: 2,
//   WebkitBoxOrient: 'vertical',
//   overflow: 'hidden',
//   display: '-webkit-box',
// };

// function Cards() {
//   const [isOpen, setIsOpen] = useState(false);

//   // Define initial positions for each card
//   const initialPositions = [
//     { x: 0, y: 0 },
//     { x: 450, y: 0 },
//     { x: 900, y: 0 },
//   ];

//   return (
//     <div style={{ backgroundColor: '#1a1a2e', padding: '20px', height: '1800px'}} className='min-h-screen' >
//       <div className='text-center text-white'>
//         <h1 className='text-2xl font-semibold mb-6 text-white'>Sample Books Generated by BookAI</h1>
//         <p className='mb-14 text-white'>Explore some of the captivating books created using our AI technology.</p>
//       </div>
//       <div className='relative' style={{ width: '100%', height: '600px', position: 'relative' }}>
//         {['card1', 'card2', 'card3'].map((cardKey, index) => (
//           <Rnd
//             key={cardKey}
//             default={{
//               x: initialPositions[index].x,
//               y: initialPositions[index].y,
//               width: 400,
//               height: 600,
//             }}
//             minWidth={200}
//             minHeight={300}
//             bounds="window" // Change this to "window" for free movement across the screen
//             dragHandleClassName="draggable"
//             style={{
//               backgroundColor: 'rgb(255, 255, 255, 0.05)',
//               padding: '27px',
//               borderRadius: '7px',
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               transition: 'transform 0.3s ease',
//             }}
//           >
//             <Card
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 color: 'white'
//               }}
//               className="draggable"
//             >
//               <Card.Img variant="top" src={`https://raw.githubusercontent.com/adarshagupta/trybookai/main/public-assets/${['paradox', 'mist', 'ecos'][index]}.png`} style={{ height: '400px', objectFit: 'cover', borderRadius: '7px' }} />
//               <Card.Body style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                 <Card.Title className='font-bold text-xl mt-2'>{['Science Fiction', 'Mystery', 'Fantasy'][index]}</Card.Title>
//                 <Card.Text style={isOpen ? null : paragraphStyles}>
//                   {[
//                     `"As Dr. Elara stepped through the shimmering portal, she knew there was no turning back. The fate of two universes now rested in her hands..."`,
//                     `"The old lighthouse stood silent, its beacon long extinguished. But on foggy nights, some swore they could still see its ghostly light..."`,
//                     `"The ancient prophecy spoke of a child born with starlight in their eyes. As the comet blazed overhead, the kingdom held its breath..."`
//                   ][index]}
//                 </Card.Text>
//                 <Button className="read-more" onClick={() => setIsOpen(!isOpen)}>{isOpen ? 'Read Less' : 'Read More'}</Button>
//               </Card.Body>
//             </Card>
//           </Rnd>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Cards;
