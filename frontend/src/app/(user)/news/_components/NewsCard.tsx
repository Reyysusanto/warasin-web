import Link from "next/link";

interface NewsCardProps {
  news_id: string;
  news_title: string;
  news_body: string;
  news_date: string;
}

export default function NewsCard({
  news_id,
  news_title,
  news_body,
  news_date,
}: NewsCardProps) {
  const formattedDate = new Date(news_date).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-2">{news_title}</h2>
      <p className="text-sm text-gray-500 mb-3">{formattedDate}</p>
      <p className="text-gray-700 mb-4 line-clamp-4">{news_body}</p>
      <Link
        href={`/news/${news_id}`}
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
      >
        Lihat lebih lengkap
      </Link>
    </div>
  );
}
