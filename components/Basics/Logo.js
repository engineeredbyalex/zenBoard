import Link from "next/link";

export default function Logo() {
  return (
    <Link href={'/'} className="hidden lg:flex  items-center justify-center text-center w-[10rem]">
      <h4 className=" dark_blue_text font-bold uppercase">
        ZenBoard
      </h4>
    </Link>
  );
}