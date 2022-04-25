import React from "react";
import Layout from "../Layout/Layout";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <Layout title="Home | Next.js" description="description del Home" home>
      <section className={utilStyles.headingMd}>
        <p>Your self introduction</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis,
          laudantium adipisci cum omnis itaque quidem illum fugiat impedit at
          exercitationem!
        </p>
      </section>
    </Layout>
  );
}
