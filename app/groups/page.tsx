
import Image from "next/image";
import Link from "next/link";
import { Users, Check, Building, Mail } from "lucide-react";

export default function GroupsPage() {
    return (
        <div className="min-h-screen bg-slate-50">

            {/* Hero */}
            <section className="bg-slate-900 text-white py-20 lg:py-32 relative overflow-hidden">
                <div className="absolute inset-0 z-0 opacity-20">
                    <Image src="/group-training.png" alt="Group Training Background" fill className="object-cover" />
                </div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-4xl lg:text-6xl font-extrabold mb-6 tracking-tight">Train Your Entire Team</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
                        Simplify compliance with our flexible group certification solutions.
                        On-site or online training for businesses of all sizes.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-blue-500/25">
                            Request Group Quote
                        </button>
                        <button className="bg-white/10 hover:bg-white/20 backdrop-blur text-white border border-white/20 px-8 py-4 rounded-full font-bold text-lg transition-all">
                            View Corporate Plans
                        </button>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl rotate-1 hover:rotate-0 transition-transform duration-500">
                            <Image src="/group-training.png" alt="Corporate Training Session" width={600} height={500} className="w-full object-cover" />
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Partner With Us?</h2>
                                <p className="text-lg text-slate-600">Managing certifications for a large team can be a headache. We make it effortless with our dedicated group portal.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="bg-blue-100 p-3 rounded-xl text-blue-600 h-fit">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">Volume Discounts</h3>
                                        <p className="text-slate-600">Save up to 40% when you purchase 5+ course credits. Credits never expire.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="bg-green-100 p-3 rounded-xl text-green-600 h-fit">
                                        <Building className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">Admin Dashboard</h3>
                                        <p className="text-slate-600">Track progress, assign courses, and download certificates for your entire staff from one dashboard.</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="bg-purple-100 p-3 rounded-xl text-purple-600 h-fit">
                                        <Check className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-900">100% Compliance</h3>
                                        <p className="text-slate-600">Our courses meet OSHA requirements for workplace safety training.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Form */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-2xl mx-auto bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-12 shadow-sm">
                        <div className="text-center mb-10">
                            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-blue-500/30">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold text-slate-900">Get a Custom Quote</h2>
                            <p className="text-slate-600 mt-2">Tell us about your team and we'll send pricing within 24 hours.</p>
                        </div>

                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white" placeholder="e.g. Acme Health" />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Contact Person</label>
                                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white" placeholder="John Doe" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                                <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white" placeholder="john@company.com" />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Number of Students</label>
                                <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
                                    <option>5 - 20</option>
                                    <option>21 - 50</option>
                                    <option>51 - 100</option>
                                    <option>100+</option>
                                </select>
                            </div>

                            <button type="button" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-colors text-lg">
                                Request Quote
                            </button>
                        </form>
                    </div>
                </div>
            </section>

        </div>
    );
}
