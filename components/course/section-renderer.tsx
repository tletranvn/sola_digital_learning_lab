import { createElement } from "react";
import type { CourseSection } from "@/lib/content/course-schema";
import { getSectionContent } from "@/lib/content/section-content";

type SectionRendererProps = {
  draft: string;
  onDraftChange: (value: string) => void;
  section: CourseSection;
};

export function SectionRenderer({ draft, onDraftChange, section }: SectionRendererProps) {
  switch (section.type) {
    case "reading": {
      const Content = getSectionContent(section.contentKey);
      return Content ? createElement(Content) : <MissingContent contentKey={section.contentKey} />;
    }
    case "timeline":
      return (
        <ol className="learning-timeline">
          {section.items.map((item) => (
            <li key={item.id}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </li>
          ))}
        </ol>
      );
    case "three-scene":
      return (
        <div className="activity-preview">
          <p>The interactive scene will be implemented in the dedicated course phase.</p>
          <p>The accessible fallback is already defined around these concepts:</p>
          <ul>
            {section.fallbackItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      );
    case "diagram":
      return (
        <div className="activity-preview">
          <p>The diagram will connect these concepts:</p>
          <ul>
            {section.nodes.map((node) => (
              <li key={node}>{node}</li>
            ))}
          </ul>
        </div>
      );
    case "branching":
      return (
        <div className="activity-preview">
          <p>
            Branching scenario <strong>{section.scenarioId}</strong> begins at node{" "}
            {section.startNodeId}.
          </p>
        </div>
      );
    case "reflection":
      return (
        <div className="reflection-field">
          <label htmlFor={`reflection-${section.id}`}>{section.prompt}</label>
          <textarea
            id={`reflection-${section.id}`}
            onChange={(event) => onDraftChange(event.target.value)}
            placeholder="Your draft stays in this browser."
            rows={8}
            value={draft}
          />
          <p className="field-hint">
            This text is saved locally. It is not sent to Sola, Vercel, or a learning platform.
          </p>
        </div>
      );
    case "knowledge-check":
      return (
        <div className="activity-preview">
          <p>{section.prompt}</p>
          <p>
            This knowledge check will receive its scoring logic in the course implementation phase.
          </p>
        </div>
      );
    case "synthesis":
      return (
        <ul className="takeaway-list">
          {section.takeaways.map((takeaway) => (
            <li key={takeaway}>{takeaway}</li>
          ))}
        </ul>
      );
  }
}

function MissingContent({ contentKey }: { contentKey: string }) {
  return (
    <div className="activity-preview" role="alert">
      <p>Missing local content: {contentKey}</p>
    </div>
  );
}
