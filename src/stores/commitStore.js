import { action, makeObservable, observable } from "mobx";
import dateStore from "./dateStore";
import axios, { Axios } from "axios";
import { DateTime } from "luxon";

class CommitStore {
  commits = {};
  selectedCommitData = null;
  owner = "NVIDIA";
  repo = "TensorRT-LLM";
  constructor() {
    makeObservable(this, {
      commits: observable,
      selectedCommitData: observable,
      owner: observable,
      repo: observable,
      setCommits: action,
      setSelectedCommitData: action,
      setOwner: action,
      setRepo: action,
      fetchCommitsForMonth: action,
    });
  }

  fetchCommitsForMonth = async () => {
    const firstDay = dateStore.currentDate.startOf("month");
    const lastDay = dateStore.currentDate.endOf("month");
    const owner = this.owner;
    const repo = this.repo;

    try {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/commits`,
        {
          params: {
            since: firstDay.toISO(),
            until: lastDay.toISO(),
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
}

const commitStore = new CommitStore();
export default commitStore;
