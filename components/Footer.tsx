
import Link from "next/link";
import { Heart, Facebook, Twitter, Instagram, Phone, Mail, Clock } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                                <Heart className="w-5 h-5 fill-current" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-900">LifeSaver<span className="text-blue-600">Cert</span></span>
                        </div>
                        <p className="text-slate-500 leading-relaxed mb-6">
                            Providing high-quality, accessible life-saving training for everyone. Accredited and trusted nationwide.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="p-2 bg-white rounded-full text-slate-400 hover:text-blue-600 shadow-sm border border-slate-100 transition-colors">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full text-slate-400 hover:text-blue-400 shadow-sm border border-slate-100 transition-colors">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="p-2 bg-white rounded-full text-slate-400 hover:text-pink-600 shadow-sm border border-slate-100 transition-colors">
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 mb-6">Courses</h3>
                        <ul className="space-y-4 text-slate-600">
                            <li><Link href="/courses" className="hover:text-blue-600 transition-colors">CPR & AED</Link></li>
                            <li><Link href="/courses" className="hover:text-blue-600 transition-colors">First Aid</Link></li>
                            <li><Link href="/courses" className="hover:text-blue-600 transition-colors">BLS for Providers</Link></li>
                            <li><Link href="/courses" className="hover:text-blue-600 transition-colors">Bloodborne Pathogens</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 mb-6">Support</h3>
                        <ul className="space-y-4 text-slate-600">
                            <li><Link href="#" className="hover:text-blue-600 transition-colors">Help Center</Link></li>
                            <li><Link href="/verify" className="hover:text-blue-600 transition-colors">Verify Certificate</Link></li>
                            <li><Link href="/groups" className="hover:text-blue-600 transition-colors">Group Training</Link></li>
                            <li><Link href="#" className="hover:text-blue-600 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-slate-900 mb-6">Contact</h3>
                        <ul className="space-y-4 text-slate-600">
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-blue-600 shrink-0" />
                                <span>1-800-555-0123</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-blue-600 shrink-0" />
                                <span>support@lifesaver.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Clock className="w-5 h-5 text-blue-600 shrink-0" />
                                <span>Mon-Fri: 9am - 6pm EST</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                    <p>© 2024 LifeSaverCert. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-slate-900">Privacy Policy</Link>
                        <Link href="#" className="hover:text-slate-900">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
