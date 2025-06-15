/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Footer from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { FaPaperPlane } from "react-icons/fa";
import OfferCard from "./_components/Offer";
import { useState } from "react";
import { ChatBotResponse } from "@/types/chatbot";
import { sendChatMessageService } from "@/services/users/chatbot/createChat";

const Offers = [
  {
    icon: "shinny_star",
    title: "Jelas dan Tepat",
    desc: "CHATIN memberikan jawaban akurat dan berbasis data.",
  },
  {
    icon: "target",
    title: "Jawaban yang dipersonlisasi",
    desc: "Respons disesuaikan dengan kebutuhan pengguna.",
  },
  {
    icon: "up",
    title: "Peningkatan Efisiensi",
    desc: "Akses cepat dengan respons instan.",
  },
];

const ChatBotPage = () => {
  const [input, setInput] = useState("");
  const [conversationId, setConversationId] = useState<string | undefined>();
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);
  const [loading, setLoading] = useState(false);

  const formatBotResponse = (text: string) => {
    // Proses bold (**teks** -> <strong>teks</strong>)
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");

    // Proses bullet points (- item -> • item)
    formattedText = formattedText.replace(/^-\s+(.*$)/gm, "• $1");

    // Tambahkan line breaks untuk nomor (1. -> <br />1.)
    formattedText = formattedText.replace(/^(\d+\.)/gm, "<br /><br />$1");

    return { __html: formattedText };
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");
    setLoading(true);

    try {
      const response = (await sendChatMessageService(
        userMessage,
        conversationId
      )) as ChatBotResponse;
      console.log(response);
      const botReply = response.data.response;
      const newConvId = response.data.conversation_id;

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
      setConversationId(newConvId);
    } catch (error: any) {
      console.log(error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Terjadi kesalahan saat mengirim pesan." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSendMessage();
  };

  return (
    <div className="w-full min-h-screen overflow-hidden bg-gradient-to-tr from-[#ECEEFF] to-white">
      <NavigationBar />

      <main className="flex h-screen flex-col mx-auto items-center justify-center text-center mt-32 w-4/5 md:w-2/3">
        <h1 className="text-4xl font-bold">
          Selamat Datang di{" "}
          <span className="text-primaryColor">Tanyain Warasin</span>
        </h1>
        <p className="mt-2 text-primaryTextColor font-semibold">
          Kekuatan AI yang siap melayani anda - Menjinkan pengetahuan
        </p>

        {/* Chat Box */}
        <div className="w-full max-h-screen overflow-y-auto mt-8 bg-transparent rounded-lg shadow-md border border-primaryColor p-4 space-y-3">
          {messages.length === 0 && (
            <p className="text-sm text-gray-400 text-center">
              Mulai percakapan dengan mengetik di bawah
            </p>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[80%] px-4 py-2 rounded-lg text-left ${
                msg.sender === "user"
                  ? "ml-auto bg-primaryColor text-white w-fit"
                  : "mr-auto bg-gray-200 text-gray-800 w-fit"
              }`}
            >
              {msg.sender === "bot" ? (
                <div
                  dangerouslySetInnerHTML={formatBotResponse(msg.text)}
                  className="prose"
                />
              ) : (
                msg.text
              )}
            </div>
          ))}
          {loading && <p className="text-sm text-gray-500 italic">Tanyain sedang mengetik...</p>}
        </div>

        {/* Input */}
        <div className="mt-4 flex items-center border border-primaryColor bg-white text-primaryTextColor rounded-xl p-1 text-lg w-full">
          <input
            type="text"
            className="flex-grow outline-none bg-transparent px-2"
            placeholder="Jelaskan pengertian kesehatan mental!"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className="bg-primaryColor text-white px-4 py-2 rounded-lg"
          >
            <FaPaperPlane />
          </button>
        </div>

        <section className="flex flex-col sm:flex-row gap-4 justify-center sm:space-x-12 mt-12">
          {Offers.map((offer, index) => (
            <OfferCard
              key={index}
              icon={offer.icon}
              title={offer.title}
              desc={offer.desc}
            />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ChatBotPage;
