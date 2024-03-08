import './css/Pagination.css';

const Pagination = ({ postsPerPage, totalPosts, paginate, nextPage, prevPage, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        <li className='page-item'>
          <button onClick={prevPage} className='page-link' disabled={currentPage === 1}>Previous</button>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <button onClick={() => paginate(number)} className={`page-link ${currentPage === number ? 'active' : ''}`}>
              {number}
            </button>
          </li>
        ))}
        <li className='page-item'>
          <button onClick={nextPage} className='page-link' disabled={currentPage === Math.ceil(totalPosts / postsPerPage)}>Next</button>
        </li>
      </ul>
    </nav>
  );
};
export default Pagination;
