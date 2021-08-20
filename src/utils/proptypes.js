import PropTypes from 'prop-types';

const foodTypeProptypes = PropTypes.oneOf(['bun', 'sauce', 'main']);
const foodPropTypes = PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: foodTypeProptypes.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    image_mobile: PropTypes.string.isRequired,
    image_large: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
});
const foodsPropTypes = PropTypes.arrayOf(foodPropTypes.isRequired).isRequired;
const foodIngredients = PropTypes.arrayOf(PropTypes.shape({
    id: foodTypeProptypes.isRequired,
    text: PropTypes.string.isRequired,
    foods: foodsPropTypes.isRequired
}));

//---------header---------
export const headerButtonProptypes = {
    callback: PropTypes.func,
    icon: PropTypes.oneOf(['burger', 'list', 'profile']).isRequired,
    type: PropTypes.oneOf(['primary', 'secondary']).isRequired,
    text: PropTypes.string.isRequired
};
//--------------------------

//---burger-ingredients----
export const ingredientsPropTypes = foodsPropTypes;
export const menuPropTypes = {
    title: PropTypes.string,
    sections: foodIngredients
};
export const sectionsPropTypes = foodIngredients;
//-------------------------

//---burger-constructor----
export const constructorPropTypes = foodsPropTypes;
export const fillingProptypes = foodsPropTypes;
export const confirmOrderPropTypes = { total: PropTypes.number };
//-------------------------

//---------scrollbox-------
export const scrollboxPropTypes = {
    children: PropTypes.element.isRequired,
    top: PropTypes.number,
    bottom: PropTypes.number,
};
//-------------------------

//----------loader---------
export const loaderProptypes = {
    text: PropTypes.string
}
//-------------------------

//---------modal-----------
export const modalProptypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
}
//-------------------------