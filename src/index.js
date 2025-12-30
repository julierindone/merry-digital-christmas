import { recipients } from "./data.js";

const mainContent = document.getElementById('main-content')

renderCard()

function renderCard() {
  const recipient = getRecipient()
  createHTML(recipient)
}

function getRecipient() {
  let params = new URLSearchParams(location.search)
  let emailAddress = params.get("emailAddress")

  return recipients.filter((person) => {
    return person.email === emailAddress.toLowerCase()
  })[0]
}

function createHTML(recipient) {
  let html = ``

  let recipientName = `
    <p><span>Dear ${recipient.firstName},</span></p>
    <p>Phew! What a wild ride 2025 has been. `

  let home = ''

  if (recipient.home.inPortland) {
    home = `I'm so glad to be back in Portland and that I get to see you more often.... even if I have to travel <i>all the way</i> to ${recipient.home.location} to do so. </p>`
  }
  else {
    home = `I'm back in Portland, and you're in ${recipient.home.location}, but I'm hopeful that at some point in 2026 we'll end up in the same place at the same time.</p>`
  }

  let customMessage = ''

  if (recipient.personalMessage) {
    customMessage = `<p>${recipient.personalMessage}</p>`
  }

  // shorter message = font larger
  if (recipientName.length + home.length + customMessage.length < 300) {
    mainContent.classList.add('short-message')
  }
  else {
    // longer message (max 440ish) = font is smaller.
    mainContent.classList.add('long-message')
  }
  mainContent.innerHTML = recipientName + home + customMessage
}
