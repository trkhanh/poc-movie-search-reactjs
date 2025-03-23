import React from 'react';
import './Card.css'; // Optional: Add styles for the card component

const Card = ({ data }) => {
  const {
    original_title,
    tagline,
    overview,
    homepage,
    poster,
    production,
    genre,
    release,
    vote,
    runtime,
    revenue,
    backdrop,
  } = data;

  return (
    <div className="card">
      {backdrop && (
        <div
          className="card-backdrop"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${backdrop})`,
          }}
        ></div>
      )}
      <div className="card-content">
        {poster && (
          <img
            className="card-poster"
            src={`https://image.tmdb.org/t/p/w500${poster}`}
            alt={original_title}
          />
        )}
        <div className="card-details">
          <h2>{original_title}</h2>
          <p className="tagline">{tagline}</p>
          <p className="overview">{overview}</p>
          <p>
            <strong>Release Date:</strong> {release}
          </p>
          <p>
            <strong>Genres:</strong> {genre.map((g) => g.name).join(', ')}
          </p>
          <p>
            <strong>Vote Average:</strong> {vote}
          </p>
          <p>
            <strong>Runtime:</strong> {runtime} minutes
          </p>
          <p>
            <strong>Revenue:</strong> ${revenue.toLocaleString()}
          </p>
          <p>
            <strong>Production Companies:</strong>{' '}
            {production.map((p) => p.name).join(', ')}
          </p>
          {homepage && (
            <p>
              <a href={homepage} target="_blank" rel="noopener noreferrer">
                Visit Homepage
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;