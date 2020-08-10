import getReposList from "./src/get_repos_list";
import reposRedactedStat from "./src/get_redacted_list";

(async () => {
  await getReposList();
})();
