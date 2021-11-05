import { useEffect } from 'react';
import { useDispatch, useSelector } from "../../services/types/hooks-types";
import pStyles from '../pages.module.css';
import { ErrorMessage } from '../../components/error-message/error-message';
import { Loader } from '../../components/loader/loader';
import { FeedBurgers } from '../../components/feed-burgers/feed-burgers';
import { FeedStatus } from '../../components/feed-status/feed-status';

export const FeedPage = () => {
    const { orders, success, isError } = useSelector(store => store.wsFeed);
    const isLoadedFoods = useSelector(store => store.foods.isLoaded)
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoadedFoods && !success) {
            dispatch({ type: "wsFeed/wsInit" });
        }
    }, [isLoadedFoods, success, dispatch]);
    
    useEffect(() => {
        return () => {
            dispatch({ type: "wsFeed/wsClosed" });
        }
    }, []);

    return (
        <>
            {(!!orders && success)
                ? <div className={pStyles.content}>
                    <FeedBurgers burgers={orders} title={"Лента заказов"} />
                    <FeedStatus />
                  </div >
                : <Loader text={"Уточняем на кухне"} />
            }
            {isError && <ErrorMessage />}
        </>
    )
}