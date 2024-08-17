/* eslint-disable react/prop-types */
import { Alert, Button, Label, Modal, Spinner } from "flowbite-react";
import { useState } from "react";

export default function ChangePassModal({
  showModalChangePass,
  setShowModalChangePass,
}) {
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({});
  const handleChangePass = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      const res = await fetch(
        "http://localhost:3000/api/user/update-password",
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify(formData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setLoading(false);
      if (data.success) {
        return setSuccess(data.message);
        
      } else {
        return setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Modal
      show={showModalChangePass}
      onClose={() => setShowModalChangePass(false)}
    >
      <Modal.Header>Change Password</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <Label
                className="cursor-pointer w-fit"
                htmlFor="oldPassword"
                value="Old Password"
              />
              <input
                type="password"
                id="oldPassword"
                onChange={handleChangePass}
                className="text-sm transition-all border rounded-lg border-slate-500 text-slate-500 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label
                className="cursor-pointer w-fit"
                htmlFor="newPassword"
                value="New Password"
              />
              <input
                type="password"
                onChange={handleChangePass}
                id="newPassword"
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
            <Modal.Footer className="flex justify-end pb-1">
              <Button gradientDuoTone={"purpleToBlue"} outline type="submit">
                {loading ? (
                  <div className="flex items-center gap-2 text-sm">
                    <Spinner size={"sm"}></Spinner>
                    <span>Loading</span>
                  </div>
                ) : (
                  "Save"
                )}
              </Button>
              <Button color="gray" onClick={() => showModalChangePass(false)}>
                Cancel
              </Button>
            </Modal.Footer>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
