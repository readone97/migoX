
import React from 'react';
import { Button } from './button';
import { ArrowRightIcon } from 'lucide-react';
import Link from "next/link";

const GetStartedButton = () => {
  return (
    <div className="relative">
      {/* Shadow/background element */}
      <div className="absolute bg-white rounded-md w-full h-10 top-1 left-1 border-[1px] border-black"></div>
      
      {/* Button with Link */}
      <div className="relative">
         <Link href="/login" className="block w-full">
          <Button  
           className="relative overflow-hidden group bg-[#23C69A] hover:bg-[#23C69A]/90 text-[#1B1B1B]">
            <span>Get Started</span>
            <ArrowRightIcon className="w-4 h-4" />
          </Button>
        </Link> 
{/*          <Button            
            className="relative overflow-hidden group bg-[#23C69A] hover:bg-[#23C69A]/90 text-[#1B1B1B]"         >
             <Link href="/login">
               <span className="relative z-10">Get Started</span>
             <span className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
               <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
             </Link>
            </Button> */}
      </div>
    </div>
  );
};

export default GetStartedButton;
