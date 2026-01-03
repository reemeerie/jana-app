import "../styles/Spinner.css"

export const Spinner = ({ size = 32 }) => {
  return (
    <div
      className="spinner"
      style={{ width: size, height: size }}
      aria-label="Loading"
    />
  )
}
