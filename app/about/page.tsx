
import Image from "next/image";
import { Award, Users, Globe, Heart } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white">

            {/* Hero */}
            <section className="relative py-20 bg-slate-50 border-b border-slate-200">
                <div className="container mx-auto px-4 text-center max-w-3xl">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">Empowering Everyone to Save a Life</h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Founded by medical professionals, LifeSaverCert provides high-quality, accessible resuscitation training to thousands of students annually.
                    </p>
                </div>
            </section>

            {/* Stats */}
            <section className="py-12 border-b border-slate-100">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-slate-100">
                        <div>
                            <p className="text-4xl font-bold text-blue-600 mb-1">50k+</p>
                            <p className="text-slate-500 font-medium">Students Certified</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-blue-600 mb-1">99%</p>
                            <p className="text-slate-500 font-medium">Exam Pass Rate</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-blue-600 mb-1">50</p>
                            <p className="text-slate-500 font-medium">States Accepted</p>
                        </div>
                        <div>
                            <p className="text-4xl font-bold text-blue-600 mb-1">24/7</p>
                            <p className="text-slate-500 font-medium">Support Available</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Story & Team */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">

                        <div className="order-2 lg:order-1 space-y-8">
                            <div>
                                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-500 mb-6">
                                    <Heart className="w-6 h-6 fill-current" />
                                </div>
                                <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Mission</h2>
                                <p className="text-lg text-slate-600 leading-relaxed">
                                    We believe that high-quality CPR training should be accessible, affordable, and stress-free.
                                    By leveraging modern technology and expert medical guidelines, we've removed the barriers to certification
                                    helping creates safer workplaces and communities.
                                </p>
                            </div>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="bg-slate-50 p-6 rounded-xl">
                                    <Award className="w-8 h-8 text-slate-900 mb-4" />
                                    <h3 className="font-bold text-slate-900 mb-2">Accredited Training</h3>
                                    <p className="text-sm text-slate-500">Our curriculum follows the latest AHA & ECC guidelines.</p>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-xl">
                                    <Globe className="w-8 h-8 text-slate-900 mb-4" />
                                    <h3 className="font-bold text-slate-900 mb-2">Nationwide</h3>
                                    <p className="text-sm text-slate-500">Accepted by employers across the US, Canada, and UK.</p>
                                </div>
                            </div>
                        </div>

                        <div className="order-1 lg:order-2">
                            <div className="relative">
                                <div className="absolute -inset-4 bg-slate-100 rounded-2xl transform rotate-3"></div>
                                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                                    <Image src="/instructor-team.png" alt="Medical Instructors" width={600} height={500} className="w-full object-cover" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* Instructor CTA */}
            <section className="bg-slate-900 text-white py-20 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold mb-6">Are you a Medical Professional?</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-10">Join our network of instructors and help us create content that saves lives.</p>
                    <button className="border-2 border-white text-white hover:bg-white hover:text-slate-900 font-bold px-8 py-3 rounded-full transition-all">
                        Become an Instructor
                    </button>
                </div>
            </section>

        </div>
    );
}
