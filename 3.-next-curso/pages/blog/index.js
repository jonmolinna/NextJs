import React from "react";
import Layout from "../../Layout/Layout";
import Link from "next/link";

const index = ({ data }) => {
  return (
    <Layout>
      <h1>Lista de Posts</h1>
      {data.map(({ id, title, body }) => (
        <div key={id}>
          <h3>
            <Link href={`/blog/${id}`}>
              <a>
                {id} - {title}
              </a>
            </Link>
          </h3>
          <p>{body}</p>
        </div>
      ))}
    </Layout>
  );
};

export default index;

// Solo se ejecuta en el servidor
export async function getStaticProps() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
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
