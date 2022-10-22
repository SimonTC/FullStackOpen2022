import NewNote from "./components/NewNote";
import Notes from "./components/Notes";
import {VisibilityFilter} from "./components/VisibilityFilter";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import noteService from './services/notes'
import {setNotes} from "./reducers/noteReducer";

export const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    noteService.getAll().then(notes => dispatch(setNotes(notes)))
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