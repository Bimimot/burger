import iStyles from './burger-ingredients.module.css';
import { useCallback } from 'react';
import { IngredientsMenu } from './components/ingredients-menu';
import { IngredientsSections } from './components/ingredients-sections';
import { Modal } from '../modal/modal';
import { IngredientsDetails } from '../ingredient-details/ingredients-details';
import { ScrollBox } from '../scrollbox/scrollbox';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveSection } from '../../services/slicers/foods';

export const BurgerIngredients = () => {

    const sections = useSelector(store => store.foods.sections);
    const ingredient = useSelector(store => store.ingredient);
    const dispatch = useDispatch();

    const showDetails = useCallback(
        (ingredient) => { dispatch({ type: "ingredient/openIngredient", payload: ingredient })
        }, [dispatch]
    );

    const closeDetails = useCallback(
        () => { dispatch({ type: "ingredient/closeIngredient" })
        }, [dispatch]);

    const updateMenu = useCallback(
        (id) => {
        const prevActive = sections.find(s => s.active);
        if (!prevActive || prevActive.id !== id) {
            dispatch(setActiveSection(id))
        }
    }, [sections, dispatch])

    return (
        <article className={iStyles.ingredients}>
            {!!sections.length &&
                <>
                    <IngredientsMenu />
                    <ScrollBox
                        top={40}
                        bottom={52}
                        id={"ingredients"}
                        arrBlocksId={sections.map(m => m.id)}
                        callbackScroll={updateMenu}
                    >
                        <IngredientsSections
                            sections={sections}
                            showDetails={showDetails}
                        />
                    </ScrollBox>
                </>
            }
            <div style={{ position: "fixed", overflow: "hidden" }}>
                {ingredient.show &&
                    <Modal title="Детали ингредиента" onClose={closeDetails}>
                        <IngredientsDetails
                            ingredient={ingredient.item}
                            closeDetails={closeDetails}
                        />
                    </Modal>}
            </div>
        </article>
    )
}
