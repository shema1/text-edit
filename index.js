
const btnColor = document.querySelector('.change-color');
const btnFont = document.querySelector('.change-font');
const btnBg = document.querySelector('.change-bg');
const btnParagraph = document.querySelector('.create-paragraph');
const btnJson = document.querySelector('.to-json');

const selectText = () => {
    const range = window.getSelection().getRangeAt(0);
    const currentSelection = window.getSelection();
    const startSelection = window.getSelection().anchorOffset;
    const endSelection = window.getSelection().extentOffset;

    if (currentSelection.anchorNode.parentNode.closest('span') === null) {
        const span = document.createElement('span');
        span.setAttribute('class', 'selected');
        const selectionContents = range.extractContents();
        span.appendChild(selectionContents);
        range.insertNode(span);
    } else {
        const main = document.querySelector('.text');
        const spanBlock = currentSelection.anchorNode.parentNode.closest('span').textContent;

        const mainSpan = document.createElement('span');
        mainSpan.innerHTML = window.getSelection().toString();
        mainSpan.setAttribute('class', 'selected');

        const beforeSpan = document.createElement('span');
        beforeSpan.innerHTML = getString(spanBlock, 0, startSelection);

        const afterSpan = document.createElement('span');
        afterSpan.innerHTML = getString(spanBlock, endSelection, spanBlock.length);

        const oldSpan = currentSelection.anchorNode.parentNode.closest('span');
        mainSpan.style.cssText = oldSpan.style.cssText;
        beforeSpan.style.cssText = oldSpan.style.cssText;
        afterSpan.style.cssText = oldSpan.style.cssText;

        main.insertBefore(mainSpan, oldSpan.nextSibling);
        beforeSpan.textContent !== '' ? main.insertBefore(beforeSpan, mainSpan) : '';
        afterSpan.textContent !== '' ? main.insertBefore(afterSpan, mainSpan.nextSibling) : '';
        currentSelection.anchorNode.parentNode.closest('span').remove();
    }
};

const combineSimilarStyle = (selectedElem) => {
    nextElem = selectedElem.nextElementSibling;
    prevElem = selectedElem.previousElementSibling;

    if (selectedElem.nextElementSibling !== null && selectedElem.style.cssText === nextElem.style.cssText) {
        selectedElem.textContent += nextElem.textContent;
        nextElem.remove();
    }
    if (selectedElem.previousElementSibling !== null && selectedElem.style.cssText === prevElem.style.cssText) {
        selectedElem.textContent = prevElem.textContent + selectedElem.textContent;
        prevElem.remove();
    }
};

const getString = (text, startIndex, endIndex) => {
    let string = '';
    for (let i = startIndex; i < endIndex; i++) {
        string += text[i];
    }
    return string;
};

const checkSelection = () => {
    if (window.getSelection().isCollapsed) {
        return false;
    }
    return true;
};


const changeColor = () => {
    if (!checkSelection()) return alert('Select text');
    selectText();
    const selectedElem = document.querySelector('.selected');
    selectedElem.style.color = '#a0537b';
    combineSimilarStyle(selectedElem);
    selectedElem.classList.remove('selected');
};

const changeFont = () => {
    if (!checkSelection()) return alert('Select text');
    selectText();
    const selectedElem = document.querySelector('.selected');
    selectedElem.style.fontSize = '60px';
    combineSimilarStyle(selectedElem);
    selectedElem.classList.remove('selected');
};

const changeBg = () => {
    if (!checkSelection()) return alert('Select text');
    selectText();
    const selectedElem = document.querySelector('.selected');
    selectedElem.style.background = '#f8bbd0';
    selectedElem.style.borderRadius = '3px';
    combineSimilarStyle(selectedElem);
    selectedElem.classList.remove('selected');
};

const creatParagraph = () => {
    if (!checkSelection()) return alert('Select text');
    const range = window.getSelection().getRangeAt(0);
    const br = document.createElement('br');
    range.insertNode(br);
};

const toJson = () => {
    if (!checkSelection()) return alert('Select text');
    let firstSpan = window.getSelection().anchorNode.parentNode.closest('span');
    const arrObj = [];
    while (firstSpan !== null) {
        const { background, fontSize, color } = firstSpan.style;
        const obj = {
            text: firstSpan.textContent,
            color,
            background,
            fontSize,
        };
        firstSpan = firstSpan.nextElementSibling;
        arrObj.push(obj);
    }
    console.log(JSON.stringify(arrObj));
};

btnColor.addEventListener('click', changeColor);
btnFont.addEventListener('click', changeFont);
btnBg.addEventListener('click', changeBg);
btnJson.addEventListener('click', toJson);
btnParagraph.addEventListener('click', creatParagraph);
