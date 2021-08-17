import cStyles from '../burger-constructor.module.css';
import { fillingProptypes } from '../burger-constructor-proptypes';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import ScrollBox from '../../scrollbox/scrollbox';

export const Filling = ({ filling }) => (
    <div style={{ flexGrow: filling.length, overflow: "hidden" }}>
        <ScrollBox id={"burgerConstructor"}>
            <div className={cStyles.recipe}>
                {filling.map((item, i) => (
                    item.type !== "bun" && <ConstructorElement
                        key={item._id + i}
                        text={item.name}
                        price={item.price}
                        thumbnail={item.image}
                    />
                ))}
            </div>
        </ScrollBox>
    </div>
)
Filling.propTypes = fillingProptypes;