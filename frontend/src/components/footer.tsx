import {
    FaFacebook,
    FaTwitter,
    FaYoutube,
    FaPinterest,
    FaLinkedin,
    FaTiktok,
    FaInstagram,
  } from "react-icons/fa";
  import { FiArrowRight } from "react-icons/fi";
  import Image from "next/image";
  
  export default function Footer() {
    return (
      <footer className="text-primaryTextColor mt-10 py-6 px-8 md:px-20">
        <div className="max-w-6xl mx-auto flex items-center gap-3 mb-8">
          <Image
            className="w-12 h-12"
            src={"/Images/logo.png"}
            width={48}
            height={48}
            alt="logo"
          />
          <h2 className="text-2xl font-semibold text-primaryColor">Warasin</h2>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg">Halaman</h3>
            <ul className="mt-3 space-y-2 text-gray-600">
              <li>
                <a href="#" className="text-primaryColor font-medium">
                  Home
                </a>
              </li>
              <li>
                <a href="#">Tentang Kami</a>
              </li>
              <li>
                <a href="#">Layanan</a>
              </li>
              <li>
                <a href="#">Kontak</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Alamat</h3>
            <p className="mt-3 text-gray-600">
              123 Pusat Kesehatan Mental, Lumajang 12345, Indonesia
            </p>
            <a href="#" className="text-primaryColor font-medium mt-2 block">
              View on Maps
            </a>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Pertanyaan</h3>
            <p className="mt-3 text-gray-600">(123) 456-7890</p>
            <p className="text-gray-600">info@warasin.com</p>
            <h3 className="font-semibold text-lg mt-5">Ikuti Kami</h3>
            <div className="flex space-x-4 mt-3 text-gray-700">
              <FaFacebook size={20} />
              <FaTwitter size={20} />
              <FaYoutube size={20} />
              <FaPinterest size={20} />
              <FaLinkedin size={20} />
              <FaTiktok size={20} />
              <FaInstagram size={20} />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg">Surat Kabar</h3>
            <p className="text-gray-600">Tetap Terupdate dengan Berita Terbaru kami</p>
            <div className="relative mt-4">
              <input
                type="email"
                placeholder="Email Kamu"
                className="border border-gray-400 rounded-full px-4 py-2 w-full outline-none"
              />
              <button className="absolute right-1 top-1 bg-primaryColor text-white rounded-full p-2">
                <FiArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  