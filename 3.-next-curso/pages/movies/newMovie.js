import React from "react";
import Form from "../../components/Form";
import Layout from "../../Layout/Layout";

const NewMovie = () => {
  const formData = {
    title: "",
    plot: "",
  };

  return (
    <Layout>
      <h1 className="my-3">Agregar Movie</h1>
      <Form formData={formData} />
    </Layout>
  );
};

export default NewMovie;
