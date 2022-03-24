import React from "react";

const FilteredList = ({list}) => {
  return (
    <div>
      <h2>Filtered</h2>
      {list.length === 0 ? 'No persons matched.' : list.map(name => <p><b>{name}</b></p>)}
    </div>
  )
}

export default FilteredList