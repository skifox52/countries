import { FC, useEffect, useState } from "react"
import Pagination from "./components/Pagination"
import { useDispatch, useSelector } from "react-redux"
import { pagesCounting } from "./features/countriesSlice"
const App: FC = () => {
  const dispatch = useDispatch()
  const [page, setPage] = useState<number>(1)
  //@ts-ignore
  const count = useSelector((state) => state.countries.pages as number)
  const { countries, status } = useSelector(
    //@ts-ignore
    (state) => state.countries
  )
  const handleClick = (e: MouseEvent) => {
    //@ts-ignore
    setPage(parseInt(e.target.textContent))
  }
  useEffect(() => {
    //@ts-ignore
    dispatch(pagesCounting(page))
  }, [page])
  if (status == "pending")
    return (
      <h1 className=" absolute top-1/2 left-1/2 -tanslate-x-1/2 -translate-y-1/2">
        Loading...
      </h1>
    )
  return (
    <div className="App p-32 flex justify-between flex-col items-center min-h-screen">
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Countrie</th>
              <th>Code</th>
            </tr>
          </thead>
          <tbody>
            {status === "succeded" &&
              //@ts-ignore
              countries.map((c) => (
                <tr key={c._id}>
                  <td>{c.name}</td>
                  <td>{c.code}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Pagination count={count} click={handleClick} currentPage={page} />
    </div>
  )
}

export default App
