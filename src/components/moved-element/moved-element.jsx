import React, { useRef } from 'react';
import { useDrop, useDrag } from "react-dnd";

export const MovedElement = ({ id, children, index, moveElement }) => {
    const ref = useRef(null);
    const [{ handlerId }, drop] = useDrop({
        accept: 'card',
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            moveElement(dragIndex, hoverIndex);
            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: "card",
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const style = {
        padding: '0',
        margin: '0',
        backgroundColor: 'transparent',
        cursor: 'pointer',
    };
    const opacity = isDragging ? 0 : 1;

    drag(drop(ref));

    return (<div
        ref={ref}
        data-handler-id={handlerId}
        style={{ ...style, opacity }}
    >
        {children}
    </div>);
};