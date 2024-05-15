const Pagination =({currentPage,totalPages,handlePageChange})=>{
    return     <div className='flex w-full justify-center my-10 '>
    <nav aria-label='Page navigation example'>
      <ul className='flex items-center cursor-pointer space-x-px h-8 text-sm'>
        <li
          onClick={() => {
            if (currentPage - 1 > 0) handlePageChange(currentPage - 1);
          }}
        >
          <div className='flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
            <span className='sr-only'>Previous</span>
            <svg
              className='w-2.5 h-2.5 rtl:rotate-180'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 6 10'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M5 1 1 5l4 4'
              />
            </svg>
          </div>
        </li>
        {[...Array(totalPages)].map((_, index) => (
          <li key={index + 1} onClick={() => handlePageChange(index + 1)}>
            <p
              className={`flex items-center justify-center px-3 h-8 leading-tight    border-gray-700  hover:bg-gray-700 hover:text-white 
  ${
    currentPage === index + 1
      ? "bg-gray-700 hover:text-white"
      : "text-gray-400 bg-gray-800"
  }`}
            >
              {index + 1}
            </p>
          </li>
        ))}

        <li
          onClick={() => {
            // if (currentPage + 1 <= (totalPages||10))
              handlePageChange(currentPage + 1);
          }}
        >
          <div className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
            <span className='sr-only'>Next</span>
            <svg
              className='w-2.5 h-2.5 rtl:rotate-180'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 6 10'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='m1 9 4-4-4-4'
              />
            </svg>
          </div>
        </li>
      </ul>
    </nav>
  </div>
}
export default Pagination;