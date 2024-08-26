let tabCount = 0;

document.addEventListener('DOMContentLoaded', () => {
    const tabsHeader = document.getElementById('tabsHeader');
    const contentArea = document.getElementById('content');
    const newTabButton = document.getElementById('newTabButton');

    // Function to create a new tab
    function createNewTab() {
        tabCount++;
        const tabId = `tab-${tabCount}`;
        const tabContentId = `content-${tabCount}`;

        // Create new tab element
        const tabElement = document.createElement('div');
        tabElement.classList.add('tab');
        tabElement.id = tabId;
        tabElement.textContent = `Tab ${tabCount}`;
        tabElement.addEventListener('click', () => activateTab(tabId));

        // Create new tab content
        const tabContent = document.createElement('div');
        tabContent.id = tabContentId;
        tabContent.classList.add('tab-content');
        tabContent.textContent = `Content for Tab ${tabCount}`;

        // Append new tab and content
        tabsHeader.appendChild(tabElement);
        contentArea.appendChild(tabContent);

        // Activate the new tab
        activateTab(tabId);
    }

    // Function to activate a tab
    function activateTab(tabId) {
        document.querySelectorAll('.tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.tab-content').forEach(content => {
            content.style.display = 'none';
        });

        document.getElementById(tabId).classList.add('active');
        document.getElementById(`content-${tabId.split('-')[1]}`).style.display = 'block';
    }

    // Add event listener for the "New Tab" button
    newTabButton.addEventListener('click', createNewTab);

    // Initialize with one tab
    createNewTab();
});
