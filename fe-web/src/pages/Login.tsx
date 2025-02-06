import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { loginRequest } from "../redux/slices/user-slice";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/routes";
import { useTheme } from "../components/themed-context";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.userInfo);
  const loading = useSelector((state: RootState) => state.user.loading);
  const error = useSelector((state: RootState) => state.user.error);
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate(PATH.DASHBOARD);
    }
  }, [user, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginRequest({ email, password }));
  };
  const handleRegister = () => {
    navigate("/register");
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
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p
                  className={`text-balance ${
                    theme === "dark" ? "text-gray-300" : "text-muted-foreground"
                  }`}
                >
                  Login to your Presento account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={`${
                    theme === "dark" ? "bg-gray-700 text-white" : ""
                  }`}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className={`ml-auto text-sm underline-offset-2 hover:underline ${
                      theme === "dark" ? "text-gray-300" : ""
                    }`}
                  >
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
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
                {loading ? "Logging in..." : "Login"}
              </Button>
              {error && <p className="text-red-500">{error}</p>}

              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a
                  href="#"
                  className={`underline underline-offset-4 ${
                    theme === "dark" ? "text-gray-300" : ""
                  }`}
                  onClick={handleRegister}
                >
                  Sign up
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
