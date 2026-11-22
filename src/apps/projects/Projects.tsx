"use client";

import { useState } from "react";
import { projectCategories, projects } from "@/data/portfolio";
import type { ProjectCategory } from "@/data/types";
import { IconButton } from "@/os/IconButton";
import { useWindowManager } from "@/os/WindowManagerProvider";
import styles from "../apps.module.css";

type Filter = "All" | ProjectCategory;

/** Folder view of every enabled project, with category filter buttons. */
export function Projects() {
  const wm = useWindowManager();
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<string | null>(null);

  // Only offer filter buttons for categories that have at least one project.
  const tabs: Filter[] = ["All", ...projectCategories.filter((category) => projects.some((p) => p.category === category))];
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div>
      <div role="group" aria-label="Project categories" className={styles.tabs}>
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            aria-pressed={tab === filter}
            className={`os-raised ${styles.tab} ${tab === filter ? styles.tabActive : ""}`}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div role="region" aria-label={`${filter} projects`} className={styles.folder}>
        {shown.map((project) => (
          <IconButton
            key={project.slug}
            variant="folder"
            icon="document"
            label={project.title}
            selected={selected === project.slug}
            openOnSingleClick={wm.isPhone}
            onSelect={() => setSelected(project.slug)}
            onOpen={() => wm.open({ appId: "projectViewer", params: { slug: project.slug } })}
          />
        ))}
      </div>
    </div>
  );
}
