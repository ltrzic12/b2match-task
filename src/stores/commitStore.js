import { action, makeObservable, observable } from "mobx";
import dateStore from "./dateStore";
import axios from "axios";
import { DateTime } from "luxon";

class CommitStore {
  commits = {};
  selectedCommitData = null;
  owner = "NVIDIA";
  repo = "TensorRT-LLM";
  branch = "main";
  constructor() {
    makeObservable(this, {
      commits: observable,
      selectedCommitData: observable,
      owner: observable,
      repo: observable,
      branch: observable,
      setCommits: action,
      setSelectedCommitData: action,
      setOwner: action,
      setRepo: action,
      setBranch: action,
      fetchCommitsForMonth: action,
    });
  }

  fetchCommitsForMonth = async () => {
    const firstDay = dateStore.currentDate.startOf("month");
    const lastDay = dateStore.currentDate.endOf("month");
    const owner = this.owner;
    const repo = this.repo;
    const branch = this.branch;

    try {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/commits`,
        {
          params: {
            since: firstDay.toISO(),
            until: lastDay.toISO(),
            sha: branch,
          },
        },
      );

      const commitsData = response.data;
      const commitsByDate = {};

      commitsData.forEach((commit) => {
        const commitDate = DateTime.fromISO(
          commit.commit.committer.date,
        ).toFormat("yyyy-LL-dd");
        if (!commitsByDate[commitDate]) {
          commitsByDate[commitDate] = [];
        }
        commitsByDate[commitDate].push(commit);
      });

      this.setCommits(commitsByDate);
    } catch (error) {
      console.error(error);
    }
  };

  setCommits(commits) {
    this.commits = commits;
  }

  setSelectedCommitData(data) {
    this.selectedCommitData = data;
  }

  setOwner(owner) {
    this.owner = owner;
  }

  setRepo(repo) {
    this.repo = repo;
  }

  setBranch(branch) {
    this.branch = branch;
  }
}

const commitStore = new CommitStore();
export default commitStore;
