
import { Search, ShieldCheck, AlertCircle } from "lucide-react";

export default function VerifyPage() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">

            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center mb-8">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 mb-4">
                    <ShieldCheck className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900">Verify a Certificate</h2>
                <p className="mt-2 text-slate-600">
                    Enter the certificate ID found on the student's completion card to verify validity.
                </p>
            </div>

            <div className="sm:mx-auto sm:w-full sm:max-w-[480px]">
                <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="cert_id" className="block text-sm font-medium text-slate-700 mb-1">
                                Certificate ID
                            </label>
                            <div className="relative rounded-md shadow-sm">
                                <input
                                    type="text"
                                    name="cert_id"
                                    id="cert_id"
                                    className="block w-full px-4 py-3 border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm border placeholder-slate-400"
                                    placeholder="e.g. LSC-8829-2024"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="lastname" className="block text-sm font-medium text-slate-700 mb-1">
                                Student's Last Name
                            </label>
                            <input
                                type="text"
                                name="lastname"
                                id="lastname"
                                className="block w-full px-4 py-3 border-slate-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 sm:text-sm border placeholder-slate-400"
                                placeholder="Doe"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                            >
                                Verify Status
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="rounded-md bg-blue-50 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <AlertCircle className="h-5 w-5 text-blue-400" aria-hidden="true" />
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-blue-800">Employer Note</h3>
                                    <div className="mt-2 text-sm text-blue-700">
                                        <p>
                                            Digital certificates are valid immediately upon exam completion. Printed cards may take 5-7 days to arrive.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
