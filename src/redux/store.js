import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import allreducers from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension';   //插件监控状态

const persistConfig = {
    key: 'fold_state',
    storage,   //存储到localstorage中
    blacklist: [] // LoadingReducer 将不会被持久化
}


const persistedReducer = persistReducer(persistConfig, allreducers)

let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(thunk)));  //可以传入三个参数
let persistor = persistStore(store);

export { store, persistor }    //因为一些持久化的操作，所以做了很多修改