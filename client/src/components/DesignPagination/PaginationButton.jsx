import React from "react";
import PropTypes from "prop-types"; // Import prop types
import ReactPaginate from "react-paginate";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { motion } from "framer-motion";
export default function PaginationButton({
  setCurrentPage,
  currentPage,
  totalPages,
}) {
  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo(0, 0);
  };
  const paginationVariants = {
    hidden: {
      opacity: 0,
      y: 200,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1,
      },
    },
  };
  return (
    <motion.div
      variants={paginationVariants}
      initial="hidden"
      animate="visible"
    >
      <ReactPaginate
        previousLabel={
          <span
            className="w-10 h-10 flex items-center 
          justify-center bg-gray-100 rounded-md mr-4"
          >
            <BsChevronLeft />
          </span>
        }
        nextLabel={
          <span
            className="w-10 h-10 flex items-center 
        justify-center bg-gray-100 rounded-md"
          >
            <BsChevronRight />
          </span>
        }
        breakLabel={<span className="mr-4">...</span>}
        breakClassName="break-me"
        pageCount={4}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName="flex items-center justify-center mt-8 mb-4"
        pageClassName="block hover:bg-gray-100 w-10 h-10 flex items-center
        justify-center rounded-md mr-4"
        subContainerClassName="pages pagination"
        activeClassName="bg-blue-300 text-white hover:bg-blue-200"
      />
    </motion.div>
  );
}

PaginationButton.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
};
