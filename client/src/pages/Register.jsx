/* eslint-disable react/no-unescaped-entities */
import { Label, Button, Alert } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(formData);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(false)
      const res = fetch("http://localhost:3000/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
      }
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="min-h-screen mt-10 md:mt-20">
      <div className="flex flex-col max-w-3xl gap-5 p-3 mx-auto md:flex-row md:items-center">
        {/* left */}
        <div className="flex-1">
          <div className="mb-5 text-center">
            <p className="p-2 text-sm border rounded-full text-slate-500 ">
              Manage all your taks in one place!
            </p>
          </div>
          <div
            className={`text-5xl font-bold dark:text-white flex flex-col gap-1`}
          >
            <span
              className={` px-2 rounded-xl text-white py-1 bg-gradient-to-r from-indigo-500 via-blue-500 to-blue-500 w-fit`}
            >
              HuuThanh's
            </span>
            <span className="text-blue-500 ">Task Managers</span>
          </div>
          <p className="mt-5 text-sm">
            Hi, welcome to my taks page. You can sign up with your email and
            password.
          </p>
        </div>
        {/* right */}

        <div className="flex-1 p-5 bg-white rounded-lg shadow-2xl">
          <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-blue-500">
                Register account!
              </h1>
              <p className="text-sm text-slate-500">
                Keep all your credetials safe!
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <Label
                className="cursor-pointer"
                htmlFor="username"
                value="Username"
              ></Label>
              <input
                type="text"
                placeholder="Enter your username"
                id="username"
                className="p-3 text-sm transition-all border border-gray-300 rounded-full text-slate-500 focus:border-blue-50"
                onChange={handleChange}
              ></input>
            </div>

            <div className="flex flex-col gap-1">
              <Label
                className="cursor-pointer"
                htmlFor="email"
                value="Email Address"
              ></Label>
              <input
                type="email"
                placeholder="example@gmail.com"
                id="email"
                onChange={handleChange}
                className="p-3 text-sm transition-all border border-gray-300 rounded-full text-slate-500 focus:border-blue-50"
              ></input>
            </div>

            <div className="flex flex-col gap-1">
              <Label
                className="cursor-pointer"
                htmlFor="password"
                value="Password"
              ></Label>
              <input
                type="password"
                placeholder="Password"
                id="password"
                className="p-3 text-sm transition-all border border-gray-300 rounded-full text-slate-500 focus:border-blue-50"
                onChange={handleChange}
              ></input>
            </div>
            <Button gradientDuoTone={"purpleToPink"} outline type="submit">
              Sign Up
            </Button>
          </form>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm">
            <span>
              Have an account?{" "}
              <Link to={"/sign-in"} className="text-blue-500">
                Sign In
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
