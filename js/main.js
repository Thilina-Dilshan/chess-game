export {blackTurn, whiteTurn, tblEl, tbodylEl, move,findRow, findCell, alreadyMoved};

const tblEl = $('table');

const tbodylEl = $('table tbody');
const firstBlackRow = $("#first-black-row");
const firstWhiteRow = $("#first-white-row");
let classes = ['rook', 'knight', 'bishop', 'queen', 'king'];
let blackTurn=false;
let whiteTurn=true;
let topDiv;
let bottomDiv;

/* Initializing logics */
$("table tbody tr:last-child").remove();
$("table tbody tr td:first-child").remove();


/* Even listeners */
$("table tbody td").each((i, elm) => {
    if ($(elm).text().trim()) {
        $(elm).addClass('piece');
        $(elm).find("span").draggable({
            revert: 'invalid'
        });
    }

});
$("table td:not(.piece)").each((i, elm) => {
    $(elm).addClass('empty');

});
$('table td .pawn').each((i, elm) => {
    $(elm).addClass('first');

});
$(firstBlackRow.find('td')).each((i, elm) => {
    if (i > 4) {
        $(elm).addClass(`${classes[7-i]}`);
    } else {
        $(elm).addClass(`${classes[i]}`);
    }
});
$(firstWhiteRow.find('td')).each((i, elm) => {
    if (i > 4) {
        $(elm).addClass(`${classes[7-i]}`);
    } else {
        $(elm).addClass(`${classes[i]}`);
    }
});


/* Functions */
function alreadyMoved(turn) {
    if (turn ==='white') {
        whiteTurn = false;
        blackTurn = true;
    } else if (turn==='black') {
        whiteTurn = true;
        blackTurn = false;
    }
}
function findCell(targetEl) {

    if (!($(targetEl.parent()).is('td'))) {
        return targetEl[0].cellIndex;
    }

    return targetEl.parent()[0].cellIndex;
}
function findRow(targetEl) {
    return targetEl.parents('tr')[0].rowIndex;
}

/* creating top, bottom div */
topDiv = $(`<div></div>`);
topDiv.addClass('top elmCollector');
tblEl.before(topDiv);

bottomDiv = $(`<div></div>`);
bottomDiv.addClass('bottom elmCollector');
tblEl.after(bottomDiv);


function move(tdElms,characterClass,color) {
    tdElms.forEach(tdElm => {
        let removedWhiteElm = null;
        let removedBlackElm = null;
        $(tdElm).droppable({
            drop: function (event, ui) {
                ui.draggable.parent().removeClass(`piece ${characterClass}`);
                ui.draggable.parent().addClass('empty');
                if (ui.draggable.hasClass('first')) $(ui.draggable).removeClass('first');

                let spanEl = ui.draggable.parent().children(`.${characterClass}`);

                // console.log(ui.draggable.parent().children(`.${characterClass}`));
                // $(this).empty();

                if (color === 'black') {
                    removedWhiteElm = $(this).find('span');
                    // console.log(removedWhiteElm);

                    if ($(removedWhiteElm).hasClass('white')) {

                        /* Win Logics */
                        if ($(removedWhiteElm).hasClass('king')) {
                            alert("Congratulation..! Black Won!");
                        }

                        topDiv?.append(removedWhiteElm);
                        removedWhiteElm.addClass('removedElm');
                    }
                }

                if (color === 'white') {
                    removedBlackElm = $(this).find('span');
                    // console.log(removedBlackElm);
                    if ($(removedBlackElm).hasClass('black')) {

                        /* Win Logics */
                        if ($(removedWhiteElm).hasClass('king')) {
                            alert("Congratulation..! White Won!");
                        }

                        bottomDiv?.append(removedBlackElm);
                        removedBlackElm.addClass('removedElm');
                    }
                }

                $(this).append(spanEl);
                $(this).addClass('piece');
                $(this).removeClass('empty');
                spanEl.css('position', 'relative');
                spanEl.css('left', '0');
                spanEl.css('right', '0');
                spanEl.css('top', '0');
                spanEl.css('bottom', '0');
                spanEl.css('margin', 'auto');
                // console.log("dropped");
                alreadyMoved(color);

            }
        });
    });
}

