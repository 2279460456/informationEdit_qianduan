import { combineReducers } from "redux";
import CollapsedReducer from './CollapsedReducer';  //折叠框
import EditorReducer from "./EditorReducer";        //文本编辑器的值

export default combineReducers({
    CollapsedReducer,
    EditorReducer
})