//initial X and Y position of mouse
var startPosX, startPosY;

//call mouseDown, mouseUp functions when mouse depresses and is released
document.onmousedown = mouseDown;
document.onmouseup = mouseUp;

/**
 * Logs the initial click position in a potential click and drag sequence
 * @param {MouseEvent} e mouse event holding position data
 */
function mouseDown(e) {
    startPosX = e.clientX;
    startPosY = e.clientY;
}

/**
 * Logs the final click position in a click and drag sequence, and calls processing function
 * @param {MouseEvent} e mouse event holding position data
 */
function mouseUp(e) {
    if (startPosX != e.clientX || startPosY != e.clientY) {
        processClickAndDrag(e.clientX, e.clientY);
    }
}

/**
 * Checks and unchecks checkbox inputs in the area clicked and dragged over
 * If all inputs in selection are already checked, unchecks them, otherwise checks every input in selection
 * @param {int} endPosX the final X position of the pointer in a click and drag sequence
 * @param {int} endPosY the final Y position of the pointer in a click and drag sequence
 */
function processClickAndDrag(endPosX, endPosY) {

    //get all checkboxes on the document for processing
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    //array to hold all checkboxes in selection
    var candidateCheckboxes = [];
    //boolean for whether all checkboxes in selection are checked
    var allChecked = true;

    //iterate through all checkbox inputs in the document
    for (var i = 0; i < checkboxes.length; i++) {
        posObject = checkboxes[i].getBoundingClientRect();
        //if this checkbox is fully within dragged area
        if ((endPosY >= posObject.top && posObject.top >= startPosY || endPosY <= posObject.top && posObject.top <= startPosY) &&
            (endPosY >= posObject.bottom && posObject.bottom >= startPosY || endPosY <= posObject.bottom && posObject.bottom <= startPosY) &&
            (endPosX >= posObject.left && posObject.left >= startPosX || endPosX <= posObject.left && posObject.left <= startPosX) &&
            (endPosX >= posObject.right && posObject.right >= startPosX || endPosX <= posObject.right && posObject.right <= startPosX)) {
            
            //if any of the checkboxes are unchecked, mark the allChecked as false to prevent unchecking functionality
            if (checkboxes[i].checked = false) {
                allChecked = false;
            }
            //add the checkbox to the list of inputs within the selection
            candidateCheckboxes.push(checkboxes[i]);
        }
    }

    //iterate through all checkbox inputs in the selection
    for (var i = 0; i < candidateCheckboxes.length; i++) {
        //if every checkbox in the selection is checked, uncheck all of them
        if (allChecked) {
            candidateCheckboxes[i].checked = false;
        }
        //otherwise check all boxes in selection
        else {
            candidateCheckboxes[i].checked = true;
        }
    }
}