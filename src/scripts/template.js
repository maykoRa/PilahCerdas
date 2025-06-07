export function generateMainNavigationListTemplate() {
  return `
    <li><a id="home-page-button" class="home-page-button" href="#/">HOME</a></li>
    <li><a id="about-page-button" class="about-page-button"  href="#/about">ABOUT</a></li>
    <div class="brand-name">
      <a class="brand-name__link" href="#/">
        <img class="brand-name__link__image" src="images/logo.png" alt="PilahCerdas Logo" />
      </a>
    </div>
    <li><a id="news-list-button" class="story-list-button" href="#/news">NEWS</a></li>
    <li><a id="contact-page-button" class="contact-page-button"  href="#/contact">CONTACT</a></li> `;
}