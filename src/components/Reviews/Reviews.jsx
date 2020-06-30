import React from "react";
import PropTypes from "prop-types";
import style from "./Reviews.module.css";

const Reviews = ({ reviews }) => {
  return (
    <ul>
      {reviews.length > 1 ? (
        reviews.map(el => (
          <li className={style.wrapper} key={el.id}>
            <span className={style.title}>Author: {el.author}</span>
            <span className={style.text}>{el.content}</span>
          </li>
        ))
      ) : (
        <span className={style.title}>
          We don&rsquo;t have ant reviews for this film
        </span>
      )}
    </ul>
  );
};
Reviews.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
};

export default Reviews;
