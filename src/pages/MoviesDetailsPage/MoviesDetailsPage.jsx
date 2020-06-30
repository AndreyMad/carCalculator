import React, { Component } from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import * as api from "../../Services/Api";
import style from "./MoviesDetailsPage.module.css";
import Cast from "../../components/Cast/Cast";
import Reviews from "../../components/Reviews/Reviews";
import GoBack from "../../components/GoBack/GoBack";
import noImage from "../../assets/img/no_photo.png";

class MoviesDetailsPage extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        moviId: PropTypes.string.isRequired
      }).isRequired,
      url: PropTypes.string.isRequired
    }).isRequired,
    location: PropTypes.shape({
      state: PropTypes.shape({
        from: PropTypes.shape({}).isRequired
      })
    }).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired
  };

  state = {
    imgSrc: "",
    title: "",
    releaseDate: "",
    userScore: "",
    genres: [],
    cast: null,
    reviews: null
  };

  componentDidMount() {
    const { match } = this.props;

    if (match) {
      api
        .searcShowById(match.params.moviId)
        .then(res => {
          this.setState({
            imgSrc: res.data.poster_path,
            releaseDate: res.data.release_date,
            userScore: res.data.vote_average,
            genres: [...res.data.genres],
            title: res.data.title,
            overview: res.data.overview
          });
          return res;
        })

        .catch(err => {
          throw new Error(err);
        });
    }
  }

  showCast = id => {
    api
      .getCast(id)
      .then(res => {
        const arr = res.data.cast.slice(0, 15);

        this.setState({ cast: arr, reviews: null });
      })
      .catch(err => {
        throw new Error(err);
      });
  };

  showReview = id => {
    const { history } = this.props;
    api
      .getReviews(id)
      .then(res => {
        this.setState({ reviews: res.data.results, cast: null });
      })
      .catch(err => {
        throw new Error(err);
      });
    history.push({ ...this.props.location });
  };

  goBack = () => {
    const { history, location } = this.props;

    if (location.state) {
      history.push(location.state.from);
      return;
    }
    history.push("/");
  };

  render() {
    const {
      imgSrc,
      releaseDate,
      title,
      userScore,
      genres,
      overview,
      cast,
      reviews
    } = this.state;
    const { match, location } = this.props;
    // eslint-disable-next-line no-nested-ternary
    const locationToReturn = location.state
      ? location.state.from
        ? location.state.from
        : "/"
      : null;
    return (
      <>
        <GoBack goBack={this.goBack} />
        <div className={style.container}>
          <div className={style.wrapper}>
            <img
              src={
                imgSrc ? `https://image.tmdb.org/t/p/w400${imgSrc}` : noImage
              }
              className={style.showImage}
              alt="film prewiev "
            />
            <div className={style.innerWrapper}>
              <h2 className={style.title}>{`${title} (${releaseDate})`} </h2>
              <span className={style.text}>
                {userScore ? `User Score: ${userScore * 10}%` : null}
              </span>
              <span className={style.boldText}>Overview</span>
              <span className={style.text}>{overview}</span>
              <span className={style.boldText}>Genres</span>

              <span className={style.text}>
                {genres.map(el => `${el.name} `)}
              </span>
            </div>
          </div>
        </div>
        <ul className={style.addInfo}>
          <li>
            <NavLink
              activeStyle={{ color: "green" }}
              to={{
                pathname: `${match.url}/cast`,
                state: { from: locationToReturn }
              }}
              onClick={() => this.showCast(match.params.moviId)}
            >
              Cast
            </NavLink>
          </li>
          <li>
            <NavLink
              activeStyle={{ color: "green" }}
              to={{
                pathname: `${match.url}/review`,
                state: { from: locationToReturn }
              }}
              onClick={() => this.showReview(match.params.moviId)}
            >
              Review
            </NavLink>
          </li>
        </ul>

        {cast ? <Cast cast={cast} /> : null}
        {reviews ? <Reviews reviews={reviews} /> : null}
      </>
    );
  }
}

export default MoviesDetailsPage;
