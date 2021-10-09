import React, { useEffect, useState, FC } from 'react';
import fStyles from './feed-status.module.css';
import { useSelector } from '../../services/types/hooks-types';
import { TfeedStatusArrs, IstatusColumns, IstatusCount } from '../../utils/proptypes';

export const FeedStatus: FC = () => {
    const { orders, total, totalToday } = useSelector(store => store.wsFeed);
    const [state, setState] = useState<TfeedStatusArrs>({
        arrDone: [],
        arrNotReady: []
    });

    useEffect(() => {

        if (!!orders && orders.length) {
            setState({
                arrDone: (orders.filter(b => b.status === "done")).map(b => b.number),
                arrNotReady: (orders.filter(b => b.status !== "done")).map(b => b.number),
            })
        }

    }, [orders]);

    return (
        <article className={fStyles.status}>
            <div className={fStyles.data}>
                <StatusColumns title="Готовы:" arr={state.arrDone} type="primary"></StatusColumns>
                <StatusColumns title="В работе:" arr={state.arrNotReady} type="secondary"></StatusColumns>
            </div>
            <div className={fStyles.total}>
                <StatusCount title="Выполнено за всё время:" count={total} />
                <StatusCount title="Выполнено за сегодня:" count={totalToday} />
            </div>
        </article>
    )
}

const StatusColumns:FC<IstatusColumns> = React.memo(
    ({ arr, title, type }) =>
        <div className={fStyles.columns}>
            <h3 className="text text_type_main-medium mb-6">{title}</h3>
            <div className={fStyles.digits}>
                {arr.map((item, i) =>
                    i < 30 &&
                    <p key={i}
                        className="text text_type_digits-default" style={{ color: "var(--text-" + type + "-color)" }}>
                        {item}
                    </p>
                )}
            </div>
        </div>
);

const StatusCount:FC<IstatusCount> = React.memo(
    ({ title, count }) => {
        let formatter = new Intl.NumberFormat("ru");
        return (
            <div className={fStyles.count}>
                <h3 className="text text_type_main-medium">{title}</h3>
                <p className={`text text_type_digits-large ${fStyles.totalDigits}`}>{formatter.format(count + 0)}</p>
            </div>
        )
    }
)