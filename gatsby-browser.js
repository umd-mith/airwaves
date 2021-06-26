export const onServiceWorkerUpdateReady = () => {
  const answer = window.confirm(
    "There's a new version of Unlocking the Airwaves available. " +
    "Would you like to reload to display the latest version?"
  )
  if (answer === true) {
    window.location.reload()
  }
}
