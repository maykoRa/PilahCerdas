export default class NewsPage {
  async render(){
    console.log("news page");
  }
  async afterRender() {
    console.log('afterRender Halaman Utama dipanggil!');
  }

}