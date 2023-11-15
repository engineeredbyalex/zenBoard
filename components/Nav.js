import Link from "next/link";
// 
import { useRouter } from "next/router";
// 
import { signOut } from "next-auth/react";
// 
import Logo from "@/components/Logo";
// 
import { AiOutlineAppstore } from "react-icons/ai";
import { AiOutlineShop } from "react-icons/ai";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { AiFillSetting } from "react-icons/ai";


export default function Nav({ show }) {
  const inactiveLink = 'flex gap-1 p-1 items-center justify-center h-[3rem]';
  const activeLink = inactiveLink + ' bg-highlight text-gray rounded-sm ';
  const inactiveIcon = 'w-6 h-6 ';
  const activeIcon = inactiveIcon + ' text-primary';
  const router = useRouter();
  const { pathname } = router;
  async function logout() {
    await router.push('/');
    await signOut();
  }
  return (
    <aside className={(show ? 'left-0' : '-left-full') + " top-0 grey_text light_blue_background p-4 fixed w-full  h-screen md:static md:w-auto transition-all"}>
      <div className="mb-4 ">
        <Logo />
      </div>
      <nav className="flex flex-col gap-2 ">
        <Link href={'/'} className={pathname === '/' ? activeLink : inactiveLink}>
          <div className={pathname === '/' ? activeIcon : inactiveIcon}>
            <AiOutlineAppstore size={20} />
          </div>
          Dashboard
        </Link>
        <Link href={'/products'} className={pathname.includes('/products') ? activeLink : inactiveLink}>
          <div className={pathname.includes('/products') ? activeIcon : inactiveIcon}>
            <AiOutlineShop size={20} />
          </div>
          Products
        </Link>
        <Link href={'/categories'} className={pathname.includes('/categories') ? activeLink : inactiveLink}>
          <div className={pathname.includes('/categories') ? activeIcon : inactiveIcon}>
            <AiOutlineFolderOpen size={20} />
          </div>
          Categories
        </Link>
        <Link href={'/orders'} className={pathname.includes('/orders') ? activeLink : inactiveLink}>
          <div className={pathname.includes('/orders') ? activeIcon : inactiveIcon}>
            <AiOutlineShoppingCart size={20} />
          </div>
          Orders
        </Link>
        <Link href={'/admins'} className={pathname.includes('/admins') ? activeLink : inactiveLink}>
          <div className={pathname.includes('/admins') ? activeIcon : inactiveIcon}>
            <AiOutlineUsergroupAdd size={20} />
          </div>
          Admins
        </Link>
        <Link href={'/settings'} className={pathname.includes('/settings') ? activeLink : inactiveLink}>
          <div className={pathname.includes('/settings') ? activeIcon : inactiveIcon}>
            <AiFillSetting size={20} />
          </div>
          Settings
        </Link>
      </nav>
    </aside>
  );
}