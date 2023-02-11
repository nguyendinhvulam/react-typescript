import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import reportWebVitals from './reportWebVitals'

import { IntlProvider } from 'react-intl'
import { Provider } from 'react-redux'
import { defaultLocale } from './constants'
import AppLocale from './lang'
import store from './redux/Store'

import Loading from 'src/components/loading'
import './assets/scss/style.scss'
import AsideContextProvider from './context/AsideContext'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

const locale = defaultLocale
const currentAppLocale = AppLocale[locale]

const App = React.lazy(() => import('src/App'))
const Dashboard = React.lazy(() => import('src/views/app/dashboard'))

// UI
const UI = React.lazy(() => import('src/views/app/ui'))
const Icons = React.lazy(() => import('src/views/app/ui/Icons'))

// Pages
const Pages = React.lazy(() => import('src/views/app/pages'))
const FAQ = React.lazy(() => import('src/views/app/pages/miscellaneous/Faq'))

// Users
const Users = React.lazy(() => import('src/views/app/users'))
const UserList = React.lazy(() => import('src/views/app/users/UserList'))
const UserForm = React.lazy(() => import('src/views/app/users/UserForm'))
const User = React.lazy(() => import('src/views/app/users/User'))

const NotFound = React.lazy(() => import('src/views/error/404'))

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <IntlProvider
          locale={locale}
          messages={currentAppLocale}
        >
          <AsideContextProvider>
            <Suspense fallback={<Loading />}>
              <Routes>
                <Route path="/" element={<App />}>

                  <Route index element={<Dashboard />} />

                  <Route path="ui" element={<UI />}>
                    <Route path="icons" element={<Icons />} />
                  </Route>

                  <Route path="pages" element={<Pages />}>
                    <Route path="miscellaneous/faq" element={<FAQ />} />
                  </Route>

                  <Route path="users" element={<Users />}>
                    <Route index element={<UserList />} />
                    <Route path="new" element={<UserForm />} />
                    <Route path=":userId" element={<User />} />
                  </Route>

                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AsideContextProvider>
        </IntlProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
