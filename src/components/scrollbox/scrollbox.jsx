import React from 'react';
import PropTypes from 'prop-types';
import sboxStyles from './scrollbox.module.css';

export default class ScrollBox extends React.Component {
    constructor(props) {
        ScrollBox.propTypes = {
            children: PropTypes.element.isRequired
        };
        super(props);
        this.state = { container: null, content: null, scroll: null };

        this.setScrollBar = this.setScrollBar.bind(this);
        this.startScrollContent = this.startScrollContent.bind(this);
        this.moveScroll = this.moveScroll.bind(this);
        this.removeListeners = this.removeListeners.bind(this);
    }

    componentDidMount() {
        const container = document.querySelector(`#${this.props.id}`);
        const content = container.querySelector("#content");
        const scroll = container.querySelector("#scrollbar");
        this.setState({ container: container, content: content, scroll: scroll });

        content.addEventListener('scroll', this.setScrollBar);
        scroll.addEventListener('mousedown', this.startScrollContent);
    }

    componentDidUpdate() {
        this.setScrollBar();
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    setScrollBar() {
        const { container, content, scroll } = this.state;
        scroll.style.height = container.clientHeight * content.clientHeight / content.scrollHeight + "px";
        scroll.style.top = container.clientHeight * content.scrollTop / content.scrollHeight + "px";
    }

    startScrollContent(event) {
        event.preventDefault();

        this.y = this.state.scroll.offsetTop;
        this.start = event.pageY;

        document.addEventListener('mousemove', this.moveScroll);
        document.addEventListener('mouseup', this.removeListeners);
    }

    moveScroll(event) {
        const { scroll, container, content } = this.state;

        const end = event.pageY;
        const delta = end - this.start;
        scroll.style.top = Math.min(container.clientHeight - scroll.clientHeight, Math.max(0, this.y + delta)) + 'px';
        content.scrollTop = (content.scrollHeight * scroll.offsetTop / container.clientHeight);
    }

    removeListeners() {
        document.removeEventListener('mousemove', this.moveScroll);
        document.removeEventListener('mouseup', this.removeListeners);
    }

    render() {
        return (
            <section className={sboxStyles.container} id={this.props.id}>
                <div className={sboxStyles.scrollBarContainer} >
                    <div className={sboxStyles.scrollbar} id="scrollbar"></div>
                </div>
                <div className={sboxStyles.content} id="content">
                    {this.props.children}
                </div>
            </section>
        )
    }
}

