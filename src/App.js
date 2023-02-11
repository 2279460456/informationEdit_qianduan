import IndexRoute from './router';
import './util/http'; //对axios的baseurl进行定义
import { Provider } from 'react-redux';  //Provider向子组件传递store
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react'; //持久化
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <IndexRoute></IndexRoute>
      </PersistGate>
    </Provider>
  );
}

export default App;
