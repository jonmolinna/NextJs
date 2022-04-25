import React from "react";
import conectDB from "../../../lib/dbConnect";
import Movie from "../../../models/Movie";
import Link from "next/link";
import Layout from "../../../Layout/Layout";
import { useRouter } from "next/router";

const MoviePage = ({ success, error, movie }) => {
  // console.log({ success, error, movie });
  const router = useRouter();

  if (!success) {
    return (
      <div className="container text-center my-5">
        <h1>{error}</h1>
        <Link href="/movies">
          <a className="btn btn-success">Volver...</a>
        </Link>
      </div>
    );
  }

  const deleteData = async (id) => {
    try {
      await fetch(`/api/movie/${id}`, {
        method: "DELETE",
      });

      router.push("/movies");
    } catch (err) {
      console.log(err.response);
    }
  };

  return (
    <Layout>
      <h1>Detalle de Movie</h1>
      <div className="card">
        <div className="card-body">
          <div className="card-title">
            <h5 className="text-uppercase">{movie.title}</h5>
          </div>
          <p className="fw-light">{movie.plot}</p>
          <Link href="/movies">
            <a className="btn btn-success btn-sm">Volver ...</a>
          </Link>
          <Link href={`/movies/${movie._id}/edit`}>
            <a className="btn btn-warning btn-sm ms-1">Editar</a>
          </Link>
          <button
            className="btn btn-danger btn-sm ms-1"
            onClick={() => deleteData(movie._id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default MoviePage;

export async function getServerSideProps({ params }) {
  try {
    await conectDB();

    const movie = await Movie.findById(params.id).lean(); // lean => carga sea liviano

    if (!movie) {
      return { props: { success: false, error: "Movie not found" } };
    }

    movie._id = movie._id.toString();
    return { props: { success: true, movie } };
  } catch (err) {
    console.log(err);
    return { props: { success: false, error: "Error, ocurrio algo mal" } };
  }
}
