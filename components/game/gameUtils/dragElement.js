

export default function dragElement(question, answer, RefArray) {




  question.onmousedown = dragMouseDown;
  answer.onmousedown = dragMouseDown;


  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  let collisions = [false];
  let check = {}
  let ontranstion = false;
  let isMouseOutScreen = false;
  let mouseDownedTarget;
  let collisionsEnteringX = 0;
  let collisionsEnteringY = 0;

  let startPos = {
    x: 0, y: 0, offsetX: 0, offsetY: 0
  }

  let collisionsConditionForAnimate = {
    x: false,
    y: false,
    xy: false
  };

  let Rects = {
    answerRects: [],
    questionRects: []
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;

    //during mousedown event, position for calculating mousemove coordinates weights keep in mind
    //If it is answered incorrectly after the mouseup event, use the following values in the animation as the offset value.
    startPos.x = e.clientX;
    startPos.y = e.clientY;
    startPos.offsetX = e.target.offsetLeft
    startPos.offsetY = e.target.offsetTop

    if (question.dataset.correct !== "true" && answer.dataset.correct !== "true") {
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }


    mouseDownedTarget = e
    ontranstion ? e.target.style.zIndex = 20 : e.target.style.zIndex = 10
    Rects.answerRects = [...Array.from(RefArray.answerRefs, ref => ref.getBoundingClientRect())]
    Rects.questionRects = [...Array.from(RefArray.questionRefs, ref => ref.getBoundingClientRect())]

  }


  function elementDrag(e) {

    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    e.target.style.top = (e.target.offsetTop - pos2) + "px";
    e.target.style.left = (e.target.offsetLeft - pos1) + "px";



    // if detected mouse down event in element, change collisions variables according to e.target data type

    let draggedRect = e.target.getBoundingClientRect()

    const rectsforCollition = () => {
      let choiceRects;
      let choiceRefs;
      let draggedRef;
      if (mouseDownedTarget.target.dataset.type === 'question') {
        choiceRects = Rects.answerRects
        choiceRefs = RefArray.answerRefs
        draggedRef = question
      }
      if (mouseDownedTarget.target.dataset.type === 'answer') {
        choiceRects = Rects.questionRects
        choiceRefs = RefArray.questionRefs
        draggedRef = answer
      }
      collisions = choiceRects.map((collisionRect) => {

        return draggedRect.right > collisionRect.left &&
          draggedRect.top < collisionRect.bottom &&
          draggedRect.left < collisionRect.right &&
          draggedRect.bottom > collisionRect.top
      })

      let collisionObjectIndex = collisions.findIndex(collision => collision === true)
      if (collisionObjectIndex !== -1) {
        check = { choice: choiceRefs[collisionObjectIndex], dragged: draggedRef }
      }
      // check = { a: choiceRefs[index], b: mouseDownedTarget.target }

    }
    rectsforCollition()

    //how much the draggedRect object is in the questionRects X
    //collisionsEnteringX = questionRects.x + questionRects.width - answerRects.x
    //collisionsEnteringY = questionRects.y - (answerRects.y + answerRects.height)


    /* calculate x and y coordinates volume during move */
    let posDiff = {
      x: Math.abs(startPos.x - e.clientX),
      y: Math.abs(startPos.y - e.clientY),
      xy: Math.abs((startPos.x - e.clientX)) + Math.abs((startPos.y - e.clientY))
    }

    /* During mouse move, choose slide animation X, Y, or XY according to the movement weights of coordinates  */
    collisionsConditionForAnimate = {
      x: posDiff.x > posDiff.y,
      y: posDiff.y > posDiff.x,
      xy: posDiff.x > 50 && posDiff.y > 50
    }

    // console.log(collisionsConditionForAnimate)
  }

  function animations(e, collisions) {
    if (collisions.some(x => x === true)) {
      if (check.choice.dataset.id !== check.dragged.dataset.id) {
        if (collisionsConditionForAnimate.x) {
          e.target.style.transition = 'all .6s ease-out';
          e.target.style.pointerEvents = 'none';
          e.target.style.left = `${startPos.offsetX}px`;
        }
        if (collisionsConditionForAnimate.y) {
          e.target.style.transition = 'all .6s ease-out';
          e.target.style.pointerEvents = 'none';
          e.target.style.top = `${startPos.offsetY}px`;
        }
        if (collisionsConditionForAnimate.xy) {
          e.target.style.transition = 'all .6s ease-out';
          e.target.style.pointerEvents = 'none';
          e.target.style.left = `${startPos.offsetX}px`;
          e.target.style.top = `${startPos.offsetY}px`;
        }
      } else {

        if (check.dragged.dataset.correct !== "true" && check.choice.dataset.correct !== "true") {
          const draggedRect = check.dragged.getBoundingClientRect();
          const choiceRect = check.dragged.getBoundingClientRect();
          check.dragged.style.transition = 'all .6s ease-out';

          check.choice.style.border = '2px solid #0DAB76 ';
          check.choice.style.backgroundColor = 'white';
          check.choice.style.color = '#0DAB76';
          check.dragged.style.backgroundColor = '#0DAB76';
          check.dragged.style.color = 'white';
          check.dragged.style.outline = 'none';
          check.choice.style.outline = 'none';
          check.dragged.style.left = check.choice.offsetLeft + "px";
          check.dragged.style.top = check.choice.offsetTop + choiceRect.height * 0.50 + "px";
          check.choice.style.height = choiceRect.height / 2 + "px"
          check.dragged.style.height = draggedRect.height / 2 + "px"

          check.dragged.style.transition = 'all .6s ease-out';
          check.choice.style.transition = 'all .6s ease-out';
          check.dragged.style.pointerEvents = 'none';
          check.choice.style.pointerEvents = 'none';
          check.dragged.dataset.correct = "true"
          check.choice.dataset.correct = "true"
          check.dragged.onmousedown = null;
          check.choice.onmousedown = null;
          check.dragged.onmousemove = null;
          check.choice.onmousemove = null;
          check.dragged.onmouseup = null;
          check.choice.onmouseup = null;

        }

        //check.dragged.style.left = check.choice.offsetLeft - choiceRect.width * 0.80 + "px";
        //check.dragged.style.top = check.choice.offsetTop + choiceRect.height * 0.20 + "px";
      }
    }
  }

  function closeDragElement(e) {

    /* stop moving when mouse button is released:*/
    /* answer incorrect  animations */

    animations(e, collisions)
    if (!ontranstion) {
      e.target.style.zIndex = 0;
      e.target.style.pointerEvents = 'all'
    } else {
      e.target.style.zIndex = 10
    }

    document.onmouseup = null;
    document.onmousemove = null;

  }

  const animateXTransitionEnd = (e) => {
    e.target.style.transition = 'none 0s ease 0s';
    e.target.style.pointerEvents = 'all';
    e.target.style.zIndex = 0;
    ontranstion = false
    mouseDownedTarget = null
    e.target.removeEventListener('transitionend', animateXTransitionEnd)
    e.target.removeEventListener('transitionstart', animateXTransitionStart)
  }
  const animateXTransitionStart = (e) => {
    ontranstion = true
  }

  if (mouseDownedTarget) {
    mouseDownedTarget.target.addEventListener('transitionend', animateXTransitionEnd)
    mouseDownedTarget.target.addEventListener('transitionstart', animateXTransitionStart)
  }


}