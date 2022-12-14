import Tetris from "../common/Tetris.js";
import R from "../common/ramda.js";

describe("Hold", function () {
    it(
        `A held piece can be retrieved on a subsequent turn:
        Given a Tetris Game;
        When the sequence Hold > Hard Drop > Hold is performed;
        Then the current tetromino before and after the sequence, is the same.`,
        function () {
            const initial_game = Tetris.new_game();
            const initial_piece = initial_game.current_tetromino;
            // You'll need to implement Tetris.hold before this works.
            const final_game = Tetris.hold(
                Tetris.hard_drop(
                    Tetris.hold(initial_game)
                )
            );
            const final_piece = final_game.current_tetromino;
            if (!R.equals(initial_piece, final_piece)) {
                throw new Error(
                    `The inital and final tetrominos do not match
                    Initial: ${JSON.stringify(initial_piece)}
                    Final:   ${JSON.stringify(final_piece)}`
                );
            }
        }
    );

    it(
        `Hold can't be performed twice in a row.`,
        function () {
            const initial_game = Tetris.new_game();
            const initial_gameOne = Tetris.hold(initial_game);
            const initial_gameOn = Tetris.hold(initial_game);
            const initial_piece = JSON.stringify(initial_gameOn.held_tetoromino);
            const initial_gameTow = Tetris.hold(initial_piece);
            const final_piece = JSON.stringify(initial_gameTow.held_tetoromino)
            if (!R.equals(initial_piece, final_piece)) {
                throw new Error(
                    `The inital and final tetrominos do not match
                    Initial: ${JSON.stringify(initial_piece)}
                    Final:   ${JSON.stringify(final_piece)}`
                );
            }
        }
    );

    it(
        `If there is no held piece and a hold performed, the next tetromino is deployed.`,
        function () {
            const initial_game = Tetris.new_game();
            const initial_piece = JSON.stringify(initial_game.current_tetromino)
            const initial_gameOne = Tetris.hold(initial_game);
            const held_tetoromino = JSON.stringify(initial_gameOne.held_tetoromino)
            console.log(initial_piece,held_tetoromino)
            if (!R.equals(initial_piece, held_tetoromino)) {
                throw new Error(
                    `The inital and final tetrominos do not match
                    Initial: ${JSON.stringify(initial_piece)}
                    Final:   ${JSON.stringify(held_tetoromino)}`
                );
            }
        }
    );
});
