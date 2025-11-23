import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 

import { useSelector, useDispatch } from "react-redux"; 
import axios from "axios"; 
import { BASE_URL } from "../utils/constants"; 
import { addUserInfo } from "../utils/userSlice"; 

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();// Uncomment in real app

  const currentUser = useSelector((state) => state.userInfo.userInfo); 

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
  const [showToast, setShowToast] = useState(false);

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
    if (!form.age || form.age < 18 || form.age > 100)
      err.age = "Age must be between 18 and 100";
    if (!form.gender) err.gender = "Please select your gender";
    if (form.about.length < 10)
      err.about = "About section must be at least 10 characters";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
        setErrors({...errors, [e.target.name]: null});
    }
  };

  const handleSkillsChange = (e) => {
    const skillsArray = e.target.value.split(',').map(skill => skill.trim()); // Allow empty strings during typing
    setForm({ ...form, skills: skillsArray });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true); 

    try {
      const res = await axios.put(BASE_URL + 'profile/edit', form, {
        withCredentials: true,
      });
      dispatch(addUserInfo(res.data.user));
      

      setShowToast(true); 
      setTimeout(() => {
          setShowToast(false);
          navigate('/profile'); // Redirect after save
      }, 2000);
      
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
    return (
        <div className="flex justify-center items-center min-h-screen bg-slate-950">
             <span className="loading loading-spinner text-purple-500"></span>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center p-4 relative overflow-hidden py-12">
      
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-80 h-80 bg-purple-600 rounded-full mix-blend-screen filter blur-[120px] opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-600 rounded-full mix-blend-screen filter blur-[120px] opacity-10"></div>
      </div>

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl shadow-2xl p-8 sm:p-10">
        
        <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Edit Profile</h2>
            <p className="text-slate-400 text-sm">Update your details to find better matches</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>

          {/* Row 1: First & Last Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label text-slate-300 text-sm font-semibold mb-1 block" htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                className="w-full rounded-xl bg-slate-950/50 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={form.firstName}
                onChange={handleChange}
                placeholder="John"
              />
              {errors.firstName && <p className="text-red-400 text-xs mt-1 ml-1">{errors.firstName}</p>}
            </div>

            <div className="form-control">
              <label className="label text-slate-300 text-sm font-semibold mb-1 block" htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                className="w-full rounded-xl bg-slate-950/50 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Doe"
              />
              {errors.lastName && <p className="text-red-400 text-xs mt-1 ml-1">{errors.lastName}</p>}
            </div>
          </div>

          {/* Row 2: Age & Gender */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-control">
              <label className="label text-slate-300 text-sm font-semibold mb-1 block" htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                className="w-full rounded-xl bg-slate-950/50 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                value={form.age}
                onChange={handleChange}
                placeholder="25"
                min="18"
                max="100"
              />
              {errors.age && <p className="text-red-400 text-xs mt-1 ml-1">{errors.age}</p>}
            </div>

            <div className="form-control">
              <label className="label text-slate-300 text-sm font-semibold mb-1 block" htmlFor="gender">Gender</label>
              <select
                id="gender"
                name="gender"
                className="w-full rounded-xl bg-slate-950/50 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="" disabled className="text-slate-500">Select Gender</option>
                <option value="Male">♂ Male</option>
                <option value="Female">♀ Female</option>
                <option value="Other">⚧ Other</option>
              </select>
              {errors.gender && <p className="text-red-400 text-xs mt-1 ml-1">{errors.gender}</p>}
            </div>
          </div>

          {/* Profile Image URL */}
          <div className="form-control">
            <label className="label text-slate-300 text-sm font-semibold mb-1 block" htmlFor="profileImg">Profile Image URL</label>
            <div className="relative">
                <input
                    type="text"
                    id="profileImg"
                    name="profileImg"
                    className="w-full rounded-xl bg-slate-950/50 border border-slate-700 text-white px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    value={form.profileImg}
                    onChange={handleChange}
                    placeholder="https://example.com/photo.jpg"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     <span className="text-slate-500">🔗</span>
                </div>
            </div>
            {errors.profileImg && <p className="text-red-400 text-xs mt-1 ml-1">{errors.profileImg}</p>}
          </div>

          {/* About */}
          <div className="form-control">
            <label className="label text-slate-300 text-sm font-semibold mb-1 block" htmlFor="about">About Me</label>
            <textarea
              id="about"
              name="about"
              rows="4"
              className="w-full rounded-xl bg-slate-950/50 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
              value={form.about}
              onChange={handleChange}
              placeholder="Tell other developers about your stack and interests..."
            ></textarea>
            {errors.about && <p className="text-red-400 text-xs mt-1 ml-1">{errors.about}</p>}
          </div>

          {/* Skills */}
          <div className="form-control">
            <label className="label text-slate-300 text-sm font-semibold mb-1 block" htmlFor="skills">Skills (Comma separated)</label>
            <input
              type="text"
              id="skills"
              name="skills"
              className="w-full rounded-xl bg-slate-950/50 border border-slate-700 text-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              value={form.skills.join(', ')} 
              onChange={handleSkillsChange}
              placeholder="React, Node.js, Python, AWS"
            />
            <p className="text-xs text-slate-500 mt-1 ml-1">Example: Javascript, React, Docker</p>
          </div>

          {/* API Error */}
          {errors.api && (
              <div className="p-3 rounded-lg bg-red-900/20 border border-red-800/50 text-red-400 text-sm text-center">
                  {errors.api}
              </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
                type="button" 
                onClick={handleCancel} 
                className="w-full sm:w-1/3 py-3 rounded-xl border border-slate-600 text-slate-300 font-semibold hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full sm:w-2/3 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 shadow-lg shadow-purple-500/30 transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                 <span className="flex items-center justify-center gap-2">
                    <span className="loading loading-spinner loading-sm"></span> Saving...
                 </span>
              ) : 'Save Profile'}
            </button>
          </div>

        </form>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success bg-green-600 border-none text-white shadow-xl">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Profile updated successfully!</span>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default EditProfile;