import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux"; 
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import { BASE_URL } from "../utils/constants"; 
import { useDispatch } from "react-redux"; 
import { addUserInfo } from "../utils/userSlice"; 
const EditProfile = () => {
  const currentUser = useSelector((state) => state.userInfo.userInfo); 
  const navigate = useNavigate(); 
  const dispatch = useDispatch(); 

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    profileImg: "",
    age: "",
    gender: "",
    about: "",
    skills: [], 
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [showToast,setShowToast]= useState(false)
  useEffect(() => {
    if (currentUser) {
      setForm({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        profileImg: currentUser.profileImg || "",
        age: currentUser.age || "",
        gender: currentUser.gender || "",
        about: currentUser.about || "",
        skills: currentUser.skills || [],
      });
    }
  }, [currentUser]); 
  const validate = () => {
    let err = {};

    if (!form.firstName.trim()) err.firstName = "First name is required";
    if (!form.lastName.trim()) err.lastName = "Last name is required";
    if (form.profileImg && !form.profileImg.startsWith("http"))
      err.profileImg = "Invalid URL. Must start with http/https";
    if (!form.age || form.age < 1 || form.age > 120)
      err.age = "Enter a valid age between 1 and 120";
    if (!form.gender) err.gender = "Please select your gender";
    if (form.about.length < 10)
      err.about = "About section must be at least 10 characters";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
    setForm({ ...form, skills: skillsArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true); 

    try {
      const res = await axios.put(BASE_URL + '/profile/edit', form, {
        withCredentials: true,
      });
      dispatch(addUserInfo(res.data.user));
      setShowToast(true) 
      setTimeout(()=>{
          setShowToast(false)
      },1000)
      setTimeout(()=>{
navigate('/profile'); 
      },1000)
      
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrors(prev => ({ ...prev, api: "Failed to update profile. Please try again." }));
    } finally {
      setIsSubmitting(false); 
    }
  };

  const handleCancel = () => {
    navigate('/profile'); 
  };

  if (!currentUser) {
    return <div className="text-center mt-10 text-white text-lg">Loading user data for editing...</div>;
  }

  return (
    <div className="max-w-lg mx-auto mt-10 bg-base-200 shadow-xl rounded-xl p-8 border border-base-300">
      <h2 className="text-2xl font-bold text-center mb-6 pb-4 border-b border-base-300">Edit Profile</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>

        {/* First Name */}
        <div className="form-control">
          <label className="label font-medium" htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            value={form.firstName}
            onChange={handleChange}
          />
          {errors.firstName && <p className="text-error text-sm mt-1">{errors.firstName}</p>}
        </div>

        {/* Last Name */}
        <div className="form-control">
          <label className="label font-medium" htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            value={form.lastName}
            onChange={handleChange}
          />
          {errors.lastName && <p className="text-error text-sm mt-1">{errors.lastName}</p>}
        </div>

        {/* Profile Image URL */}
        <div className="form-control">
          <label className="label font-medium" htmlFor="profileImg">Profile Image URL</label>
          <input
            type="text"
            id="profileImg"
            name="profileImg"
            className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            value={form.profileImg}
            onChange={handleChange}
            placeholder="e.g., https://example.com/your-image.jpg"
          />
          {errors.profileImg && <p className="text-error text-sm mt-1">{errors.profileImg}</p>}
        </div>

        {/* Age */}
        <div className="form-control">
          <label className="label font-medium" htmlFor="age">Age</label>
          <input
            type="number"
            id="age"
            name="age"
            className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            value={form.age}
            onChange={handleChange}
            min="1"
            max="120"
          />
          {errors.age && <p className="text-error text-sm mt-1">{errors.age}</p>}
        </div>

        {/* Gender Select */}
        <div className="form-control">
          <label className="label font-medium" htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            className="select select-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            <option value="Male">♂ Male</option>
            <option value="Female">♀ Female</option>
            <option value="Other">⚧ Other</option>
          </select>
          {errors.gender && <p className="text-error text-sm mt-1">{errors.gender}</p>}
        </div>

        {/* About */}
        <div className="form-control">
          <label className="label font-medium" htmlFor="about">About</label>
          <textarea
            id="about"
            name="about"
            rows="3"
            className="textarea textarea-bordered w-full resize-y focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            value={form.about}
            onChange={handleChange}
            placeholder="Tell us a little about yourself..."
          ></textarea>
          {errors.about && <p className="text-error text-sm mt-1">{errors.about}</p>}
        </div>

        {/* Skills */}
        <div className="form-control">
          <label className="label font-medium" htmlFor="skills">Skills (comma-separated)</label>
          <input
            type="text"
            id="skills"
            name="skills"
            className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
            value={form.skills.join(', ')} 
            onChange={handleSkillsChange}
            placeholder="e.g., React, Node.js, MongoDB, UI/UX"
          />
       
        </div>

        {errors.api && <p className="text-error text-sm mt-4 text-center">{errors.api}</p>}

        <div className="flex gap-4 mt-6">
            <button type="button" onClick={handleCancel} className="btn btn-ghost flex-grow">
                Cancel
            </button>
            <button type="submit" className="btn btn-primary flex-grow" disabled={isSubmitting}>
                {isSubmitting ? 'Saving...' : 'Save Profile'}
            </button>
        </div>
      </form>
     { showToast && <div className="toast toast-top toast-end mt-16">
  <div className="alert alert-success">
    <span>Profile save successfully.</span>
  </div>
</div>}
    </div>
  );
};

export default EditProfile;