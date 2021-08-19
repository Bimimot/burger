import { useEffect } from 'react';
import sboxStyles from './scrollbox.module.css';
import { scrollboxPropTypes } from '../../utils/proptypes';

export const ScrollBox = (props) => {
    ScrollBox.propTypes = scrollboxPropTypes;

    useEffect(() => {
        const container = document.querySelector(`#${props.id}`);
        const content = container.querySelector("#content");
        const scrollContainer = container.querySelector("#scrollContainer");
        const scrollbar = container.querySelector("#scrollbar");
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
        <section className={sboxStyles.container} id={props.id}>
            <div className={sboxStyles.scrollBarContainer} id="scrollContainer">
                <div className={sboxStyles.scrollbar} id="scrollbar"></div>
            </div>
            <div className={sboxStyles.content} id="content">
                {props.children}
            </div>
        </section>
    )
};

