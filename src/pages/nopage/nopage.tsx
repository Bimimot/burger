import React from 'react';
import pStyles from '../pages.module.css';

export const NoPage = () =>
    <h1 className={pStyles.noPage + " text text_type_main-large"}>В этой Вселенной страницы такой не существует пока</h1>

export const NoOrderPage = () =>
    <h1 className={pStyles.noOrderPage + " text text_type_main-medium"}>Номер заказа неизвестный указан</h1>

export const NoOrdersPage = () =>
    <h1 className={pStyles.noOrderPage + " text text_type_main-medium"}>Не созданы заказы ещё</h1>