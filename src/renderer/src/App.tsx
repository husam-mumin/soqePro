import MainLayout from './layout/Main-Layout'
import Home from './pages/Home'
import Sale from './pages/Sale'
import StroagePage from './pages/Storage'
import { HashRouter, Route, Routes } from 'react-router-dom'
import Setting from './pages/Setting'
import InsertItemFrom from './pages/Storage/page/InsertItemFrom'

function App(): JSX.Element {
  return (
    <HashRouter basename="/">
      <MainLayout>
        <Routes>
          <Route index Component={Home} path="/" />
          <Route path="/Sale" Component={Sale} />
          <Route Component={InsertItemFrom} path="/Storage/insertItemFrom" />
          <Route Component={StroagePage} path="/Storage" />
          <Route Component={Setting} path="/setting" />
        </Routes>
      </MainLayout>
    </HashRouter>
  )
}

export default App
