import Nav from "@/components/site/Nav";
import Hero from "@/components/site/Hero";
import Interlude from "@/components/site/Interlude";
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
        <Interlude items={MARQUEE} />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
