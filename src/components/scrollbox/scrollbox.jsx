import React from 'react';
import { useEffect, useRef } from 'react';
import sboxStyles from './scrollbox.module.css';
import { scrollboxPropTypes } from '../../utils/proptypes';

export const ScrollBox = React.memo(
    (props) => {
        ScrollBox.propTypes = scrollboxPropTypes;

        const contentRef = useRef(null);
        const scrollContainerRef = useRef(null);
        const scrollbarRef = useRef(null);

        useEffect(() => {
            const content = contentRef.current;
            const scrollContainer = scrollContainerRef.current;
            const scrollbar = scrollbarRef.current;
            scrollContainer.style.top = !!props.top ? props.top + "px" : 0;
            scrollContainer.style.bottom = !!props.bottom ? props.bottom + "px" : 0;

            const setScroll = () => {
                if (content.scrollHeight > content.clientHeight) {
                    scrollbar.style.height = scrollContainer.clientHeight * content.clientHeight / content.scrollHeight + "px";
                    scrollbar.style.top = scrollContainer.clientHeight * content.scrollTop / content.scrollHeight + "px";
                } else {
                    scrollContainer.style.visibility = "none";
                }
            };

            const pushScrollbar = (start) => {
                start.preventDefault();
                content.style.scrollBehavior = "auto";
                const y = scrollbar.offsetTop;
                const moveScroll = function (end) {
                    const diff = end.pageY - start.pageY;
                    scrollbar.style.top = Math.min(scrollContainer.clientHeight - scrollbar.clientHeight, Math.max(0, y + diff)) + 'px';
                    content.scrollTop = (content.scrollHeight * scrollbar.offsetTop / scrollContainer.clientHeight);
                };
                const removeListeners = () => {
                    document.removeEventListener('mousemove', moveScroll);
                    document.removeEventListener('mouseup', removeListeners);
                    content.style.scrollBehavior = "smooth";
                };

                document.addEventListener('mousemove', moveScroll);
                document.addEventListener('mouseup', removeListeners);
            };

            setScroll();
            content.addEventListener('scroll', setScroll);
            scrollbar.addEventListener('mousedown', pushScrollbar);
        }, [props]);


        return (
            <section className={sboxStyles.container} id={"scrollbox"} >
                <div className={sboxStyles.scrollBarContainer} ref={scrollContainerRef}>
                    <div className={sboxStyles.scrollbar} ref={scrollbarRef}></div>
                </div>
                <div className={sboxStyles.content} ref={contentRef}>
                    {props.children}
                </div>
            </section>
        )
    }
);

