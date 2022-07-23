import GameCardItem from 'components/game/GameCardItem';
import React, { useRef, useState } from 'react';


function Home() {

  const questionRefText = useRef(null);
  const answerRefText = useRef(null);

  const [gameCardsState, setgameCardsState] = useState([]);

  const createGameCardHandler = () => {
    setgameCardsState(prev => [...prev, { question: questionRefText.current?.value, answer: answerRefText.current?.value }])
  }
  return (
    <div className="flex flex-col relative">
      <div className="ml-5 w-26 flex flex-col w-min gap-2">
        <input ref={questionRefText} type="text" className="outline outline-2 outline-gray-300" placeholder="Question" />
        <input ref={answerRefText} type="text" className="outline outline-2 outline-gray-300" placeholder="Answer" />
        <input className="cursor-pointer hover:underline" type="button" value="Oyun Kartı Oluştur" onClick={createGameCardHandler} />
      </div>
      <div className="flex flex-row justify-between">
        {gameCardsState.length > 0 && gameCardsState.map((card, index) =>
          <GameCardItem key={index} question={card.question} answer={card.answer} id={index} isLastItem={gameCardsState.length === index + 1} />
        )}
      </div>
    </div>
  )

}

export default Home
