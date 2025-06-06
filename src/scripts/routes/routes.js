import HomePage from '../pages/home/home-page';
import NewsPage from '../pages/news/news-page';
import NewsDetailPage from '../pages/news-detail/news-detail-page';
import AboutPage from '../pages/about/about-page';
import ContactPage from '../pages/contact/contact-page';

const routes = {
  '/': (params) => new HomePage(params),
  '/upload': (params) => new UploadPage(params),
  '/news': (params) => new NewsPage(params),
  '/about': (params) => new AboutPage(params),
  '/contact': (params) => new ContactPage(params),
  '/news-detail/:id': (params) => new NewsDetailPage(params), 
};
//params adalah sebuah objek yang dirancang untuk menampung parameter yang diekstrak dari URL, terutama untuk rute-rute dinamis.

export default routes;
