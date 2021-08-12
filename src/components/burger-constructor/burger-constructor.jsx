import React from 'react';
import makerStyles from './burger-constructor.module.css';

export default class BurgerConstructor extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menu: [
                { text: "Булки", src: "#bread", active: true },
                { text: "Соусы", src: "#sauce", active: false },
                { text: "Начинки", src: "#filling", active: false }
            ]
        }
    }

    changeLink(curLink) {
        this.setState({
            menu: this.state.menu.map((link, i) => 
                ({ ...link, active: curLink === link})
            )
        })
    }

    render() {
        const { menu } = this.state;

        return (
            <section className={makerStyles.constructor}>
                <h1 className={"text text_type_main-large"}>Соберите бургер</h1>
                <nav className={makerStyles.menu}>
                    {menu.map(link => (
                        <a
                            key={link.src}
                            href={link.src}
                            className={(link.active ? makerStyles.menuPointActive : makerStyles.menuPoint)
                                + " pt-4 pb-4 text text_type_main-default"}
                            onClick={() => this.changeLink(link)}
                        >
                            {link.text}
                        </a>
                    ))}
                </nav>

                <section style={{height: "1500px"}} id="bread">Bread
                    BreadBreadBread
                    Bread
                    Bread

                </section>

                <section id="sauce">Sauce</section>

                <section id="filling">fill</section>
            </section>
        )
    }

}