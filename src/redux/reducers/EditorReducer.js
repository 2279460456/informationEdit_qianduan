export default function EditorReducer(prestate = { editorContext: '' }, action) {
    let { type, editorContext } = action;
    switch (type) {
        case 'update':
            let newstate = { ...prestate };
            newstate.editorContext = editorContext;
            return newstate
        default:
            return prestate
    }

}