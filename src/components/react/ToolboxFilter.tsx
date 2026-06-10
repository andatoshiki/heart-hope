import { useMemo, useState } from "react";
import "../../styles/islands.css";

type Category =
  | "all"
  | "drawing-collage"
  | "music-sound"
  | "writing-poetry"
  | "movement-drama";

interface ActivityItem {
  slug: string;
  category: Exclude<Category, "all">;
  categoryLabel: string;
  title: string;
  summary: string;
  image: string;
  detailSlug?: string;
}

interface Props {
  activities: ActivityItem[];
}

const categories: Array<{ value: Category; label: string }> = [
  { value: "all", label: "ALL" },
  { value: "drawing-collage", label: "DRAWING & COLLAGE" },
  { value: "music-sound", label: "MUSIC & SOUND" },
  { value: "writing-poetry", label: "WRITING & POETRY" },
  { value: "movement-drama", label: "MOVEMENT & DRAMA" },
];

export default function ToolboxFilter({ activities }: Props) {
  const [category, setCategory] = useState<Category>(() => {
    if (typeof window === "undefined") {
      return "all";
    }

    const requestedCategory = new URLSearchParams(window.location.search).get(
      "category",
    );

    return categories.some((item) => item.value === requestedCategory)
      ? (requestedCategory as Category)
      : "all";
  });
  const visibleActivities = useMemo(
    () =>
      category === "all"
        ? activities
        : activities.filter((activity) => activity.category === category),
    [activities, category],
  );

  return (
    <section className="toolbox-filter" aria-label="Healing activities">
      <div className="toolbox-filter__tabs" aria-label="Activity categories">
        {categories.map((item) => (
          <button
            className="toolbox-filter__tab"
            key={item.value}
            type="button"
            aria-pressed={category === item.value}
            onClick={() => setCategory(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="toolbox-filter__grid" aria-live="polite">
        {visibleActivities.map((activity) => (
          <article className="toolbox-filter__card" key={activity.slug}>
            <div className="toolbox-filter__image">
              <img src={activity.image} alt="" />
              <p className="toolbox-filter__category">{activity.categoryLabel}</p>
            </div>
            <h3>{activity.title}</h3>
            <p>{activity.summary}</p>
            {activity.detailSlug ? (
              <a className="toolbox-filter__more" href={activity.detailSlug}>
                LEARN MORE
              </a>
            ) : (
              <span className="toolbox-filter__more">LEARN MORE</span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
