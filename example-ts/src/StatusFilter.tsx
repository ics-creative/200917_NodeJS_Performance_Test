import * as React from "react";
import { useCallback, useState } from "react";
import { StatusType } from "./StatusType";

type Props = {
  onChange: (option: StatusType) => void;
}

const StatusFilter: React.FC<Props> = ({onChange}) => {

  const [state, setState] = useState({
    selectedOption: "all"
  });

  const handleOptionChange = useCallback((event: any) => {
    const selectedOption = event.target.value;
    setState({
      selectedOption: selectedOption
    });

    onChange(selectedOption);
  }, [state, onChange]);


  return <form>
    <div className="radio">
      <label>
        <input type="radio" value="all"
               checked={state.selectedOption === "all"}
               onChange={handleOptionChange} />
        すべて
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" value="active"
               checked={state.selectedOption === "active"}
               onChange={handleOptionChange} />
        未完了タスク
      </label>
    </div>
    <div className="radio">
      <label>
        <input type="radio" value="completed"
               checked={state.selectedOption === "completed"}
               onChange={handleOptionChange} />
        完了タスク
      </label>
    </div>
  </form>;
};

export default StatusFilter;
