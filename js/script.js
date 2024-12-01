  var aboutost = new Audio('sound/story.mp3');
    var skillsound = new Audio('sound/skills.mp3');
function showAbout() {
 aboutost.play();
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
aboutost.pause();
aboutost.currentTime = 0;
skillsound.play();
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
