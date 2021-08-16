import React from 'react';
import PropTypes from 'prop-types';
import sboxStyles from './scrollbox.module.css';

export default class ScrollBox extends React.Component {
    constructor(props) {
        ScrollBox.propTypes = {
            id: PropTypes.string.isRequired,
            children: PropTypes.element.isRequired,
            top: PropTypes.number,
            bottom: PropTypes.number,
        };
        super(props);
        this.state = { content: null, scrollContainer: null, scrollbar: null };

        this.setScrollBar = this.setScrollBar.bind(this);
        this.startScrollContent = this.startScrollContent.bind(this);
        this.moveScroll = this.moveScroll.bind(this);
        this.removeListeners = this.removeListeners.bind(this);
    }

    componentDidMount() {
        const container = document.querySelector(`#${this.props.id}`);
        const content = container.querySelector("#content");
        const scrollContainer = container.querySelector("#scrollContainer");
        const scrollbar = container.querySelector("#scrollbar");

        content.addEventListener('scroll', this.setScrollBar);
        scrollbar.addEventListener('mousedown', this.startScrollContent);

        scrollContainer.style.top = !!this.props.top ? this.props.top + "px" : 0;
        scrollContainer.style.bottom = !!this.props.bottom ? this.props.bottom + "px" : 0;

        this.setState({ content: content, scrollContainer: scrollContainer, scrollbar: scrollbar });
    }

    componentDidUpdate() {
        this.setScrollBar()
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    setScrollBar() {
        const { content, scrollContainer, scrollbar } = this.state;
        if (content.scrollHeight > content.clientHeight) {
            scrollbar.style.height = scrollContainer.clientHeight * content.clientHeight / content.scrollHeight + "px";
            scrollbar.style.top = scrollContainer.clientHeight * content.scrollTop / content.scrollHeight + "px";
        } else {
            scrollContainer.style.display = "none";
            content.removeEventListener('scroll', this.setScrollBar);
        }
    }

    startScrollContent(event) {
        event.preventDefault();
        this.y = this.state.scrollbar.offsetTop;
        this.start = event.pageY;
        this.state.content.style.scrollBehavior = "auto";
        document.addEventListener('mousemove', this.moveScroll);
        document.addEventListener('mouseup', this.removeListeners);
    }

    moveScroll(event) {
        const { scrollbar, scrollContainer, content } = this.state;
        const end = event.pageY;
        const diff = end - this.start;
        scrollbar.style.top = Math.min(scrollContainer.clientHeight - scrollbar.clientHeight, Math.max(0, this.y + diff)) + 'px';
        content.scrollTop = (content.scrollHeight * scrollbar.offsetTop / scrollContainer.clientHeight);
    }

    removeListeners() {
        this.state.content.style.scrollBehavior = "smooth";
        document.removeEventListener('mousemove', this.moveScroll);
        document.removeEventListener('mouseup', this.removeListeners);
    }

    render() {
        return (
            <section className={sboxStyles.container} id={this.props.id}>
                <div className={sboxStyles.scrollBarContainer} id="scrollContainer">
                    <div className={sboxStyles.scrollbar} id="scrollbar"></div>
                </div>
                <div className={sboxStyles.content} id="content">
                    {this.props.children}
                </div>
            </section>
        )
    }
}

