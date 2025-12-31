const mainContent = document.getElementById('main-content')
let cardRecipient = ''

document.addEventListener('DOMContentLoaded', async () => {
  await getRecipient()

  console.log('inside eventlistener! cardRecipient: ', cardRecipient)
  console.log(typeof cardRecipient)
  createHTML()
})

async function getRecipient() {
  let params = new URLSearchParams(location.search)
  let emailAddress = params.get("email")

  const response = await fetch('/.netlify/functions/get_recipients');
  const recipients = await response.json();

  const recipient = recipients.filter((person) => {
    return person.email.toLowerCase() === emailAddress.toLowerCase()
  })[0]

  cardRecipient = {
    firstName: recipient.first_name,
    inPortland: recipient.home[0],
    location: recipient.home[1],
    personalMessage: recipient.personal_message
  }
}

function createHTML() {
  let html = ``

  let recipientName = `
    <p>To ${cardRecipient.firstName},</p>
    <p>What a wild ride 2025 has been! `

  let home = ''

  if (cardRecipient.inPortland === 'true') {
    home = `I'm so glad to be back in Portland and that I get to see you more often.... even if I have to travel <i>all the way</i> to ${cardRecipient.location} to do so. </p>`
  }
  else {
    home = `I'm back in Portland, and you're in ${cardRecipient.location}, but I'm hopeful that at some point in 2026 we'll find ourselves in the same place at the same time.</p>`
  }

  let customMessage = ''

  if (cardRecipient.personalMessage) {
    customMessage = `<p>${cardRecipient.personalMessage}</p>`
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
