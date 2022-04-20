const Filter = ({filterValue, onFilterUpdated}) => {
  return <div>Only show people with <input value={filterValue} onChange={onFilterUpdated}/> in their name</div>
}

export default Filter