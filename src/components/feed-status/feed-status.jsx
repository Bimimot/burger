import React from 'react';
import fStyles from './feed-status.module.css';
import { useSelector, useDispatch } from 'react-redux';


export const FeedStatus = () => {
    const burgers = useSelector(store => store.feed.orders);
    const dispatch = useDispatch();

    const arr = [124523, 123737, 143256, 467389, 364536, 478449, 354728,
        124523, 123737, 124523, 123737, 143256, 467389, 364536, 478449, 354728,
        143256, 467389, 364536, 478449, 354728,
        124523, 123737, 143256, 467389, 364536, 478449, 354728];

    return (
        <article className={fStyles.status}>
            <div className={fStyles.data}>
                <StatusColumns title={"Готовы:"} arr={arr} type={"primary"}></StatusColumns>
                <StatusColumns title={"В работе:"} arr={arr} type={"secondary"}></StatusColumns>
            </div>
            <div className={fStyles.total}>
                <StatusCount title={"Выполнено за всё время:"} count={32948} />
                <StatusCount title={"Выполнено за сегодня:"} count={248} />
            </div>
        </article>
    )
}

const StatusColumns = React.memo(
    ({ arr, title, type }) =>
        <div className={fStyles.columns}>
            <h3 className="text text_type_main-medium mb-6">{title}</h3>
            <div className={fStyles.digits}>
                {arr.map(item =>
                    <p className="text text_type_digits-default" style={{ color: "var(--text-" + type + "-color)" }}>{item}</p>
                )}
            </div>
        </div>
);

const StatusCount = React.memo(
    ({ title, count }) => {
        let formatter = new Intl.NumberFormat("ru");
        return (
            <div className={fStyles.count}>
                <h3 className="text text_type_main-medium">{title}</h3>
                <p className={`text text_type_digits-large ${fStyles.totalDigits}`}>{formatter.format(count+0)}</p>
            </div>
        )
    }
)