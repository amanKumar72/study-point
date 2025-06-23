import React from "react";
const LogoutDialog = ({ open, handleClose, handleLogout }) => {
  if (!open) return null;

  return (
    <div
      onClick={(e) => {
        e.target.classList.contains("fixed") && handleClose();
      }}
      className="fixed inset-0  bg-opacity-50 flex items-center justify-center backdrop-blur-sm bg-opacity-10 z-10 "
    >
      <div className="bg-gray-700 rounded-lg p-6 max-w-sm w-full mx-4">
        <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
        <p className="text-white-600 mb-6">
          Are you sure you want to logout? You will need to login again to
          access your account.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleClose}
            className="px-4 py-2 bg-gray-800 text-white-600 font-semibold hover:bg-gray-900 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white font-semibold hover:bg-red-700 rounded-md transition-colors"
            autoFocus
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};
export default LogoutDialog;
