function game() {
    let demoNum = 0;
    let firstDemo = document.getElementById('first-demo');
    let secondDemo = document.getElementById('second-demo');
    let thirdDemo = document.getElementById('third-demo');
    let forthDemo = document.getElementById('forth-demo');

    document.getElementById('dif2').addEventListener("click", function () {
        demoNum = 0;
        demoNum++;
        showPics(3, 2);
        document.getElementsByClassName('start-game')[0].classList.add('hide');
        firstDemo.classList.remove('hide');
    })

    let list = ["fa-grin-wink",
                "fa-ambulance",
                "fa-apple-alt",
                "fa-bicycle",
                "fa-calculator",
                "fa-campground",
                "fa-cheese",
                "fa-church"];
    let spans = document.getElementsByTagName('i');
    let gameNum = 0;
    let buttonMain = document.getElementById('button');
    let mistakes = 0;
    let cor = 0;
    let total = 0;
    let correct = 0;
    let level = 0;
    let start = 60;

    function remove() {
            buttonMain.classList.remove('hide');
            document.getElementsByClassName('start-game')[0].classList.add('hide');
        }

    function countdown(first, second) {
        let seconds = 2;
        document.getElementById('three').classList.remove('hide');
        setInterval(function () {
            if (seconds === 2) {
                document.getElementById('three').classList.add('hide');
                document.getElementById('two').classList.remove('hide');
            }
            if (seconds === 1) {
                document.getElementById('two').classList.add('hide');
                document.getElementById('one').classList.remove('hide');
            }
            if (seconds === 0) {
                document.getElementById('one').classList.add('hide');
                showPics(first, second);
                remove();
                time();
            }
            seconds--;
        }, 1000);
    }
    
    function renew() {
        for (let i = 0; i < list.length; i++) {
            for (let j = 0; j < spans.length; j++) {
                if (spans[j].classList.contains(list[i])) {
                    spans[j].classList.remove(list[i]);
                }
                if (spans[j].classList.contains('hide')) {
                    spans[j].classList.remove('hide');
                }
            }
        }
    }

    function changePosition(someList) {
        let newTempList = [];

        for (let i = 0; i < 5; i++) {
            newTempList.push(someList[i]);
        }

        newTempList.sort();
        let hideList = [];

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < list.length; j++) {
                if (spans[i].classList.contains(list[j])) {
                    if (spans[i].classList.contains('hide')) {
                        hideList.push(list[j]);
                        spans[i].classList.remove('hide');
                    }
                    spans[i].classList.remove(list[j]);
                }
            }
        }

        for (let i = 0; i < 5; i++) {
            spans[i].classList.add(list[newTempList[i]]);
            for (let n = 0; n < hideList.length; n++) {
                if (list[newTempList[i]] === hideList[n]) {
                    spans[i].classList.add('hide');
                }
            }
        }
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function eraseCrosses() {
        for (let i =0; i < 3; i++) {
            document.getElementsByClassName("mistake")[i].classList.remove('red');
        }
    }

    function eraseChecks() {
        for (let i =0; i < 3; i++) {
            document.getElementsByClassName("correct")[i].classList.remove('green');
        }
    }

    function gameOver() {
        document.getElementsByClassName('game-over')[0].classList.remove('hide');
        document.getElementById('over').innerHTML = 'Ваш счет: ' + document.getElementById('score').innerHTML;
        document.getElementById('total').innerHTML = 'Верных ответов: ' + correct + ' / ' + total;
        document.getElementById('percent').innerHTML = 'Точность ответов: ' + Math.floor(correct/total*100) + '%';

        function newGame() {
            document.getElementById('score').innerHTML = '0';
            document.getElementById('button').classList.add('hide');
            document.getElementsByClassName('start-game')[0].classList.remove('hide');
            document.getElementsByClassName('game-over')[0].classList.add('hide');
            game();
        }

        document.getElementById('new-game').onclick = newGame;
    }

    function time() {
        setInterval(function () {
            if (start > 0) {
                document.getElementById('time').innerHTML = 'время: ' + start.toString() + ' секунд';
                start--;
            } else if (start === 0) {
                gameNum = gameNum + 1;
                if (gameNum === 1) {
                    gameOver();
                }
            }
        }, 1000);
    }

    function addClass(someId) {
        document.getElementById(someId).classList.add('hide');
        document.getElementById(someId).innerHTML = ' ';
    }

    function removeClass(someId) {
        document.getElementById(someId).classList.remove('hide');
        if (someId === 'check') {
            document.getElementById(someId).innerHTML = '<i class="fas fa-check fa-9x"></i>';
        } else {
            document.getElementById(someId).innerHTML = '<i class="fas fa-times fa-9x"></i>';
        }
    }

    function showPics(first, second) {
        if (demoNum === 3) {
            buttonMain.innerText = 'дальше';
        }
        if (demoNum === 4) {
            buttonMain.innerText = 'конец';
        }

        let startTime = new Date().getTime();
        let score = document.getElementById('score');
        let tempList = [];

        if (demoNum < 2) {
            buttonMain.innerText = 'запомнил';
        }

        buttonMain.classList.remove('hide');

        renew();

        for (let i = 0; i < 5;) {
            let tempNum = getRandomInt(list.length);
            if (tempList.indexOf(tempNum) === -1) {
                tempList.push(tempNum);
                spans[i].classList.add(list[tempNum]);
                if (i === first || i === second) {
                    spans[i].classList.add('hide');
                }
                i++;
            }
        }

        function showOther(hide) {
            let num = getRandomInt(3) + 5;
            spans[num].classList.add(list[tempList[hide]]);
            for (let i = 5; i < spans.length;) {
                if (i === num) {
                    i++;
                    continue;
                }
                let tempNum = getRandomInt(list.length);
                if (tempList.indexOf(tempNum) === -1) {
                    tempList.push(tempNum);
                    spans[i].classList.add(list[tempNum]);
                    i++;
                }
            }

            for (let i = 5; i < spans.length; i++) {
                spans[i].onclick = function () {
                    if (demoNum === 2) {
                        secondDemo.classList.add('hide');
                        thirdDemo.classList.remove('hide');
                        demoNum++;
                    }
                    if (i === num) {
                        spans[hide].classList.remove('hide');
                        removeClass('check');
                        setTimeout(addClass, 1000, 'check');
                        total++;
                        correct++;
                        cor++;
                        for (let i = 0; i < cor; i++){
                            document.getElementsByClassName("correct")[i].classList.add('green');
                        }
                        score.innerHTML = (Number(score.innerHTML) + 60 - Math.floor((new Date().getTime() - startTime) / 1000)).toString();
                        start = start + 3
                        if (cor === 3){
                            level++;
                            eraseChecks();
                            if (level === 1){
                                showPics(first, 5);
                            }
                            if (level >= 2){
                                showPics(5, 5);
                            }
                            cor = 0;
                        }
                        else {
                            showPics(first, second);
                        }
                    } else {
                        removeClass('cross');
                        setTimeout(addClass, 1000, 'cross');
                        mistakes++;
                        total++;
                        cor = 0;
                        eraseChecks();
                        for (let i = 0; i < mistakes; i++){
                            document.getElementsByClassName("mistake")[i].classList.add('red');
                        }
                        if (mistakes === 3){
                            eraseCrosses();
                            start = 0;
                        }
                        showPics(first, second);
                    }
                }
            }
        }

        function event() {
            if (demoNum === 1) {
                firstDemo.classList.add('hide');
                secondDemo.classList.remove('hide');
                demoNum++;
                let hideSpan = getRandomInt(5);
                while (hideSpan === first || hideSpan === second) {
                    hideSpan = getRandomInt(5);
                }
                spans[hideSpan].classList.add('hide');
                buttonMain.classList.add('hide');
                showOther(hideSpan);
            }
            else if (demoNum === 3) {
                thirdDemo.classList.add('hide');
                forthDemo.classList.remove('hide');
                demoNum++;
                showPics(first, second);
            }
            else if (demoNum === 4) {
                forthDemo.classList.add('hide');
                startGame();
            }
            else {
                buttonMain.classList.add('hide');
                let hideSpan = getRandomInt(5);
                while (hideSpan === first || hideSpan === second) {
                    hideSpan = getRandomInt(5);
                }
                spans[hideSpan].classList.add('hide');

                changePosition(tempList);

                showOther(hideSpan);
            }

        }

        buttonMain.onclick = event;

    }

    function startGame() {
        score.innerHTML = '0';
        mistakes = 0;
        cor = 0;
        total = 0;
        correct = 0;
        eraseChecks();
        eraseCrosses();
        renew();
        buttonMain.classList.add('hide');
        document.getElementsByClassName('start-game')[0].classList.remove('hide');

        document.getElementById('dif1').addEventListener("click", function () {
            demoNum = 0;
            let firstHide = getRandomInt(5);
            let secondHide = getRandomInt(5);
            while (secondHide === firstHide) {
                secondHide = getRandomInt(5);
            }
            countdown(firstHide, secondHide);
        })
    }

    return startGame();
}

game();
