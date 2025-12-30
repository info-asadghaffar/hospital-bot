
import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle,
  ShieldCheck,
  Clock,
  Award,
  Star
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 lg:pt-32 lg:pb-40 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="flex flex-col items-start space-y-8 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100 font-medium text-sm">
                <Star className="w-4 h-4 fill-current" />
                <span>#1 Rated Online CPR Certification</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
                Save a Life Today. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Get Certified.</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                Nationally accredited CPR, AED, and First Aid training.
                Instant certification, 100% money-back guarantee, and accepted by employers nationwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="/courses" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                  Start Certification
                </Link>
                <Link href="#how-it-works" className="inline-flex items-center justify-center bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-sm hover:shadow-md">
                  How it Works
                </Link>
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-500 font-medium pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center overflow-hidden">
                      {/* Placeholder for avatars, just colored circles for now */}
                      <div className={`w-full h-full bg-slate-${300 + i * 100}`}></div>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-500">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span>Trusted by 50,000+ Students</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-20 blur-2xl transform rotate-2"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
                <Image
                  src="/hero-cpr.png"
                  alt="CPR Training Simulation"
                  width={800}
                  height={600}
                  className="object-cover w-full h-full transform transition-transform duration-700 hover:scale-105"
                />

                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur shadow-lg rounded-xl p-4 flex items-center gap-4 max-w-xs border border-slate-100">
                  <div className="bg-green-100 p-2 rounded-full text-green-600">
                    <ShieldCheck className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">OSHA Compliant</p>
                    <p className="text-xs text-slate-500">Meets national guidelines</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-10 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-8">Accredited & Recognized By</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Text placeholders for logos as we can't generate trademarked logos perfectly */}
            <span className="text-xl font-bold font-serif text-slate-800 flex items-center gap-2"><Award className="w-6 h-6" /> National Safety Council</span>
            <span className="text-xl font-bold font-serif text-slate-800 flex items-center gap-2"><Award className="w-6 h-6" /> OSHA</span>
            <span className="text-xl font-bold font-serif text-slate-800 flex items-center gap-2"><Award className="w-6 h-6" /> International CPR Board</span>
            <span className="text-xl font-bold font-serif text-slate-800 flex items-center gap-2"><Award className="w-6 h-6" /> AHA Guidelines</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Choose LifeSaverCert?</h2>
            <p className="text-lg text-slate-600">We make certification simple, affordable, and stress-free.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Instant Certification</h3>
              <p className="text-slate-600">Pass the final exam and print your temporary certification card immediately. Your official card is mailed the next day.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">98% Acceptance Rate</h3>
              <p className="text-slate-600">Our courses follow AHA & ECC/ILCOR guidelines and are accepted by employers nationwide.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Money-Back Guarantee</h3>
              <p className="text-slate-600">If your employer doesn't accept our certification, we'll give you a full refund. No questions asked.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Popular Courses</h2>
              <p className="text-lg text-slate-600 max-w-2xl">Choose the certification that meets your requirements. All courses include free unlimited retakes.</p>
            </div>
            <Link href="/courses" className="hidden md:flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700">
              View All Courses <span className="text-xl">→</span>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Course Card 1 */}
            <div className="group rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 bg-white flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <Image src="/course-cpr.png" alt="CPR Course" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold shadow-md text-slate-900">
                  Best Seller
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-4">
                  <span className="text-blue-600 font-semibold text-sm tracking-wide uppercase">Most Popular</span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-2 group-hover:text-blue-600 transition-colors">CPR / AED Certification</h3>
                  <p className="text-slate-500 text-sm">Adult, Child, and Infant CPR protocols + AED usage.</p>
                </div>
                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-slate-900">$19.95</span>
                    <span className="text-slate-400 line-through text-sm ml-2">$49.95</span>
                  </div>
                  <button className="bg-slate-900 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors">
                    Enroll
                  </button>
                </div>
              </div>
            </div>

            {/* Course Card 2 */}
            <div className="group rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 bg-white flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <Image src="/course-aed.png" alt="First Aid Course" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-4">
                  <span className="text-purple-600 font-semibold text-sm tracking-wide uppercase">Standard</span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-2 group-hover:text-blue-600 transition-colors">First Aid Certification</h3>
                  <p className="text-slate-500 text-sm">Covers common injuries, burns, choking, and emergency response.</p>
                </div>
                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-slate-900">$19.95</span>
                  </div>
                  <button className="bg-slate-900 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors">
                    Enroll
                  </button>
                </div>
              </div>
            </div>

            {/* Course Card 3 */}
            <div className="group rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 bg-white flex flex-col">
              <div className="relative h-64 overflow-hidden">
                <Image src="/hero-cpr.png" alt="BLS Course" fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-4">
                  <span className="text-red-500 font-semibold text-sm tracking-wide uppercase">Healthcare Pros</span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1 mb-2 group-hover:text-blue-600 transition-colors">Basic Life Support (BLS)</h3>
                  <p className="text-slate-500 text-sm">For healthcare providers. Includes advanced CPR techniques.</p>
                </div>
                <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-slate-900">$34.95</span>
                  </div>
                  <button className="bg-slate-900 hover:bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors">
                    Enroll
                  </button>
                </div>
              </div>
            </div>

          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/courses" className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700">
              View All Courses <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Students Say</h2>
            <div className="flex justify-center gap-1 text-yellow-500 mb-2">
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
              <Star className="w-5 h-5 fill-current" />
            </div>
            <p className="text-slate-400">4.9/5 Average Rating</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center font-bold text-xl">S</div>
                <div>
                  <h4 className="font-bold">Sarah Jenkins</h4>
                  <p className="text-sm text-slate-400">Registered Nurse</p>
                </div>
              </div>
              <p className="text-slate-300 italic">"The BLS course was fantastic. The videos were clear, and I could learn at my own pace. Got my certificate immediately after the exam!"</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center font-bold text-xl">M</div>
                <div>
                  <h4 className="font-bold">Mike T.</h4>
                  <p className="text-sm text-slate-400">Personal Trainer</p>
                </div>
              </div>
              <p className="text-slate-300 italic">"Needed CPR certification for my job. This was exactly what I needed. Quick, professional, and affordable."</p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center font-bold text-xl">A</div>
                <div>
                  <h4 className="font-bold">Amanda Lee</h4>
                  <p className="text-sm text-slate-400">Teacher</p>
                </div>
              </div>
              <p className="text-slate-300 italic">"The automated reminders for renewal are a lifesaver. I'll definitely be using LifeSaverCert again in two years."</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Ready to Get Certified?</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-10">Join thousands of others who are prepared to save a life. Start your free course preview today.</p>
          <button className="bg-white text-blue-600 hover:bg-slate-100 px-10 py-5 rounded-full font-bold text-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">
            Get Started Now
          </button>
          <p className="mt-6 text-sm text-blue-200">No credit card required for preview</p>
        </div>
      </section>

    </div>
  );
}
