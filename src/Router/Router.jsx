import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { LoadApp } from '../Layouts/Load'
import { Home } from '../Layouts/Home'
import { About } from '../Layouts/About'

const NavList = () => (
    <ul>
        <Link to="/">
            <Button variant="outlined" color="primary">
                首页
            </Button>
        </Link>
        <Link to="/load">
            <Button variant="outlined" color="primary">
                程序装载
            </Button>
        </Link>
        <Link to="/about">
            <Button variant="outlined" color="primary">
                关于
            </Button>
        </Link>
    </ul>
)

const RouterList = () => (
    <Router>
        <NavList />
        <Route exact path="/" component={Home} />
        <Route path="/load" component={LoadApp} />
        <Route path="/about" component={About} />
    </Router>
)

export { RouterList }