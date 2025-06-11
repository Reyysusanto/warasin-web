import { MotivationList } from "@/types/motivation";
import { Heart, Quote, User, Tag, Check, Bookmark } from "lucide-react";
import { useState } from "react";

export const MotivationCard = ({
  motivation,
}: {
  motivation: MotivationList;
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSaved(true);
    setIsLoading(false);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 group">
      {/* Card Header */}
      <div className="p-6 pb-4">
        <div className="flex items-start justify-between mb-4">
          <div
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border`}
          >
            <Tag className="w-3 h-3 mr-1" />
            {motivation.motivation_category.motivation_category_name}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLike}
              className={`p-2 rounded-full transition-colors duration-200 ${
                isLiked
                  ? "text-red-500 bg-red-50 hover:bg-red-100"
                  : "text-gray-400 hover:text-red-500 hover:bg-red-50"
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            </button>
          </div>
        </div>

        {/* Quote Content */}
        <div className="relative mb-6">
          <Quote className="absolute -top-2 -left-1 w-8 h-8 text-blue-200" />
          <blockquote className="text-gray-800 text-lg leading-relaxed pl-6 font-medium">
            {motivation.motivation_content}
          </blockquote>
        </div>

        {/* Author */}
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="ml-3">
            <p className="text-gray-900 font-semibold text-sm">
              {motivation.motivation_author}
            </p>
            <p className="text-gray-500 text-xs">Motivational Speaker</p>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="px-6 pb-6">
        <button
          onClick={handleSave}
          disabled={isLoading || isSaved}
          className={`w-full flex items-center justify-center px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 ${
            isSaved
              ? "bg-green-50 text-green-700 border border-green-200"
              : isLoading
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 hover:border-blue-300"
          }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent mr-2"></div>
              Menyimpan...
            </>
          ) : isSaved ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Tersimpan
            </>
          ) : (
            <>
              <Bookmark className="w-4 h-4 mr-2" />
              Simpan Motivasi
            </>
          )}
        </button>
      </div>
    </div>
  );
};
