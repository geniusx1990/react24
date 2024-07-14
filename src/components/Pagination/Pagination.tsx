import './style.css'
import { useLocation, useNavigate } from 'react-router-dom'

interface IPagination {
  totalPages: number
  currentPage: number
}

export default function Pagination({ totalPages, currentPage }: IPagination) {
  const navigate = useNavigate()
  const location = useLocation()

  const handlePageChange = (page: number) => {
    const searchParams = new URLSearchParams(location.search)
    searchParams.set('page', String(page))
    navigate(`/?${searchParams.toString()}`)
  }

  return (
    <div className="pagination">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          className="pagination-button"
          key={index}
          onClick={() => handlePageChange(index + 1)}
          disabled={currentPage === index + 1}
        >
          {index + 1}
        </button>
      ))}
    </div>
  )
}
