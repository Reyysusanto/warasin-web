import { showErrorAlert, showSuccessAlert } from "@/components/alert";
import { createMotivationUserService } from "@/services/users/motivation/createMotivationHistory";
import { MotivationHistoryRequest, MotivationList } from "@/types/motivation";
import dayjs from "dayjs";
import { Quote, User, Tag, Check, Bookmark, Star } from "lucide-react";
import { useState } from "react";

// Individual Motivation Card Component
export const MotivationCard = ({
  motivation,
}: {
  motivation: MotivationList;
}) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSave = async (motivationId: string, myRating: number) => {
    if (myRating === 0) {
      alert("Silakan berikan rating terlebih dahulu!");
      return;
    }

    setIsLoading(true);
    try {
      const formMotivation: MotivationHistoryRequest = {
        user_mot_display_date: dayjs().format("YYYY-MM-DD"),
        user_mot_reaction: myRating,
        mot_id: motivationId,
      };

      console.log(formMotivation);
      const result = await createMotivationUserService(formMotivation);
      console.log(`result : ${result}`);

      if (result.status === true) {
        await showSuccessAlert("Motivation berhasil disimpan", result.message);
      }
      console.log(result);
      setIsSaved(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      await showErrorAlert("Terjadi Kesalahan", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleStarHover = (starRating: number) => {
    setHoverRating(starRating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Card Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Tag className="w-4 h-4 text-blue-500" />
            <span className="text-sm font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
              {motivation.motivation_category.motivation_category_name}
            </span>
          </div>
        </div>

        {/* Quote Content */}
        <div className="relative">
          <Quote className="w-8 h-8 text-gray-300 absolute -top-2 -left-2" />

          <blockquote className="text-gray-800 text-lg font-medium leading-relaxed pl-6">
            {motivation.motivation_content}
          </blockquote>
        </div>

        {/* Author */}
        <div className="flex items-center mt-6 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full">
            <User className="w-5 h-5 text-white" />
          </div>

          <div className="ml-3">
            <p className="text-sm font-semibold text-gray-900">
              {motivation.motivation_author}
            </p>
            <p className="text-xs text-gray-500">Motivational Speaker</p>
          </div>
        </div>
      </div>

      {/* Rating Section */}
      <div className="px-6 py-4 bg-gray-50">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Berikan Rating:
        </p>
        <div className="flex items-center space-x-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              onMouseEnter={() => handleStarHover(star)}
              onMouseLeave={handleStarLeave}
              className="p-1 transition-transform hover:scale-110"
              disabled={isSaved}
            >
              <Star
                className={`w-6 h-6 ${
                  star <= (hoverRating || rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                } ${isSaved ? "cursor-not-allowed" : "cursor-pointer"}`}
              />
            </button>
          ))}
          {rating > 0 && (
            <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-6">
        <button
          onClick={() => handleSave(motivation.motivation_id, rating)}
          disabled={isLoading || isSaved || rating === 0}
          className={`w-full flex items-center justify-center space-x-2 px-4 py-3 rounded-lg font-medium transition-all ${
            isSaved
              ? "bg-green-100 text-green-700 cursor-not-allowed"
              : rating === 0
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : isLoading
              ? "bg-blue-100 text-blue-600 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transform hover:scale-105"
          }`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-blue-300 border-t-blue-600 rounded-full animate-spin"></div>
              <span>Menyimpan...</span>
            </>
          ) : isSaved ? (
            <>
              <Check className="w-5 h-5" />
              <span>Tersimpan</span>
            </>
          ) : (
            <>
              <Bookmark className="w-5 h-5" />
              <span>Simpan Motivasi</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
