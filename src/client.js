import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import App from './App';

import store from './store';
import StyleContext from 'isomorphic-style-loader/StyleContext';


const insertCss = (...styles) => {
    const removeCss = styles.map(style => style._insertCss())
    return () => removeCss.forEach(dispose => dispose())
}


ReactDOM.render(
    <StyleContext.Provider value={{ insertCss }}>
        <Provider store={store} >
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </StyleContext.Provider>,
  document.getElementById('root')
)