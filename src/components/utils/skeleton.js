import React from "react";
import { Skeleton } from "@mui/material";

const SkeletonLoader = (productstable) => {
  console.log("Skeleton products table", productstable.productstable)
  if (productstable.productstable) {
    return (
      <div className="w-full">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex justify-between border-gray-200">
            {[...Array(5)].map((_, j) => (
              <Skeleton key={j} width="100%" height={70} />
            ))}
          </div>
        ))}
      </div>
    );
  }
  else return (
    <div className="w-full">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex items-center justify-between border-gray-200">
        {[...Array(5)].map((_, j) => (
          <Skeleton key={j} width={170} height={50} />
        ))}
      </div>
    ))}
  </div>
  );
};

export default SkeletonLoader;