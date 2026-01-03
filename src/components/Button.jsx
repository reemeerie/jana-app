import { Spinner } from "../components/Spinner"
import "../styles/Button.css"

export const Button = ({ label, loading }) => {
  return (
    <div className="btnContainer">
      <button type="submit" className="button" disabled={loading}>
        {loading ? <Spinner size={30} /> : label}
      </button>
    </div>
  )
}
