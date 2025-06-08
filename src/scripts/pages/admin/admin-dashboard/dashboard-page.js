export default class AdminDashboardPage {
  async render() {
    return `
      <section class="admin-dashboard-section">
        <div class="dashboard-container">
          <h2>Admin Dashboard</h2>
          <p>Welcome to the admin dashboard! More content will be added here soon.</p>
          <button id="logout-button" class="logout-btn">Logout</button>
        </div>
      </section>
    `;
  }

  async afterRender() {
    console.log('Admin Dashboard Page afterRender called!');
    const logoutButton = document.getElementById('logout-button');

    logoutButton.addEventListener('click', () => {
      localStorage.removeItem('adminToken'); 
      window.location.hash = '/admin'; 
    });
  }
}