document.onmousedown = mouseDown;
document.onmouseup = mouseUp;

var startPosX;
var startPosY;
var endPosX;
var endPosY;

function mouseDown(e) {
    startPosX = e.clientX;
    startPosY = e.clientY;
    console.log("Position: " + e.clientX + ',' + e.clientY);
}

function mouseUp(e) {
    endPosX = e.clientX;
    endPosY = e.clientY;
    console.log("Position: " + e.clientX + ',' + e.clientY);
    if (startPosX != endPosX || startPosY != endPosY) {
        console.log('dragged over an area');
        //stack overflow, refactor
        var checkboxes = document.querySelectorAll('input[type="checkbox"]');
        for (var i = 0; i < checkboxes.length; i++) {
                posObject = checkboxes[i].getBoundingClientRect();
                //if this checkbox is fully within dragged area
                if (
                endPosX >= posObject.left && posObject.left >= startPosX || endPosX <= posObject.left && posObject.left <= startPosX
                &&
                endPosX >= posObject.right && posObject.right >= startPosX || endPosX <= posObject.right && posObject.right <= startPosX
                &&
                endPosY >= posObject.top && posObject.top >= startPosY || endPosY <= posObject.top && posObject.top <= startPosY
                &&
                endPosY >= posObject.bottom && posObject.bottom >= startPosY || endPosY <= posObject.bottom && posObject.bottom <= startPosY
                ) {
                    //check the box
                    checkboxes[i].checked = true;
                }
        }
    }
}