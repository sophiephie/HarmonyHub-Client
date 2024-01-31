import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

function AddSong() {
  const initialValues = {
    songTitle: "",
    // songURL: [],
    // artworkURL: [],
    artistName: "",
    tags: "",
    year: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    songTitle: Yup.string().min(1).max(50).required(),
    // songURL: Yup.array().min(1).max(1),
    // artworkURL: Yup.array().max(1),
    artistName: Yup.string().max(45),
    albumTitle: Yup.string().max(45),
    tags: Yup.string().max(255),
    year: Yup.date(),
    description: Yup.string().max(144),
  });

  const [song, setSong] = useState(null);
  const [art, setArt] = useState(null);

  const addSong = (data) => {
    if (!song) {
      console.log("missing song file");
      return;
    }
    const fd = new FormData();
    fd.append("song", song);
    fd.append("songTitle", data.songTitle);
    fd.append("artistName", data.artistName);
    fd.append("tags", data.tags);
    fd.append("year", data.year);
    fd.append("description", data.description);
    if (art) {
      fd.append("art", art);
    }

    console.log(fd);

    axios
      .post("http://localhost:3001/songs/post", fd, {
        headers: { jwtToken: localStorage.getItem("jwtToken") },
      })
      .then((response) => {
        if (response.data.error) {
          console.log(response.data.error);
        } else {
          //idk?
        }
      });
  };

  return (
    <div className="outer">
      <div className="card">
        <Formik
          initialValues={initialValues}
          onSubmit={addSong}
          validationSchema={validationSchema}
        >
          <Form>
            <div className="inner">
              <label>Song Title</label>
              <ErrorMessage name="songTitle" component="span" />
              <Field name="songTitle" />
            </div>
            <div className="inner">
              <label>Song File</label>
              <input
                name="songURL"
                type="file"
                onChange={(e) => {
                  setSong(e.target.files[0]);
                }}
              />
            </div>
            <div className="inner">
              <label>Artwork</label>
              <input
                name="artworkURL"
                type="file"
                onChange={(e) => setArt(e.target.files[0])}
              />
            </div>
            <div className="inner">
              <label>Artist Name</label>
              <ErrorMessage name="artistName" component="span" />
              <Field name="artistName" />
            </div>
            <div className="inner">
              <label>Tags & Genres</label>
              <ErrorMessage name="tags" component="span" />
              <Field name="tags" />
            </div>
            <div className="inner">
              <label>Year</label>
              <ErrorMessage name="year" component="span" />
              <Field name="year" />
            </div>
            <div className="inner">
              <label>Description</label>
              <ErrorMessage name="description" component="span" />
              <Field name="decription" as="textarea" />
            </div>
            <div className="inner">
              <button type="submit">Add Song</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default AddSong;
