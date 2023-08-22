import React, { useState } from "react";
import { SetUpProfileStyles } from "../Styles/SetUpProfile";
import { useDispatch, useSelector } from "react-redux";
import { profileData } from "../Slices/ProfileSlice";
import { UploadImage, fetchImageUrls } from "../Hooks";
import { updateProfile } from "firebase/auth";
import { auth, db } from "../FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../Slices/postSlice";
import { fetchSingleUrls } from "../Helpers/SingleImageProcessing";

const SetUpProfile = () => {
  const dispatch = useDispatch();
  const [imageUrl, setImageUrls] = useState("");
  const {
    Profile: { image, fullName, PhoneNumber, Gender, Bio, Date },
  } = useSelector((store) => store.profile);
  const {
    userData: { uid },
  } = useSelector((store) => store.auth);
  const userCollectionRef = collection(db, "User-Profile");

  const navigate = useNavigate();
  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(profileData({ name, value }));
  }

  function handleFileChange(e) {
    if (e.target.files[0]) {
      let value = e.target.files[0];
      let name = e.target.name;
      dispatch(profileData({ name, value }));
    }
  }

  async function createProfile() {
    try {
      const bucket = await UploadImage(image, uid, dispatch);
      fetchSingleUrls(bucket, setImageUrls);
      console.log(imageUrl);
      updateProfile(auth.currentUser, {
        displayName: fullName,
        photoURL: imageUrl,
      })
        .then(() => {
          console.log("profile created");
        })
        .catch((error) => {
          console.error(error);
        });

      await addDoc(userCollectionRef, {
        image: imageUrl,
        fullName,
        Gender,
        Bio,
        DateOfBirth: Date,
      });

      //   toast.success("Profile added successfully");
      navigate("/");
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error.message);
      //   toast.error("Post error");
    }
  }

  return (
    <SetUpProfileStyles>
      <section className="container">
        <header>Set Up Your Profile</header>

        <input
          type="file"
          accept="image"
          name="image"
          onChange={handleFileChange}
        />

        <form className="form" action="#">
          <div className="input-box">
            <label>Full Name</label>
            <input
              required=""
              placeholder="Enter full name"
              type="text"
              name="fullName"
              value={fullName}
              onChange={handleChange}
            />
          </div>
          <div className="column">
            <select
              name="Gender"
              id=""
              onChange={handleChange}
              className="gender"
            >
              <option>Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Prefer">Prefer not to say</option>
            </select>
            <div className="input-box">
              <label>Birth Date</label>
              <input
                required=""
                placeholder="Enter birth date"
                type="date"
                name="Date"
                value={Date}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* <div className="gender-box">
            <label>Gender</label>
            <div className="gender-option">
              <div className="gender">
                <input checked="" name="gender" id="check-male" type="radio" />
                <label for="check-male">Male</label>
              </div>
              <div className="gender">
                <input name="gender" id="check-female" type="radio" />
                <label for="check-female">Female</label>
              </div>
              <div className="gender">
                <input name="gender" id="check-other" type="radio" />
                <label for="check-other">Prefer not to say</label>
              </div>
            </div>
          </div> */}
          <div className="input-box address">
            <label>Write Up a Bio</label>

            <textarea
              cols="60"
              rows="10"
              name="Bio"
              value={Bio}
              onChange={handleChange}
            ></textarea>
          </div>

          <button type="button" onClick={createProfile}>
            Submit
          </button>
        </form>
      </section>
    </SetUpProfileStyles>
  );
};

export default SetUpProfile;
