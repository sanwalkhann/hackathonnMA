import { useRouter } from "next/router";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://finalbackend-seven.vercel.app/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("User authenticated successfully:", data);
        const { user, token } = data;
        const { _id } = user;
        console.log("User ID:", _id);
        localStorage.setItem("authToken", token);
        toast.success("User Login successfully");

        router.push("/");
      } else {
        const errorData = await response.json();
        if (response.status === 401 && errorData.message === "Invalid user") {
          toast.error("Invalid User");
        } else if (
          response.status === 401 &&
          errorData.message === "Invalid password"
        ) {
          toast.error("Invalid User");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div>
      <Form method="POST">
        <FormGroup>
          <Label>Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
          />
        </FormGroup>

        <FormGroup>
          <Label>Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
        </FormGroup>

        <Button type="button" onClick={handleLogin}>
          Login
        </Button>

        <ToastContainer />
      </Form>
    </div>
  );
};

export default LoginPage;
