import { ReactChild } from "react";

// //---------scrollbox-------
export type Tscrollbox = {
    children: ReactChild,
    top?: number,
    bottom?: number,
    arrBlocksId?: Array<string>,
    callbackScroll?: Function,
    id?: string
};
// //-------------------------

//------------------------foods--------------------------
type TfoodType = 'bun' | 'sauce' | 'main'

export type Tfood = {
   readonly _id: string,
    readonly name: string,
    readonly type: TfoodType,
    readonly proteins: number,
    readonly fat: number,
    readonly carbohydrates: number,
    readonly calories: number,
    readonly price: number,
    readonly image: string,
    readonly image_mobile: string,
    readonly image_large: string,
    readonly __v: number,
    unicId?: string,
    count?: number
};

export type Tfoods = Array<Tfood>;


//------------burger-card------
export type Tburger = {
    readonly createdAt: string,
    ingredients: Tfoods,
    readonly name: string,
    readonly number: number,
    readonly status: 'done' | 'notReady',
    total: number,
    _id: string
};

export type Torder = {
    readonly createdAt: string,
    ingredients: Array<string>,
    readonly name: string,
    readonly number: number,
    readonly status: 'done' | 'notReady',
    total: number,
    _id: string
};

export type TburgerCard = {
    burger: Tburger
}

export type TimageIngredient = {
    readonly image: string,
    readonly text?: string,
    type?: string
}

//------------burger-feed--------------
export type TfeedBurger = {
    title?: string,
    burgers: Array<any>
} 
//-------------------------------------

//------------burger-order------------
export type TorderProps = {
    order: Tburger 
}

export type TorderRecipeProps = {
    ingredients: Tfoods
}

export type TorderIngredientProps = {
    ingredient: Tfood
}
//------------------------------------

//-----LocationState----------
export interface IlocationState {
    from: {
        pathname: string;        
    };
    background?: any;
}
//---------------------------


//----icon----
export type TIcon = undefined;
//--------


//---------header---------
export type TheaderLink = 'burger' | 'orders' | 'profile';
export type TheaderIcon = 'burger' | 'list' | 'profile';

export interface IheaderButton {
    readonly link: string,
    readonly icon: TheaderIcon,
    type: 'primary' | 'secondary',
    text: string
};

export interface IheaderButtonProps {
    data: IheaderButton
};

//----auth-form---------
export type Tinput = {
    readonly name: string,
    readonly placeholder: string,
    type?: 'text' | 'email' | 'password' | undefined,
    value: string,
    icon?: "HideIcon" | "ShowIcon" | undefined
};

export type Tinputs = Array<Tinput>;

export interface Idata {
    [name: string]: string;
}

export type TfooterLink = {
    readonly desc: string,
    readonly text: string,
    readonly pathname: string
}

export type TFooterLinksProps = {
    footerLinks: Array<TfooterLink>
}

export type TConfirmForm = {
    text?: string,
    callback: Function
}
export type TAuthFormData = {
    title: string,
    arrInputs: Tinputs,
    footerLinks: Array<TfooterLink>
    confirm: TConfirmForm
}


export type TAuthFormProps = {
    data: TAuthFormData
}
//------------------------

//--------profile---------
export type Tuser = {
    email: string,
    name: string,
    isAuth: boolean,
    canRestorePass: boolean
};

export type TinputsForm = {
    email: string,
    name: string,
    password: string
}

export type TprofileForm = {
    inputs: TinputsForm
}
//--------------------


//------textProps-----
export type Ttext = {
    text: string
}

//-----feed-status-----
export interface IstatusColumns {
    arr: Array<number>;
    title: string;
    type: string
}

export interface IstatusCount {
    title: string;
    count: number
}

export type TfeedStatusArrs = {
    arrDone: Array<number>,
    arrNotReady: Array<number>
}
//---------------------

//--burger=ingredients--
export type TingredientCardProps = {
    food: Tfood
}

export type TingredientSection = {
    readonly id: string,
    readonly text: string,
    foods: Tfoods,
    active?: boolean
}


export type TingredientsMenuProps = {
    sections: Array<TingredientSection>
}

//-------common----------
export interface ItextArr {
    textArr?: Array<string> | undefined
}
//------------------------

//-------------modal------
export type Tmodal = {
    children: ReactChild,
    isLoading?: boolean,
    onClose: () => void,
    title?: string
}
//-------------------------

//--------------orders------
export type Torders = {
    items: Array<number>,
    isLoading: boolean,
    isError: boolean,
    openDetails: boolean,
    currentNumber: null | number
}
//---------------------------


//------moved-element------
export type TmovedElementProps = {
    id: string | undefined,
    children: ReactChild | Array<ReactChild>,
    index: number,
    moveElement: Function,
}

