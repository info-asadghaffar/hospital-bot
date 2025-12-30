
import Link from "next/link";
import { Heart, Menu } from "lucide-react";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
            <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                        <Heart className="w-6 h-6 fill-current" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">LifeSaver<span className="text-blue-600">Cert</span></span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="/" className="font-medium text-slate-600 hover:text-blue-600 transition-colors">Home</Link>
                    <Link href="/courses" className="font-medium text-slate-600 hover:text-blue-600 transition-colors">Courses</Link>
                    <Link href="/groups" className="font-medium text-slate-600 hover:text-blue-600 transition-colors">For Groups</Link>
                    <Link href="/verify" className="font-medium text-slate-600 hover:text-blue-600 transition-colors">Verify Cert</Link>
                    <Link href="/about" className="font-medium text-slate-600 hover:text-blue-600 transition-colors">About</Link>
                </div>

                <div className="hidden md:flex items-center gap-4">
                    <Link href="#" className="font-semibold text-slate-600 hover:text-blue-600">Log In</Link>
                    <Link href="/courses" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-full font-semibold transition-all shadow-md hover:shadow-lg">
                        Get Certified
                    </Link>
                </div>

                <button className="md:hidden p-2 text-slate-600">
                    <Menu className="w-6 h-6" />
                </button>
            </div>
        </nav>
    );
}
