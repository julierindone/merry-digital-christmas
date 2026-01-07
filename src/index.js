const mainContent = document.getElementById('main-content')
const nerdContent = document.getElementById('nerd-content')
const nerdStuff = document.getElementById('nerd-stuff')
let cardRecipient = null
let nerdStatus = 'hidden'
const cssTerm = document.getElementById('css-term')
const responsiveTerm = document.getElementById('responsive-term')
const postgresqlTerm = document.getElementById('postgresql-term')
let cssDefShown = false
let responsiveDefShown = false
let postgresqlDefShown = false

document.addEventListener('DOMContentLoaded', async () => {
  await getRecipient()
  createHTML()
})

document.addEventListener('click', function (e) {
  if (e.target.id === 'nerd-stuff') {
    showNerdStuff()
  }
  else if (e.target.id === 'css-term') {
    handleCssTermExpansion()
  }
  else if (e.target.id === 'responsive-term') {
    handleResponsiveTermExpansion()
  }
  else if (e.target.id === 'postgresql-term') {
    handlepostgresqlTermExpansion()
  }
})

function showNerdStuff() {
  if (nerdStatus === 'hidden') {
    nerdContent.style.display = 'block'
    nerdStuff.innerText = '[click to close]'
    nerdStatus = 'displayed'
  }
  else {
    nerdContent.style.display = 'none'
    nerdStuff.innerText = '[click for nerd stuff]'
    nerdStatus = 'hidden'
  }
}

function handleCssTermExpansion() {
  cssDefShown ? cssTerm.classList.remove('css-def') : cssTerm.classList.add('css-def')
  cssDefShown = !cssDefShown
}

function handleResponsiveTermExpansion() {
  responsiveDefShown ? responsiveTerm.classList.remove('responsive-def') : responsiveTerm.classList.add('responsive-def')
  responsiveDefShown = !responsiveDefShown
}

function handlepostgresqlTermExpansion() {
  postgresqlDefShown ? postgresqlTerm.classList.remove('postgresql-def') : postgresqlTerm.classList.add('postgresql-def')
  postgresqlDefShown = !postgresqlDefShown
}

async function getRecipient() {
  let params = new URLSearchParams(location.search)
  let emailAddress = params.get("email")

  if (!emailAddress) {
  }
  else {
    const response = await fetch('/.netlify/functions/get_recipients');
    const recipients = await response.json();

    const recipient = recipients.filter((person) => {
      return person.email.toLowerCase() === emailAddress.toLowerCase()
    })[0]

    if (recipient) {
      cardRecipient = {
        firstName: recipient.first_name,
        lastName: recipient.last_name,
        inPortland: recipient.home[0],
        location: recipient.home[1],
        personalMessage: recipient.personal_message
      }
    }
  }
}

function createHTML() {
  let html = ``

  if (cardRecipient === null) {
    mainContent.classList.add('default-message')
    mainContent.innerHTML = `
    	<p>This will be our year,</p>
			<p>Took a long time to come.</p>
			<p>- The Zombies</p>`
  }

  else {
    let recipientName = `
            <p>To ${cardRecipient.firstName},</p>
            <p>What a wild ride 2025 was! `

    let home = ''

    if (cardRecipient.lastName === 'Cain' || cardRecipient.lastName === 'Baber') {
      home = '</p>'
    }
    else if (cardRecipient.inPortland === 'true') {
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
    if (recipientName.length + home.length + customMessage.length < 340) {
      mainContent.classList.add('short-message')
    }
    else {
      // longer message (max 440ish) = font is smaller.
      mainContent.classList.add('long-message')
    }
    mainContent.innerHTML = recipientName + home + customMessage
  }
}
