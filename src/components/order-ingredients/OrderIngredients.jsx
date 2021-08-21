
import oStyles from "./order-ingredients.module.css";
import iconDonePath from "../../images/icon-done.png"

export const OrderIngredients = ({order}) => {

    return (
        <div className={oStyles.container}>
            <h1 className={oStyles.title + " text text_type_digits-large"}>{order}</h1>
            <p className={"text text_type_main-medium"}>идентификатор заказа</p>
            <img className={oStyles.icon} src={iconDonePath} alt="icon done" />
            <p className={"text text_type_main-default mb-2"}>ваш заказ начали готовить</p>
            <span className={"text text_type_main-default text_color_inactive"}>Дождитесь готовности на орбитальной станции</span>
        </div>
    )
}
