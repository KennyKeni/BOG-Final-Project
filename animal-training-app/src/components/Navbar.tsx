import Link from 'next/link'
import Image from 'next/image'
import { Oswald } from 'next/font/google'

const oswald = Oswald({ 
  subsets: ['latin'],
  weight: ['500']  
})

export default function Navbar() {
  return (
    <nav className="w-full bg-white h-[102px] px-4 flex drop-shadow-lg">
      <div className="w-full h-full flex items-center">
        <div className="h-14 bg-primary rounded-2xl w-24 flex items-center justify-center px-2">
          <Image 
            src="/logo.svg"
            alt="Logo"
            width={40}
            height={40}
            className="cursor-pointer"
          />
        </div>
        <div className="h-20 ml-4">
          <span className={`${oswald.className} text-[45px] font-medium leading-[74.1px] tracking-[-0.025em] text-left`}>
            Progress
          </span>
        </div>
      </div>
    </nav>
  );
}