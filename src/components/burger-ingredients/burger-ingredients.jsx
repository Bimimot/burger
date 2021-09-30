import iStyles from './burger-ingredients.module.css';
import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { IngredientsMenu } from './components/ingredients-menu';
import { IngredientsSections } from './components/ingredients-sections';
import { ScrollBox } from '../scrollbox/scrollbox';
import { setActiveSection } from '../../services/slicers/foods';

export const BurgerIngredients = () => {
    const sections = useSelector(store => store.foods.sections);
    const dispatch = useDispatch();

    const updateMenu = useCallback((id) => {
        const prevActive = sections.find(s => s.active);
        if (!prevActive || prevActive.id !== id) {
            dispatch(setActiveSection(id))
        }
    }, [sections, dispatch])

    return (
        <article className={iStyles.ingredients}>
            {!!sections.length &&
                <>
                <IngredientsMenu sections={sections} />
                    <ScrollBox
                        top={40}
                        bottom={52}
                        id={"ingredients"}
                        arrBlocksId={sections.map(m => m.id)}
                        callbackScroll={updateMenu}
                    >
                        <IngredientsSections sections={sections} />
                    </ScrollBox>
                </>
            }
        </article>
    )
}
