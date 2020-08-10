import repos from "../data/redacted/redacted.json";
import getRepoClonesStats from "./get_clone_stats";

function clone() {
  repos.forEach((repo) => {
    const { name } = repo;
    getRepoClonesStats(name);
  });
}

clone();
