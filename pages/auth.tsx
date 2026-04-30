import { Input } from "@/components";
import axios from "axios";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login",
    );
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", { email, password, name });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, password, name, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image width={150} height={150} src="/images/logo.png" alt="logo" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black px-16 py-16 bg-opacity-70 mt-2 self-center lg:w-2/5 lg:max-w-md rounded-md  w-full">
            <h2 className="text-white mb-8 text-2xl font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="text-white flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="name"
                  onChange={(ev) => setName(ev.target.value)}
                  value={name}
                  label="Username"
                />
              )}
              <Input
                id="email"
                onChange={(ev) => setEmail(ev.target.value)}
                value={email}
                label="Email"
                type="email"
              />
              <Input
                id="password"
                onChange={(ev) => setPassword(ev.target.value)}
                value={password}
                label="Password"
                type="password"
              />
            </div>
            <button
              className="text-white bg-red-600 py-2 rounded-md w-full hover:bg-red-700 mt-10 transition"
              onClick={variant === "login" ? login : register}
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <div className="flex flex-row w-full justify-center items-center gap-4 mt-8">
              <div
                className="flex w-10 h-10 bg-white rounded-full items-center justify-center cursor-pointer hover:opacity-80 transition"
                onClick={() => signIn("google", { callbackUrl: "/" })}
              >
                <FcGoogle size={30} />
              </div>
              <div
                className="flex w-10 h-10 bg-white rounded-full items-center justify-center cursor-pointer hover:opacity-80 transition"
                onClick={() => signIn("github", { callbackUrl: "/" })}
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                onClick={toggleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
