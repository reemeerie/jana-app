export const getErrorMessage = (err) => {
  let errorMessage = "An error ocurred. Contact the system administrator"

  if (err?.response?.data?.error) {
    errorMessage = err.response.data.error
  }

  return errorMessage
}
