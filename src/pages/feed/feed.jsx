import React from 'react';
import { useSelector } from 'react-redux';
import pStyles from '../pages.module.css';
import { ErrorMessage } from '../../components/error-message/error-message';
import { Loader } from '../../components/loader/loader';
import { FeedBurgers } from '../../components/feed-burgers/feed-burgers';
import { FeedStatus } from '../../components/feed-status/feed-status';


export const FeedPage = () => {
    const { orders, success, isError } = useSelector(store => store.wsFeed);
    return (
        <>
            {orders.length > 0 &&
                <div className={pStyles.content}>
                    <FeedBurgers burgers={orders} title={"Лента заказов"} />
                    <FeedStatus />
                </div >
            }
            {!success && <Loader text={"Уточняем на кухне"} />}
            {isError && <ErrorMessage />}
        </>
    )
}
