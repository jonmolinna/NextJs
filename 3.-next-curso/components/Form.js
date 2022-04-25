import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Form = ({ formData, forNewMovie = true }) => {
  const [form, setForm] = useState({
    title: formData.title,
    plot: formData.plot,
  });
  const [errors, setErrors] = useState([]);

  const router = useRouter();

  const handleChange = (e) => {
    const { value, name } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (forNewMovie) {
      postData(form);
    } else {
      // editar data
      putData(form);
    }
  };

  const postData = async (form) => {
    try {
      const res = await fetch("/api/movie", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        for (const key in data.error.errors) {
          let error = data.error.errors[key];
          setErrors((olderrors) => [...olderrors, { message: error.message }]);
        }
      }

      setForm({
        title: "",
        plot: "",
      });

      router.push("/movies");
    } catch (err) {
      console.log(err);
    }
  };

  const putData = async (form) => {
    setErrors([]);
    const { id } = router.query;

    try {
      const res = await fetch(`/api/movie/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!data.success) {
        for (const key in data.error.errors) {
          let error = data.error.errors[key];
          setErrors((olderrors) => [...olderrors, { message: error.message }]);
        }
      } else {
        router.push("/movies");
        setErrors([]);
        setForm({
          title: "",
          plot: "",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control my-2"
        placeholder="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
      />
      <input
        type="text"
        className="form-control my-2"
        placeholder="Plot"
        name="plot"
        value={form.plot}
        onChange={handleChange}
      />
      <button className="btn btn-success w-100" type="submit">
        {forNewMovie ? "Agregar" : "Editar"}
      </button>
      <Link href="/movies">
        <a className="btn btn-primary w-100 mt-1">Volver ...</a>
      </Link>
      {errors.map(({ message }) => (
        <p key={message}>{message}</p>
      ))}
    </form>
  );
};

export default Form;
