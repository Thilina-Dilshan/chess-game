import {tblEl, tbodylEl, findCell, findRow} from "./main.js";

let rowIndex;
let cellIndex;

tbodylEl.on('mousedown', '.piece .pawn', (eventData) => {
    let cutRowIndex;
    let cutCellIndex;
    let newRowIndex;
    let newCellIndex;

    const targetEl = $(eventData.target);
    let classname = targetEl[0].className;

    cellIndex = findCell(targetEl);
    rowIndex = findRow(targetEl);
    if (/pawn/.test(classname) ) {
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
    } else if (/pawn/.test(classname) ) {
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


    if (newRowIndex?.length>0 && newCellIndex?.length >= 0) {
        applyMovable(newRowIndex, newCellIndex);

    }
    if (cutRowIndex?.length>0 && cutCellIndex?.length>0) {
        // if (showCutSpots(cutRowIndex, cutCellIndex)) {
        showCutSpots(cutRowIndex, cutCellIndex);
            // console.log("Before cutting");
            applyCutMoves(cutRowIndex, cutCellIndex);
        // }
    }
    // console.log("Cut cell index= ", cutCellIndex);
});

tbodylEl.on('mouseup', '.piece', (eventData) => {
    const targetEl = $(eventData.target);
    cellIndex = findCell(targetEl);
    rowIndex = findRow(targetEl);
    let classname = targetEl[0].className;

    let droppableCellIndex = [cellIndex];
    let droppableRowIndex;

    //find cutting positions
    let cutCellIndex;
    if (cellIndex === 0) {
        cutCellIndex = [cellIndex + 1];
    } else if (cellIndex > 0 && cellIndex < 7) {
        cutCellIndex = [(cellIndex + 1), (cellIndex - 1)];
    } else if (cellIndex === 7) {
        cutCellIndex = [cellIndex - 1];
    }

    let cutRowIndex;

    if (/pawn/.test(classname) ) {
        // console.log("Class name matching=",classname.match("black"));
        if (/black/.test(classname)) {
            if (classname.match('first')) {
                droppableRowIndex = [(rowIndex + 1), (rowIndex + 2)];
            } else {
                droppableRowIndex = [rowIndex + 1];
            }

            cutRowIndex = [rowIndex + 1];
        }
    } else if (/pawn/.test(classname)) {
        // console.log("Class name matching=",classname.match("white"));
        if (/white/.test(classname)) {
            if (classname.match('first')) {
                droppableRowIndex = [(rowIndex - 1), (rowIndex - 2)];
            } else {
                droppableRowIndex = [rowIndex - 1];
            }
            cutRowIndex = [rowIndex - 1];
        }
    }
    setTimeout(() => {
        if (droppableCellIndex?.length > 0 && droppableRowIndex?.length > 0) {
            removeDroppable(droppableRowIndex, droppableCellIndex);
        }
    }, 0);

    setTimeout(() => {
        if (cutRowIndex?.length > 0 && cutCellIndex?.length > 0) {
            removeCutSpots(cutRowIndex, cutCellIndex);
        }
    }, 0);

});

function applyMovable(rows, cell) {
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < cell.length; j++) {
            let tdElm = tblEl.find(`tr:nth-child(${rows[i] + 1})`).find(`td:nth-child(${cell[j] + 1})`);
            if (tdElm.hasClass('empty')) {
                tdElm.addClass('spot');
                tdElm.droppable({
                    drop: function (event, ui) {
                        ui.draggable.parent().removeClass('piece');
                        ui.draggable.parent().addClass('empty');
                        let spanEl = ui.draggable.parent().children('.pawn');
                        // console.log(spanEl);

                        $(this).append(spanEl);
                        $(this).addClass('piece');
                        $(this).find('span').removeClass('first');
                        $(this).removeClass('empty');
                        spanEl.css('position', 'relative');
                        spanEl.css('left', '0');
                        spanEl.css('right', '0');
                        spanEl.css('top', '0');
                        spanEl.css('bottom', '0');
                        spanEl.css('margin', 'auto');

                    }
                });
            }
        }
    }
}

function applyCutMoves(row, cell) {
    for (let i = 0; i < row.length; i++) {
        for (let j = 0; j < cell.length; j++) {
            let tdElm = tblEl.find(`tr:nth-child(${row[i] + 1})`).find(`td:nth-child(${cell[j] + 1})`);
            if (tdElm.hasClass('cut')) {
                tdElm.droppable({
                    drop: function (event, ui) {
                        ui.draggable.parent().removeClass('piece');
                        ui.draggable.parent().addClass('empty');
                        let spanEl = ui.draggable.parent().children('.pawn');

                        // make cut moves correctly
                        $(this).empty();
                        $(this).append(spanEl);
                        $(this).addClass('piece');
                        $(this).find('span').removeClass('first');
                        $(this).removeClass('empty');
                        spanEl.css('position', 'relative');
                        spanEl.css('left', '0');
                        spanEl.css('right', '0');
                        spanEl.css('top', '0');
                        spanEl.css('bottom', '0');
                        spanEl.css('margin', 'auto');
                    }
                });
            }
        }
    }
}

function removeDroppable(row, cell) {
    for (let i = 0; i < row.length; i++) {
        for (let j = 0; j < cell.length; j++) {
            let tdElm = tblEl.find(`tr:nth-child(${row[i] + 1})`).find(`td:nth-child(${cell[j] + 1})`);
            // console.log(tblEl);
            if (tdElm.hasClass('spot')) {
                setTimeout(() => {
                    tdElm.removeClass('spot');
                    tdElm.droppable('destroy');
                }, 0);
            }
            else if (tdElm.hasClass('cut')) {
                setTimeout(() => {
                    tdElm.removeClass('cut');
                    tdElm.droppable('destroy');

                }, 0);
            }
        }
    }
}

function showCutSpots(rows, cells) {
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < cells.length; j++) {
            let tdElm = tblEl.find(`tr:nth-child(${rows[i] + 1})`).find(`td:nth-child(${cells[j] + 1})`);
            const whitePiece = tdElm.find('.white');
            const blackPiece = tdElm.find('.black');
            if (tdElm.hasClass('piece') && $(whitePiece).hasClass('white')) {
                tdElm.addClass('cut');
                tdElm.droppable({
                    drop: function (event, ui) {
                        ui.draggable.parent().removeClass('piece');
                        ui.draggable.parent().addClass('empty');
                        let spanEl = ui.draggable.parent().children('.pawn');
                        // $(this).append(spanEl);
                        $(this).addClass('piece');
                        $(this).find('span').removeClass('first');
                        $(this).removeClass('empty');
                        spanEl.css('position', 'relative');
                        spanEl.css('left', '0');
                        spanEl.css('right', '0');
                        spanEl.css('top', '0');
                        spanEl.css('bottom', '0');
                        spanEl.css('margin', 'auto');
                    }
                });

            } else if (tdElm.hasClass('piece')  && $(blackPiece).hasClass('black')) {
                tdElm.addClass('cut');
                tdElm.droppable({
                    drop: function (event, ui) {
                        ui.draggable.parent().removeClass('piece');
                        ui.draggable.parent().addClass('empty');
                        let spanEl = ui.draggable.parent().children('.pawn');
                        // $(this).append(spanEl);
                        $(this).addClass('piece');
                        $(this).find('span').removeClass('first');
                        $(this).removeClass('empty');
                        spanEl.css('position', 'relative');
                        spanEl.css('left', '0');
                        spanEl.css('right', '0');
                        spanEl.css('top', '0');
                        spanEl.css('bottom', '0');
                        spanEl.css('margin', 'auto');
                    }
                });
            }
        }
    }
}

function removeCutSpots(rows, cells) {
    for (let i = 0; i < rows.length; i++) {
        for (let j = 0; j < cells.length; j++) {
            let tdElm = tblEl.find(`tr:nth-child(${rows[i] + 1})`).find(`td:nth-child(${cells[j] + 1})`);

            if (tdElm.hasClass('cut')) {
                setTimeout(() => {
                    tdElm.droppable('destroy');
                    // console.log("Removing Cut class");
                    tdElm.removeClass('cut');
                }, 0);
            }
        }
    }
}
