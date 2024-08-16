function showAbout() {
  switchSection('aboutSection');
}

function showPortfolio() {
  switchSection('portfolioSection');
}

function showContacts() {
  switchSection('contactsSection');
}

function showHome() {
  switchSection('mainSection');
}

function switchSection(sectionId) {
  const sections = ['mainSection', 'aboutSection', 'portfolioSection', 'contactsSection'];
  sections.forEach(id => {
    const section = document.getElementById(id);
    if (sectionId === id) {
      section.style.display = 'block';
      section.classList.add('animate-fade-in');
    } else {
      section.style.display = 'none';
      section.classList.remove('animate-fade-in');
    }
  });
}
