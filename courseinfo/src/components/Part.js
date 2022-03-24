const Part = ({key, name, exercises}) => {

  return (
    <div key = {key}>
      <p><b>{name}:</b> {exercises}</p>
    </div>
  )
}

export default Part