import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import marked from 'marked'

const ACTIONS = {
    SET_CONTENT: "SET_CONTENT",
    SET_RESULT: "SET_CONTENT",
    GET_RESULT: "GET_RESULT",
    GET_CONTENT: "GET_RESULT"
}
const initialContent = "# Welcome to my React Markdown Previewer!\n## This is a sub-heading... \nHeres some code, `<div></div>`, between 2 backticks.\n ```\n\/\/ this is multi-line code: \nfunction anotherExample(firstLine, lastLine) {if (firstLine == '```' && lastLine == '```') {return multiLineCode;}}\n```\nThere's also [links](https://www.freecodecamp.com)\nYou can also make text **bold**... whoa!\n> Block Quotes!\n- And of course there are lists.\n- Some are bulleted.\n- With different indentation levels.\n- That look like this.\n![React Logo w/ Text](https://goo.gl/Umyytc)"
const reducer = (state = {
    content: initialContent,
    result: marked(initialContent)
}, action) => {
    switch (action.type) {
        case ACTIONS.SET_CONTENT:
            return {
                ...state,
                content: action.content,
                result: marked(action.content)
            }
        default:
            return state
    }
}

const store = createStore(reducer)


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
