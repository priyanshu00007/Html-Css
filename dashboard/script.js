// Toggle sidebar
const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebar = document.getElementById('sidebar');
const closeSidebar = document.getElementById('close-sidebar');
const mainContent = document.getElementById('main-content');
const contentArea = document.getElementById('content-area');

sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('expanded');
    mainContent.style.marginLeft = sidebar.classList.contains('expanded') ? '250px' : '0';
});

closeSidebar.addEventListener('click', () => {
    sidebar.classList.remove('expanded');
    mainContent.style.marginLeft = '0';
});

// Handle sidebar navigation
const links = document.querySelectorAll('#sidebar nav ul li a');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = e.target.getAttribute('data-section');
        loadSection(section);
    });
});

// Load section content
function loadSection(section) {
    let htmlContent = '';

    switch (section) {
        case 'dashboard':
            htmlContent = `
                <div class="dashboard-card">
                    <h2>Dashboard</h2>
                    <div class="chart-card">
                        <h3>Monthly Profit Analysis</h3>
                        <canvas id="profitChart"></canvas>
                        <p>Total Profit: $52,000</p>
                    </div>
                    <div class="chart-card">
                        <h3>Revenue vs Expenses</h3>
                        <canvas id="revenueChart"></canvas>
                        <p>Revenue: $120,000 | Expenses: $80,000</p>
                    </div>
                    <div class="chart-card">
                        <h3>Quarterly Growth</h3>
                        <canvas id="growthChart"></canvas>
                        <p>Growth Rate: 25%</p>
                    </div>
                </div>
            `;
            break;
        case 'users':
            htmlContent = `
                <div class="container">
                    <h2>Users</h2>
                    <p>Details about users will be shown here.</p>
                </div>
            `;
            break;
        case 'products':
            htmlContent = `
                <div class="container">
                    <h2>Products</h2>
                    <p>Details about products will be shown here.</p>
                </div>
            `;
            break;
        case 'transactions':
            htmlContent = `
                <div class="container">
                    <h2>Transactions</h2>
                    <p>Details about transactions will be shown here.</p>
                </div>
            `;
            break;
        case 'analytics':
            htmlContent = `
                <div class="container">
                    <h2>Analytics</h2>
                    <p>Details about analytics will be shown here.</p>
                </div>
            `;
            break;
        case 'revenue':
            htmlContent = `
                <div class="container">
                    <h2>Revenue</h2>
                    <p>Details about revenue will be shown here.</p>
                </div>
            `;
            break;
        case 'reports':
            htmlContent = `
                <div class="container">
                    <h2>Reports</h2>
                    <p>Details about reports will be shown here.</p>
                </div>
            `;
            break;
        case 'teams':
            htmlContent = `
                <div class="container">
                    <h2>Teams</h2>
                    <p>Details about teams will be shown here.</p>
                </div>
            `;
            break;
        case 'user':
            htmlContent = `
                <div class="container">
                    <h2>User</h2>
                    <p>Details about the user will be shown here.</p>
                </div>
            `;
            break;
        case 'settings':
            htmlContent = `
                <div class="container">
                    <h2>Settings</h2>
                    <p>Details about settings will be shown here.</p>
                </div>
            `;
            break;
    }

    contentArea.innerHTML = htmlContent;

    // Initialize charts
    if (section === 'dashboard') {
        initializeCharts();
    }
}

// Initialize charts
function initializeCharts() {
    const profitCtx = document.getElementById('profitChart').getContext('2d');
    new Chart(profitCtx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April'],
            datasets: [{
                label: 'Profit ($)',
                data: [10000, 12000, 15000, 17000],
                backgroundColor: '#42a5f5'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    new Chart(revenueCtx, {
        type: 'line',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [
                {
                    label: 'Revenue ($)',
                    data: [20000, 25000, 30000, 40000],
                    borderColor: '#42a5f5',
                    fill: false
                },
                {
                    label: 'Expenses ($)',
                    data: [15000, 18000, 22000, 25000],
                    borderColor: '#ff6384',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    const growthCtx = document.getElementById('growthChart').getContext('2d');
    new Chart(growthCtx, {
        type: 'doughnut',
        data: {
            labels: ['Q1', 'Q2', 'Q3', 'Q4'],
            datasets: [{
                data: [20, 30, 40, 50],
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0']
            }]
        },
        options: {
            responsive: true
        }
    });
}

// Initialize dashboard by default
initializeCharts();
