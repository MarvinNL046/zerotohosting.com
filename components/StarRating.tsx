interface StarRatingProps {
  rating: number; // 0-10
  size?: "sm" | "md" | "lg";
  showNumber?: boolean;
}

export default function StarRating({ rating, size = "md", showNumber = true }: StarRatingProps) {
  const stars = 5;
  const filledStars = Math.round((rating / 10) * stars * 2) / 2; // Allow half stars

  const sizeMap = {
    sm: "w-3.5 h-3.5",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const textSizeMap = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 10 rating`}>
        {Array.from({ length: stars }, (_, i) => {
          const starValue = i + 1;
          const isFull = filledStars >= starValue;
          const isHalf = !isFull && filledStars >= starValue - 0.5;

          return (
            <svg
              key={i}
              className={`${sizeMap[size]} ${isFull || isHalf ? "text-amber-400" : "text-slate-200"}`}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isFull ? (
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill="currentColor"
                />
              ) : isHalf ? (
                <>
                  <defs>
                    <linearGradient id={`half-${i}`} x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="50%" stopColor="currentColor" />
                      <stop offset="50%" stopColor="#E2E8F0" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    fill={`url(#half-${i})`}
                  />
                </>
              ) : (
                <path
                  d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                  fill="#E2E8F0"
                />
              )}
            </svg>
          );
        })}
      </div>
      {showNumber && (
        <span className={`font-bold text-slate-700 ${textSizeMap[size]}`}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
