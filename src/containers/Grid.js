import React from "react"

class Grid extends React.Component {
    constructor() {
        super()

        this.ROWS = 10
        this.COLS = 10

        this.state = {
            //where we keep track of trues and falses
            arr2d: [...Array(this.ROWS)].map((row) =>
                Array(this.COLS).fill(false)
            ),
        }
    }

    computeNextGen = () => {
        let nextGen = []
        for(var i=0; i < this.state.arr2d.length; i++){
            nextGen[i] = this.state.arr2d[i].slice()
        }

        for (let i = 0; i < this.state.arr2d.length; i++) {
            for (let j = 0; j < this.state.arr2d[0].length; j++) {
                let neighborsCount = this.countNeighbors(this.state.arr2d, i, j)
                nextGen[i][j] = this.computeNextState(neighborsCount, this.state.arr2d[i][j])
            }
        }
        this.setState({ arr2d: nextGen })
    }

    computeNextState = (neighborsCount, cellState) => {
        //if cell is alive
        if (cellState) {
            if (neighborsCount < 2) {
                return false
            }
            if (neighborsCount == 2 || neighborsCount == 3) {
                return true
            }
            if (neighborsCount > 3) {
                return false
            }
        } else {
            //if cell is dead
            return neighborsCount == 3
        }
    }

    countNeighbors = (arr2d, i, j) => {
        let neighborsAlive = 0

        // need to check all 8 directions

        // top left
        if (i > 0 && j > 0) {
            if (arr2d[i - 1][j - 1] == true) {
                neighborsAlive += 1
            }
        }

        // top
        if (i > 0) {
            if (arr2d[i - 1][j] == true) {
                neighborsAlive += 1
            }
        }

        // top right
        if (i > 0 && j < this.COLS - 1) {
            if (arr2d[i - 1][j + 1] == true) {
                neighborsAlive += 1
            }
        }

        // right
        if (j < this.COLS - 1) {
            if (arr2d[i][j + 1] == true) {
                neighborsAlive += 1
            }
        }

        // bottom right
        if (i < this.ROWS - 1 && j < this.COLS - 1) {
            if (arr2d[i + 1][j + 1] == true) {
                neighborsAlive += 1
            }
        }

        // bottom
        if (i < this.ROWS - 1) {
            if (arr2d[i + 1][j] == true) {
                neighborsAlive += 1
            }
        }

        // bottom left
        if (i < this.ROWS - 1 && j > 0) {
            if (arr2d[i + 1][j - 1] == true) {
                neighborsAlive += 1
            }
        }

        // left
        if (j > 0) {
            if (arr2d[i][j - 1] == true) {
                neighborsAlive += 1
            }
        }

        return neighborsAlive
    }

    toggleState = (row, col) => {
        let newArr = [...this.state.arr2d]
        newArr[row][col] = !this.state.arr2d[row][col]
        this.setState({ arr2d: newArr })
    }

    render() {
        return (
            <div>
                <button onClick={this.computeNextGen}>
                    Compute Next Generation
                </button>
                {this.state.arr2d.map((row, rowNum) => {
                    return (
                        <div className="grid-container">
                            {row.map((col, colNum) => {
                                //apply css class depending on whether value is true or false
                                let index = `${rowNum},${colNum}`
                                return col == true ? (
                                    <button
                                        className="true grid-item"
                                        onClick={() =>
                                            this.toggleState(rowNum, colNum)
                                        }
                                    >
                                        {index}
                                    </button>
                                ) : (
                                    <button
                                        className="false grid-item"
                                        onClick={() =>
                                            this.toggleState(rowNum, colNum)
                                        }
                                    >
                                        {index}
                                    </button>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default Grid
