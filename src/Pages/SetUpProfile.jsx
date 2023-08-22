import React from "react";
import { SetUpProfileStyles } from "../Styles/SetUpProfile";
import { useDispatch, useSelector } from "react-redux";
import { profileData } from "../Slices/ProfileSlice";

const SetUpProfile = () => {
  const dispatch = useDispatch();
  const {
    Profile: { image, fullName, PhoneNumber, Gender, Bio, Date },
  } = useSelector((store) => store.profile);

  function handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(profileData({ name, value }));
  }

  return (
    <SetUpProfileStyles>
      <section className="container">
        <header>Set Up Your Profile</header>

        <input type="file" name="profilePic" id="" />

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
            <div className="input-box">
              <label>Phone Number</label>
              <input
                required=""
                placeholder="Enter phone number"
                type="telephone"
                name="PhoneNumber"
                value={PhoneNumber}
                onChange={handleChange}
              />
            </div>
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
          <div className="gender-box">
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
          </div>
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

          <button>Submit</button>
        </form>
      </section>
    </SetUpProfileStyles>
  );
};

export default SetUpProfile;
