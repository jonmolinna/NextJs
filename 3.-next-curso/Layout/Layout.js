import React from "react";
import Head from "next/head";
import styles from "../styles/Layout.module.css";
import utilStyle from "../styles/utils.module.css";
import Image from "next/image";
import Link from "next/link";

const name = "Dallase";

const Layout = ({ children, title, description, home }) => {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <Image
              priority
              src="/img/yana-moroz.jpg"
              className={utilStyle.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyle.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <Image
                  priority
                  src="/img/yana-moroz.jpg"
                  className={utilStyle.borderCircle}
                  height={108}
                  width={108}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyle.headingLg}>
              <Link href="/">
                <a className={utilStyle.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <nav>
        <Link href="/">
          <a>Inicio | </a>
        </Link>
        <Link href="/blog">
          <a>Blog | </a>
        </Link>
        <Link href="/contact">
          <a>Contacto | </a>
        </Link>
        <Link href="/about">
          <a>About | </a>
        </Link>
        <Link href="/movies">
          <a>Movies |</a>
        </Link>
      </nav>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Layout;

Layout.defaultProps = {
  title: "Next.js | mi sitio web",
  description: "Descripcion de mi sitio web",
};
