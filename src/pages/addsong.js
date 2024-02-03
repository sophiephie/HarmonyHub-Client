import React from "react";
import axios from "axios";
import { useState } from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useNavigate } from "react-router-dom";
const siteUrl = process.env.REACT_APP_SITE_URL;

function AddSong() {
  const navigate = useNavigate();
  const initialValues = {
    songTitle: "",
    // songURL: [],
    // artworkURL: [],
    artistName: "",
    albumTitle: "",
    tags: "",
    year: "",
    description: "",
  };

  const validationSchema = Yup.object().shape({
    songTitle: Yup.string()
      .min(1)
      .max(50)
      .required("Please enter a Song title"),
    // songURL: Yup.mixed()
    //   .required()
    //   .test("FILE_Type", "Please only upload Mp3s", (value) => {
    //     if (value) {
    //       return value.type !== "audio/mp3" || value.type !== "audio/mpeg";
    //     } else {
    //       return true;
    //     }
    //   }),
    // artworkURL: Yup.array().max(1),
    artistName: Yup.string().max(45),
    albumTitle: Yup.string().max(45),
    tags: Yup.string().max(255),
    year: Yup.date(),
    description: Yup.string().max(144),
  });

  const [song, setSong] = useState(null);
  const [art, setArt] = useState(null);
  const [invalidMP3, setInvalidMP3] = useState(false);
  const [invalidJPG, setInvalidJPG] = useState(false);

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
    if (art) {
      fd.append("art", art);
    }
    fd.append("songTitle", data.songTitle);
    fd.append("artistName", data.artistName);
    fd.append("albumTitle", data.albumTitle);
    fd.append("tags", data.tags);
    fd.append("year", data.year);
    fd.append("description", data.description);

    try {
      const response = await axiosInstance.post(
        `${siteUrl}/songs/post`,
        fd
      );
      if (response.data.error) {
        console.log(response.data.error);
      } else {
        navigate("/discover");
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
              <Field name="songTitle" />
            </div>
            <div className="inner">
              <ErrorMessage name="songTitle" component="span" />
            </div>
            <div className="inner">
              <label>Song File</label>
              <input
                name="songURL"
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  console.log("file type: ", file.type);
                  if (file.type === "audio/mp3" || file.type === "audio/mpeg") {
                    setSong(e.target.files[0]);
                    setInvalidMP3(false);
                  } else {
                    setSong(null);
                    setInvalidMP3(true);
                  }
                }}
              />
            </div>
            <div className="inner">
              {invalidMP3 && <span>Invalid file type. Mp3 only.</span>}
            </div>
            <div className="inner">
              <label>Artwork</label>

              <input
                name="artworkURL"
                type="file"
                onChange={(e) => {
                  const file = e.target.files[0];
                  console.log("file type: ", file.type);
                  if (file.type === "image/jpeg" || file.type === "image/jpg") {
                    setArt(e.target.files[0]);
                    setInvalidJPG(false);
                  } else {
                    setArt(null);
                    setInvalidJPG(true);
                  }
                }}
              />
            </div>
            <div className="inner">
              {invalidJPG && (
                <span>
                  Invalid file type. Jpg/Jpeg only. File will not be attached.
                </span>
              )}
            </div>
            <div className="inner">
              <label>Artist Name</label>
              <ErrorMessage name="artistName" component="span" />
              <Field name="artistName" />
            </div>
            <div className="inner">
              <label>Album Title</label>
              <ErrorMessage name="albumTitle" component="span" />
              <Field name="albumTitle" />
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
            <div className="innerEnd">
              <button type="submit">Add Song</button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default AddSong;
