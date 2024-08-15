/* eslint-disable react/no-unescaped-entities */
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useSelector } from "react-redux";
import { CiLogout } from "react-icons/ci";
import SearchInput from "./SearchInput";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  console.log(currentUser);
  return (
    <header className="bg-white border-b border-solid shadow-md border-slate-200">
      <Navbar>
        <SearchInput></SearchInput>
        <div className="flex self-end md:order-2 ">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img={currentUser.profilePicture}
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
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Item>Changes password</Dropdown.Item>
            <Dropdown.Divider />
            <div className="flex items-center w-full gap-2 px-3 py-2 text-sm text-gray-700 transition-all cursor-pointer hover:bg-red-50 hover:text-red-500">
              <CiLogout />
              <span>Log Out</span>
            </div>
          </Dropdown>
        </div>
      </Navbar>
    </header>
  );
}
