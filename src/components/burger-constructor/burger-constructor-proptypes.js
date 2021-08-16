import PropTypes from 'prop-types';

const foodTypeProptypes = PropTypes.oneOf(['bun', 'sauce', 'main']);
const foodPropTypes = PropTypes.shape({
    "_id": PropTypes.string.isRequired,
    "name": PropTypes.string.isRequired,
    "type": foodTypeProptypes,
    "proteins": PropTypes.number.isRequired,
    "fat": PropTypes.number.isRequired,
    "carbohydrates": PropTypes.number.isRequired,
    "calories": PropTypes.number.isRequired,
    "price": PropTypes.number.isRequired,
    "image": PropTypes.string.isRequired,
    "image_mobile": PropTypes.string.isRequired,
    "image_large": PropTypes.string.isRequired,
    "__v": PropTypes.number
});
const foodsPropTypes = PropTypes.arrayOf(foodPropTypes.isRequired).isRequired;
const foodSections = PropTypes.arrayOf(PropTypes.shape({
    id: foodTypeProptypes.isRequired,
    text: PropTypes.string.isRequired,
    foods: foodsPropTypes.isRequired
}));

export const menuPropTypes = {
    title: PropTypes.string,
    sections: foodSections
};
export const constructorPropTypes = foodsPropTypes;
export const sectionsPropTypes = foodSections;



