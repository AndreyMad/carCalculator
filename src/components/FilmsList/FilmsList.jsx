import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import style from "./FilmsList.module.css";
import noImage from "../../assets/img/no_photo.png";

const FilmsList = ({ shows, location }) => {
  return (
    <ul className={style.item_Wrapper}>
      {shows.map(el => (
        <li className={style.item_innerWrapper} key={el.id}>
          <Link
            to={{
              pathname: `/movie/${el.id}`,
              state: { from: { ...location } },
              search: `show=${el.title}`
            }}
          >
            <div className={style.imageWrapper}>
              <img
                className={style.filmImage}
                alt="Film"
                src={
                  el.poster_path
                    ? `https://image.tmdb.org/t/p/w400${el.poster_path}`
                    : noImage
                }
              />
            </div>
            <span className={style.link}> {el.name || el.title}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};
FilmsList.propTypes = {
  shows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      poster_path: PropTypes.string,
      name: PropTypes.string
    }).isRequired
  ).isRequired,

  location: PropTypes.shape({}).isRequired
};
export default FilmsList;
