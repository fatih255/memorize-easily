import React, { useEffect, useRef } from 'react';
import { Subject } from 'rxjs';
import dragElement from './gameUtils/dragElement';

const RefArray = {
    answerRefs: [],
    questionRefs: []
}

const GameCardItem = ({ question, answer, id, isLastItem }) => {
    const answerRef = useRef(null);
    const questionRef = useRef(null);
    const EffectRan = useRef(false);

    const RefSub = new Subject(); // 0 is the initial value
    RefSub.subscribe({
        next: ({ answer, question, id }) => {
            if (question !== undefined && answer !== undefined && id !== undefined) {
                question.style.top = id * question.getBoundingClientRect().height + 'px'
                answer.style.top = id * answer.getBoundingClientRect().height + 'px'
                question.style.left = 0
                answer.style.right = 0
                RefArray.answerRefs.push(answer)
                RefArray.questionRefs.push(question)
                dragElement(question, answer, RefArray);
            }
        }
    });


    useEffect(() => {

        if (EffectRan.current === false) {
            console.log('game card item render')
            RefSub.next({ answer: answerRef.current, question: questionRef.current, id: id })
            if (isLastItem) {
            }
        }
        return () => EffectRan.current = true

        //  RefSub.next(RefSub.getValue().concat({ answer: answerRef.current, question: questionRef.current }))
    }, []);

    return [
        <div key={id + 'answer'} ref={answerRef}  data-correct="" data-type="answer" data-id={id} className="drop-shadow-lg flex justify-center items-center select-none absolute w-[20vw] h-[20vw]  outline outline-1  outline-gray-100 text-white bg-blue-600 text-2xl">
            {answer}
        </div>,
        <div key={id + 'question'} ref={questionRef}  data-correct="" data-type="question" data-id={id} className="drop-shadow-lg flex justify-center items-center select-none absolute  h-[20vw] w-[20vw]  outline outline-1  outline-gray-100 text-blue bg-white text-2xl">
            {question}
        </div>
    ]



}

export default GameCardItem