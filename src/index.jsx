import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { NavBar } from './Router/NavBar';
import { store } from "./Mobx/store";

render(
    <Provider store={store}>
        <NavBar />
    </Provider>,
    document.getElementById('root')
)