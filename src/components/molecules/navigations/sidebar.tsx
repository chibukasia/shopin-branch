/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { MdMenuOpen, MdOutlineInventory } from "react-icons/md";
import { FaBasketShopping, FaCircleUser, FaTruck, FaUsers } from "react-icons/fa6";
import { AiOutlineProduct } from "react-icons/ai";
import { BsCurrencyExchange } from "react-icons/bs";
import { TbReport } from "react-icons/tb";
import { SiGoogleanalytics } from "react-icons/si";
import { BiSolidPurchaseTag } from "react-icons/bi";
import { MdSpaceDashboard } from "react-icons/md";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authRedirect } from "@/utils/auth";
import axiosClient from "@/utils/axios-client";
import Link from "next/link";
import useUserStore from "@/screens/hooks/useUserStore";

const menuItems = [
  {
    label: "Home",
    icon: <MdSpaceDashboard size={20} />,
    link: '/'
  },
  {
    label: "Orders",
    icon: <FaBasketShopping size={20} />,
    link: '/orders'
  },
  {
    label: "Products",
    icon: <AiOutlineProduct size={20} />,
    link: '/products'
  },
  {
    label: "Users",
    icon: <FaUsers size={20} />,
    link: '/users'
  },
  {
    label: "Sales",
    icon: <BsCurrencyExchange size={20} />,
    link: '/sales'
  },
  {
    label: "Inventory",
    icon: <MdOutlineInventory size={20} />,
    link: '/inventory'
  },
  {
    label: "Reports",
    icon: <TbReport size={20} />,
    link: '/reports'
  },
  {
    label: "Analytics",
    icon: <SiGoogleanalytics size={20} />,
    link: '/analytics'
  },
  {
    label: "Purchases",
    icon: <BiSolidPurchaseTag size={20} />,
    link: '/purchases'
  },
  {
    label: "Suppliers",
    icon: <FaTruck size={20} />,
    link: '/suppliers'
  },
];

const SideBar = () => {
  const [open, setOpen] = useState<boolean>(true)
  const {user, setUser} = useUserStore(state=> state)

  const router = useRouter()

    useEffect(() =>{
        axiosClient.get('/login/me').then((user) => {
          setUser(user.data)
        }).catch((error) => {
          authRedirect(router, error)
        })
      },[router, setUser])
  return (
    <nav className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl flex flex-col duration-500 z-50 ${open ? "w-56 px-4": "w-16 px-2" }`}>
      {/* Header */}
      <div className="py-4 flex items-center justify-between border-b border-slate-700">
        <div className={`${open ? '': 'hidden'} flex items-center gap-2`}>
          <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">S</span>
          </div>
          <span className="font-bold text-lg">ShopInn</span>
        </div>
        <button 
          onClick={() => setOpen(!open)} 
          className="p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200"
        >
          <MdMenuOpen size={24} className={`transition-transform duration-500 ${!open ? "rotate-180": ""}`}/>
        </button>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link 
                href={item.link} 
                className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-slate-700 hover:shadow-lg group relative"
              >
                <div className="flex-shrink-0 text-slate-300 group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <span className={`${open ? '': 'w-0 translate-x-24 opacity-0'} duration-500 overflow-hidden text-sm font-medium text-slate-200 group-hover:text-white transition-all`}>
                  {item.label}
                </span>
                {/* Tooltip for collapsed state */}
                <div className={`${open && 'hidden'} absolute left-16 bg-slate-800 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium
                     w-0 p-0 opacity-0 duration-200 overflow-hidden group-hover:w-auto group-hover:p-3 group-hover:opacity-100
                     border border-slate-600 z-50`}>
                  {item.label}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* User Profile */}
      {user && (
        <div className="border-t border-slate-700 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <FaCircleUser size={20} className="text-white"/>
            </div>
            <div className={`${open ? '': 'w-0 translate-x-24 opacity-0'} duration-500 overflow-hidden leading-5`}>
              <p className="font-medium text-sm text-white truncate">{user.name}</p>
              <span className="text-xs text-slate-400 truncate block">{user.email}</span>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default SideBar;
