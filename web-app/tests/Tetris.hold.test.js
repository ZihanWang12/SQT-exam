import Tetris from "../common/Tetris.js";
import R from "../common/ramda.js";

describe("hold", function () {
    it(`If there is no held piece and a hold performed, the next tetromino is deployed.`,
        function () {
            const initial_game = Tetris.new_game();
            let next_tetromino = JSON.stringify(initial_game.next_tetromino)
            // The first turn
            initial_game.hold(initial_game, (data) => {
                if (R.equals(JSON.stringify(initial_game.current_tetromino), JSON.stringify(next_tetromino))) {
                    console.log("Caching the current piece")
                }
            })
        }
    );
    it(`A held piece can be retrieved on a subsequent turn`,
        function () {
            const initial_game = Tetris.new_game();
            let current_tetromino = JSON.stringify(initial_game.current_tetromino)
            // The first turn
            initial_game.hold(initial_game, (data) => {
                if (R.equals(JSON.stringify(data), JSON.stringify(current_tetromino))) {
                    console.log("Caching the current piece")
                }
            })
            // The second turn
            initial_game.hold(initial_game, (data) => { }, true)
            //Extract the piece
            initial_game.hold(initial_game, (data) => {
                if (R.equals(JSON.stringify(initial_game.current_tetromino), JSON.stringify(current_tetromino))) {
                    console.log("Caching the current piece")
                }
            })

        }
    );
    it(
        `Hold can't be performed twice in a row.`,
        function () {
            const initial_game = Tetris.new_game();
            let current_tetromino = JSON.stringify(initial_game.current_tetromino)
            // The first turn
            initial_game.hold(initial_game, (data) => {
                if (R.equals(JSON.stringify(data), JSON.stringify(current_tetromino))) {
                    console.log("Caching the current piece")
                }
            })
            //Set the pieces again
            initial_game.hold(initial_game, (data) => {
                if (R.equals(JSON.stringify(initial_game.current_tetromino), JSON.stringify(data))) {
                    console.log("Caching the current piece")
                }
            })
        }
    );
});
