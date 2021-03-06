import repos from "../data/redacted/redacted.json";
import getViewsStats from "./get_view_stats";

function views() {
  repos.forEach((repo) => {
    const { name } = repo;
    getViewsStats(name);
  });
}

views();
