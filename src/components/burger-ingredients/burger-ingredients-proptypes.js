import PropTypes from 'prop-types';

const foodTypeProptypes = PropTypes.oneOf(['bun', 'sauce', 'main']);
export const foodPropTypes = PropTypes.shape({
    "_id": PropTypes.string.isRequired,
    "name": PropTypes.string.isRequired,
    "type": foodTypeProptypes.isRequired,
    "proteins": PropTypes.number,
    "fat": PropTypes.number,
    "carbohydrates": PropTypes.number,
    "calories": PropTypes.number,
    "price": PropTypes.number.isRequired,
    "image": PropTypes.string.isRequired,
    "image_mobile": PropTypes.string,
    "image_large": PropTypes.string,
    "__v": PropTypes.number
});
export const foodsPropTypes = PropTypes.arrayOf(foodPropTypes.isRequired).isRequired;
const foodSections = PropTypes.arrayOf(PropTypes.shape({
    id: foodTypeProptypes.isRequired,
    text: PropTypes.string.isRequired,
    foods: foodsPropTypes.isRequired
}));

export const menuPropTypes = {
    title: PropTypes.string,
    sections: foodSections
};

export const ingredientsPropTypes = foodsPropTypes;
export const sectionsPropTypes = foodSections;



