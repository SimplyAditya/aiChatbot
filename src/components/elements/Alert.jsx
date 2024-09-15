import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
function Alert(props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.toggle(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [props]);
  return (
    <div className="w-2/6 h-fit fixed py-4 px-8 flex justify-center items-center right-0">
      <div className="w-4/5 h-fit flex flex-col justify-between items-center bg-red-600 overflow-hidden text-white rounded-xl">
        <div className="w-full p-4 flex justify-between items-center">
          <p>{props.alert}</p>
          <button onClick={() => props.toggle(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="w-full h-1">
          <div className="bg-white h-full progress-bar"></div>
        </div>
      </div>
    </div>
  );
}

export default Alert;
