"use client";

import { useState } from "react";

const AddDoctorForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    specialist: "",
    workYear: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Doctor Data:", formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md mb-6 p-6 rounded-lg space-y-5 w-full"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Add New Doctor
      </h2>

      <div className="grid md:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="px-3 py-2 input"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
            className="px-3 py-2 input"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            className="px-3 py-2 input"
            required
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            placeholder="08xxxxxxx"
            value={formData.phone}
            onChange={handleChange}
            className="px-3 py-2 input"
            required
          />
        </div>

        <div>
          <label
            htmlFor="specialist"
            className="block text-sm font-medium text-gray-700"
          >
            Specialist{" "}
            <span className="text-xs text-gray-500">
              (Pisahkan dengan koma jika lebih dari satu)
            </span>
          </label>
          <input
            type="text"
            name="specialist"
            id="specialist"
            placeholder="Anxiety, Depression"
            value={formData.specialist}
            onChange={handleChange}
            className="px-3 py-2 input"
            required
          />
        </div>

        <div>
          <label
            htmlFor="workYear"
            className="block text-sm font-medium text-gray-700"
          >
            Work Year
          </label>
          <input
            type="text"
            name="workYear"
            id="workYear"
            placeholder="5 Years"
            value={formData.workYear}
            onChange={handleChange}
            className="px-3 py-2 input"
            required
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            name="description"
            id="description"
            placeholder="Brief description about the doctor"
            value={formData.description}
            onChange={handleChange}
            className="px-3 py-2 input h-28 w-full"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md w-full transition"
      >
        Add Doctor
      </button>
    </form>
  );
};

export default AddDoctorForm;
