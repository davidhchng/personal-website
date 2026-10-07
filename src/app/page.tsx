import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Marquee from "@/components/site/Marquee";
import Experience from "@/components/site/Experience";
import Projects from "@/components/site/Projects";
import Skills from "@/components/site/Skills";
import Contact from "@/components/site/Contact";
import { SKILL_GROUPS } from "@/lib/content";

const MARQUEE = SKILL_GROUPS.flatMap(g => g.items);

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Experience />
        <div style={{ marginTop: 80 }}>
          <Marquee items={MARQUEE} />
        </div>
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
