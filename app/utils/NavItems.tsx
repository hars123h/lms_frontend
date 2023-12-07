import Link from "next/link";
import React from "react";

export const navItemsData = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Courses",
    url: "/courses",
  },
  {
    name: "About",
    url: "/profile",
  },
  {
    name: "Policy",
    url: "/policy",
  },
  {
    name: "FAQ",
    url: "/faq",
  },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="hidden 800px:flex">
        {navItemsData &&
          navItemsData.map((i, index) => (
            <Link href={`${i.url}`} key={index} passHref>
              <span
                className={`${
                  activeItem === index
                    ? "text-[#098b99] "
                    : "text-black "
                } text-[18px] inline-block  px-6 font-Josefin font-[500] navHover  `}
              >
                {i.name}
              </span>
            </Link>
          ))}
      </div>
      {isMobile && (
        <div className="800px:hidden mt-5">
             <div className="w-full text-center py-6">
            <Link href={"/"} passHref>
              <span
                className={`text-[25px] font-Josefin font-[500] text-black `}
              >ELearning</span>
            </Link>
          </div>
            {navItemsData &&
              navItemsData.map((i, index) => (
                <Link href="/" passHref key={index}>
                  <span
                    className={`${
                      activeItem === index
                        ? "text-[#098b99] "
                        : "text-black "
                    } block py-5 text-[18px] px-6 font-Josefin font-[500] transition duration-500 hover:text-[#098b99] hover:scale-105 `}
                  >
                    {i.name}
                  </span>
                </Link>
              ))}
          </div>
      )}
    </>
  );
};

export default NavItems;
