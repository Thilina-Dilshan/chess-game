import {tblEl, tbodylEl, blackTurn, whiteTurn, move, findCell, findRow} from "./main.js";

let rowIndex;
let cellIndex;

let mouseDownTar;
let td = [];


tbodylEl.on('mousedown', '.piece .bishop', (eventData) => {
    let newCellIndex;

    const targetEl = $(eventData.target);
    let classname = targetEl[0].className;

    mouseDownTar = targetEl;

    cellIndex = findCell(targetEl);
    rowIndex = findRow(targetEl);

    console.log(rowIndex, cellIndex);

    if (/bishop/.test(classname) && /black/.test(classname) && blackTurn) {
        showAvailableSpots(rowIndex, cellIndex, "black");

    }
    if (/bishop/.test(classname) && /white/.test(classname) && whiteTurn) {
        showAvailableSpots(rowIndex,cellIndex, "white");

    }

});


tbodylEl.on('mouseup', 'td .bishop', (eventData) => {

    td.forEach(el => {
        setTimeout(() => {
            if ($(el).hasClass('spot')) {
                $(el).removeClass('spot');
            }
            if ($(el).hasClass('cut')) {
                $(el).removeClass('cut');
            }
            if ($(el).hasClass('ui-droppable')) {
                el.droppable('destroy');
            }
        }, 0);
    });
});



function showAvailableSpots(rowIndex, cellIndex, color) {
    td = [];
    let oppositeClass = color === 'black' ? 'white' : 'black'

    for (let i = rowIndex, j = cellIndex; i <= 7, j <= 7; i++, j++) {
        let tdElm1 = tblEl.find(`tr:nth-child(${i + 1})`).find(`td:nth-child(${j + 1})`);
        if ($(tdElm1).hasClass('empty')) {
            $(tdElm1).addClass('spot');
            td.push(tdElm1);

        } else if ($(tdElm1).hasClass('piece')) {
            if ($(tdElm1).find('span').hasClass(`${oppositeClass}`)) {
                $(tdElm1).addClass('cut');
                td.push(tdElm1);
            }
        }
    }

    for (let i = rowIndex, j = cellIndex; i <= 7, j >= 0; i++, j--) {
        let tdElm2 = tblEl.find(`tr:nth-child(${i + 1})`).find(`td:nth-child(${j + 1})`);
        if ($(tdElm2).hasClass('empty')) {
            $(tdElm2).addClass('spot');
            td.push(tdElm2);

        } else if ($(tdElm2).hasClass('piece')) {
            if ($(tdElm2).find('span').hasClass(`${oppositeClass}`)) {
                $(tdElm2).addClass('cut');
                td.push(tdElm2);
            }
        }

    }

    for (let i = rowIndex, j = cellIndex; i >= 0, j <= 7; i--, j++) {
        let tdElm3 = tblEl.find(`tr:nth-child(${i + 1})`).find(`td:nth-child(${j + 1})`);
        if ($(tdElm3).hasClass('empty')) {
            $(tdElm3).addClass('spot');
            td.push(tdElm3);

        } else if ($(tdElm3).hasClass('piece')) {
            if ($(tdElm3).find('span').hasClass(`${oppositeClass}`)) {
                $(tdElm3).addClass('cut');
                td.push(tdElm3);
            }
        }
    }

    for (let i = rowIndex, j = cellIndex; i >= 0, j >= 0; i--, j--) {
        let tdElm4 = tblEl.find(`tr:nth-child(${i + 1})`).find(`td:nth-child(${j + 1})`);
        if ($(tdElm4).hasClass('empty')) {
            $(tdElm4).addClass('spot');
            td.push(tdElm4);

        } else if ($(tdElm4).hasClass('piece')) {
            if ($(tdElm4).find('span').hasClass(`${oppositeClass}`)) {
                $(tdElm4).addClass('cut');
                td.push(tdElm4);
            }
        }
    }

    setTimeout(() => {
        if (td?.length > 0) {
            move(td, 'bishop', color);
        }
    }, 0);
}
