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
    __v: PropTypes.number.isRequired,
    count: PropTypes.number
});
const foodsPropTypes = PropTypes.arrayOf(foodPropTypes.isRequired).isRequired;
const foodSections = PropTypes.arrayOf(PropTypes.shape({
    id: foodTypeProptypes.isRequired,
    text: PropTypes.string.isRequired,
    foods: foodsPropTypes.isRequired
}));

//---------header---------
export const headerButtonProptypes = {
    data: PropTypes.shape({
        link: PropTypes.string.isRequired,
        icon: PropTypes.oneOf(['burger', 'list', 'profile']).isRequired,
        type: PropTypes.oneOf(['primary', 'secondary']).isRequired,
        text: PropTypes.string.isRequired,
    })
};
//--------------------------

//---burger-ingredients----
export const menuPropTypes = {
    sections: foodSections,
};
export const sectionsPropTypes = {
    sections: foodSections
};
export const inrgredientCardPropTypes = {
    food: foodPropTypes.isRequired
}
//-------------------------

//-------order-------------
export const orderDetailsProptypes = PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
    openDetails: PropTypes.bool.isRequired,
    currentNumber: PropTypes.number || null,
});
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
}

export const modalProptypes = {
    title: PropTypes.string,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    isLoading: PropTypes.bool
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

//------moved-element------
export const movedElementProptypes = {
    id: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired || PropTypes.arrayOf(PropTypes.node).isRequired,
    index: PropTypes.number.isRequired,
    moveElement: PropTypes.func.isRequired,
}

//-----auth-form----------
export const authFormFooterLinks = PropTypes.arrayOf(PropTypes.shape({
    desc: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired
})).isRequired;

export const authFormProptypes = {
    data: PropTypes.shape({
        title: PropTypes.string,
        arrInputs: PropTypes.arrayOf(PropTypes.object),
        footerLinks: authFormFooterLinks,
        confirm: PropTypes.shape({
            text: PropTypes.string,
            callback: PropTypes.func
        })
    })
};

//---------------routes-------
export const protecRouteProptypes = {
    children: PropTypes.node.isRequired || PropTypes.arrayOf(PropTypes.node).isRequired
}

