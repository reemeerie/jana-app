import "../styles/Spinner.css"

export const Spinner = ({ size = 32, color = "#000" }) => {
  return (
    <div
      className="spinner"
      style={{ width: size, height: size, borderTopColor: color }}
      aria-label="Loading"
    />
  )
}
