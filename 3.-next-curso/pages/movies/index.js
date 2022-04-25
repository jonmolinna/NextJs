import React from "react";
import Layout from "../../Layout/Layout";
import conectDB from "../../lib/dbConnect";
import Movie from "../../models/Movie";
import Link from "next/link";

const Movies = ({ movies }) => {
  return (
    <Layout>
      <h2>Movies</h2>
      <Link href="/movies/newMovie">
        <a className="btn btn-primary w-100">Add</a>
      </Link>
      {movies.map(({ _id, title, plot }) => (
        <div className="card mb-2" key={_id}>
          <div className="card-body">
            <div className="h5 text-uppercase">{title}</div>
            <p className="fw-light">{plot}</p>
            <Link href={`/movies/${_id}`}>
              <a className="btn btn-success btn-sm">Más Info</a>
            </Link>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default Movies;

export async function getServerSideProps() {
  try {
    await conectDB();

    const res = await Movie.find({});
    const movies = res.map((doc) => {
      const movie = doc.toObject();
      movie._id = movie._id.toString();
      return movie;
    });

    return { props: { movies } };
  } catch (err) {
    console.log(err);
  }
}
