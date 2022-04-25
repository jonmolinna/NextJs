import React from "react";
import Layout from "../../Layout/Layout";
import utilStyles from "../../styles/utils.module.css";

const post = ({ data }) => {
  return (
    <Layout title="Post | Next.js" description="description de un post">
      <section className={utilStyles.headingMd}>
        <h1>
          {data.id} - {data.title}
        </h1>
        <p>{data.body}</p>
      </section>
    </Layout>
  );
};

export default post;

// Con esto se genera todos los archivos
export async function getStaticPaths() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    const paths = data.map(({ id }) => ({ params: { id: `${id}` } }));
    return {
      paths,
      fallback: false,
    };
  } catch (err) {
    console.log(err);
  }
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${params.id}`
    );
    const data = await res.json();
    return {
      props: {
        data,
      },
    };
  } catch (err) {
    console.log(err);
  }
}
