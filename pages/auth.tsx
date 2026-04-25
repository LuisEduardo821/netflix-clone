import { Input } from "@/components";
import Image from "next/image";
import { useState } from "react";

const Auth = () => {
  const [email, setEmail] = useState("");
  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image width={150} height={150} src="/images/logo.png" alt="logo" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black px-16 py-16 bg-opacity-70 mt-2 self-center lg:w-2/5 lg:max-w-md rounded-md  w-full">
            <h2 className="text-white mb-8 text-2xl font-semibold">Sign In</h2>
            <div className="text-white flex flex-col gap-4">
              <Input
                id="email"
                onChange={(ev) => setEmail(ev.target.value)}
                value={email}
                label="Email"
                type="email"
              />
              <Input
                id="password"
                onChange={() => {}}
                value=""
                label="Password"
                type="password"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
