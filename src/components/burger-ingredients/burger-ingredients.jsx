import { useState, useEffect } from 'react';
import iStyles from './burger-ingredients.module.css';
import { ingredientsPropTypes } from '../../utils/proptypes';
import { translations } from '../../utils/data';
import { IngredientsMenu } from './components/ingredients-menu';
import { IngredientsSections } from './components/ingredients-sections';
import { Modal } from '../modal/modal';
import { IngredientsDetails } from '../ingredient-details/ingredients-details';
import { ScrollBox } from '../scrollbox/scrollbox';
import { useSelector } from 'react-redux';

export const BurgerIngredients =
    () => {
        //BurgerIngredients.propTypes = ingredientsPropTypes;

        const ingredients = useSelector(store => store.foods.items);
        
        const [sections, setSections] = useState([]);
        const [menu, setMenu] = useState([]);
        const [details, setDetails] = useState({
            show: false,
            ingredient: null
        });

        useEffect(() => {
            const newSections = [];
            ingredients.forEach(food => {
                const foodIndex = newSections.findIndex(s => s.id === food.type);
                foodIndex > -1 ? newSections[foodIndex].foods.push(food)
                    : newSections.push({ id: food.type, text: translations[food.type], foods: [food] })
            });
            setSections(newSections);
            setMenu(newSections.map(s => ({ id: s.id, text: s.text, test: "INITIAL" })));
        }, [ingredients]);

        const showDetails = (ingredient) => {
            setDetails({ show: true, ingredient: ingredient })
        }

        const closeDetails = () => {
            setDetails({ show: false, details: null })
        }

        const updateMenu = (id) => {
            const prevActive = menu.find(m => m.active);
            if (!prevActive || prevActive.id !== id) {
                setMenu(menu.map(m => (
                    { ...m, active: m.id === id, test: "noTest" }))
                )
            }
        }

   
        return (
            <article className={iStyles.ingredients}>
                {!!sections.length &&
                    <>
                        <IngredientsMenu
                            menu={menu}
                            title={"Соберите бургер"}
                            clickMenuPoint={updateMenu}
                        />
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
                                updateMenu={updateMenu}
                            />
                        </ScrollBox>
                    </>
                }
                <div style={{ position: "fixed", overflow: "hidden" }}>
                    {details.show &&
                        <Modal title="Детали ингредиента" onClose={closeDetails}>
                        <IngredientsDetails
                            ingredient={details.ingredient}
                            closeDetails={closeDetails}
                        />
                        </Modal>}
                </div>
            </article>
        )
    }
