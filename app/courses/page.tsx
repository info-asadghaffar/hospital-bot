
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, SlidersHorizontal, ArrowRight, Clock, Award } from "lucide-react";

export default function CoursesPage() {
    const courses = [
        {
            id: 1,
            title: "CPR & AED Certification",
            category: "CPR",
            price: 19.95,
            hours: "2.5 CEU",
            description: "Covers adult, child, and infant CPR, plus AED use and choking relief. Perfect for teachers, trainers, and safety officers.",
            features: ["2-Year Certification", "Instant Digital Card", "OSHA Compliant"],
            image: "/course-cpr.png",
            popular: true
        },
        {
            id: 2,
            title: "First Aid Certification",
            category: "First Aid",
            price: 19.95,
            hours: "2.0 CEU",
            description: "Learn to recognize and care for a variety of first aid emergencies like burns, cuts, sudden illness, and head injuries.",
            features: ["2-Year Certification", "Nationally Accepted", "Video Modules"],
            image: "/course-aed.png", // Reusing First Aid image
            popular: false
        },
        {
            id: 3,
            title: "Basic Life Support (BLS)",
            category: "Healthcare",
            price: 34.95,
            hours: "4.0 CEU",
            description: "Advanced life support training for healthcare professionals (nurses, EMTs, doctors). Includes team dynamics and advanced airway management.",
            features: ["AHA Guidelines", "Same Day Certification", "For Healthcare Pros"],
            image: "/hero-cpr.png", // Reusing for now
            popular: false
        },
        {
            id: 4,
            title: "CPR + First Aid Combo",
            category: "Combo",
            price: 34.95,
            hours: "4.5 CEU",
            description: "Save big by combining our two most popular courses. The complete package for workplace safety compliance.",
            features: ["Best Value", "Two Certificates", "Full Compliance"],
            image: "/combo-course.png",
            popular: true
        },
        {
            id: 5,
            title: "Bloodborne Pathogens",
            category: "OSHA",
            price: 14.95,
            hours: "1.0 CEU",
            description: "Learn how to protect yourself and others from exposure to bloodborne pathogens. Required for many workplace safety regulations.",
            features: ["OSHA Standard 1910.1030", "1-Year Certification", "Fast Course"],
            image: "/course-aed.png",
            popular: false
        }
    ];

    return (
        <div className="bg-slate-50 min-h-screen py-12">
            <div className="container mx-auto px-4">

                <div className="mb-12 text-center max-w-2xl mx-auto">
                    <h1 className="text-4xl font-bold text-slate-900 mb-4">Course Catalog</h1>
                    <p className="text-lg text-slate-600">Explore our accredited certification courses. Start for free and pay only when you pass.</p>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar / Filters (Mock functionality for UI) */}
                    <div className="lg:col-span-1 hidden lg:block">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
                            <div className="flex items-center gap-2 mb-6 text-slate-900 font-bold">
                                <SlidersHorizontal className="w-5 h-5" />
                                <span>Filters</span>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="font-semibold text-sm text-slate-900 mb-3">Categories</h4>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-3 text-slate-600 hover:text-blue-600 cursor-pointer">
                                            <div className="w-4 h-4 rounded border border-slate-300 bg-blue-600"></div>
                                            All Courses
                                        </label>
                                        <label className="flex items-center gap-3 text-slate-600 hover:text-blue-600 cursor-pointer">
                                            <div className="w-4 h-4 rounded border border-slate-300"></div>
                                            CPR & AED
                                        </label>
                                        <label className="flex items-center gap-3 text-slate-600 hover:text-blue-600 cursor-pointer">
                                            <div className="w-4 h-4 rounded border border-slate-300"></div>
                                            First Aid
                                        </label>
                                        <label className="flex items-center gap-3 text-slate-600 hover:text-blue-600 cursor-pointer">
                                            <div className="w-4 h-4 rounded border border-slate-300"></div>
                                            Healthcare (BLS)
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-sm text-slate-900 mb-3">Price Range</h4>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-3 text-slate-600 hover:text-blue-600 cursor-pointer">
                                            <div className="w-4 h-4 rounded-full border border-slate-300 bg-blue-600"></div>
                                            Any Price
                                        </label>
                                        <label className="flex items-center gap-3 text-slate-600 hover:text-blue-600 cursor-pointer">
                                            <div className="w-4 h-4 rounded-full border border-slate-300"></div>
                                            Under $20
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Course Grid */}
                    <div className="lg:col-span-3 space-y-6">
                        {courses.map((course) => (
                            <div key={course.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col md:flex-row">
                                <div className="md:w-64 relative min-h-[200px] md:min-h-full">
                                    <Image
                                        src={course.image}
                                        alt={course.title}
                                        fill
                                        className="object-cover"
                                    />
                                    {course.popular && (
                                        <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                            POPULAR
                                        </div>
                                    )}
                                </div>

                                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                                        <div>
                                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 
                        ${course.category === 'Combo' ? 'bg-purple-100 text-purple-700' : 'bg-blue-50 text-blue-700'}`}>
                                                {course.category}
                                            </span>
                                            <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                {course.title}
                                            </h3>
                                            <p className="text-slate-600 line-clamp-2">{course.description}</p>
                                        </div>
                                        <div className="text-right shrink-0">
                                            <span className="block text-2xl font-bold text-slate-900">${course.price}</span>
                                            <span className="text-xs text-slate-500 font-medium">One-time payment</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 mb-6">
                                        <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {course.hours}</span>
                                        <span className="flex items-center gap-1.5"><Award className="w-4 h-4" /> 2-Year Validity</span>
                                        <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-green-500" /> Free Retakes</span>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                        <button className="flex-1 bg-slate-900 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 group-hover:translate-x-1">
                                            Select Course <ArrowRight className="w-4 h-4" />
                                        </button>
                                        <button className="px-6 py-3 rounded-lg font-bold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors">
                                            Course Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
