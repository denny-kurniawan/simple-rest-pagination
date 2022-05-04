import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Pagination from 'react-bootstrap/Pagination'

const Paging = ({
  activePage,
  setActivePage,
  totalPage,
  perPage,
  setPerPage,
  pageSize,
}) => {
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

  let pageSizes = []
  for (let i = 0; i < pageSize.length; i++) {
    pageSizes.push(<option value={pageSize[i]}>{pageSize[i]}</option>)
  }

  return (
    <Container className='d-flex flex-wrap justify-content-around'>
      <Form.Group>
        <Form.Label>Per Page</Form.Label>
        <Form.Select size='sm' defaultValue={perPage} onChange={clickPerPage}>
          {pageSizes}
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
  )
}
export default Paging
