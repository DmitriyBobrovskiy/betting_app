﻿export interface Bet {
    id: number,
    userId: number,
    betAmount: number,
    chance: number,
    payout: number,
    win: boolean
}
