import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {DetailPage} from './pages/DetailPage'
import {WelcomePage} from './pages/WelcomePage'
import {AuthPage} from './pages/AuthPage'
import {ListPage} from './pages/ListPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/welcome" exact>
                    <WelcomePage />
                </Route>
                <Route path="/list" exact>
                    <ListPage />
                </Route>
                <Route path="/detail/:id">
                    <DetailPage />
                </Route>
                <Route path="/detail/" exact>
                    <DetailPage />
                </Route>
                <Redirect to="/welcome" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}