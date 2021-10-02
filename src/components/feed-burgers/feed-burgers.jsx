import fStyles from './feed-burgers.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { ScrollBox } from '../scrollbox/scrollbox';
import { BurgerCard } from '../burger-card/burger-card';

export const FeedBurgers = ({title, burgers}) => {
    return (
        <article className={fStyles.burgers}>
            {!!title && <h1 className={"text text_type_main-large mb-3 mt-10"}>{title}</h1>}
            <ScrollBox
                bottom={16}
                id={"feed"}
            >
                <div>
                    {burgers.map(burger =>
                        <BurgerCard key={burger._id} burger={burger} />)}
                </div>
            </ScrollBox>
        </article>
    )
}
