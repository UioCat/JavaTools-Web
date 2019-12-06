import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { NavBar } from './Router/NavBar';
import { storeTree } from "./Mobx/store";

render(
    <Provider store={storeTree}>
        <NavBar />
    </Provider>,
    document.getElementById('root')
)