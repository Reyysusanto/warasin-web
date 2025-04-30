"use client";

import { useState } from "react";

const CreateNews = () => {
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    content: "",
    author: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("News Submitted:", formData);
    setFormData({image:formData.image, title: formData.title, content: formData.content, author: formData.author});
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md mb-8 p-8 rounded-xl space-y-6 w-full"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create News</h2>

        <div>
          <label 
            htmlFor="image"
            className="block text-base font-medium text-primaryTextColor mb-1"
          >
            Image Header
          </label>
          <input
            type="file"
            id="image"
            name="image"
            value={formData.image}
          />
        </div>

        <div>
          <label
            htmlFor="title"
            className="block text-base font-medium text-primaryTextColor mb-1"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Judul Berita"
            value={formData.title}
            onChange={handleChange}
            className="px-4 py-3 input text-base w-full border border-primaryTextColor rounded-md"
            required
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-base font-medium text-primaryTextColor mb-1"
          >
            Content
          </label>
          <textarea
            name="content"
            id="content"
            rows={6}
            placeholder="Isi berita..."
            value={formData.content}
            // onChange={handleChange}
            className="px-4 py-3 input text-base w-full resize-none border border-primaryTextColor rounded-md"
            required
          />
        </div>
        
        <div>
          <label
            htmlFor="content"
            className="block text-base font-medium text-primaryTextColor mb-1"
          >
            Author
          </label>
          <input
            name="author"
            id="author"
            placeholder="Penulis Berita"
            value={formData.author}
            // onChange={handleChange}
            className="px-4 py-3 input text-base w-full resize-none border border-primaryTextColor rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 bg-primaryTextColor text-white rounded-lg hover:bg-opacity-90 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateNews;
