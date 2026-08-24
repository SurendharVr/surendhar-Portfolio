export type SnapSection = { id: string; label: string };

export default function SnapProgress({
  sections,
  activeId,
}: {
  sections: SnapSection[];
  activeId: string;
}) {
  return (
    <nav className="snap-progress" aria-label="Section progress">
      {sections.map((section) => (
        <button
          key={section.id}
          type="button"
          className="snap-progress-dot"
          aria-label={section.label}
          aria-current={activeId === section.id ? "true" : undefined}
          onClick={() =>
            document
              .getElementById(section.id)
              ?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        />
      ))}
    </nav>
  );
}
