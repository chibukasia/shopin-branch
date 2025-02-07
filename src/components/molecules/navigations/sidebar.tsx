'use client'
import { MdMenuOpen, MdOutlineInventory } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { FaBasketShopping, FaCircleUser, FaTruckDroplet, FaUsers } from "react-icons/fa6";
import { AiOutlineProduct } from "react-icons/ai";
import { BsCurrencyExchange } from "react-icons/bs";
import { TbReport } from "react-icons/tb";
import { SiGoogleanalytics } from "react-icons/si";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authRedirect } from "@/utils/auth";
import axiosClient from "@/utils/axios-client";

const menuItems = [
  {
    label: "Home",
    icon: <IoHome size={20} />,
  },
  {
    label: "Orders",
    icon: <FaBasketShopping size={20} />,
  },
  {
    label: "Products",
    icon: <AiOutlineProduct size={20} />,
  },
  {
    label: "Users",
    icon: <FaUsers size={20} />,
  },
  {
    label: "Sales",
    icon: <BsCurrencyExchange size={20} />,
  },
  {
    label: "Inventory",
    icon: <MdOutlineInventory size={20} />,
  },
  {
    label: "Reports",
    icon: <TbReport size={20} />,
  },
  {
    label: "Analytics",
    icon: <SiGoogleanalytics size={20} />,
  },
  {
    label: "Purchases",
    icon: <BiSolidPurchaseTag size={20} />,
  },
  {
    label: "Suppliers",
    icon: <FaTruckDroplet size={20} />,
  },
];
const SideBar = () => {
  const [open, setOpen] = useState<boolean>(true)
  const [user, setUser] = useState<any>(null)

  const router = useRouter()

    useEffect(() =>{
        axiosClient.get('/login/me').then((user) => {setUser(user.data)}).catch((error) => {
          authRedirect(router, error)
        })
      },[router])
  return (
    <nav className={`h-screen bg-primary text-white shadow-md flex flex-col duration-500  ${open ? "w-48 px-3": "w-12 px-2" } overflow-y-scroll`}>
      <div className="py-2 flex items-center justify-between">
        <p className={`${open ? '': 'hidden'}`}>LOGO</p>
        <div><MdMenuOpen size={34} onClick={() => setOpen(!open)} className={`cursor-pointer ${!open ? "rotate-180": ""} duration-500`}/></div>
      </div>

      <ul className="flex-1 space-y-1 py-5">
        {menuItems.map((item) => (
          <div key={item.label} className="flex items-center gap-3 p-2 rounded-md duration-300 hover:bg-violet-800  group">
            <div>{item.icon}</div>
            <p className={`${open ? '': 'w-0 translate-x-24'} duration-500 overflow-hidden text-md font-medium`}>{item.label}</p>
            <p className={`${open && 'hidden'} absolute left-32 shadow-md rounded-md text-sm
                 w-0 p-0 text-black bg-white duration-100 overflow-hidden group-hover:w-fit group-hover:p-2 group-hover:left-16
                `}>{item.label}</p>
          </div>
        ))}
      </ul>
      { user && <div className="flex items-center gap-3 pb-4">
        <div><FaCircleUser size={30}/>
        </div>
        <div className={`${open ? '': 'w-0 translate-x-24'} duration-500 leading-5`}>
            <p>{user.name}</p>
            <span className="text-sm break-all">{user.email}</span>
        </div>
      </div>}
    </nav>
  );
};

export default SideBar;
