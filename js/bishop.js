import {tblEl, tbodylEl, blackTurn, whiteTurn, move, findCell, findRow} from "./main.js";

let rowIndex;
let cellIndex;

let mouseDownTar;
let tdBishop = [];
let bishop = false;

tbodylEl.on('mousedown', '.piece .bishop', (eventData) => {
    let newCellIndex;
    bishop = true;

    let targetEl = $(eventData.target);
    let classname = targetEl[0].className;

    mouseDownTar = targetEl;
    console.log("MouseDown", mouseDownTar);
    cellIndex = findCell(targetEl);
    rowIndex = findRow(targetEl);

    if (/bishop/.test(classname) && /black/.test(classname) && blackTurn) {
        showAvailableSpots(rowIndex, cellIndex, "black");
    }

    if (/bishop/.test(classname) && /white/.test(classname) && whiteTurn) {
        showAvailableSpots(rowIndex,cellIndex, "white");

    }

});


tbodylEl.on('mouseup', 'td', (eventData) => {
    if (!bishop)return;
    console.log("MouseUp", mouseDownTar);
    tdBishop.forEach(el => {
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
    bishop = false;
    tdBishop = [];
});



function showAvailableSpots(rowIndex, cellIndex, color) {
    tdBishop = [];

    let oppositeClass = color === 'black' ? 'white' : 'black'
    for (let i = rowIndex+1, j = cellIndex+1; i <= 7, j <= 7; i++, j++) {
        let tdElm1 = tblEl.find(`tr:nth-child(${i + 1})`).find(`td:nth-child(${j + 1})`);

        if (/^empty$/.test($(tdElm1).attr('class'))) {
            $(tdElm1).addClass('spot');
            tdBishop.push(tdElm1);

        } else if (/^piece$/.test($(tdElm1).attr('class'))) {
            // console.log(oppositeClass);
            // console.log($(tdElm1).find('span').hasClass(oppositeClass));
            // console.log(/`${oppositeClass}`/.test($(tdElm1).find('span').attr('class')));
            if ($(tdElm1).find('span').hasClass(oppositeClass)) {
                $(tdElm1).addClass('cut');
                tdBishop.push(tdElm1);
            }
            break;
        }
    }

    for (let i = rowIndex+1, j = cellIndex-1; i <= 7, j >= 0; i++, j--) {
        let tdElm2 = tblEl.find(`tr:nth-child(${i + 1})`).find(`td:nth-child(${j + 1})`);
        if (/^empty$/.test($(tdElm2).attr('class'))) {
            $(tdElm2).addClass('spot');
            tdBishop.push(tdElm2);

        } else if (/^piece$/.test($(tdElm2).attr('class'))) {
            if ($(tdElm2).find('span').hasClass(oppositeClass)) {
                $(tdElm2).addClass('cut');
                tdBishop.push(tdElm2);
            }
            break;
        }

    }

    for (let i = rowIndex-1, j = cellIndex+1; i >= 0, j <= 7; i--, j++) {
        let tdElm3 = tblEl.find(`tr:nth-child(${i + 1})`).find(`td:nth-child(${j + 1})`);
        if (/^empty$/.test($(tdElm3).attr('class'))) {
            $(tdElm3).addClass('spot');
            tdBishop.push(tdElm3);

        } else if (/^piece$/.test($(tdElm3).attr('class'))) {
            if ($(tdElm3).find('span').hasClass(oppositeClass)) {
                $(tdElm3).addClass('cut');
                tdBishop.push(tdElm3);
            }
            break;
        }
    }

    for (let i = rowIndex-1, j = cellIndex-1; i >= 0, j >= 0; i--, j--) {
        let tdElm4 = tblEl.find(`tr:nth-child(${i + 1})`).find(`td:nth-child(${j + 1})`);
        if (/^empty$/.test($(tdElm4).attr('class'))) {
            $(tdElm4).addClass('spot');
            tdBishop.push(tdElm4);

        } else if (/^piece$/.test($(tdElm4).attr('class'))) {
            if ($(tdElm4).find('span').hasClass(oppositeClass)) {
                $(tdElm4).addClass('cut');
                tdBishop.push(tdElm4);
            }
            break;
        }
    }

    setTimeout(() => {
        if (tdBishop?.length > 0) {
            move(tdBishop, 'bishop', color);
        }
    }, 0);
}
