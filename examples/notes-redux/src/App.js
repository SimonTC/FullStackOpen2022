import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import {VisibilityFilter} from "./components/VisibilityFilter";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {initializeNotes} from "./reducers/noteReducer";

export const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
  }, [dispatch]) // Dispatch actually never changes, but it is necessary to add it as a dependency to ensure linter is happy.

  return (
    <div>
      <NewNote/>
      <VisibilityFilter/>
      <Notes/>
    </div>
  )
}

export default App