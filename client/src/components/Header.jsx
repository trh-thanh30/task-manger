/* eslint-disable react/no-unescaped-entities */
import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { CiLogout } from "react-icons/ci";
import SearchInput from "./SearchInput";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signOut } from "../redux/user/userSlice";
import { useState } from "react";
import ModalAva from "./ModalAva";
import ChangePassModal from "./ChangePassModal";
import Logo from "./Logo";

export default function Header() {
  const dispatch = useDispatch();
  const path = useLocation().pathname;

  const navigate = useNavigate();

  const { currentUser } = useSelector((state) => state.user);

  const [showModal, setShowModal] = useState(false);

  const [showModalChangePass, setShowModalChangePass] = useState(false);
  // Sign-out function
  const handleLogOut = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/user/sign-out", {
        method: "GET",
        credentials: "include",
      });
      if (res.ok) {
        dispatch(signOut());
        navigate("/sign-in");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <header className="bg-white border-b border-solid shadow-md border-slate-200">
        <Navbar>
          <Logo></Logo>
          <SearchInput />
          <Navbar.Collapse>
            <Navbar.Link
              as={"div"}
              className={`hover:!text-blue-500 ${
                path === "/dashboard" ? "!text-blue-500" : ""
              }`}
            >
              <Link className="p-1 " to={"/dashboard"}>
                {" "}
                Home
              </Link>
            </Navbar.Link>
            <Navbar.Link
              as={"div"}
              className={`hover:!text-blue-500 ${
                path === "/about" ? "!text-blue-500" : ""
              }`}
            >
              <Link className="p-1" to={"/about"}>
                {" "}
                About
              </Link>
            </Navbar.Link>
            <Navbar.Link
              as={"div"}
              className={`hover:!text-blue-500 ${
                path === "/contact" ? "!text-blue-500" : ""
              }`}
            >
              <Link className="p-1" to={"/contact"}>
                {" "}
                Contact
              </Link>
            </Navbar.Link>
          </Navbar.Collapse>
          <div className="flex self-end md:order-2">
            {currentUser ? (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt="User settings"
                    img={currentUser?.profilePicture}
                    className="object-cover"
                    rounded
                    status="online"
                    statusPosition="bottom-right"
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{currentUser.username}</span>
                  <span className="block text-sm font-medium truncate">
                    {currentUser.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item onClick={() => setShowModal(true)}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setShowModalChangePass(true)}>
                  Change Password
                </Dropdown.Item>
                <Dropdown.Divider />
                <div className="flex items-center w-full gap-2 px-3 py-2 text-sm text-gray-700 transition-all cursor-pointer hover:bg-red-50 hover:text-red-500">
                  <CiLogout />
                  <span onClick={handleLogOut}>Log Out</span>
                </div>
              </Dropdown>
            ) : (
              <Link to="/sign-in">
                <Button gradientDuoTone={"purpleToBlue"} outline>
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </Navbar>
      </header>

      {/* Modal */}
      <ModalAva showModal={showModal} setShowModal={setShowModal}></ModalAva>
      <ChangePassModal
        showModalChangePass={showModalChangePass}
        setShowModalChangePass={setShowModalChangePass}
      ></ChangePassModal>
    </>
  );
}
