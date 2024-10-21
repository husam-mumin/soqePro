import MainLayout from './layout/Main-Layout'
import Home from './pages/Home'
import Sale from './pages/Sale'
import StroagePage from './pages/Storage'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Setting from './pages/Setting'

function App(): JSX.Element {
  return (
    <HashRouter basename="/">
      <MainLayout>
        <Routes>
          <Route index Component={Home} path="/" />
          <Route Component={Sale} path="/Sale" />
          <Route Component={StroagePage} path="/Storage" />
          <Route Component={Setting} path="/setting" />
        </Routes>
      </MainLayout>
    </HashRouter>
  )
}

export default App
