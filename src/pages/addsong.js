import React from "react";
import axios from "axios";
import { useState } from "react";
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

  const axiosInstance = axios.create({
    headers: {
      "Content-Type": "multipart/form-data",
      jwtToken: localStorage.getItem("jwtToken"),
    },
    maxContentLength: Infinity,
    maxBodyLenghth: Infinity,
  });

  const addSong = async (data) => {
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

    try {
      const response = await axiosInstance.post(
        "http://localhost:3001/songs/post",
        fd
      );
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        console.log("success?");
      }
    } catch (error) {
      console.log("something went wrong");
      console.log(error);
    }
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
              <Field name="description" as="textarea" />
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
