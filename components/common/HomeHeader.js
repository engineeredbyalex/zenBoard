// 
import { useState } from "react";
// 
import { useSession } from "next-auth/react";
// 
import { AiOutlineCaretDown, AiOutlineBell } from "react-icons/ai";
// 
import Link from "next/link";
// 
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function HomeHeader() {
  const { data: session } = useSession();
  const [userMenuToggle, setUserMenuToggle] = useState(false);
  const [notificationToggle, setNotificationToggle] = useState(false);
  const notifications = ["Notification 1", "Notification 2", "Notification 3"];

  return (
    <div className=" h-[10vh] flex items-center justify-between ">
      <div className="hidden lg:flex gap-2 items-center ">
        <h2>
          <Image width={50} height={50} src={session?.user?.image} alt="" className="w-6 h-6 rounded-md sm:hidden" />
          <div>
            <h4 className="black_text  leading-5 lg:leading-10">
              Hello, <b>{session?.user?.name}</b>
            </h4>
            <h5 className="grey_text leading-3">Current state of your shop</h5>
          </div>
        </h2>
      </div>
      <div className="px-3 py-1 relative">

        <div className="flex gap-1 text-black items-center z-[3]">
          {/* <div className="px-3 py-1 relative bottom-2 lg:right-[5rem]">
            <div>
              <div className="red_background w-[1.2rem] h-[1.2rem] rounded-full relative top-4 left-4 flex items-center justify-center">
                <p className="white_text">{notifications.length}</p>
              </div>
              <button onClick={() => setNotificationToggle(!notificationToggle)}>
                <AiOutlineBell size={30} />
              </button>
            </div>
            <div className={`grey_text absolute left-0 lg:left-30 top-full   ${notificationToggle ? "block" : "hidden"}`}>
              <ul>
                {notifications.map((notification, index) => (
                  <li key={index}>{notification}</li>
                ))}
              </ul>
            </div>
          </div> */}
          <Image width={50} height={50} src={session?.user?.image} alt="" className="w-[40px] h-[40px] rounded-xl" />
          <span className="px-2">
            <h5 className="grey_text">{session?.user?.name}</h5>
          </span>
          <button onClick={() => setUserMenuToggle(!userMenuToggle)}>
            <AiOutlineCaretDown size={20} />
          </button>
        </div>
        <div className={`grey_text absolute right-[0rem] top-full p-5 bg-bgGray ${userMenuToggle ? "block" : "hidden"}`}>
          <Link href={'/account'}>
            <h5>Account</h5>
          </Link>
          <Link href={'/support'}>
            <h5>Support</h5>
          </Link>
          <Link onClick={() => signOut('google')} href={'/'}>
            <h5>Logout</h5>
          </Link>
        </div>
      </div>
    </div>
  );
}
