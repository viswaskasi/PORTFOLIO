import { motion } from 'framer-motion';
import { Award, CheckCircle2 } from 'lucide-react';

const certs = [
    {
        title: "Machine Learning with Python",
        issuer: "IBM / Coursera",
        date: "Mar 2026",
        description: "IBM-authorized course covering supervised/unsupervised learning, model evaluation, and ML algorithms using Python. Includes hands-on labs with Scikit-learn.",
        color: "text-blue-400"
    },
    {
        title: "C Essentials 1 & 2",
        issuer: "Cisco Networking Academy",
        date: "2025",
        description: "Covered fundamentals and intermediate concepts of C programming including data types, control flow, functions, pointers, and memory management.",
        color: "text-purple-400"
    },
    {
        title: "Python Essentials",
        issuer: "Cisco Networking Academy",
        date: "2025",
        description: "Comprehensive Python programming course covering core syntax, data structures, OOP, and scripting for real-world applications.",
        color: "text-green-400"
    },
    {
        title: "AIML Research Paper",
        issuer: "ULearn Publication",
        date: "2025",
        description: "Authored and published an academic research paper in Artificial Intelligence & Machine Learning, demonstrating research methodology and technical writing skills.",
        color: "text-yellow-400"
    }
];

export default function Certifications() {
    return (
        <section id="certifications" className="py-24 relative bg-black/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                        My <span className="text-gradient">Certifications</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {certs.map((cert, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            className="glass-card p-6 rounded-2xl relative group overflow-hidden hover:-translate-y-2 transition-transform duration-300"
                        >
                            {/* Animated glow background on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${cert.color}`}>
                                        <Award size={24} />
                                    </div>
                                    <span className="text-xs text-gray-500 font-medium px-2 py-1 bg-black/40 rounded-full border border-white/5">
                                        {cert.date}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold font-display text-white mb-1 group-hover:text-primary transition-colors">
                                    {cert.title}
                                </h3>

                                <p className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
                                    <CheckCircle2 size={14} className={cert.color} />
                                    {cert.issuer}
                                </p>

                                <p className="text-sm text-gray-500 flex-grow leading-relaxed">
                                    {cert.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
