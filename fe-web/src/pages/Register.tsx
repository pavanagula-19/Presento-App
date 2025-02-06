import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerRequest } from "../redux/slices/user-slice";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useTheme } from "../components/themed-context";

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useDispatch();
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(
        registerRequest({ first_name, last_name, email, password })
      );
      toast.success("Registration Successful");
      navigate("/"); // Navigate to another page if needed
    } catch (err) {
      // Handle error if needed
    }
  };

  const handleLogin = () => {
    navigate("/");
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card
        className={`overflow-hidden ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
        }`}
      >
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Create an Account</h1>
                <p
                  className={`text-balance ${
                    theme === "dark" ? "text-gray-300" : "text-muted-foreground"
                  }`}
                >
                  Sign up for your Presento account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="first name"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className={`${
                    theme === "dark" ? "bg-gray-700 text-white" : ""
                  }`}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="last name"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className={`${
                    theme === "dark" ? "bg-gray-700 text-white" : ""
                  }`}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`${
                    theme === "dark" ? "bg-gray-700 text-white" : ""
                  }`}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="**********"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`${
                    theme === "dark" ? "bg-gray-700 text-white" : ""
                  }`}
                />
              </div>
              <Button
                type="submit"
                className={`w-full ${
                  theme === "dark" ? "bg-gray-600 text-white" : "bg-customBlue"
                }`}
                disabled={loading}
              >
                {loading ? "Registering..." : "Register"}
              </Button>
              {error && <p className="text-red-500">{error}</p>}
              <div
                className={`text-center text-sm ${
                  theme === "dark" ? "text-gray-300" : ""
                }`}
              >
                Already have an account?{" "}
                <a
                  href="#"
                  className="underline underline-offset-4"
                  onClick={handleLogin}
                >
                  Login
                </a>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="https://ik.imagekit.io/pavanagulla19/elephant.jpg?updatedAt=1737743253686"
              alt="Image"
              className={`absolute inset-0 h-full w-full object-cover ${
                theme === "dark" ? "brightness-[0.2] grayscale" : ""
              }`}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
