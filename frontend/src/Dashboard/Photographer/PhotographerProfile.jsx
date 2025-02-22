/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { GrUpdate } from "react-icons/gr";
import { MdCloudUpload, MdMoreTime } from "react-icons/md";
import { toast } from "react-toastify";
import avatarImg from "../../assets/images/icons/avatar-icon.png";
import Loading from "../../components/Shared/Loading";
import { BASE_URL, token } from "../../config";
import uploadImageToCloudinary from "../../utils/uploadCloudinary";

const PhotographerProfile = ({ photographerData }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    bio: "",
    gender: "",
    expertise: "",
    servicePrice: 0,
    experience: "",
    timeSlots: [],
    about: "",
    photo: null,
  });

  useEffect(() => {
    setFormData({
      name: photographerData?.name,
      email: photographerData?.email,
      phone: photographerData?.phone,
      bio: photographerData?.bio,
      gender: photographerData?.gender,
      expertise: photographerData?.expertise,
      servicePrice: photographerData?.servicePrice,
      experience: photographerData?.experience,
      timeSlots: photographerData?.timeSlots,
      about: photographerData?.about,
      photo: photographerData?.photo,
    });
  }, [photographerData]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadImageToCloudinary(file);

    setFormData({ ...formData, photo: data?.url });
  };

  const updateProfileHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        `${BASE_URL}/photographers/${photographerData._id}`,
        {
          method: "PUT",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw Error(result.message);
      }

      toast.success(result.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <section className="mb-10">
      <h1 className="lg:text-[28px] text-[22px] font-serif bg-green-600 text-center text-white font-bold mb-2 py-2">
        Profile Information
      </h1>

      <form>
        {/* first line */}
        <div className="lg:flex justify-center items-end lg:mb-5 w-full lg:gap-4">
          {/* name part */}
          <div className="lg:mb-0 mb-5 lg:w-[34%] w-full">
            <p className="form_label">Name*</p>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="form_input cursor-text"
            />
          </div>
          {/* phone part */}
          <div className="lg:mb-0 mb-5 lg:w-[34%] w-full">
            <p className="form_label">Phone*</p>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Phone number"
              className="form_input cursor-text"
            />
          </div>

          {/* img/file upload part */}
          <div className="lg:w-[32%] w-full lg:mb-0 mb-5 flex items-center">
            {/* ===upload img part=== */}
            <div className="relative lg:w-[150px] w-[200px] lg:h-[52px] h-[45px]">
              <input
                type="file"
                name="photo"
                id="customFile"
                onChange={handleFileInputChange}
                accept=".jpg, .png, .jpeg"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />

              <label
                htmlFor="customFile"
                className="absolute top-0 left-0 w-full h-full flex items-center justify-center px-[0.75rem] py-[3px] text-[15px] overflow-hidden bg-violet-700 hover:bg-green-700 text-white rounded font-serif truncate cursor-pointer"
              >
                {" "}
                <MdCloudUpload className="lg:w-8 h-8 w-9 mr-[5px]" />
                Upload Photo
              </label>
            </div>
            {/* ===display avatar=== */}
            {formData.photo && (
              <figure className="w-[50px] h-[50px] rounded-full border-2 border-solid border-violet-700 flex items-center justify-center ml-3">
                <img
                  src={formData.photo ? formData.photo : avatarImg}
                  alt=""
                  className="w-full rounded-full"
                />
              </figure>
            )}
          </div>
        </div>

        {/* 2nd line */}
        <div className="lg:flex justify-center items-center lg:mb-5 w-full">
          {/* email part */}
          <div className="lg:mb-0 mb-5 lg:mr-5 lg:w-1/2">
            <p className="form_label">Email*</p>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="form_input cursor-not-allowed"
              readOnly
              aria-readonly
              disabled={true}
            />
          </div>

          {/* bio part */}
          <div className="lg:mb-0 mb-5 lg:w-1/2">
            <p className="form_label">Bio*</p>
            <input
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleInputChange}
              placeholder="Bio"
              className="form_input cursor-text"
              maxLength={100}
            />
          </div>
        </div>

        {/* ===================================
        gender,Specialization,service_Price grid
        ==================================== */}
        <div className="mb-5">
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-5 mb-[30px]">
            {/* ===gender input part=== */}
            <div>
              <p className="form_label">Gender*</p>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="form_input py-3.5"
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* ===Specialization input part=== */}
            <div>
              <p className="form_label">Specialization*</p>
              <select
                name="specialization"
                value={formData.specialization}
                onChange={handleInputChange}
                className="form_input py-3.5"
              >
                <option value="">Select</option>
                <option value="Wedding">Wedding</option>
                <option value="Neurology">Neurology</option>
                <option value="Dentistry">Dentistry</option>
                <option value="Urology">Urology</option>
                <option value="Orthopedics">Orthopedics</option>
              </select>
            </div>

            {/* ===Ticket_Price input part=== */}
            <div>
              <p className="form_label">Ticket Price*</p>
              <input
                type="number"
                name="ticketPrice"
                value={formData.ticketPrice}
                onChange={handleInputChange}
                placeholder="100"
                className="form_input cursor-text"
              />
            </div>
          </div>
        </div>

        {/* ===================================
                 Experiences details
        ==================================== */}

        <div>
          <p className="form_label">Experience*</p>
          <input
            type="number"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
            placeholder="100"
            className="form_input cursor-text"
          />
        </div>
        {/* ===================================
                 Time_Slots details
        ==================================== */}
        <div className="mb-5">
          <p className="form_label font-bold text-slate-800">Time Slots*</p>

          <div className="flex justify-center items-center">
            <button className="customBtn h-fit cursor-pointer bg-green-600 text-white text-[16px] p-3 rounded mb-[10px] flex justify-between items-center hover:bg-slate-900">
              Add TimeSlot
              <MdMoreTime className="h-6 w-6 ml-1" />
            </button>
          </div>
        </div>

        {/* ===================================
                 About input part
        ==================================== */}
        <div className="mb-5">
          <p className="form_label">About*</p>
          <textarea
            name="about"
            rows={5}
            value={formData.about}
            placeholder="Write about you"
            onChange={handleInputChange}
            className="form_input cursor-text"
          ></textarea>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={loading && true}
            onClick={updateProfileHandler}
            className="customBtn w-full rounded-none animate-bounce"
          >
            {loading ? (
              <Loading />
            ) : (
              <div className="flex items-center font-bold justify-center">
                Update Profile
                <GrUpdate className="ml-2 w-4 h-4" />
              </div>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default PhotographerProfile;
