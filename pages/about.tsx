import { Nav } from "../components/nav";
import {motion, SVGMotionProps} from "framer-motion";
import { useCallback } from "react";
import {FaGithub, FaLinkedin} from "react-icons/fa";
import {HiDownload} from "react-icons/hi";
import { FcPhoneAndroid } from "react-icons/fc";
import { MdEmail } from "react-icons/md";

export function useHtml2Pdf() {
  return useCallback(async (el: HTMLElement) => {
    const { default: html2pdf } = await import("html2pdf.js");
    await html2pdf().from(el).save();
  }, []);
}

export default function About() {
    const handlePdf = useHtml2Pdf();
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100">
            <Nav />

            <main className="container mx-auto px-6 py-12">
                {/* Header / Identity */}
                <motion.section
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl bg-gray-900/60 backdrop-blur-lg p-8 shadow-lg border border-gray-800 mb-4"
                >
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                        <div className="flex flex-gap-4 items-center">
                            <div>
                                <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                                    Lalit Patil
                                </h1>
                                <p className="mt-1 text-lg text-gray-300">Full Stack Developer</p>
                            </div>
                            {/*<div className="absolute top-2 left-5 w-64 h-64">*/}
                            {/*    <svg viewBox="-1 -1 2 2" style={{transform: 'rotate(-90deg)'}}>*/}
                            {/*        /!* Background rings *!/*/}
                            {/*        {[0.2, 0.4, 0.6, 0.8, 1].map((r, i) => (*/}
                            {/*            <motion.circle*/}
                            {/*                key={i}*/}
                            {/*                cx={0}*/}
                            {/*                cy={0}*/}
                            {/*                r={r}*/}
                            {/*                fill="none"*/}
                            {/*                stroke="rgba(255,255,255,0.1)"*/}
                            {/*                strokeWidth={0.01}*/}
                            {/*            />*/}
                            {/*        ))}*/}
                            {/*        {(() => {*/}
                            {/*            const points = [*/}
                            {/*                {angle: 0, value: 0.8, label: 'Backend'},*/}
                            {/*                {angle: 72, value: 0.6, label: 'Frontend'},*/}
                            {/*                {angle: 144, value: 0.7, label: 'Distributed Systems'},*/}
                            {/*                {angle: 216, value: 0.7, label: 'Experience'},*/}
                            {/*                {angle: 288, value: 0.8, label: 'Education'},*/}
                            {/*            ];*/}
                            {/*            const toXY = (deg: number, v: number) => {*/}
                            {/*                const a = (deg * Math.PI) / 180;*/}
                            {/*                return { x: Math.cos(a) * v, y: Math.sin(a) * v };*/}
                            {/*            };*/}
                            {/*            const coords = points.map(p => ({ ...p, ...toXY(p.angle, p.value) }));*/}
                            {/*            const pathD = `M ${coords.map(p => `${p.x} ${p.y}`).join(' L ')} Z`;*/}

                            {/*            return (*/}
                            {/*                <>*/}
                            {/*                    /!* Spokes *!/*/}
                            {/*                    {coords.map((p, i) => (*/}
                            {/*                        <line*/}
                            {/*                            key={`spoke-${i}`}*/}
                            {/*                            x1={0}*/}
                            {/*                            y1={0}*/}
                            {/*                            x2={Math.cos((points[i].angle * Math.PI) / 180)}*/}
                            {/*                            y2={Math.sin((points[i].angle * Math.PI) / 180)}*/}
                            {/*                            stroke="rgba(255,255,255,0.08)"*/}
                            {/*                            strokeWidth={0.01}*/}
                            {/*                        />*/}
                            {/*                    ))}*/}

                            {/*                    /!* Radar shape scaling from center *!/*/}
                            {/*                    <motion.g*/}
                            {/*                        initial={{ scale: 0 }}*/}
                            {/*                        animate={{ scale: 1 }}*/}
                            {/*                        transition={{ duration: 0.8, ease: 'easeOut' }}*/}
                            {/*                        style={{ transformOrigin: '50% 50%' }}*/}
                            {/*                    >*/}
                            {/*                        <motion.path*/}
                            {/*                            d={pathD}*/}
                            {/*                            fill="rgba(99,102,241,0.25)"*/}
                            {/*                            stroke="rgba(99,102,241,0.85)"*/}
                            {/*                            strokeWidth={0.03}*/}
                            {/*                        />*/}
                            {/*                        /!* Points *!/*/}
                            {/*                        {coords.map((p, i) => (*/}
                            {/*                            <motion.circle*/}
                            {/*                                key={`pt-${i}`}*/}
                            {/*                                initial={{ scale: 0 }}*/}
                            {/*                                animate={{ scale: 1 }}*/}
                            {/*                                transition={{ duration: 0.5, delay: 0.15 + i * 0.05 }}*/}
                            {/*                                cx={p.x}*/}
                            {/*                                cy={p.y}*/}
                            {/*                                r={0.05}*/}
                            {/*                                fill="rgb(99,102,241)"*/}
                            {/*                            />*/}
                            {/*                        ))}*/}
                            {/*                    </motion.g>*/}

                            {/*                    /!* Labels (counter-rotated to stay readable) *!/*/}
                            {/*                    {coords.map((p, i) => {*/}
                            {/*                        const rLabel = Math.min(1.05, p.value + 0.2);*/}
                            {/*                        const lx = Math.cos((p.angle * Math.PI) / 180) * rLabel;*/}
                            {/*                        const ly = Math.sin((p.angle * Math.PI) / 180) * rLabel;*/}
                            {/*                        const anchor =*/}
                            {/*                            Math.abs(lx) < 0.01 ? 'middle' : lx > 0 ? 'start' : 'end';*/}
                            {/*                        return (*/}
                            {/*                            <motion.text*/}
                            {/*                                key={`lbl-${i}`}*/}
                            {/*                                x={lx}*/}
                            {/*                                y={ly}*/}
                            {/*                                fill="rgba(255,255,255,0.85)"*/}
                            {/*                                fontSize={0.12}*/}
                            {/*                                textAnchor={anchor}*/}
                            {/*                                dominantBaseline="middle"*/}
                            {/*                                transform={`rotate(90 ${lx} ${ly})`}*/}
                            {/*                                initial={{ opacity: 0 }}*/}
                            {/*                                animate={{ opacity: 1 }}*/}
                            {/*                                transition={{ delay: 0.25 + i * 0.05 }}*/}
                            {/*                                style={{ pointerEvents: 'none' }}*/}
                            {/*                            >*/}
                            {/*                                {p.label}*/}
                            {/*                            </motion.text>*/}
                            {/*                        );*/}
                            {/*                    })}*/}
                            {/*                </>*/}
                            {/*            );*/}
                            {/*        })()}*/}
                            {/*    </svg>*/}
                            {/*</div>*/}
                            <div className="mt-4 flex space-x-4 ml-4">
                                <a
                                    href="https://www.linkedin.com/in/lalitrpatil"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
                                >
                                    <FaLinkedin className="w-6 h-6"/>
                                </a>
                                <a
                                    href="https://www.github.com/redlalitp"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center p-2 rounded-full bg-black hover:bg-gray-800 transition-colors"
                                >
                                    <FaGithub className="w-6 h-6"/>
                                </a>
                                <button
                                    onClick={() => {
                                        const element = document.querySelector(".container") as HTMLElement;
                                        handlePdf(element).then(r => console.log('PDF saved!'));
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
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Left Column */}
                    <div className="space-y-4">
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

                        {/* Skills with two columns and level bars */}
                        <motion.section
                            initial={{ opacity: 0, y: 24 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.05 }}
                            className="rounded-2xl bg-gray-900/60 backdrop-blur-lg p-8 shadow-lg border border-gray-800"
                        >
                            <h2 className="text-3xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-500">
                                Skills
                            </h2>

                            {(() => {
                                type Level = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

                                const renderSkill = (name: string, level: Level, palette: string[]) => (
                                    <div key={name} className="mb-3">
                                        <div className="flex justify-between mb-1">
                                            <span className="font-medium">{name}</span>
                                            <span className="text-gray-400 text-sm">{level}/10</span>
                                        </div>
                                        <div className="flex gap-1">
                                            {Array.from({ length: 10 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`h-2 flex-1 rounded ${i < level ? palette[i] : "bg-gray-800"}`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                );

                                const backend = [
                                    { name: "Java", level: 9 as Level },
                                    { name: "Spring/Boot", level: 9 as Level },
                                    { name: "Spring MVC", level: 8 as Level },
                                    { name: "Spring Security", level: 7 as Level },
                                    { name: "Hibernate", level: 7 as Level },
                                    { name: "Node.js", level: 7 as Level },
                                ];

                                const frontend = [
                                    { name: "Javascript", level: 9 as Level },
                                    { name: "Ember.js", level: 7 as Level },
                                    { name: "NextJS", level: 7 as Level },
                                    { name: "jquery", level: 6 as Level },
                                    { name: "qunit", level: 4 as Level },
                                ];

                                const tools = [
                                    { name: "Jenkins", level: 6 as Level },
                                    { name: "Git (GitHub)", level: 9 as Level },
                                ];

                                const palettes = {
                                    backend: ["bg-blue-100","bg-blue-200","bg-blue-300","bg-blue-400","bg-blue-500","bg-blue-600","bg-blue-700","bg-blue-800","bg-blue-900","bg-blue-950"],
                                    frontend: ["bg-purple-100","bg-purple-200","bg-purple-300","bg-purple-400","bg-purple-500","bg-purple-600","bg-purple-700","bg-purple-800","bg-purple-900","bg-purple-950"],
                                    tools: ["bg-indigo-100","bg-indigo-200","bg-indigo-300","bg-indigo-400","bg-indigo-500","bg-indigo-600","bg-indigo-700","bg-indigo-800","bg-indigo-900","bg-indigo-950"],
                                };

                                return (
                                    <div className="grid md:grid-cols-2 gap-8">
                                        {/* Column 1: Backend */}
                                        <div>
                                            <h3 className="mb-4 font-semibold text-blue-300">Backend</h3>
                                            {backend.map((s) => renderSkill(s.name, s.level, palettes.backend))}
                                        </div>

                                        {/* Column 2: Frontend + Tools */}
                                        <div className="space-y-8">
                                            <div>
                                                <h3 className="mb-4 font-semibold text-purple-300">Frontend</h3>
                                                {frontend.map((s) => renderSkill(s.name, s.level, palettes.frontend))}
                                            </div>
                                            <div>
                                                <h3 className="mb-4 font-semibold text-indigo-300">Tools</h3>
                                                {tools.map((s) => renderSkill(s.name, s.level, palettes.tools))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })()}
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