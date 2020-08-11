import repos from "../data/redacted/redacted.json";
import getReferrersStats from "./get_referrers_stats";

function referrers() {
  repos.forEach((repo) => {
    const { name } = repo;
    getReferrersStats(name);
  });
}

referrers();
