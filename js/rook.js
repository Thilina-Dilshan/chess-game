import {tblEl, tbodylEl, blackTurn, whiteTurn, move, findCell, findRow} from "./main.js";

let rowIndex;
let cellIndex;

let mouseDownTar;
let tdRook = [];

let rook = false;

tbodylEl.on('mousedown', '.piece .rook', (eventData) => {
    rook = true;

    const targetEl = $(eventData.target);
    let classname = targetEl[0].className;

    mouseDownTar = targetEl;

    cellIndex = findCell(targetEl);
    rowIndex = findRow(targetEl);

    if (/rook/.test(classname) && /black/.test(classname) && blackTurn) {
        showAvailableSpots(rowIndex, cellIndex, "black");

    }
    if (/rook/.test(classname) && /white/.test(classname) && whiteTurn) {
        showAvailableSpots(rowIndex,cellIndex, "white");

    }

});


tbodylEl.on('mouseup', 'td', (eventData) => {

    tdRook.forEach(el => {
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

    rook = false;
    tdRook = [];
});



function showAvailableSpots(rowIndex, cellIndex, color) {
    tdRook = [];
    let oppositeClass = color === 'black' ? 'white' : 'black'

    for (let i = rowIndex+1; i <= 7; i++) {
        let tdElm1 = tblEl.find(`tr:nth-child(${i + 1})`).find(`td:nth-child(${cellIndex + 1})`);
        if (/^empty$/.test($(tdElm1).attr('class'))) {
            $(tdElm1).addClass('spot');
            tdRook.push(tdElm1);

        } else if (/^piece$/.test($(tdElm1).attr('class'))) {
            if ($(tdElm1).find('span').hasClass(oppositeClass)) {
                $(tdElm1).addClass('cut');
                tdRook.push(tdElm1);
            }
            break;
        }
    }

    for (let i=rowIndex-1; i >= 0; i--) {
        let tdElm2 = tblEl.find(`tr:nth-child(${i + 1})`).find(`td:nth-child(${cellIndex + 1})`);
        if (/empty/.test($(tdElm2).attr('class'))) {
            $(tdElm2).addClass('spot');
            tdRook.push(tdElm2);

        } else if (/piece/.test($(tdElm2).attr('class'))) {
            if ($(tdElm2).find('span').hasClass(oppositeClass)) {
                $(tdElm2).addClass('cut');
                tdRook.push(tdElm2);
            }
            break;
        }
    }

    for (let j = cellIndex+1; j <= 7; j++) {
        let tdElm3 = tblEl.find(`tr:nth-child(${rowIndex + 1})`).find(`td:nth-child(${j + 1})`);
        // console.log(tdElm3);
        // console.log(/piece/.test($(tdElm3).attr('class')));
        // console.log(/empty/.test($(tdElm3).attr('class')));
        // console.log($(tdElm3).attr('class'));
        if (/empty/.test($(tdElm3).attr('class'))) {
            $(tdElm3).addClass('spot');
            tdRook.push(tdElm3);

        } else if (/piece/.test($(tdElm3).attr('class'))) {
            if ($(tdElm3).find('span').hasClass(oppositeClass)) {
                $(tdElm3).addClass('cut');
                tdRook.push(tdElm3);
            }
            break;

        }
    }


    for (let j = cellIndex-1; j >= 0; j--) {
        let tdElm4 = tblEl.find(`tr:nth-child(${rowIndex + 1})`).find(`td:nth-child(${j + 1})`);
        if (/empty/.test($(tdElm4).attr('class'))) {
            $(tdElm4).addClass('spot');
            tdRook.push(tdElm4);

        } else if (/piece/.test($(tdElm4).attr('class'))) {
            if ($(tdElm4).find('span').hasClass(oppositeClass)) {
                $(tdElm4).addClass('cut');
                tdRook.push(tdElm4);
            }
            break;

        }
    }

    setTimeout(() => {
        if (tdRook?.length > 0) {
            move(tdRook, 'rook', color);
        }
    }, 0);
}
