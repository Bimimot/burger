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
const foodSections = PropTypes.arrayOf(PropTypes.shape({
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
    sections: foodSections,
    clickMenuPoint: PropTypes.func
};
export const sectionsPropTypes = {    
    sections: foodSections,
    showDetails: PropTypes.func.isRequired
};
export const inrgredientCardPropTypes = {
    food: foodPropTypes.isRequired
}
//-------------------------

//-------order-------------
export const orderProptypes = PropTypes.shape({
    open: PropTypes.bool.isRequired,
    number: PropTypes.number,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
});
//-------------------------

//---burger-constructor----
export const fillingProptypes = foodsPropTypes;


export const confirmOrderPropTypes = {
    orderState: PropTypes.array.isRequired
};
//-------------------------

//---------scrollbox-------
export const scrollboxPropTypes = {
    children: PropTypes.element.isRequired,
    top: PropTypes.number,
    bottom: PropTypes.number,
    arrBlocksId: PropTypes.arrayOf(PropTypes.string),
    callbackScroll: PropTypes.func
};
//-------------------------

//----------loader---------
export const loaderProptypes = {
    text: PropTypes.string
}
//-------------------------

//---------modal-----------
export const modalOverlay = {
    onClose: PropTypes.func,
    children: PropTypes.element.isRequired,
    isLoading: PropTypes.bool
}

export const modalProptypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
}
export const modalTitleProptypes = {
    title: PropTypes.string
}
export const modalCloseProptypes = {
    onClose: PropTypes.func.isRequired,
}
//-------------------------


//---------details---------
export const detailsProptypes = {
    ingredient: foodPropTypes.isRequired
}
//-------------------------

//-------error-------------
export const errMessageProptypes = {
    textArr: PropTypes.arrayOf(PropTypes.string)
}