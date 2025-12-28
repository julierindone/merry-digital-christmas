import { recipients } from "./data.js";

const mainContent = document.getElementById('main-content')
const urlTest = 'http://127.0.0.1:5500/?emailAddress=Oscar'

renderCard()

function renderCard() {
  const recipient = getRecipient()
  createHTML(recipient)
}

function getRecipient() {
  let params = new URLSearchParams(location.search)
  let emailAddress = params.get("emailAddress")

  return recipients.filter((person) => {
    return person.email === emailAddress
  })[0]
}

function createHTML(recipient) {
  let html = ``

  let recipientName = `
    <p><span>Dear ${recipient.firstName},</span></p>
    <p class="line-break">What a wild ride 2025 has been!</p>`

  let home = ''

  if (recipient.home.inPortland) {
    home = `<p>I'm so glad to be back in Portland and that I get to see you more often.... even if I have to travel all the way to ${recipient.home.location} to do so.</p>`
  }
  else {
    home = `<p>I'm in Portland, and you're in ${recipient.home.location}, but I'm hopeful that we'll see each other in person in the new year.</p>`
  }

  let customMessage = ''

  if (recipient.personalMessage) {
    customMessage = `<p>${recipient.personalMessage}</p>`
  }

  mainContent.innerHTML = recipientName + home + customMessage
}
