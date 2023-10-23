import { observer } from "mobx-react";
import commitStore from "../../stores/commitStore";

const CommitData = ({ close }) => {
  return (
    <div className='commit-data-container'>
      <div className='commit-data'>
        <button onClick={close} className='close-button'>
          Close
        </button>
        <ul>
          {commitStore.selectedCommitData.map((commit, index) => (
            <li key={index}>
              <h5>{commit.commit.author.name}</h5>
              <p> {commit.commit.message}</p>
              <a href={commit.html_url}>See on GitHub</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default observer(CommitData);
