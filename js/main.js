export {blackTurn, whiteTurn, tblEl, tbodylEl,findRow, findCell};

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







