import { Switch, Route } from 'wouter'
import { RootLayout } from './layouts/RootLayout'
import { Home } from './pages/Home'
import { Impressum } from './pages/Impressum'
import { Datenschutz } from './pages/Datenschutz'
import { NotFound } from './pages/NotFound'

function App() {
  return (
    <RootLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/en" component={Home} />
        <Route path="/impressum" component={Impressum} />
        <Route path="/datenschutz" component={Datenschutz} />
        <Route component={NotFound} />
      </Switch>
    </RootLayout>
  )
}

export default App
