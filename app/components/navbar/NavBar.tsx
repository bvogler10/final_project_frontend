import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
    return (
        <nav className="w-full fixed top-0 left-0 py-6 border-b bg-white z-10">
            <div className="max-w-[1500px] mx-auto px-6">
                <div className="flex justify-between items-center">
                    <Link href="/">
                        <Image 
                            src="/yarn_ball.jpeg"
                            alt="Logo"
                            width={38}
                            height={38}
                        />
                    </Link>

                    <div className="flex space-x-6">
                        Posts
                    </div>
                    <div className="flex items-center spaxe-x-6">
                        Profile
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default NavBar;