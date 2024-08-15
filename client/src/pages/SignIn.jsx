/* eslint-disable react/no-unescaped-entities */
import { Label, Button, Alert, Spinner } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  SignInStart,
  SignInSuccess,
  SignInFailure,
} from "../redux/user/userSlice";

export default function SignIn() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.user);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(SignInStart());
      const res = await fetch("http://localhost:3000/api/user/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(SignInFailure(data.message));
      }
      if (res.ok) {
        dispatch(SignInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(SignInFailure(error.message));
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
            Hi, welcome to my taks page. You can sign in with your email and
            password.
          </p>
        </div>
        {/* right */}
        <div className="flex-1 p-5 bg-white rounded-lg shadow-2xl">
          <form className="flex flex-col gap-4 " onSubmit={handleSubmit}>
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-blue-500">
                Welcome Back!
              </h1>
              <p className="text-sm text-slate-500">
                Keep all your credetials safe!
              </p>
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
            {error && <Alert color={"failure"}>{error}</Alert>}
            <Button
              gradientDuoTone={"purpleToBlue"}
              outline
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <Spinner size={"md"}></Spinner>
              ) : (
                <span className="text-sm">Sign In</span>
              )}
            </Button>
          </form>
          <div className="flex items-center justify-center gap-2 mt-4 text-sm">
            <span>
              Don't have an account?{" "}
              <Link to={"/register"} className="text-blue-500">
                Register
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
