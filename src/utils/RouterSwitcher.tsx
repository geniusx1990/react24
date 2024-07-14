import { Route, Routes } from 'react-router-dom'
import MainPage from '../pages/MainPage/MainPage'
import NotFoundPage from '../pages/NotFoundPage/NoutFoundPage'
import Details from '../components/Details/Details'

const RouterSwitcher = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />}>
        <Route path="details/:id" element={<Details />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default RouterSwitcher
