import { SectionConfig } from "@/types";

// Section metadata — no hotspot coords needed (interaction lives in the SVG)
export const SECTIONS: SectionConfig[] = [
  { id: "projects", label: "Projects",  carPart: "Driver Door"    },
  { id: "about",    label: "About",     carPart: "Trunk"          },
  { id: "skills",   label: "Skills",    carPart: "Hood"           },
  { id: "contact",  label: "Contact",   carPart: "Passenger Door" },
];

export const getSectionById = (id: string) =>
  SECTIONS.find((s) => s.id === id);
