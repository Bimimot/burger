import React from 'react';
import { useEffect, useState, useRef, useCallback } from 'react';
import sboxStyles from './scrollbox.module.css';
import { scrollboxPropTypes } from '../../utils/proptypes';

export const ScrollBox = React.memo(
    (props) => {
        ScrollBox.propTypes = scrollboxPropTypes;
        const [curBlockId, setCurBlockId] = useState(null);
        const containerRef = useRef(null);
        const contentRef = useRef(null);
        const scrollContainerRef = useRef(null);
        const scrollbarRef = useRef(null);

        useEffect(() => {
            const content = contentRef.current;
            const scrollContainer = scrollContainerRef.current;
            const scrollbar = scrollbarRef.current;
            scrollContainer.style.top = !!props.top ? props.top + "px" : 0;
            scrollContainer.style.bottom = !!props.bottom ? props.bottom + "px" : 0;
            scrollbar.style.height = scrollContainer.clientHeight * content.clientHeight / content.scrollHeight + "px";

            const setScroll = () => {
                if (content.scrollHeight > content.clientHeight) {
                    scrollContainer.style.visibility = "visible";
                    scrollbar.style.top = scrollContainer.clientHeight * content.scrollTop / content.scrollHeight + "px";
                    if (!!props.arrBlocksId) {
                        setCurBlockId(getActiveSectionId())
                    }
                } else {
                    console.log("stop visible");
                    scrollContainer.style.visibility = "hidden";
                }
            };

            const pushScrollbar = (start) => {
                start.preventDefault();
                content.style.scrollBehavior = "auto";
                const y = scrollbar.offsetTop;

                const moveContent = function (end) {
                    const diff = end.pageY - start.pageY;
                    const relativeScrollTop =
                        Math.min(scrollContainer.clientHeight - scrollbar.clientHeight, Math.max(0, y + diff))
                        / scrollContainer.clientHeight;
                    content.scrollTop = content.scrollHeight * relativeScrollTop;
                };

                const removeListeners = () => {
                    document.removeEventListener('mousemove', moveContent);
                    document.removeEventListener('mouseup', removeListeners);
                    content.style.scrollBehavior = "smooth";
                };

                document.addEventListener('mousemove', moveContent);
                document.addEventListener('mouseup', removeListeners);
            };

            setScroll();
            content.addEventListener('scroll', setScroll);
            scrollbar.addEventListener('mousedown', pushScrollbar);
        }, [props]);

        useEffect(() => {
            if (!!curBlockId && !!props.callbackScroll) {
                props.callbackScroll(curBlockId)
            }
        }, [curBlockId, props]);

        const getActiveSectionId = useCallback(() => {
            const container = containerRef.current;
            const containerTop = container.getBoundingClientRect().top;
            const containerBottom = container.clientHeight + containerTop;
            let curId;
            let maxRelativeHeight = 0;

            props.arrBlocksId.forEach(id => {
                const section = document.querySelector(`#${id}`);
                const sectionTop = section.getBoundingClientRect().top;
                const sectionBottom = section.clientHeight + sectionTop;
                const offTop = containerTop > sectionTop ? containerTop - sectionTop : 0;
                const offBottom = containerBottom < sectionBottom ? sectionBottom - containerBottom : 0;
                const viewRelativeHeight = (section.clientHeight - offTop - offBottom) / section.clientHeight;

                if (viewRelativeHeight > maxRelativeHeight) {
                    maxRelativeHeight = viewRelativeHeight
                    curId = id
                };
            });
            return curId
        }, [props])

        return (
            <section className={sboxStyles.container} id={!!props.id ? props.id : "scrollbox"} ref={containerRef}>
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

