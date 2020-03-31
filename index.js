
const btnColor = document.querySelector('.change-color');
const btnFont = document.querySelector('.change-font');
const btnBg = document.querySelector('.change-bg');
const btnParagraph = document.querySelector('.create-paragraph');
const btnJson = document.querySelector('.to-json');
const main = document.querySelector('.text');

const selectText = () => {
  document.querySelector('br') ? document.querySelector('br').remove() : '';

  const currentSelection = window.getSelection();
  let startSelection = window.getSelection().anchorOffset;
  let endSelection = window.getSelection().extentOffset;

  const beforeSpan = document.createElement('span');
  const mainSpan = document.createElement('span');
  const afterSpan = document.createElement('span');

  if (currentSelection.anchorNode.parentNode === currentSelection.extentNode.parentNode) {
    if (endSelection < startSelection) {
      const tempVar = endSelection;
      endSelection = startSelection;
      startSelection = tempVar;
    }
    const spanBlock = currentSelection.anchorNode.parentNode.closest('span').innerHTML;

    mainSpan.innerHTML = window.getSelection().toString();
    mainSpan.setAttribute('class', 'selected');
    beforeSpan.innerHTML = getString(spanBlock, 0, startSelection);
    afterSpan.innerHTML = getString(spanBlock, endSelection, spanBlock.length);

    const oldSpan = currentSelection.anchorNode.parentNode.closest('span');
    mainSpan.style.cssText = oldSpan.style.cssText;
    beforeSpan.style.cssText = oldSpan.style.cssText;
    afterSpan.style.cssText = oldSpan.style.cssText;

    main.insertBefore(mainSpan, oldSpan.nextSibling);
    beforeSpan.textContent !== '' ? main.insertBefore(beforeSpan, mainSpan) : '';
    afterSpan.textContent !== '' ? main.insertBefore(afterSpan, mainSpan.nextSibling) : '';

    currentSelection.anchorNode.parentNode.closest('span').remove();
  } else {
    let startSpan = currentSelection.anchorNode.parentNode;
    const endSpan = currentSelection.extentNode.parentNode;
    startSpan.classList.add('start');
    endSpan.classList.add('end');

    while (startSpan !== endSpan) {
      startSpan.classList.add('selecteList');
      startSpan = startSpan.nextElementSibling;
      startSpan.classList.add('selecteList');
    }

    beforeSpan.innerHTML = getString(currentSelection.anchorNode.parentNode.textContent, 0, startSelection);
    beforeSpan.style.cssText = currentSelection.anchorNode.parentNode.style.cssText;
    currentSelection.anchorNode.parentNode.innerText = getString(currentSelection.anchorNode.parentNode.textContent, startSelection, currentSelection.anchorNode.length);

    afterSpan.innerHTML = getString(currentSelection.extentNode.parentNode.textContent, endSelection, currentSelection.extentNode.length);
    afterSpan.style.cssText = currentSelection.extentNode.parentNode.style.cssText;
    currentSelection.extentNode.parentNode.innerText = getString(currentSelection.extentNode.parentNode.textContent, 0, endSelection);

    main.insertBefore(beforeSpan, document.querySelector('.start'));
    main.insertBefore(afterSpan, document.querySelector('.end').nextSibling);


    document.querySelector('.start').classList.remove('start');
    endSpan.classList.remove('end');
  }
};


const combineSimilarStyle = () => {
  let element = document.querySelector('span');

  while (element !== null) {
    nextElem = element.nextElementSibling;
    prevElem = element.previousElementSibling;

    if (nextElem && element.style.cssText
      === nextElem.style.cssText) {
      element.textContent += nextElem.textContent;
      nextElem.remove();
    }
    if (prevElem && element.style.cssText === prevElem.style.cssText) {
      element.textContent = prevElem.textContent + element.textContent;
      prevElem.remove();
    }
    element = element.nextElementSibling;
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
  if (selectedElem) {
    selectedElem.style.color = '#a0537b';
    selectedElem.classList.remove('selected');
  } else {
    const selectedAllElem = document.querySelectorAll('.selecteList');
    selectedAllElem.forEach((elem) => {
      elem.style.color = '#a0537b';
      elem.classList.remove('selecteList');
    });
  }
  combineSimilarStyle();
};

const changeFont = () => {
  if (!checkSelection()) return alert('Select text');
  selectText();
  const selectedElem = document.querySelector('.selected');
  if (selectedElem) {
    selectedElem.style.fontSize = '60px';
    selectedElem.classList.remove('selected');
  } else {
    const selectedAllElem = document.querySelectorAll('.selecteList');
    selectedAllElem.forEach((elem) => {
      elem.style.fontSize = '60px';
      elem.classList.remove('selecteList');
    });
  }
  combineSimilarStyle();
};

const changeBg = () => {
  if (!checkSelection()) return alert('Select text');
  selectText();
  const selectedElem = document.querySelector('.selected');
  if (selectedElem) {
    selectedElem.style.background = '#f8bbd0';
    selectedElem.style.borderRadius = '3px';
    selectedElem.classList.remove('selected');
  } else {
    const selectedAllElem = document.querySelectorAll('.selecteList');
    selectedAllElem.forEach((elem) => {
      elem.style.background = '#f8bbd0';
      elem.style.borderRadius = '3px';
      elem.classList.remove('selecteList');
    });
  }
  combineSimilarStyle();
};

const creatParagraph = () => {
  if (!checkSelection()) return alert('Select text');
  selectText();
  const selectedElem = document.querySelector('.selected');
  const br = document.createElement('br');
  br.setAttribute('class', 'br');
  main.insertBefore(br, selectedElem.nextSibling);
  selectedElem.classList.remove('selected');
};


const toJson = () => {
  if (!checkSelection()) return alert('Select text');
  const select = window.getSelection();
  let checkPoint = select.anchorNode.parentNode.nextElementSibling;

  const arrObj = [];

  const fitstSpan = {
    text: getString(select.anchorNode.parentNode.textContent, select.anchorOffset, select.anchorNode.length),
    color: select.anchorNode.parentNode.style.color,
    background: select.anchorNode.parentNode.style.background,
    fontSize: select.anchorNode.parentNode.style.fontSize,
  };
  arrObj.push(fitstSpan);

  while (checkPoint !== select.extentNode.parentNode) {
    const { background, fontSize, color } = checkPoint.style;
    const obj = {
      text: checkPoint.textContent,
      color,
      background,
      fontSize,
    };
    checkPoint = checkPoint.nextElementSibling;
    arrObj.push(obj);
  }

  const lastSpan = {
    text: getString(select.extentNode.parentNode.textContent, 0, select.extentOffset),
    color: select.extentNode.parentNode.style.color,
    background: select.extentNode.parentNode.style.background,
    fontSize: select.extentNode.parentNode.style.fontSize,
  };
  arrObj.push(lastSpan);


  console.log(JSON.stringify(arrObj));
};

btnColor.addEventListener('click', changeColor);
btnFont.addEventListener('click', changeFont);
btnBg.addEventListener('click', changeBg);
btnJson.addEventListener('click', toJson);
btnParagraph.addEventListener('click', creatParagraph);
