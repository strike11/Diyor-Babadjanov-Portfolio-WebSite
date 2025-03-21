
function showAbout() {
switchSection('aboutSection');
}

function showPortfolio() {
  switchSection('portfolioSection');
}

function showLinks() {
  switchSection('contactsSection');
}

function showHome() {
  switchSection('mainSection');
}
function showSkills(){
 let element = document.getElementById("cont");
  switchSection('skillsSection');
  element.style.backgroundImage = "url('img/bg.png')";
}
function switchSection(sectionId) {
  const sections = ['mainSection', 'aboutSection', 'portfolioSection', 'contactsSection','skillsSection'];
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
