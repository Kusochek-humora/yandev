"use strict";
const URL = 'https://yanessa-dev.lol/api/'

const fetchingData = async (url, option = {}) => {
    const response = await fetch(url, option)
    return await response.json()
    // return [{order: 1, smth1: 'abc', smth2: 'abc', smth3: 'abc'}, {order:2, smth1: 'abc', smth2: 'abc', smth3: 'abc'}]
}

const renderTable = async (section = 'services') => { // data-content должен совпадать с path URL
    const renderContainer = document.querySelector(`[data-content="${section}"] .panel__table tbody`)
    if (!renderContainer) return

    const data = await fetchingData(URL + section);

    debugger
    data.forEach(obj => {
        const tr = renderContainer.insertRow(obj.order - 1) // опасная зависимость .order !!!
        let i = 0
        for (const key in obj) {
            const cellData = obj[key];
            const newCell = tr.insertCell(i++)
            const newText = document.createTextNode(cellData)
            newCell.appendChild(newText)
        }

        if (section === 'services') {
            const buttonEdit = document.createElement('button'),
                buttonDelete = document.createElement('button')

            buttonEdit.type = 'button'
            buttonDelete.type = 'button'

            // нужно вставить иконки
            buttonEdit.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.79007 15.2699L8.52007 11.8599C8.62635 11.3861 8.86574 10.9524 9.21007 10.6099L15.8801 3.99993C16.5565 3.3109 17.4748 2.91271 18.4401 2.88993C19.1681 2.8795 19.8701 3.1603 20.3901 3.66993C21.5263 5.01239 21.3796 7.01715 20.0601 8.17993L13.3901 14.8499C13.0476 15.1943 12.6139 15.4337 12.1401 15.5399L8.73007 16.2699H8.54007C8.29078 16.2795 8.05268 16.1661 7.903 15.9665C7.75332 15.7669 7.71111 15.5066 7.79007 15.2699ZM10.2701 11.6799C10.13 11.8157 10.0326 11.9895 9.99007 12.1799L9.50007 14.5099L11.8301 14.0099C12.0205 13.9674 12.1943 13.87 12.3301 13.7299L19.0001 7.05993C19.7308 6.47495 19.8758 5.42041 19.3301 4.65993C19.0911 4.43164 18.7704 4.3091 18.4401 4.31993C17.8706 4.34279 17.3326 4.58673 16.9401 4.99993L10.2701 11.6799Z" fill="black"></path>
                    <path d="M19.9101 10.9299C19.4981 10.9353 19.1655 11.268 19.1601 11.6799V17.3699C19.1735 18.1742 18.8633 18.9502 18.2993 19.5236C17.7352 20.0971 16.9645 20.42 16.1601 20.4199H6.63008C4.96745 20.3873 3.63519 19.0329 3.63008 17.3699V7.87993C3.65738 6.21502 5.01494 4.87971 6.68008 4.87993H12.3701C12.7843 4.87993 13.1201 4.54414 13.1201 4.12993C13.1201 3.71572 12.7843 3.37993 12.3701 3.37993H6.63008C4.13658 3.37978 2.10748 5.38658 2.08008 7.87993V17.3699C2.08008 19.8828 4.11718 21.9199 6.63008 21.9199H16.1201C18.6291 21.9144 20.6601 19.8789 20.6601 17.3699V11.6799C20.6547 11.268 20.322 10.9353 19.9101 10.9299Z" fill="black"></path>
                </svg>
            `
            buttonDelete.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18.79 7C18.3537 7 18 7.3537 18 7.79V16.63C18 18.4912 16.4912 20 14.63 20H8.95C7.0888 20 5.58 18.4912 5.58 16.63V7.79C5.58 7.3537 5.22631 7 4.79 7C4.3537 7 4 7.3537 4 7.79V16.63C4.02742 19.3719 6.25799 21.5801 9 21.58H14.68C17.4025 21.5529 19.6029 19.3525 19.63 16.63V7.79C19.6304 7.57152 19.5404 7.36262 19.3812 7.21294C19.2221 7.06326 19.008 6.98617 18.79 7Z" fill="#CC0000"></path>
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M18.79 5.58H4.79C4.3537 5.58 4 5.22631 4 4.79C4 4.35369 4.3537 4 4.79 4H7.44L8.62 2.72C9.07107 2.26141 9.68675 2.00218 10.33 2H13.25C13.8839 1.99999 14.4918 2.25179 14.94 2.7L16.14 4H18.79C19.2263 4 19.58 4.35369 19.58 4.79C19.58 5.22631 19.2263 5.58 18.79 5.58ZM13.25 3.58H10.33C10.1301 3.58007 9.93744 3.65499 9.79 3.79L9.6 3.99H13.98L13.79 3.79C13.6436 3.65326 13.4503 3.57807 13.25 3.58Z" fill="#CC0000"></path>
                    <path d="M8.04 8.79V11.79C8.04 12.2042 8.37579 12.54 8.79 12.54C9.20421 12.54 9.54 12.2042 9.54 11.79V8.79C9.54 8.37579 9.20421 8.04 8.79 8.04C8.37579 8.04 8.04 8.37579 8.04 8.79Z" fill="#CC0000"></path>
                    <path d="M11.04 8.79V16.79C11.04 17.2042 11.3758 17.54 11.79 17.54C12.2042 17.54 12.54 17.2042 12.54 16.79V8.79C12.54 8.37579 12.2042 8.04 11.79 8.04C11.3758 8.04 11.04 8.37579 11.04 8.79Z" fill="#CC0000"></path>
                    <path d="M14.04 8.79V11.79C14.04 12.2042 14.3758 12.54 14.79 12.54C15.2042 12.54 15.54 12.2042 15.54 11.79V8.79C15.54 8.37579 15.2042 8.04 14.79 8.04C14.3758 8.04 14.04 8.37579 14.04 8.79Z" fill="#CC0000"></path>
                </svg>
            `

            const newCellForBtnEdit = tr.insertCell(-1),
                newCellForBtnDelete = tr.insertCell(-1)

            newCellForBtnEdit.appendChild(buttonEdit)
            newCellForBtnDelete.appendChild(buttonDelete)
        }
    });
}


document.addEventListener('DOMContentLoaded', function () {
    // пока что рендер по 'DOMContentLoaded', далее распихаешь везде где надо
    renderTable()
});