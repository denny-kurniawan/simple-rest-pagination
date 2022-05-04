import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'
import Pagination from 'react-bootstrap/Pagination'
import ReactLoading from 'react-loading'

function App() {
  const [users, setUsers] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)

  useEffect(() => {
    const getData = async () => {
      const res = await fetchData(activePage)
      setTotalPage(res.total_pages)
      setUsers(res.data)
    }

    getData()
  }, [activePage])

  const fetchData = async (page = 1) => {
    const res = await fetch(
      `https://reqres.in/api/users?per_page=5&page=${page}`
    )
    const data = await res.json()

    return data
  }

  const firstPage = () => {
    if (activePage > 1) {
      setActivePage(1)
    }
  }

  const lastPage = () => {
    if (activePage !== totalPage) {
      setActivePage(totalPage)
    }
  }

  const prevPage = () => {
    if (activePage > 1) {
      setActivePage(activePage - 1)
    }
  }

  const nextPage = () => {
    if (activePage !== totalPage) {
      setActivePage(activePage + 1)
    }
  }

  const clickPage = (page) => {
    setActivePage(page)
  }

  let items = []
  for (let i = 1; i <= totalPage; i++) {
    items.push(
      <Pagination.Item
        onClick={() => clickPage(i)}
        key={i}
        active={i === activePage}
      >
        {i}
      </Pagination.Item>
    )
  }

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
          {users.length > 0 ? (
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
            ))
          ) : (
            <tr>
              <td colSpan={5}>
                <ReactLoading type='spin' color='black' />
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Pagination className='justify-content-center'>
        {activePage === 1 ? (
          <>
            <Pagination.First onClick={firstPage} disabled />
            <Pagination.Prev onClick={prevPage} disabled />
          </>
        ) : (
          <>
            <Pagination.First onClick={firstPage} />
            <Pagination.Prev onClick={prevPage} />
          </>
        )}
        {items}
        {activePage === totalPage ? (
          <>
            <Pagination.Next onClick={nextPage} disabled />
            <Pagination.Last onClick={lastPage} disabled />
          </>
        ) : (
          <>
            <Pagination.Next onClick={nextPage} />
            <Pagination.Last onClick={lastPage} />
          </>
        )}
      </Pagination>
    </Container>
  )
}

export default App
