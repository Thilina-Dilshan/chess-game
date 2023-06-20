import {tblEl, tbodylEl, blackTurn, whiteTurn, move, findCell, findRow} from "./main.js";

let rowIndex;
let cellIndex;

let mouseDownTar;

let tdKnight = [];
let knight = false;

tbodylEl.on('mousedown', '.knight', (eventData) => {
    let newCellIndex;
    knight = true;

    const targetEl = $(eventData.target);
    let classname = targetEl[0].className;
    mouseDownTar = targetEl.parents('td');

    cellIndex = findCell(targetEl);
    rowIndex = findRow(targetEl);

    newCellIndex = [(cellIndex - 2), (cellIndex - 1), (cellIndex + 1), (cellIndex + 2)];

    if (/knight/.test(classname) && /black/.test(classname) && blackTurn) {
        showAvailableSpots(newCellIndex, "black");
    }

    if (/knight/.test(classname) && /white/.test(classname) && whiteTurn) {
        showAvailableSpots(newCellIndex, "white");
    }
});

tbodylEl.on('mouseup', 'td', (eventData) => {
    tdKnight?.forEach(el => {
        // console.log(el);
        if (!knight) {
         return;
        }

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
    tdKnight = [];
    knight = false;
});


function removeAppliedClasses(newCellIndex) {
    let td = [];
    newCellIndex.forEach(index => {
        let gap = index - cellIndex < 0 ? (index - cellIndex) * -1 : (index - cellIndex);
        let row;
        let tdElm;

        switch (gap) {
            case 1:
                row = [-2, 2];
                for (let i = 0; i < row.length; i++) {
                    tdElm = tblEl.find(`tr:nth-child(${rowIndex + row[i] + 1})`).find(`td:nth-child(${index + 1})`);
                    if (tdElm.hasClass('spot')) {
                        tdElm.removeClass('spot');
                    }

                    if (tdElm.hasClass('cut')) {
                        tdElm.removeClass('cut');
                    }
                    if (tdElm?.length > 0) {
                        td.push(tdElm);
                    }
                }
                break;
            case 2:
                row = [-1, 1];
                for (let i = 0; i < row.length; i++) {
                    tdElm = tblEl.find(`tr:nth-child(${rowIndex + row[i] + 1})`).find(`td:nth-child(${index + 1})`);
                    if (tdElm.hasClass('spot')) {
                        tdElm.removeClass('spot');
                    }
                    if (tdElm.hasClass('cut')) {
                        tdElm.removeClass('cut');
                        // console.log("Cut removing")
                    }
                    if (tdElm?.length > 0) {
                        td.push(tdElm);
                    }
                }
        }
    });
    setTimeout(()=>{
        remove(td);
    },0)
}


function showAvailableSpots(newCellIndex, color) {
    tdKnight = [];
    newCellIndex.forEach(index => {
        let gap = index - cellIndex < 0 ? (index - cellIndex) * -1 : (index - cellIndex);
        let row;

        let oppositeClass = color === 'black' ? 'white' : 'black'
        switch (gap) {
            case 1:
                row = [-2, 2];
                for (let i = 0; i < row.length; i++) {
                    let tdElm1 = tblEl.find(`tr:nth-child(${rowIndex + row[i] + 1})`).find(`td:nth-child(${index + 1})`);
                    if ($(tdElm1).hasClass('empty')) {
                        $(tdElm1).addClass('spot');
                        tdKnight.push(tdElm1);

                    } else if ($(tdElm1).hasClass('piece')) {
                        if ($(tdElm1).find('span').hasClass(`${oppositeClass}`)) {
                            $(tdElm1).addClass('cut');
                            tdKnight.push(tdElm1);
                        }
                    }
                }
                break;
            case 2:
                row = [-1, 1];
                for (let i = 0; i < row.length; i++) {
                    let tdElm2 = tblEl.find(`tr:nth-child(${rowIndex + row[i] + 1})`).find(`td:nth-child(${index + 1})`);
                    if ($(tdElm2).hasClass('empty')) {
                        $(tdElm2).addClass('spot');
                        tdKnight.push(tdElm2);

                    } else if ($(tdElm2).hasClass('piece')) {
                        if ($(tdElm2).find('span').hasClass(`${oppositeClass}`)) {
                            $(tdElm2).addClass('cut');
                            tdKnight.push(tdElm2);

                        }
                    }

                }
        }
    });

    setTimeout(() => {
        if (tdKnight?.length > 0) {
            move(tdKnight, 'knight', color);
        }
    }, 0);
}

function remove(td) {
    td.forEach(el => {
        if (el.hasClass('ui-droppable')) {
            setTimeout(() => {
                // console.log("Has droppable");
                el.droppable('destroy');
            }, 0);
        }
    });
}
