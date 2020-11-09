import express from 'express';
import path from 'path';
import favicon from 'serve-favicon'
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import reducers from './Reducers';
import ReduxThunk from 'redux-thunk'
import {
    createStore,
    combineReducers,
    applyMiddleware,
    compose
} from 'redux'
import bodyParser from 'body-parser'
import { StaticRouter } from 'react-router';
import Html from './Html';
import App from './App';
import StyleContext from 'isomorphic-style-loader/StyleContext';


const app = express();

const port = process.env.PORT || 3000
app.set('host', process.env.HOST || '0.0.0.0')
app.set('trust proxy', true);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app
    .use(express.static(path.join(__dirname, '../build')))
    .use(favicon(path.join(__dirname, '../public', 'favicon.ico')))


app.get('/*', async (req, res, next) => {
    const scripts = ['../vendor.js', '../client.js'];
    const context = {};
    const css = new Set() // CSS for all rendered React components
    const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()))

    const reducer = combineReducers(reducers)
    const enhancer = compose(
        applyMiddleware(ReduxThunk))

    const store = createStore(reducer, enhancer);
    const preloadedState = store.getState();

    const appMarkup = ReactDOMServer.renderToString(
        <StyleContext.Provider value={{ insertCss }}>
            <Provider store={store}>
                <StaticRouter context={context} location={req.url}>
                    <App res={res} />
                </StaticRouter>
            </Provider >
        </StyleContext.Provider>

    );



    const html = ReactDOMServer.renderToStaticMarkup(
        <Html
            children={appMarkup}
            scripts={scripts}
            css={css}
            preloadedState={preloadedState}
        />
    );

    res.send(`<!doctype html>${html}`);
});

app.listen(port, () => console.log('Listening on localhost:' + port));