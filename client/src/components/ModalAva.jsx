/* eslint-disable react/prop-types */
import { Button, Label, Modal, Spinner, Alert } from "flowbite-react";
import Swal from "sweetalert2";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice";

import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function ModalAva({ showModal, setShowModal }) {
  const { currentUser, loading } = useSelector((state) => state.user);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: currentUser?.username,
    email: currentUser?.email,
  });

  const handleChangeProfile = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      setSuccess(null);
      setError(null);
      dispatch(updateUserStart());
      const updateData = new FormData();
      updateData.append("username", formData.username);

      // Append email only if it has changed
      if (formData.email !== currentUser.email) {
        updateData.append("email", formData.email);
      }

      if (inputRef.current.files[0]) {
        updateData.append("profilePicture", inputRef.current.files[0]);
      }

      const res = await fetch("http://localhost:3000/api/user/update", {
        method: "PUT",
        credentials: "include",
        body: updateData,
      });

      const data = await res.json();
      if (
        res.status === 401 ||
        data === "Not authenticated" ||
        data === "Token is not valid"
      ) {
        navigate("/sign-in");
      }
      if (res.ok) {
        dispatch(updateUserSuccess(data));
        setSuccess("Profile updated successfully");
      } else {
        dispatch(updateUserFailure(data.message));
        setSuccess(null);
        setError(data.message);
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      setError(error.message);
      setSuccess(null);
    }
  };
  const alertDeleteAccount = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will no longer be able to log in with this account!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        const handleDeleteUser = async () => {
          try {
            dispatch(deleteUserStart());
            const res = await fetch("http://localhost:3000/api/user/delete", {
              method: "DELETE",
              credentials: "include",
            });
            const data = await res.json();
            if (data.success === true) {
              dispatch(deleteUserSuccess(data));
              setShowModal(false);
              window.location.reload();
            } else {
              dispatch(deleteUserFailure(data.message));
            }
          } catch (error) {
            dispatch(deleteUserFailure(error.message));
          }
        };
        handleDeleteUser();
      }
    });
  };

  return (
    <Modal show={showModal} onClose={() => setShowModal(false)}>
      <Modal.Header>Update Profile</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <form className="flex flex-col gap-4" onSubmit={handleUpdateProfile}>
            <input type="file" ref={inputRef} hidden accept="image/*" />
            <img
              onClick={() => inputRef.current.click()}
              src={currentUser?.profilePicture}
              alt=""
              className="w-40 h-40 mx-auto rounded-full"
            />
            <div className="flex flex-col gap-1">
              <Label
                className="cursor-pointer w-fit"
                htmlFor="username"
                value="Username"
              />
              <input
                type="text"
                id="username"
                onChange={handleChangeProfile}
                value={formData.username}
                className="text-sm transition-all border rounded-lg border-slate-500 text-slate-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label
                className="cursor-pointer w-fit"
                htmlFor="email"
                value="Email"
              />
              <input
                type="email"
                onChange={handleChangeProfile}
                value={formData.email}
                id="email"
                className="text-sm transition-all border rounded-lg border-slate-500 text-slate-500 focus:ring-blue-500"
              />
            </div>
            {error && (
              <Alert color={"failure"} onDismiss={() => setError(null)}>
                {error}
              </Alert>
            )}
            {success && (
              <Alert color={"success"} onDismiss={() => setSuccess(null)}>
                {success}
              </Alert>
            )}
            <Modal.Footer className="flex items-center justify-between pb-0">
              <p
                onClick={alertDeleteAccount}
                className="text-red-500 cursor-pointer"
              >
                Delete Account
              </p>
              <div className="flex items-center gap-2">
                <Button gradientDuoTone={"purpleToBlue"} outline type="submit">
                  {loading ? (
                    <div className="flex items-center gap-2 text-sm">
                      <Spinner size={"sm"}></Spinner>
                      <span>Loading</span>
                    </div>
                  ) : (
                    "Update"
                  )}
                </Button>
                <Button color="gray" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
              </div>
            </Modal.Footer>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
