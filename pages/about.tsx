import { Nav } from "../components/nav";
import { motion } from "framer-motion";
import {FaLinkedin} from "react-icons/fa";
import {HiDownload} from "react-icons/hi";
import { FcPhoneAndroid } from "react-icons/fc";
import { MdEmail } from "react-icons/md";
import html2pdf from 'html2pdf.js';

export default function About() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100">
            <Nav />

            <main className="container mx-auto px-6 py-12">
                {/* Header / Identity */}
                <motion.section
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl bg-gray-900/60 backdrop-blur-lg p-8 shadow-lg border border-gray-800 mb-10"
                >
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div className="flex flex-gap-4 items-center">
                            <div>
                                <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                    Lalit Patil
                                </h1>
                                <p className="mt-1 text-lg text-gray-300">Full Stack Developer</p>
                            </div>
                            <div className="mt-4 flex space-x-4 ml-4">
                                <a
                                    href="https://www.linkedin.com/in/lalitpatil"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
                                >
                                    <FaLinkedin className="w-6 h-6"/>
                                </a>
                                <button
                                    onClick={() => {
                                        const element = document.body;
                                        html2pdf().from(element).save('lalit-patil-resume.pdf');
                                    }}
                                    className="inline-flex items-center justify-center p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                                >
                                    <HiDownload className="w-6 h-6"/>
                                </button>
                            </div>
                        </div>
                        <div className="text-gray-300">
                            <p className="font-medium flex items-center gap-x-2"><FcPhoneAndroid /> +91 7378470979</p>
                            <p className="truncate flex items-center gap-x-2"><MdEmail /> lalitpatil@outlook.com</p>
                        </div>
                    </div>
                </motion.section>

                {/* Two-column layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column */}
                    <div className="space-y-8">
                        {/* Summary */}
                        <motion.section
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="rounded-2xl bg-gray-900/60 backdrop-blur-lg p-8 shadow-lg border border-gray-800"
                        >
                            <h2 className="text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                Summary
                            </h2>
                            <p className="text-gray-300 leading-relaxed">
                                Software Developer working on full stack with 11 years of experience in developing and maintaining highly scalable large distributed systems. Experienced in software design, implementation and integration, working with team stretched across globe.
                            </p>
                        </motion.section>

                        {/* Skills with existing look-and-feel for bars */}
                        <motion.section
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.05 }}
                            className="rounded-2xl bg-gray-900/60 backdrop-blur-lg p-8 shadow-lg border border-gray-800"
                        >
                            <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500">
                                Skills
                            </h2>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    {[
                                        { skill: "Java", percent: 90 },
                                        { skill: "Spring MVC / Spring Boot", percent: 88 },
                                        { skill: "Node.js", percent: 80 },
                                        { skill: "JavaScript", percent: 85 },
                                        { skill: "Ember.js / jQuery / JSP/JSTL", percent: 70 },
                                    ].map(({ skill, percent }) => (
                                        <div key={skill}>
                                            <div className="flex justify-between mb-1">
                                                <span className="font-medium">{skill}</span>
                                                <span className="text-gray-400">{percent}%</span>
                                            </div>
                                            <div className="w-full bg-gray-800 rounded-full h-3">
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

                                <div className="space-y-4">
                                    {[
                                        { skill: "MySQL / MariaDB", percent: 82 },
                                        { skill: "NoSQL (MongoDB)", percent: 78 },
                                        { skill: "CI/CD", percent: 75 },
                                        { skill: "Jenkins", percent: 72 },
                                        { skill: "Git", percent: 85 },
                                    ].map(({ skill, percent }) => (
                                        <div key={skill}>
                                            <div className="flex justify-between mb-1">
                                                <span className="font-medium">{skill}</span>
                                                <span className="text-gray-400">{percent}%</span>
                                            </div>
                                            <div className="w-full bg-gray-800 rounded-full h-3">
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
                            </div>
                        </motion.section>

                        {/* Education */}
                        <motion.section
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="rounded-2xl bg-gray-900/60 backdrop-blur-lg p-8 shadow-lg border border-gray-800"
                        >
                            <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-500">
                                Education
                            </h2>
                            <div className="space-y-6">
                                <div className="relative pl-6">
                                    <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-green-500"></div>
                                    <h3 className="font-semibold text-xl">
                                        Illinois Institute of Technology
                                    </h3>
                                    <p className="text-gray-400">
                                        Chicago • 2015 – 2016
                                    </p>
                                    <p className="text-gray-300">
                                        Master of Science, Computer Science
                                    </p>
                                </div>
                                <div className="relative pl-6">
                                    <div className="absolute left-0 top-2 h-4 w-4 rounded-full bg-green-500"></div>
                                    <h3 className="font-semibold text-xl">Pune University</h3>
                                    <p className="text-gray-400">Pune • 2008 – 2011</p>
                                    <p className="text-gray-300">
                                        Bachelor of Engineering, Computer Engineering
                                    </p>
                                </div>
                            </div>
                        </motion.section>
                    </div>

                    {/* Right Column */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Work Experience */}
                        <motion.section
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="rounded-2xl bg-gray-900/60 backdrop-blur-lg p-8 shadow-lg border border-gray-800"
                        >
                            <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
                                Work Experience
                            </h2>

                            {/* Senior Software Engineer */}
                            <div className="border-l-4 border-yellow-500 pl-6 mb-8">
                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                    <h3 className="text-2xl font-semibold">Senior Software Engineer</h3>
                                    <p className="text-gray-400 text-sm">Feb 2021 – Current • Remote (Pune)</p>
                                </div>
                                <p className="text-gray-300">IBM</p>
                            </div>

                            {/* Software Engineer (IBM) */}
                            <div className="border-l-4 border-yellow-500 pl-6 mb-8">
                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                    <h3 className="text-2xl font-semibold">Software Engineer</h3>
                                    <p className="text-gray-400 text-sm">Mar 2017 – Jan 2021 • Chicago</p>
                                </div>
                                <p className="text-gray-300 mb-3">IBM</p>

                                <p className="text-gray-300 mb-3 leading-relaxed">
                                    Software Developer, IBM Cloud unit, Working on for IBM Cloud Object Storage (ICOS) for IBM Cloud and on-prem business. Participation in all stages of software development cycle from requirement gathering, planning, development to integration deployment and maintenance.
                                </p>
                                <p className="text-gray-300 mb-3 leading-relaxed">
                                    Built numerous new features and maintained work items over 8+ years.
                                </p>
                                {/* Skills with category tags */}
                                <motion.section
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.05 }}
                                    className="rounded-2xl bg-gray-900/60 backdrop-blur-lg p-8 shadow-lg border border-gray-800"
                                >
                                    {[
                                        {
                                            label: "Backend",
                                            color: { bg: "bg-blue-500/20", text: "text-blue-400", border: "border-blue-500/30" },
                                            items: ["Java", "Spring MVC", "Spring Security", "Hibernate", "Node.js"],
                                        },
                                        {
                                            label: "Frontend",
                                            color: { bg: "bg-purple-500/20", text: "text-purple-400", border: "border-purple-500/30" },
                                            items: ["HTML", "CSS/Sass", "JSP (legacy)", "Ember.js", "jQuery"],
                                        },
                                        {
                                            label: "Web Services",
                                            color: { bg: "bg-rose-500/20", text: "text-rose-400", border: "border-rose-500/30" },
                                            items: ["REST (consume)", "REST (create)"],
                                        },
                                        {
                                            label: "Databases",
                                            color: { bg: "bg-green-500/20", text: "text-green-400", border: "border-green-500/30" },
                                            items: ["MySQL", "MariaDB"],
                                        },
                                        {
                                            label: "Testing",
                                            color: { bg: "bg-yellow-500/20", text: "text-yellow-400", border: "border-yellow-500/30" },
                                            items: ["JUnit", "Mockito", "QUnit"],
                                        },
                                        {
                                            label: "CI/CD",
                                            color: { bg: "bg-cyan-500/20", text: "text-cyan-400", border: "border-cyan-500/30" },
                                            items: ["Jenkins", "Docker", "Kubernetes", "Helm charts"],
                                        },
                                        {
                                            label: "Tools",
                                            color: { bg: "bg-indigo-500/20", text: "text-indigo-400", border: "border-indigo-500/30" },
                                            items: ["GitHub", "Jira", "Confluence"],
                                        },
                                        {
                                            label: "Cloud",
                                            color: { bg: "bg-teal-500/20", text: "text-teal-400", border: "border-teal-500/30" },
                                            items: ["IBM Cloud", "AWS"],
                                        },
                                        {
                                            label: "Other",
                                            color: { bg: "bg-orange-500/20", text: "text-orange-400", border: "border-orange-500/30" },
                                            items: ["OpenID Connect", "Apache Kafka"],
                                        },
                                    ].map((group) => (
                                        <div key={group.label} className="mb-4 flex items-end">
                                            <h3 className="font-semibold text-gray-200 pr-2">{group.label}</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {group.items.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className={`px-3 text-sm rounded-full ${group.color.bg} ${group.color.text} border ${group.color.border}`}
                                                    >
                                                {tag}
                                            </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </motion.section>
                            </div>

                            {/* Software Engineer Intern */}
                            <div className="border-l-4 border-yellow-500 pl-6 mb-8">
                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                    <h3 className="text-2xl font-semibold">Software Engineer Intern</h3>
                                    <p className="text-gray-400 text-sm">May 2016 – Aug 2016 • Chicago</p>
                                </div>
                                <p className="text-gray-300 mb-3">
                                    IBM Cloud Object Storage (Cleversafe)
                                </p>
                                <p className="text-gray-300 leading-relaxed">
                                    Built a small feature for the ICOS Manager application. Contributed to planning
                                    and development across API and frontend, working with Java, Spring, and JSP; added
                                    automation test cases with Python.
                                </p>
                            </div>

                            {/* Software Engineer (IGATE) */}
                            <div className="border-l-4 border-yellow-500 pl-6">
                                <div className="flex flex-wrap items-baseline justify-between gap-2">
                                    <h3 className="text-2xl font-semibold">Software Engineer</h3>
                                    <p className="text-gray-400 text-sm">Sep 2012 – Dec 2014 • Mumbai</p>
                                </div>
                                <p className="text-gray-300 mb-3">IGATE</p>
                                <p className="text-gray-300 leading-relaxed">
                                    Responsible for front‑end builds with ExtJS 3.4/4 MVC and JavaScript/jQuery, and
                                    for new backend APIs and legacy system maintenance using Java and Spring.
                                    Additional tools/tech: shell scripting, JUnit, Tomcat, SVN, Git.
                                </p>
                            </div>
                        </motion.section>
                    </div>
                </div>
            </main>
        </div>
    );
}