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

  // Sample notifications for testing
  const notifications = ["Notification 1", "Notification 2", "Notification 3"];

  return (
    <div className=" h-[10vh] flex items-center justify-between">
      <h2>
        <div className="flex gap-2 items-center">
          <Image width={50} height={50} src={session?.user?.image} alt="" className="w-6 h-6 rounded-md sm:hidden" />
          <div>
            <h4 className="dark_blue_text">
              Hello, <b>{session?.user?.name}</b>
            </h4>
            <h5 className="grey_text">Here s what s happening with your store today.</h5>
          </div>
        </div>
      </h2>
      <div className="px-3 py-1 relative">

        <div className="flex gap-1 text-black items-center">
          <div className="px-3 py-1 relative bottom-2 right-[5rem]">
            <div>
              <div className="red_background w-[1.2rem] h-[1.2rem] rounded-full relative top-4 left-4 flex items-center justify-center">
                <p className="white_text">{notifications.length}</p>
              </div>
              <button onClick={() => setNotificationToggle(!notificationToggle)}>
                <AiOutlineBell size={30} />
              </button>
            </div>
            <div className={`grey_text absolute left-30 top-full   ${notificationToggle ? "block" : "hidden"}`}>
              <ul>
                {notifications.map((notification, index) => (
                  <li key={index}>{notification}</li>
                ))}
              </ul>
            </div>
          </div>
          <Image width={50} height={50} src={session?.user?.image} alt="" className="w-[40px] h-[40px] rounded-xl" />
          <span className="px-2">
            <p className="grey_text">{session?.user?.name}</p>
          </span>
          <button onClick={() => setUserMenuToggle(!userMenuToggle)}>
            <AiOutlineCaretDown size={20} />
          </button>
        </div>
        <div className={`grey_text absolute right-[0rem] top-full p-2 ${userMenuToggle ? "block" : "hidden"}`}>
          <Link href={'/account'}>
            <p>Account</p>
          </Link>
          <Link href={'/support'}>
            <p>Support</p>
          </Link>
          <Link onClick={() => signOut('google')} href={'/'}>
            <p>Log out</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
