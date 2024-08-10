import React from "react";

const numberInPages = [5, 10, 20, 50, 100];

interface FooterTableProps { 
  previousPage: () => void,
  nextPage: () => void,
  page: number,
  numberOfPage: number,
  numberPerPage?: number,
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  numberPageOfText?: string,
}

const FooterTableComponent = (props: FooterTableProps) => {
  
  const {
    previousPage,
    nextPage,
    page,
    numberOfPage,
    numberPerPage = 10,
    handleChange,
    numberPageOfText,
  } = props;

  return (
    <div className="flex items-center justify-end p-4 bg-gray-100 border-t border-gray-300 space-x-4">
      <button
        type="button"
        className="inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-lg transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-md focus:bg-blue-700 focus:shadow-md focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-md motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-lg dark:focus:shadow-lg dark:active:shadow-lg"
        onClick={() => previousPage()}
      >
        <i className="chevron-left">&#x3c;</i> Previous
      </button>
      
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-gray-700 inline-flex">
          {page} {numberPageOfText ? numberPageOfText : "of"} {numberOfPage}
        </span>
        
        <select
          className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          value={numberPerPage}
          onChange={(event) => handleChange(event)}
        >
          {numberInPages.map((option, i) => (
            <option key={i} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      
      <button
        type="button"
        className="inline-block rounded bg-blue-500 px-6 pb-2 pt-2.5 text-xs font-medium leading-normal text-white shadow-lg transition duration-150 ease-in-out hover:bg-blue-700 hover:shadow-md focus:bg-blue-700 focus:shadow-md focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-md motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-lg dark:focus:shadow-lg dark:active:shadow-lg"
        onClick={() => nextPage()}
      >
        Next <i className="chevron-right">&#x3e;</i>
      </button>
    </div>
  );
};

export default FooterTableComponent;