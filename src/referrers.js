import repos from "../data/redacted/redacted.json";
import getReferrersStats from "./get_referrers_stats";

function clone() {
    repos.forEach((repo) => {
        const { name } = repo;
        getReferrersStats(name);
    });
}

clone();
