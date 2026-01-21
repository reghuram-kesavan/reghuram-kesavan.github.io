"use client";

import { motion } from "framer-motion";
import profile from "@/data/profile.json";
import { Trophy, Users, Star, Award } from "lucide-react";

export default function AwardsPage() {
    return (
        <div className="container mx-auto px-4 py-12 md:px-6">
            <header className="mb-16 max-w-2xl">
                <h1 className="font-outfit text-4xl font-bold tracking-tight md:text-5xl mb-4">
                    Leadership & Recognition
                </h1>
                <p className="text-lg text-foreground/60 leading-relaxed text-balance">
                    Beyond the engineering lab: community building, championship leadership, and organizational excellence.
                </p>
            </header>

            <div className="grid gap-12 lg:grid-cols-2">
                <section>
                    <h2 className="mb-8 flex items-center text-2xl font-bold">
                        <Users className="mr-3 h-6 w-6 text-primary" />
                        Leadership Roles
                    </h2>
                    <div className="space-y-6">
                        {profile.leadership.map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-card flex items-start gap-4 rounded-2xl p-6 border border-white/5 hover:border-primary/20 transition-all"
                            >
                                <div className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
                                    <Star className="h-3 w-3" />
                                </div>
                                <p className="font-medium text-foreground/80">{item}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section>
                    <h2 className="mb-8 flex items-center text-2xl font-bold">
                        <Trophy className="mr-3 h-6 w-6 text-primary" />
                        Key Achievements
                    </h2>
                    <div className="space-y-6">
                        <div className="glass-card rounded-2xl p-6 border border-white/5 hover:bg-white/[0.03] transition-all">
                            <div className="mb-2 flex items-center justify-between font-bold text-primary">
                                <span>World of Dance India Auditions</span>
                                <Award className="h-5 w-5" />
                            </div>
                            <h3 className="text-xl font-bold">Head of Dance Team &apos;Abrupt Family&apos;</h3>
                            <p className="mt-2 text-sm text-foreground/60">
                                Led a high-performance dance crew to represent Kerala at the national level, overseeing choreography and team synchronization.
                            </p>
                        </div>

                        <div className="glass-card rounded-2xl p-6 border border-white/5 hover:bg-white/[0.03] transition-all">
                            <div className="mb-2 flex items-center justify-between font-bold text-primary">
                                <span>Badminton Championship</span>
                                <Award className="h-5 w-5" />
                            </div>
                            <h3 className="text-xl font-bold">District Champion (2012)</h3>
                            <p className="mt-2 text-sm text-foreground/60">
                                Thiruvananthapuram district badminton champion; demonstrating agility and discipline in competitive sports.
                            </p>
                        </div>

                        <div className="glass-card rounded-2xl p-6 border border-white/5 hover:bg-white/[0.03] transition-all">
                            <div className="mb-2 flex items-center justify-between font-bold text-primary">
                                <span>University Excellence</span>
                                <Award className="h-5 w-5" />
                            </div>
                            <h3 className="text-xl font-bold">Department Topper (Mechanical)</h3>
                            <p className="mt-2 text-sm text-foreground/60">
                                Recognized for academic excellence throughout the B.Tech program, graduating with a 9.28/10 CGPA.
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
