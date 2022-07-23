import { observe } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react'
import { useStore } from '../store';

function DragableScroll({ props, children }) {


    const container = useRef(null)


    let pos = { top: 0, left: 0, x: 0, y: 0 };
    const { response } = useStore().CardStore


    useEffect(() => {
        let childrenPointer;
        const ele = container.current
        const _timeout = () => {
            childrenPointer = setTimeout(() => {
                ele.childNodes[0].style.pointerEvents = 'none'
                //console.log('none pointers')
            }, 250)
        }



        const mouseDownHandler = function (e) {

            _timeout()
            pos = {
                // The current scroll
                left: ele.scrollLeft,
                top: ele.scrollTop,
                // Get the current mouse position
                x: e.clientX,
                y: e.clientY,
            };
            ele.style.userSelect = 'none';
            document.addEventListener('mousemove', mouseMoveHandler);
            document.addEventListener('mouseup', mouseUpHandler);
        };

        const mouseMoveHandler = function (e) {
            // How far the mouse has been moved
            const dx = e.clientX - pos.x;
            const dy = e.clientY - pos.y;

            // Scroll the element
            ele.scrollTop = pos.top - dy;
            ele.scrollLeft = pos.left - dx;
        };

        const mouseUpHandler = function () {
            ele.childNodes[0].style.pointerEvents = 'all'
            ele.style.removeProperty('user-select');
            clearTimeout(childrenPointer);

            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        };

        // Attach the handler
        ele.addEventListener('mousedown', mouseDownHandler);

    }, [])




    // if new category added scroll bottom automatically
    if (response.actionName === 'create_category' && response.type === 'success') {
        setTimeout(() => {
            container.current.scroll({
                left: container.current.scrollWidth,
                behavior: 'smooth'
            });
        }, 100);
    }


    return (
        <div style={{ overflow: 'auto' }} ref={container}>
            {children}
        </div>
    )

}

export default observer(DragableScroll)


