import {useDispatch} from "react-redux";
import {filterChange} from "../reducers/filterReducer";

export const VisibilityFilter = (props) => {
  const dispatch = useDispatch()

  return (
    <div>
      <div>
        all <input type="radio" name="filter" onChange={() => dispatch(filterChange('ALL'))}/>
        important <input type="radio" name="filter" onChange={() => dispatch(filterChange('IMPORTANT'))}/>
        nonimportant <input type="radio" name="filter" onChange={() => dispatch(filterChange('NONIMPORTANT'))}/>
      </div>
    </div>
  );
}