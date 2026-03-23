// Section identifiers
export type SectionId = "projects" | "about" | "skills" | "experience" | "hobbies" | "volunteering" | "contact";

// null = idle/home state (car closed, no panel shown)
export type ActiveSection = SectionId | null;

// Top-level section config used by CarScene + nav dots
export interface SectionConfig {
  id: SectionId;
  label: string;       // Display name on nav dot hover
  carPart: string;     // e.g. "Driver Door", "Trunk"
}
