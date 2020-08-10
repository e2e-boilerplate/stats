import repos from "../data/redacted/redacted.json";
import getRepoClonesStat from "./get_clone_stats";

function clone() {
  repos.forEach((repo) => {
    const { name } = repo;
    getRepoClonesStat(name);
  });
}

clone();
