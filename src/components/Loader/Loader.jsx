import { observer } from "mobx-react";
import "./loader.css";

const Loader = () => {
  return (
    <span className='loader-container'>
      <span className='loader'></span>
    </span>
  );
};

export default observer(Loader);
