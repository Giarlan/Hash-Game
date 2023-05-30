// Initial Datas
let board = {
    a1: '', a2: '', a3: '',
    b1: '', b2: '', b3: '',
    c1: '', c2: '', c3: ''
};
let playing = false;
let vez = 'x';
let warning = '';

reset();

// Events
document.querySelector('.reset').addEventListener('click', reset);

document.querySelectorAll('.item').forEach((item)=>{
    item.addEventListener('click', (e) => {
        let loc = e.target.getAttribute('data-item');
        
        if(playing && board[loc] === '') {
            board[loc] = vez;
            renderQuadro();
            togglePlayer();
        }
    });
});

// Functions
function reset() {
    warning = '';

    // Set the turn
    let random = Math.floor(Math.random() * 2);
    vez = random === 0 ? 'x' : 'o';

    // Reset boards 
    for(let i in board) {
        board[i] = '';
    }

    // Render all
    renderQuadro();
    renderInfo();

    playing = true;
}

function renderQuadro() {
    for(let i in board) {
        let item = document.querySelector(`div[data-item=${i}]`);
        if(board[i] !== '') {
            item.innerHTML = board[i];
        } else {
            item.innerHTML = '';
        }
    }

    checkGame();
}

function renderInfo() {
    document.querySelector('.vez').innerHTML = vez;
    document.querySelector('.result').innerHTML = warning;
}

function togglePlayer() {
    vez = vez === 'x' ? 'o' : 'x';
    renderInfo();
}

function checkGame() {
    if(checkWinnerFor('x')) {
        warning = 'The "x" win!';
        playing = false;
    } else if(checkWinnerFor('o')) {
        warning = 'The "o" win!';
        playing = false;
    } else if(isFull()) {
        warning = 'Tied game!';
        playing = false;
    }
}

function checkWinnerFor(i) {
    let pos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1'
    ];

    for(let w in pos) {
        let pArray = pos[w].split(',');
        let hasWon = pArray.every(option=>board[option] === i);
        if(hasWon) return true;
    }

    return false;
}
function isFull() {
    for(let i in board) {
        if(board[i] === '') {
            return false;
        }
    }
    return true;
}