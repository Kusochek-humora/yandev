"use strict";
document.addEventListener('DOMContentLoaded', function () {
    const activeTabId = localStorage.getItem('activeTab');
    if (activeTabId) {
        const activeTabContent = document.querySelector(`[data-content="${activeTabId}"]`);
        const activeTabTrigger = document.querySelector(`[data-tab="${activeTabId}"]`);
        if (activeTabContent && activeTabTrigger) {
            activeTabContent.classList.add('active');
            activeTabTrigger.classList.add('active');
        }
    }
    const tabsWrapper = document.querySelector('.sidebar__nav');
    const tabsTrigger = document.querySelectorAll('.sidebar__list-button');
    const tabsContents = document.querySelectorAll('.panel__item');
    function tabHandler(e) {
        const target = e.target;
        if (target && target.hasAttribute('data-tab')) {
            tabsContents.forEach(content => content.classList.remove('active'));
            tabsTrigger.forEach(tab => tab.classList.remove('active'));
            target.classList.add('active');
            const contentToShow = document.querySelector(`[data-content="${target.dataset.tab}"]`);
            contentToShow.classList.add('active');
            localStorage.setItem('activeTab', target.dataset.tab);
        };
    };
    tabsWrapper.addEventListener('click', tabHandler);

    const overlayPanel = document.getElementById('overlay');
    const buttonModalClose = document.querySelectorAll('.modal-panel__close');
    const modals = document.querySelectorAll('.modal-panel');
    buttonModalClose.forEach(btn => {
        btn.addEventListener('click', modalClose);

    });
    function showModal(modal_name) {
        modals.forEach(modal => modal.classList.remove('active'));
        document.querySelector(`[data-modal="${modal_name}"]`).classList.add('active');
        overlayPanel.classList.add('active');
    }
    document.body.addEventListener('click', function (e) {
        const target = e.target;
        if (target && target.hasAttribute('data-modal-btn')) {
            overlayPanel.classList.add('active');
            showModal(target.dataset.modalBtn);
        }

    });
    function modalClose(e) {
        overlayPanel.classList.remove('active');
        const target = e.target;
        document.querySelector(`[data-modal="${target.dataset.close}"]`).classList.remove('active');
    }
    function overlayClose(e) {
        const target = e.target;
        target.classList.remove('active');
        document.querySelectorAll(`[data-modal]`).forEach(modal => { modal.classList.remove('active') });
    }
    overlayPanel.addEventListener('click', overlayClose);

});