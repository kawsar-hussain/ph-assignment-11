import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Modal = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button className="btn w-full bg-linear-to-tr from-[#ed4f00] to-[#ffa41c] text-white border-none shadow-none" onClick={() => document.getElementById("my_modal_1").showModal()}>
        Donate Now
      </button>
      <dialog id="my_modal_1" className="modal ">
        <div className="modal-box text-black">
          <h3 className="font-bold text-lg">Hello, {user.displayName}!</h3>
          <p className="py-4">If you want to donate blood please click the confirm button.</p>
          <div className="flex items-end justify-end gap-1">
            <button className="btn bg-[#0073ff] text-white">Confirm</button>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn bg-[#ec3b00] text-white">Close</button>
              </form>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Modal;
