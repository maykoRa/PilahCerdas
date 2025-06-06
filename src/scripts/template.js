export function generateMainNavigationListTemplate() {
  return `
  <div id="left-navigation" class="main-navigation">
    <li><a id="home-page-button" class="home-page-button" href="#/">HOME</a></li>
    <li><a id="about-page-button" class="about-page-button"  href="#/about">ABOUT</a></li>
  </div>
  <div id="right-navigation" class="main-navigation">
    <li><a id="news-list-button" class="story-list-button" href="#/news">NEWS</a></li>
    <li><a id="contact-page-button" class="contact-page-button"  href="#/contact">CONTACT</a></li>
  </div> `;
}