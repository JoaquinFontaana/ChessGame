const STARTEDBOARD = [
    [
        { piece: "Rook", team: "Black" },
        { piece: "Knight", team: "Black" },
        { piece: "Bishop", team: "Black" },
        { piece: "Queen", team: "Black" },
        { piece: "King", team: "Black" },
        { piece: "Bishop", team: "Black" },
        { piece: "Knight", team: "Black" },
        { piece: "Rook", team: "Black" },
    ],
    Array.from({ length: 8 }, () => ({ piece: "Pawn", team: "Black" })),
    Array.from({ length: 8 }, () => null),
    Array.from({ length: 8 }, () => null),
    Array.from({ length: 8 }, () => null),
    Array.from({ length: 8 }, () => null),
    Array.from({ length: 8 }, () => ({ piece: "Pawn", team: "White" })),
    [
        { piece: "Rook", team: "White" },
        { piece: "Knight", team: "White" },
        { piece: "Bishop", team: "White" },
        { piece: "Queen", team: "White" },
        { piece: "King", team: "White" },
        { piece: "Bishop", team: "White" },
        { piece: "Knight", team: "White" },
        { piece: "Rook", team: "White" },
    ],
];
const BOARD = Array.from({ length: 8 }, () => Array.from({ length: 8 }, () => null))
export { BOARD, STARTEDBOARD }