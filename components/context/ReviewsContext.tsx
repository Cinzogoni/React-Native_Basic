import React, { createContext, useContext, useState } from "react";

export interface IReview {
  id: number;
  title: string;
  rate: number;
}

interface ReviewsContextType {
  reviews: IReview[];
  setReviews: React.Dispatch<React.SetStateAction<IReview[]>>;
}

const ReviewsContext = createContext<ReviewsContextType | undefined>(undefined);

export const ReviewsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [reviews, setReviews] = useState<IReview[]>([]);

  return (
    <ReviewsContext.Provider value={{ reviews, setReviews }}>
      {children}
    </ReviewsContext.Provider>
  );
};

export const useReviews = () => {
  const context = useContext(ReviewsContext);
  if (!context) {
    throw new Error("useReviews must be used within a ReviewsProvider");
  }
  return context;
};
