// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addteacher } from "../Redux/Feature/Addteacher";

// const TeacherForm = () => {
//   const [teacherData, setTeacher] = useState({
//     fullName: "",
//   });

//   const onHandleInput = (e, propertyName) => {
//     setTeacher((pervstate) => ({
//       ...pervstate,
//       [propertyName]: e.target.value,
//     }));
//   };

//   const dispatch = useDispatch();

//   const onSubmithandle = (evt) => {
//     evt.preventDefault();
//     dispatch(addteacher(teacherData));
//   };

//   const reduxTeacherData = useSelector((state) => state.addteacherReducer);
//   // console.log(reduxTeacherData);

//   return (
//     <div className="borde2 m-4 bg-[#f8f8f8] rounded">
//       <h1 className="text-xl uppercase font-medium pt-6 p-1 px-4">
//         Add New Teacher
//       </h1>
//       <p className="px-4 text-[17px] mb-7">
//         Please fill in the details below to register a new staff member.
//       </p>
//       <form
//         onSubmit={onSubmithandle}
//         action=""
//         className="grid grid-cols-4 gap-4 px-4"
//       >
//         <div className="">
//           <label htmlFor="" className="font-semibold">
//             Name
//           </label>
//           <input
//             onChange={(e) => {
//               onHandleInput(e, "fullName");
//             }}
//             required
//             className="p-2 rounded outline-none border-2 border-gray-300 w-full my-1"
//             placeholder="Name"
//             type="text"
//           />
//         </div>
//         <div>
//           <label htmlFor="" className="font-semibold">
//             Experience
//           </label>
//           <input
//             required
//             className="bg-white p-2 rounded outline-none border-2 border-gray-300 w-full my-1"
//             placeholder="Experience in years"
//             type="text"
//           />
//         </div>
//         <div className="">
//           <label htmlFor="" className="font-semibold">
//             Email Address:
//           </label>
//           <input
//             required
//             className="p-2 rounded outline-none border-2 border-gray-300 w-full my-1"
//             placeholder="Enter your email"
//             type="email"
//           />
//         </div>
//         <div className="">
//           <label htmlFor="" className="font-semibold">
//             CNIC
//           </label>
//           <input
//             required
//             className="p-2 rounded outline-none border-2 border-gray-300 w-full my-1"
//             placeholder="41303-1586080-9"
//             type="text"
//           />
//         </div>

//         <div>
//           <label htmlFor="phone" className="font-semibold">
//             Contact No
//           </label>
//           <input
//             required
//             className="p-2 rounded outline-none border-2 border-gray-300 w-full my-1"
//             placeholder="+92 0000000000"
//             type="tel"
//             id="phone"
//             name="phone"
//           />
//         </div>

//         <div>
//           <label className="font-semibold">Select/Course</label>

//           <select className="p-2 rounded outline-none border-2 border-gray-300 w-full my-1">
//             <option value="web">Web Development</option>
//             <option value="app">App Development</option>
//             <option value="graphic">Graphic Design</option>
//             <option value="ai">AI / Machine Learning</option>
//           </select>
//         </div>

//         <div className="">
//           <label htmlFor="" className="font-semibold">
//             Joining Date
//           </label>
//           <input
//             required
//             className="p-2 rounded outline-none border-2 border-gray-300 w-full my-1"
//             placeholder="41303-1586080-9"
//             type="date"
//           />
//         </div>

//         <div className="">
//           <label htmlFor="" className="font-semibold">
//             Salary
//           </label>
//           <input
//             required
//             className="p-2 rounded outline-none border-2 border-gray-300 w-full my-1"
//             placeholder="Min-25000"
//             type="number"
//           />
//         </div>

//         <div>
//           <label className="font-semibold">Employment Type</label>

//           <select className="p-2 rounded outline-none border-2 border-gray-300 w-full my-1">
//             <option value="Full-time">Full-time</option>
//             <option value="Part-time">Part-time</option>
//           </select>
//         </div>

//         <div>
//           <label className="font-semibold">Shift</label>
//           <select className="p-2 rounded outline-none border-2 border-gray-300 w-full my-1">
//             <option value="Morning">Morning</option>
//             <option value="Evening">Evening</option>
//           </select>
//         </div>

//         <button className=" col-span-4 active:scale-95 transition-all hover:bg-blue-600  text-white text-lg w-1/10 my-3 py-2 rounded bg-blue-500">
//           Sumbit
//         </button>
//       </form>
//     </div>
//   );
// };

// export default TeacherForm;
