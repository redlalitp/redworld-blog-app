import { Nav } from "../components/nav";
import { motion } from "framer-motion";

export default function About() {
    return (
        <div className="bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 overflow-y-auto">
            <Nav />

            <main className="container mx-auto px-6 py-12 space-y-12 overflow-y-auto">
                {/* Biography Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="rounded-2xl bg-gray-900/60 backdrop-blur-lg p-8 shadow-lg border border-gray-800"
                >
                    <h2 className="text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                        About Me
                    </h2>
                    <p className="text-gray-300 leading-relaxed text-lg">
                        Passionate software developer with expertise in modern web
                        technologies and a solid foundation in computer science.
                        Dedicated to building scalable, user-centric, and visually elegant
                        applications that merge performance with design.
                    </p>
                </motion.section>

                {/* Education Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="rounded-2xl bg-gray-900/60 backdrop-blur-lg p-8 shadow-lg border border-gray-800"
                >
                    <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
                        Education
                    </h2>
                    <div className="space-y-6">
                        <div className="relative pl-6">
                            <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-green-500"></div>
                            <h3 className="font-semibold text-xl">Master of Computer Science</h3>
                            <p className="text-gray-400">University Name • 2020 – 2022</p>
                        </div>
                        <div className="relative pl-6">
                            <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-green-500"></div>
                            <h3 className="font-semibold text-xl">Bachelor of Computer Science</h3>
                            <p className="text-gray-400">University Name • 2016 – 2020</p>
                        </div>
                    </div>
                </motion.section>

                {/* Skills Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="rounded-2xl bg-gray-900/60 backdrop-blur-lg p-8 shadow-lg border border-gray-800"
                >
                    <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500">
                        Skills
                    </h2>
                    <div className="space-y-6">
                        {[
                            { skill: "React", percent: 90 },
                            { skill: "TypeScript", percent: 85 },
                            { skill: "Node.js", percent: 80 },
                        ].map(({ skill, percent }) => (
                            <div key={skill}>
                                <div className="flex justify-between mb-1">
                                    <span className="font-medium">{skill}</span>
                                    <span className="text-gray-400">{percent}%</span>
                                </div>
                                <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${percent}%` }}
                                        transition={{ duration: 1 }}
                                        className="h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.section>

                {/* Projects Section */}
                <motion.section
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="rounded-2xl bg-gray-900/60 backdrop-blur-lg p-8 shadow-lg border border-gray-800"
                >
                    <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                        Projects
                    </h2>
                    <div className="space-y-8">
                        <div className="border-l-4 border-yellow-500 pl-6">
                            <h3 className="text-2xl font-semibold mb-2">Project Name</h3>
                            <p className="text-gray-300 mb-2 leading-relaxed">
                                A detailed description of the project, its objectives, and
                                achievements. Emphasis on solving real-world problems with clean
                                and efficient solutions.
                            </p>
                            <p className="text-gray-400 text-sm mb-3">Jan 2023 – Present</p>
                            <div className="flex flex-wrap gap-2">
                                {["React", "TypeScript", "Node.js"].map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 text-sm rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                    >
                                    {tag}
                                  </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.section>
            </main>
        </div>
    );
}
