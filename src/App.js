import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'
// import Pagination from 'react-bootstrap/Pagination'
// import Form from 'react-bootstrap/Form'
// import ReactLoading from 'react-loading'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Paging from './components/Paging'

function App() {
  const pageSizeArr = [2, 3, 4, 5, 6]
  const [users, setUsers] = useState(null)
  const [activePage, setActivePage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [pageSize, setPageSize] = useState(pageSizeArr[0])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const getData = async (page = 1, size) => {
      try {
        setUsers(null)
        setLoading(true)
        const res = await fetch(
          `https://reqres.in/api/users?per_page=${size}&page=${page}&delay=1`
        )

        if (!res.ok) {
          throw new Error(`This is an HTTP error: The status is ${res.status}`)
        }

        const data = await res.json()

        setUsers(data.data)
        setTotalPage(data.total_pages)
      } catch (err) {
        setLoading(false)
        setError(true)
        setUsers(null)
      } finally {
        setLoading(false)
        setError(false)
      }
    }

    getData(activePage, pageSize) // eslint-disable-next-line
  }, [activePage, pageSize])

  return (
    <Container>
      <h1>Users</h1>
      <Table bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Avatar</th>
          </tr>
        </thead>
        <tbody>
          {loading && (
            <tr>
              <td colSpan={5}>
                <Skeleton className='my-2' />
              </td>
            </tr>
          )}
          {error && (
            <tr>
              <td colSpan={5}>There is an error</td>
            </tr>
          )}
          {!users && !loading && (
            <tr>
              <td colSpan={5}>No entries found</td>
            </tr>
          )}
          {users &&
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                  <Image src={user.avatar} width={50} height={50} />
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      <Paging
        activePage={activePage}
        setActivePage={setActivePage}
        totalPage={totalPage}
        setPageSize={setPageSize}
        pageSizeArr={pageSizeArr}
      />
    </Container>
  )
}

export default App
