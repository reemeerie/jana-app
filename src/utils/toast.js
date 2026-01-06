import toast from "react-hot-toast"

export const toastSuccess = (message) =>
  toast.success(message, {
    style: {
      border: "1px solid #22c55e",
    },
  })

export const toastError = (message) =>
  toast.error(message, {
    style: {
      border: "1px solid #ef4444",
    },
  })
