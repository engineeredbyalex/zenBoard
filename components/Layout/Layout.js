import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "../common/NavigationBar";
import { useState } from "react";
import GoogleIco from "@/public/googleIco.ico"
import Image from "next/image";



export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();
  if (!session) {
    return (
      <div className="bg-bgGray w-screen h-screen flex items-center justify-center">
        <div className="w-[20rem] h-auto py-5 bg-white rounded-lg drop-shadow-md flex items-center justify-center flex-col">
          <div className="border-b-[1px] border-slate-500 py-2 w-[90%] flex items-center justify-center">
            <p className="font-light">Login or sign up</p>
          </div>
          <div className="border-b-[1px] border-slate-500 py-10 w-[90%] flex flex-col items-center justify-center gap-3 mt-10">
            <h5>Welcome to Zenboard</h5>
            <input type="email" placeholder="Email" name="email" id="email" required className="w-full border-[1px] border-slate-500 py-1 px-3 rounded-md" />
            <button className="w-full bg-blue-600 py-2 text-white rounded-md  hover:bg-black hover:text-white transition-all ease-in-out"><h5 >Continue</h5></button>
          </div>
          <div className=" w-[90%] flex flex-col items-center justify-center gap-3 mt-3">
            <button className="py-2 w-full rounded-md border-[1px] border-slate-500 flex items-center justify-start gap-[15%] hover:bg-black hover:text-white transition-all ease-in-out" onClick={() => signIn('google')} >
              <Image className="ml-5" src={GoogleIco} alt="google icon" />
              <p> Continue with Google</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bgGray min-h-screen ">
      <div className="md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
          </svg>
        </button>
        <div className="flex grow justify-center mr-6">
        </div>
      </div>
      <div className="flex">
        <Nav show={showNav} />
        <div className="flex-grow p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
