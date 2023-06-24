import {tblEl, tbodylEl, blackTurn, whiteTurn, move, findCell, findRow} from "./main.js";

let rowIndex;
let cellIndex;

let mouseDownTar;
let tdKing = [];

let king = false;

tbodylEl.on('mousedown', '.piece .king', (eventData) => {
    king = true;

    let targetEl = $(eventData.target);
    let classname = targetEl[0].className;

    mouseDownTar = targetEl;

    // console.log("MouseDown", targetEl);

    cellIndex = findCell(targetEl);
    rowIndex = findRow(targetEl);

    if (/king/.test(classname) && /black/.test(classname) && blackTurn) {
        showAvailableSpots(rowIndex, cellIndex, "black");

    }
    if (/king/.test(classname) && /white/.test(classname) && whiteTurn) {
        showAvailableSpots(rowIndex,cellIndex, "white");

    }

});


tbodylEl.on('mouseup', 'td', (eventData) => {
    // console.log("MouseUp", mouseDownTar);

    tdKing.forEach(el => {
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

    king = false;
    tdKing = [];
});



function showAvailableSpots(rowIndex, cellIndex, color) {
    tdKing = [];

    let oppositeClass = color === 'black' ? 'white' : 'black'

    for (let i = rowIndex+1; i <= rowIndex+1; i++) {
        let tdElm1 = tblEl.find(`tr:nth-child(${i + 1})`).find(`td:nth-child(${cellIndex + 1})`);
        if (/empty/.test($(tdElm1).attr('class'))) {
            $(tdElm1).addClass('spot');
            tdKing.push(tdElm1);

        } else if (/piece/.test($(tdElm1).attr('class'))) {
            if ($(tdElm1).find('span').hasClass(oppositeClass)) {
                $(tdElm1).addClass('cut');
                tdKing.push(tdElm1);
            }
            break;
        }
    }

    for (let i=rowIndex-1; i >= rowIndex-1; i--) {
        let tdElm2 = tblEl.find(`tr:nth-child(${i + 1})`).find(`td:nth-child(${cellIndex + 1})`);
        if (/empty/.test($(tdElm2).attr('class'))) {
            $(tdElm2).addClass('spot');
            tdKing.push(tdElm2);

        } else if (/piece/.test($(tdElm2).attr('class'))) {
            if ($(tdElm2).find('span').hasClass(oppositeClass)) {
                $(tdElm2).addClass('cut');
                tdKing.push(tdElm2);
            }
            break;
        }
    }

    for (let j = cellIndex+1; j <= cellIndex+1; j++) {
        let tdElm3 = tblEl.find(`tr:nth-child(${rowIndex + 1})`).find(`td:nth-child(${j + 1})`);
        // console.log(tdElm3);
        // console.log(/piece/.test($(tdElm3).attr('class')));
        // console.log(/empty/.test($(tdElm3).attr('class')));
        // console.log($(tdElm3).attr('class'));
        if (/empty/.test($(tdElm3).attr('class'))) {
            $(tdElm3).addClass('spot');
            tdKing.push(tdElm3);

        } else if (/piece/.test($(tdElm3).attr('class'))) {
            if ($(tdElm3).find('span').hasClass(oppositeClass)) {
                $(tdElm3).addClass('cut');
                tdKing.push(tdElm3);
            }
            break;
        }
    }


    for (let j = cellIndex-1; j >= cellIndex-1; j--) {
        let tdElm4 = tblEl.find(`tr:nth-child(${rowIndex + 1})`).find(`td:nth-child(${j + 1})`);
        if (/empty/.test($(tdElm4).attr('class'))) {
            $(tdElm4).addClass('spot');
            tdKing.push(tdElm4);

        } else if (/piece/.test($(tdElm4).attr('class'))) {
            if ($(tdElm4).find('span').hasClass(oppositeClass)) {
                $(tdElm4).addClass('cut');
                tdKing.push(tdElm4);
            }
            break;
        }
    }

    for (let i = rowIndex+1, j = cellIndex+1; i <= rowIndex+1, j <= cellIndex+1; i++, j++) {
        let tdElm5 = tblEl.find(`tr:nth-child(${i + 1})`).find(`td:nth-child(${j + 1})`);

        if (/empty/.test($(tdElm5).attr('class'))) {
            $(tdElm5).addClass('spot');
            tdKing.push(tdElm5);

        } else if (/piece/.test($(tdElm5).attr('class'))) {
            // console.log(oppositeClass);
            // console.log($(tdElm5).find('span').hasClass(oppositeClass));
            // console.log(/`${oppositeClass}`/.test($(tdElm5).find('span').attr('class')));
            if ($(tdElm5).find('span').hasClass(oppositeClass)) {
                $(tdElm5).addClass('cut');
                tdKing.push(tdElm5);
            }
            break;
        }
    }

    for (let i = rowIndex+1, j = cellIndex-1; i <= rowIndex+1, j >= cellIndex-1; i++, j--) {
        let tdElm6 = tblEl.find(`tr:nth-child(${i + 1})`).find(`td:nth-child(${j + 1})`);
        if (/empty/.test($(tdElm6).attr('class'))) {
            $(tdElm6).addClass('spot');
            tdKing.push(tdElm6);

        } else if (/piece/.test($(tdElm6).attr('class'))) {
            if ($(tdElm6).find('span').hasClass(oppositeClass)) {
                $(tdElm6).addClass('cut');
                tdKing.push(tdElm6);
            }
            break;
        }

    }

    for (let i = rowIndex-1, j = cellIndex+1; i >= rowIndex-1, j <= cellIndex+1; i--, j++) {
        let tdElm7 = tblEl.find(`tr:nth-child(${i + 1})`).find(`td:nth-child(${j + 1})`);
        if (/empty/.test($(tdElm7).attr('class'))) {
            $(tdElm7).addClass('spot');
            tdKing.push(tdElm7);

        } else if (/piece/.test($(tdElm7).attr('class'))) {
            if ($(tdElm7).find('span').hasClass(oppositeClass)) {
                $(tdElm7).addClass('cut');
                tdKing.push(tdElm7);
            }
            break;
        }
    }

    for (let i = rowIndex-1, j = cellIndex-1; i >= rowIndex-1, j >= cellIndex-1; i--, j--) {
        let tdElm8 = tblEl.find(`tr:nth-child(${i + 1})`).find(`td:nth-child(${j + 1})`);
        if (/empty/.test($(tdElm8).attr('class'))) {
            $(tdElm8).addClass('spot');
            tdKing.push(tdElm8);

        } else if (/piece/.test($(tdElm8).attr('class'))) {
            if ($(tdElm8).find('span').hasClass(oppositeClass)) {
                $(tdElm8).addClass('cut');
                tdKing.push(tdElm8);
            }
            break;
        }
    }

    setTimeout(() => {
        if (tdKing?.length > 0) {
            move(tdKing, 'king', color);
        }
    }, 0);
}
