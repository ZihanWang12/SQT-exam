import Tetris from "../common/Tetris.js";

const grid_columns = Tetris.field_width;
const grid_rows = Tetris.field_height;
let nexts = document.getElementsByClassName('nexts')[0]
let layouts = document.getElementsByClassName('layouts')[0]
let game = Tetris.new_game(render.bind(render,nexts));

document.documentElement.style.setProperty("--grid-rows", grid_rows);
document.documentElement.style.setProperty("--grid-columns", grid_columns);

const grid = document.getElementById("grid");

const range = (n) => Array.from({ "length": n }, (ignore, k) => k);
function render(nexts,next) {
    nexts.innerHTML = ``
    let arr = [
        [0, 0, 0, 0, 0, 0],
        ...(next.grid.map(e => {
            let arr = [0, ...e]
            if (arr.length <= 6) {
                for (let i = arr.length; i < 6; i++) {
                    arr.push(0)
                }
            }
            return arr;
        })),
        [0, 0, 0, 0, 0, 0]
    ];
    for (let pop of arr) {
        let row = document.createElement('div')
        row.className = 'row'
        for (let p of pop) {
            let cell = document.createElement('div')
            cell.className = 'cell ' + p;
            row.appendChild(cell)
        }
        nexts.appendChild(row)
    }
}

const cells = range(grid_rows).map(function () {
    const row = document.createElement("div");
    row.className = "row";
    const rows = range(grid_columns).map(function () {
        const cell = document.createElement("div");
        cell.className = "cell";

        row.append(cell);

        return cell;
    });

    grid.append(row);
    return rows;
});

const update_grid = function () {
    game.field.forEach(function (line, line_index) {
        line.forEach(function (block, column_index) {
            const cell = cells[line_index][column_index];
            cell.className = `cell ${block}`;
        });
    });

    Tetris.tetromino_coordiates(game.current_tetromino, game.position).forEach(
        function (coord) {
            try {
                const cell = cells[coord[1]][coord[0]];
                cell.className = (
                    `cell current ${game.current_tetromino.block_type}`
                );
            } catch (ignore) {

            }
        }
    );
};

// Don't allow the player to hold down the rotate key.
let key_locked = false;

document.body.onkeyup = function () {
    key_locked = false;
};

document.body.onkeydown = function (event) {
    if (!key_locked && event.key === "ArrowUp") {
        key_locked = true;
        game = Tetris.rotate_ccw(game);
    }
    if (event.key === "ArrowDown") {
        game = Tetris.soft_drop(game);
    }
    if (event.key === "ArrowLeft") {
        game = Tetris.left(game);
    }
    if (event.key === "ArrowRight") {
        game = Tetris.right(game);
    }
    if (event.key === " ") {
        game = Tetris.hard_drop(game);
    }
    update_grid();
};
let old_tetromino = null;
const timer_function = function () {
    game = Tetris.next_turn(game);
    update_grid();
    setTimeout(timer_function, 500);
};

setTimeout(timer_function, 500);

update_grid();
document.addEventListener('keydown', (e) => {
    if (e.keyCode == 67) {
        game = game.hold(game)
        render(layouts,JSON.parse(JSON.stringify(game.held_tetoromino)))
        console.log(game.held_tetoromino)
    }
})
//  xy

// 100 100
// 50
// 

