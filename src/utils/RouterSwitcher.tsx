import { Route, Routes } from 'react-router-dom'
import MainPage from '../pages/MainPage/MainPage'
import NotFoundPage from '../pages/NotFoundPage/NoutFoundPage'

const RouterSwitcher = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}></Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  )
}

export default RouterSwitcher
