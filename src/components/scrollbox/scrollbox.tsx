import React, { FC } from 'react';
import { Tscrollbox } from "../../utils/proptypes";
import { useEffect, useState, useRef, useCallback } from 'react';
import sboxStyles from './scrollbox.module.css';


export const ScrollBox: FC<Tscrollbox> = React.memo(
    (props) => {
        const [curBlockId, setCurBlockId] = useState<string|undefined>("");
        const containerRef = useRef(null);
        const contentRef = useRef(null);
        const scrollContainerRef = useRef(null);
        const scrollbarRef = useRef(null);

        useEffect(() => {
            const container: any = containerRef.current;
            const content: any = contentRef.current;
            const scrollContainer: any = scrollContainerRef.current;
            const scrollbar: any = scrollbarRef.current;

            container.style.paddingBottom = !!props.bottom ? String(props.bottom) + "px" : "0px";
            scrollContainer.style.top = !!props.top ? String(props.top) + "px" : "0px";
            scrollContainer.style.bottom = !!props.bottom ? props.bottom + "px" : "0px";
            scrollbar.style.height = String(scrollContainer.clientHeight * content.clientHeight / content.scrollHeight) + "px";

            const setScroll = () => {
                if (content.scrollHeight > content.clientHeight) {
                    scrollContainer.style.visibility = "visible";
                    scrollbar.style.top = scrollContainer.clientHeight * content.scrollTop / content.scrollHeight + "px";
                    if (!!props.arrBlocksId) {
                        setCurBlockId(getActiveSectionId())
                    }
                } else {
                    scrollContainer.style.visibility = "hidden";
                }
            };

            const pushScrollbar = (start: { preventDefault: () => void; pageY: number; }) => {
                start.preventDefault();
                content.style.scrollBehavior = "auto";
                const y = scrollbar.offsetTop;

                const moveContent = function (end: { pageY: number; }) {
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

        const getActiveSectionId = useCallback(():string|undefined => {
            const container: any = containerRef.current;
            const containerTop: any = container.getBoundingClientRect().top;
            const containerBottom: any = container.clientHeight + containerTop;
            let curId;
            let maxRelativeHeight = 0;
            if (!!props.arrBlocksId) {
                props.arrBlocksId.forEach(id => {
                    const section = document.querySelector(`#${id}`);
                    if (!!section) {
                        const sectionTop = section.getBoundingClientRect().top;
                        const sectionBottom = section.clientHeight + sectionTop;
                        const offTop = containerTop > sectionTop ? containerTop - sectionTop : 0;
                        const offBottom = containerBottom < sectionBottom ? sectionBottom - containerBottom : 0;
                        const viewRelativeHeight = (section.clientHeight - offTop - offBottom) / section.clientHeight;

                        if (viewRelativeHeight > maxRelativeHeight) {
                            maxRelativeHeight = viewRelativeHeight
                            curId = id
                        };
                    }
                });
            }
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

