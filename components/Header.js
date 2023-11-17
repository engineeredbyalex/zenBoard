import React, { useContext, useEffect, useState, useRef } from "react";
import Link from "next/link";

import Button from "./Button";
import Image from "next/image";
import { AiOutlineMenu } from "react-icons/ai"
import LogoNav from "@/public/logoBig.png"

export default function Header() {

  const [toggle, setToggle] = useState(false);

  return (
    <div className="navigation_bar">
      <div className="w-full flex items-center justify-center h-[8vh] gap-[60px] absolute top-0">
        <div className="w-1/2 lg:w-auto flex items-center justify-start absolute left-[30px] lg:relative">
          <h2 >
            <Image alt="logo" width={150} src={LogoNav}></Image>
          </h2>
        </div>
        <div className={toggle ? ("text-white left-[0px] right-0 bottom-0 top-[20rem] flex flex-col relative lg:flex gap-[30px] items-center") : ("text-white hidden lg:flex gap-[30px]")}>
          <div className="text-[20px] nav_item" href={'/'}>Acasă</div>
          <div className="text-[20px] nav_item" href={'/products'}>Produse</div>
          <div className="text-[20px] nav_item" href={'/categories'}>Catalog</div>
          <div className="text-[20px] nav_item" href={'/aboutus'}>Despre noi</div>

        </div>
        <div className={toggle ? ("text-white lg:flex gap-[15px] absolute top-[80vh] ") : ("text-white hidden lg:flex  gap-[15px] ")}>
          <Button white outline>
            <Link href={"/cart"}>
              <p className=" text-[16px]">Coș </p>
            </Link>
          </Button>
          <Button black transparent>
            <Link href={"/account"}>
              <p className="text-white text-[16px]">Cont</p>
            </Link>
          </Button>
        </div>
        <div className="cursor-pointer  lg:hidden  w-1/2 flex items-center justify-end absolute right-[30px] " onClick={() => setToggle(!toggle)}>
          <AiOutlineMenu size={30} color="white" />
        </div>
      </div>

    </div>
  );
}