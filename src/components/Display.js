import React from "react";
import { FaTrash } from "react-icons/fa";

export const DisplayDOM = ({ registrations, handleDelete }) => {

  return registrations.map((registration =>
    <div key={registration.id} registration={registration} className="display--container">
      <p>{registration.hours}</p>
      <p>{registration.comment}</p>
      <p className="delete-btn" onClick={() => handleDelete(registration.id)}>
        <FaTrash className="trash"/>
    </p>
    </div>
    ))
  };

