import React from 'react';
import PropTypes from 'prop-types';
import sboxStyles from './scrollbox.module.css';
import { updateSourceFile } from 'typescript';

export default class ScrollBox extends React.Component {
    constructor(props) {
        ScrollBox.propTypes = {
            id: PropTypes.string.isRequired,
            children: PropTypes.element.isRequired
        };
        super(props);
        this.state = { container: null, content: null, scrollbar: null };

        this.setScrollBar = this.setScrollBar.bind(this);
        this.startScrollContent = this.startScrollContent.bind(this);
        this.moveScroll = this.moveScroll.bind(this);
        this.removeListeners = this.removeListeners.bind(this);
    }

    componentDidMount() {
        const container = document.querySelector(`#${this.props.id}`);
        const content = container.querySelector("#content");
        const scrollbar = container.querySelector("#scrollbar");
        this.setState({ container: container, content: content, scrollbar: scrollbar });

        content.addEventListener('scroll', this.setScrollBar);
        scrollbar.addEventListener('mousedown', this.startScrollContent);
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.setScrollBar()
        }
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    setScrollBar() {
        const { container, content, scrollbar } = this.state;
        scrollbar.style.height = container.clientHeight * content.clientHeight / content.scrollHeight + "px";
        scrollbar.style.top = container.clientHeight * content.scrollTop / content.scrollHeight + "px";
    }

    startScrollContent(event) {
        event.preventDefault();
        console.log("moveStart");

        this.y = this.state.scrollbar.offsetTop;
        this.start = event.pageY;
        this.state.content.style.scrollBehavior = "auto";

        document.addEventListener('mousemove', this.moveScroll);
        document.addEventListener('mouseup', this.removeListeners);
        
    }

    moveScroll(event) {
        const { scrollbar, container, content } = this.state;

        const end = event.pageY;
        const delta = end - this.start;
        
        scrollbar.style.top = Math.min(container.clientHeight - scrollbar.clientHeight, Math.max(0, this.y + delta)) + 'px';
        content.scrollTop = (content.scrollHeight * scrollbar.offsetTop / container.clientHeight);
    }

    removeListeners() {
        this.state.content.style.scrollBehavior = "smooth";
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

