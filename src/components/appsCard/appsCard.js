import React from "react";


function AppsCard({ name, email, createdat }) {

  return (

      <div className="m-4">
      <h2 className="text-lg text-white">{name}</h2>
      </div>

  );
}

export default AppsCard;
