import {tblEl, tbodylEl, blackTurn, whiteTurn, findCell, findRow, move} from "./main.js";

let rowIndex;
let cellIndex;

let td = [];

let tdMov = [];
let tdCut = [];

tbodylEl.on('mousedown', '.piece .pawn', (eventData) => {
    let cutRowIndex;
    let cutCellIndex;
    let newRowIndex;
    let newCellIndex;

    const targetEl = $(eventData.target);
    let classname = targetEl[0].className;

    cellIndex = findCell(targetEl);
    rowIndex = findRow(targetEl);
    if (/pawn/.test(classname) && blackTurn) {
        if (/black/.test(classname)) {

            //find positions of cells
            if (cellIndex === 0) {
                cutCellIndex = [cellIndex + 1];
            } else if (cellIndex > 0 && cellIndex < 7) {
                cutCellIndex = [(cellIndex + 1), (cellIndex - 1)];
            } else if (cellIndex === 7) {
                cutCellIndex = [cellIndex - 1];
            }
            newCellIndex = [cellIndex];

            //find positions of rows
            cutRowIndex = [rowIndex + 1];
            if (classname.match('first')) {
                newRowIndex = [(rowIndex + 1), (rowIndex + 2)];
            } else {
                newRowIndex = [rowIndex + 1];
            }
        }
    } else if (/pawn/.test(classname) && whiteTurn) {
        if (/white/.test(classname)) {

            if (cellIndex === 0) {
                cutCellIndex = [cellIndex + 1];
            } else if (cellIndex > 0 && cellIndex < 7) {
                cutCellIndex = [(cellIndex + 1), (cellIndex - 1)];
            } else if (cellIndex === 7) {
                cutCellIndex = [cellIndex - 1];
            }
            newCellIndex = [cellIndex];

            //find positions of rows
            cutRowIndex = [rowIndex - 1];
            if (classname.match('first')) {
                newRowIndex = [(rowIndex - 1), (rowIndex - 2)];
            } else {
                newRowIndex = [rowIndex - 1];
            }
        }
    }


    if (newRowIndex?.length > 0 && newCellIndex?.length >= 0) {
        applyMovable(newRowIndex, newCellIndex);
    }
    if (cutRowIndex?.length > 0 && cutCellIndex?.length > 0) {
        showCutSpots(cutRowIndex, cutCellIndex);
    }

});

tbodylEl.on('mouseup', '.piece .pawn', (eventData) => {

    td.push(...tdMov, ...tdCut);

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

function applyMovable(rows, cell) {
    let tdElm;
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < cell.length; j++) {
            tdElm = tblEl.find(`tr:nth-child(${rows[i] + 1})`).find(`td:nth-child(${cell[j] + 1})`);
            if (tdElm.hasClass('empty')) {
                tdElm.addClass('spot');
                tdMov.push(tdElm);

                if (blackTurn) {
                    move(tdMov,'pawn','black');
                }
                if (whiteTurn) {
                    move(tdMov,'pawn','white');
                }
            }
        }
    }
}


function showCutSpots(rows, cells) {
    let tdElm;
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < cells.length; j++) {
            tdElm = tblEl.find(`tr:nth-child(${rows[i] + 1})`).find(`td:nth-child(${cells[j] + 1})`);
            const whitePiece = tdElm.find('.white');
            const blackPiece = tdElm.find('.black');
            if (tdElm.hasClass('piece') && blackTurn && $(whitePiece).hasClass('white')) {
                tdElm.addClass('cut');
                tdCut.push(tdElm);
                move(tdCut,'pawn','black');

            } else if (tdElm.hasClass('piece') && whiteTurn && $(blackPiece).hasClass('black')) {
                tdElm.addClass('cut');
                tdCut.push(tdElm);
                move(tdCut,'pawn','white');
            }
        }
    }
}
