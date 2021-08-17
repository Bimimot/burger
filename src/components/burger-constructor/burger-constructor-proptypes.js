import PropTypes from 'prop-types';
import { foodPropTypes, foodsPropTypes } from "../burger-ingredients/burger-ingredients-proptypes";

export const constructorPropTypes = foodsPropTypes;
export const fillingProptypes = PropTypes.shape({
    "bun": foodPropTypes,
    "filling": foodsPropTypes
});

export const confirmOrderProptypes = PropTypes.shape({
    "total": PropTypes.number
})