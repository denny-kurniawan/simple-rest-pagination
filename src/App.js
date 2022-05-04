import { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Image from 'react-bootstrap/Image'
import Pagination from 'react-bootstrap/Pagination'
import Form from 'react-bootstrap/Form'
// import ReactLoading from 'react-loading'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function App() {
  const [users, setUsers] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [totalPage, setTotalPage] = useState(0)
  const [perPage, setPerPage] = useState(5)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const res = await fetchData(activePage, perPage)
      setTotalPage(res.total_pages)
      setUsers(res.data)
    }

    getData()
  }, [activePage, perPage])

  const fetchData = async (page = 1, per = 5) => {
    setLoading(true)
    const res = await fetch(
      `https://reqres.in/api/users?per_page=${per}&page=${page}&delay=1`
    )
    const data = await res.json()
    setLoading(false)

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

  const clickPerPage = (e) => {
    setActivePage(1)
    setPerPage(e.target.value)
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
          {users.length > 0 && loading === false ? (
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
                {/* <ReactLoading type='spin' color='black' /> */}
                {/* Loading */}
                <Skeleton className='my-2' />
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Container className='d-flex flex-wrap justify-content-around'>
        <Form.Group>
          <Form.Label>Per Page</Form.Label>
          <Form.Select size='sm' defaultValue={5} onChange={clickPerPage}>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
            <option value='5'>5</option>
          </Form.Select>
        </Form.Group>

        <Pagination className='w-50 justify-content-center'>
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
    </Container>
  )
}

export default App
