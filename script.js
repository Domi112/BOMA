var sleepTimer;
var angryTimeout;
var sleepModeOn = false;
function mouseMove(e, el) {
    console.log('mouse moved');
    e.stopPropagation();
    clearTimeout(sleepTimer);
    if (sleepModeOn) {
        setDefaultAnimation();
        sleepModeOn = false;
    }
    var pupilLeft = document.getElementById("pupilLeft");
    var pupilRight = document.getElementById("pupilRight")
    var eyeLeft = document.getElementById("eyeLeft");
    var eyeRight = document.getElementById("eyeRight");

    var leftEyeHC = el.offsetLeft + eyeLeft.offsetLeft + (eyeLeft.offsetWidth / 2) //left eye horizontal center
    var leftEyeVC = el.offsetTop + eyeLeft.offsetTop + (eyeLeft.offsetHeight / 2) //left eye horizontal center

    var rightEyeHC = el.offsetLeft + eyeRight.offsetLeft + (eyeRight.offsetWidth / 2) //right eye horizontal center
    var rightEyeVC = el.offsetTop + eyeRight.offsetTop + (eyeRight.offsetHeight / 2) //right eye horizontal center

    var x = e.clientX;
    var y = e.clientY;
    var distanceHorizontalLE = Math.abs(x - leftEyeHC);
    var distanceHorizontalRE = Math.abs(x - rightEyeHC);
    var distanceVerticalLE = Math.abs(y - leftEyeVC);
    var distanceVerticalRE = Math.abs(y - rightEyeVC);
    var radianLE = Math.atan2(y - leftEyeVC, x - leftEyeHC);   //left eye angle from cursor in radian
    var radianRE = Math.atan2(y - rightEyeVC, x - rightEyeHC); //right eye angle from cursor in radian
    var angleLeft = (radianLE * (180 / Math.PI) * 1) + 180;
    var angleRight = (radianRE * (180 / Math.PI) * 1) + 180;
    if ((distanceHorizontalLE > 75 || distanceVerticalLE > 80) && (distanceHorizontalRE > 75 || distanceVerticalRE > 80)) {
        eyeLeft.style.transform = "rotate(" + angleLeft + "deg)";
        pupilLeft.style.left = "-18.5%";
        pupilRight.style.left = "-18.5%";
        pupilLeft.style.transform = "rotate(-" + angleLeft + "deg)";
        eyeRight.style.transform = "rotate(" + angleRight + "deg)";
        pupilRight.style.transform = "rotate(-" + angleRight + "deg)";
    }
    else {
        pupilLeft.style.left = "0%";
        pupilRight.style.left = "0%";
    }
}
function mouseOut(e, el) {
    console.log('mouse out');
    e.stopPropagation();
    pupilLeft.style.left = "0%";
    pupilRight.style.left = "0%";
    // clearTimeout(angryTimeout);
    setSleepClassTimer();
}
function setSleepClassTimer() {
    sleepTimer = setTimeout(function () {
        sleepModeOn = true;
        setAngryOrSleepAnimation();
        console.log('sleep timer called');
    }, 3000);
}
function setAngryOrSleepAnimation(mode) {
    // if (mode === 'angry') {
    //     var eyeBlankPart = document.getElementsByClassName('eye-blank-area');
    //     for (var i = 0; i < eyeBlankPart.length; i++) {
    //         eyeBlankPart[i].style.background = 'radial-gradient(white 46% ,red 100%)';
    //     }
    // }
    var upperLid = document.getElementsByClassName('eye-lid-up');
    for (var i = 0; i < upperLid.length; i++) {
        upperLid[i].style.animation = mode === 'angry' ? 'lid-up-angry 0.5s 1 forwards' : 'lid-up-sleep 2s 1 forwards';
    }
    var downLid = document.getElementsByClassName('eye-lid-down');
    for (var i = 0; i < downLid.length; i++) {
        downLid[i].style.animation = mode === 'angry' ? 'lid-down-angry 0.5s 1 forwards' : 'lid-down-sleep 2s 1 forwards';
    }
    var wingLeft = document.getElementsByClassName('wing-left');
    wingLeft[0].style.transition = 'transformation 1s';
    wingLeft[0].style.animation = 'left-wing-sleep 1s 1 forwards';
    var wingRight = document.getElementsByClassName('wing-right');
    wingRight[0].style.transition = 'transformation 1s';
    wingRight[0].style.animation = 'right-wing-sleep 1s 1 forwards';
}
function setDefaultAnimation() {
    // var eyeBlankPart = document.getElementsByClassName('eye-blank-area');
    // for (var i = 0; i < eyeBlankPart.length; i++) {
    //     eyeBlankPart[i].style.background = 'radial-gradient(white 50% ,var(--primary-body-color) 100%)';
    // }
    var upperLid = document.getElementsByClassName('eye-lid-up');
    for (var i = 0; i < upperLid.length; i++) {
        upperLid[i].style.animation = 'lid-up-blink 2.5s infinite';
    }
    var downLid = document.getElementsByClassName('eye-lid-down');
    for (var i = 0; i < downLid.length; i++) {
        downLid[i].style.animation = 'lid-down-blink 2.5s infinite';
    }
    var wingLeft = document.getElementsByClassName('wing-left');
    wingLeft[0].style.animation = 'left-wing-move 5s 0.5s infinite';
    wingLeft[0].style.transition = '';
    var wingRight = document.getElementsByClassName('wing-right');
    wingRight[0].style.transition = '';
    wingRight[0].style.animation = 'right-wing-move 5s 0.5s infinite';
}
function angryStart(event) {
    event.stopPropagation();
    console.log('angry triggered');
    clearTimeout(angryTimeout);
    setAngryOrSleepAnimation('angry');
    setAngryTimeout();
}
function setAngryTimeout() {
    angryTimeout = setTimeout(function () {
        console.log('angry timeout');
        setDefaultAnimation();
    }, 3000);
}
