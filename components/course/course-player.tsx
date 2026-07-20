"use client";

import { useEffect, useMemo, useState } from "react";
import type { CourseDefinition } from "@/lib/content/course-schema";
import { LocalProgressAdapter } from "@/lib/progress/local-progress-adapter";
import {
  calculateStatus,
  createInitialProgress,
  type CourseProgress,
} from "@/lib/progress/progress";
import { SectionRenderer } from "./section-renderer";

export function CoursePlayer({ course }: { course: CourseDefinition }) {
  const adapter = useMemo(() => new LocalProgressAdapter(course), [course]);
  const [progress, setProgress] = useState<CourseProgress>(() => createInitialProgress(course));
  const [ready, setReady] = useState(false);
  const currentIndex = Math.max(
    0,
    course.sections.findIndex(({ id }) => id === progress.currentSectionId),
  );
  const currentSection = course.sections[currentIndex];
  const completedCount = course.completion.requiredSectionIds.filter((id) =>
    progress.completedSectionIds.includes(id),
  ).length;
  const completionPercent = Math.round(
    (completedCount / course.completion.requiredSectionIds.length) * 100,
  );
  const hasDrafts = Object.values(progress.drafts).some((draft) => draft.trim().length > 0);

  useEffect(() => {
    let active = true;
    adapter.initialize().then((storedProgress) => {
      if (active) {
        setProgress(storedProgress);
        setReady(true);
      }
    });

    return () => {
      active = false;
      void adapter.terminate();
    };
  }, [adapter]);

  useEffect(() => {
    if (!hasDrafts) {
      return;
    }

    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };

    window.addEventListener("beforeunload", warnBeforeLeaving);
    return () => window.removeEventListener("beforeunload", warnBeforeLeaving);
  }, [hasDrafts]);

  async function updateProgress(next: CourseProgress) {
    setProgress(next);
    await adapter.save(next);
  }

  async function selectSection(sectionId: string) {
    await updateProgress({
      ...progress,
      currentSectionId: sectionId,
      status: progress.status === "not-started" ? "in-progress" : progress.status,
      updatedAt: new Date().toISOString(),
    });
  }

  async function markCurrentComplete() {
    const completedSectionIds = [...new Set([...progress.completedSectionIds, currentSection.id])];
    const nextSection = course.sections[Math.min(currentIndex + 1, course.sections.length - 1)];

    await updateProgress({
      ...progress,
      completedSectionIds,
      currentSectionId: nextSection.id,
      status: calculateStatus(completedSectionIds, course),
      updatedAt: new Date().toISOString(),
    });
  }

  async function updateDraft(value: string) {
    await updateProgress({
      ...progress,
      drafts: { ...progress.drafts, [currentSection.id]: value },
      status: "in-progress",
      updatedAt: new Date().toISOString(),
    });
  }

  async function resetProgress() {
    if (hasDrafts && !window.confirm("Reset progress and permanently remove your local draft?")) {
      return;
    }

    setProgress(await adapter.reset());
  }

  if (!ready) {
    return (
      <p className="course-player-loading" role="status">
        Loading your local progress…
      </p>
    );
  }

  return (
    <div className="course-player">
      <header className="course-player-header">
        <div>
          <p className="eyebrow">
            Experience {course.number} / {course.estimatedMinutes} min
          </p>
          <h1>{course.title}</h1>
          <p className="hero-copy">{course.description}</p>
        </div>
        <div className="progress-summary" aria-live="polite">
          <span>{progress.status.replace("-", " ")}</span>
          <strong>{completionPercent}%</strong>
          <progress max="100" value={completionPercent}>
            {completionPercent}%
          </progress>
        </div>
      </header>

      {progress.migratedFromVersion ? (
        <p className="version-notice" role="status">
          Your progress was updated from content version {progress.migratedFromVersion}.
        </p>
      ) : null}

      <section className="course-objectives" aria-labelledby="objectives-title">
        <h2 id="objectives-title">Learning objectives</h2>
        <ul>
          {course.objectives.map((objective) => (
            <li key={objective}>{objective}</li>
          ))}
        </ul>
      </section>

      <div className="course-player-grid">
        <nav className="course-outline" aria-label="Course sections">
          <ol>
            {course.sections.map((section, index) => {
              const completed = progress.completedSectionIds.includes(section.id);
              const current = section.id === currentSection.id;
              return (
                <li key={section.id}>
                  <button
                    aria-current={current ? "step" : undefined}
                    className={current ? "current" : undefined}
                    onClick={() => selectSection(section.id)}
                    type="button"
                  >
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {section.title}
                    <small>{completed ? "Completed" : "Not completed"}</small>
                  </button>
                </li>
              );
            })}
          </ol>
          <button className="text-button" onClick={resetProgress} type="button">
            Reset local progress
          </button>
        </nav>

        <section className="course-section" aria-labelledby="current-section-title">
          <p className="eyebrow">
            Section {currentIndex + 1} of {course.sections.length}
          </p>
          <h2 id="current-section-title">{currentSection.title}</h2>
          <div className="section-content">
            <SectionRenderer
              draft={progress.drafts[currentSection.id] ?? ""}
              onDraftChange={updateDraft}
              section={currentSection}
            />
          </div>
          <div className="section-actions">
            <button
              className="button button-secondary"
              disabled={currentIndex === 0}
              onClick={() => selectSection(course.sections[currentIndex - 1].id)}
              type="button"
            >
              Previous
            </button>
            <button className="button button-primary" onClick={markCurrentComplete} type="button">
              {currentIndex === course.sections.length - 1
                ? "Complete section"
                : "Complete and continue"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
