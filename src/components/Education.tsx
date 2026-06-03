import { motion } from 'framer-motion';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const education = [
    {
        degree: 'Bachelor of Computer Applications (BCA)',
        field: 'Computer Science & Software Development',
        institution: 'Aditya Degree College, Visakhapatnam',
        period: 'July 2024 – April 2027',
        location: 'Visakhapatnam, India',
        status: 'Pursuing',
        color: 'from-primary to-accent',
        iconColor: 'text-primary',
        highlights: [
            'Specializing in Modern Web Technologies (MERN Stack) and AI-integrated applications',
            'Currently building scalable, full-stack projects using React, Node.js, and MongoDB',
            'Strong academic focus on Data Structures, Algorithms, and System Architecture',
            'Actively preparing for MCA entrance examinations to further advance technical expertise'
        ]
    }
];

export default function Education() {
    return (
        <section id="education" className="py-32 relative bg-[#050505]">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ type: "spring", stiffness: 80, damping: 20 }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 tracking-tight text-white">
                        Education.
                    </h2>
                    <div className="w-16 h-1 bg-white rounded-full"></div>
                    <p className="mt-6 text-gray-500 max-w-2xl font-light">
                        A strong academic foundation built on science, mathematics, and computer science.
                    </p>
                </motion.div>

                <div className="relative max-w-4xl mx-auto">
                    {education.map((edu, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-60px" }}
                            transition={{ type: "spring", stiffness: 80, damping: 20 }}
                        >
                            <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-8 md:p-12 rounded-3xl transition-colors duration-500 hover:border-[#333] group relative overflow-hidden">
                                <div className="relative z-10">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8">
                                        <div className="flex items-center gap-5">
                                            <div className="p-4 rounded-2xl bg-[#111] border border-[#222] text-white">
                                                <GraduationCap size={32} />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-2 tracking-tight">
                                                    {edu.degree}
                                                </h3>
                                                <p className="text-lg text-gray-400 font-medium">{edu.field}</p>
                                            </div>
                                        </div>
                                        <span className={`inline-flex items-center text-sm font-medium px-4 py-2 rounded-full border shrink-0 ${
                                            edu.status === 'Pursuing'
                                                ? 'bg-white text-black border-white'
                                                : 'bg-transparent border-[#333] text-gray-400'
                                        }`}>
                                            {edu.status === 'Pursuing' && <span className="w-2 h-2 rounded-full bg-black mr-2"></span>}
                                            {edu.status}
                                        </span>
                                    </div>

                                    <div className="flex flex-col md:flex-row gap-6 mb-8 pb-8 border-b border-[#222]">
                                        <div className="flex-1">
                                            <p className="font-semibold text-xl text-white mb-2">
                                                {edu.institution}
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-3 text-sm text-gray-500 shrink-0 font-light">
                                            <span className="flex items-center gap-2">
                                                <Calendar size={16} className="text-gray-400" />
                                                {edu.period}
                                            </span>
                                            <span className="flex items-center gap-2">
                                                <MapPin size={16} className="text-gray-400" />
                                                {edu.location}
                                            </span>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-white font-medium mb-4 tracking-tight">
                                            Academic Focus & Goals
                                        </h4>
                                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {edu.highlights.map((h, i) => (
                                                <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#111] border border-[#222] transition-colors">
                                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-white shrink-0"></span>
                                                    <span className="text-sm text-gray-400 leading-relaxed font-light">{h}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
