import {combineReducers} from 'redux'
import Todoapp from './todo/reducer'
import Ecommerce from './ecommerce/product/reducer'
import Filters from './ecommerce/filter/reducer'
import Wishlist from './ecommerce/wishlist/reducer'
import Cart from './ecommerce/cart/reducer'
import ChatApp from './chap-app/reducer'
import EmailApp from './email/reducer'
import Customizer from './customizer/reducer'
import Bookmarkapp from './bookmark/reducer'
import Taskapp from './task-app/reducer'
import Projectapp from './project-app/reducer'
import {configReducer} from "./config/config.reducer";
import {oauthReducer} from "./auth/oauth.reducer";

export const API = 'API';
export const ApiAction = ({
                              url = '',
                              method = 'GET',
                              data = null,
                              accessToken = null,
                              onSuccess = () => {},
                              onLoading = () => {},
                              onProgress = () => {},
                              onError = () => {},
                              ...rest
                          }) => ({
    type: API,
    payload: {
        url,
        method,
        data,
        accessToken,
        onLoading,
        onProgress,
        onSuccess,
        onError,
        ...rest,
    },
});

export const RootReducer = combineReducers<any>({
    application: configReducer,
});

export type RootReducerType = ReturnType<typeof RootReducer>;

const reducers = combineReducers({
    Todoapp,
    data:Ecommerce,
    filters:Filters,
    Wishlistdata:Wishlist,
    Cartdata:Cart,
    ChatApp,
    EmailApp,
    Customizer,
    Bookmarkapp,
    Taskapp,
    Projectapp,
    application: configReducer,
    authkey: oauthReducer,

});

export default reducers;