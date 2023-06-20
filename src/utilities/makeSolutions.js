const TOKENS = ["+", "<", "~", ">", "-"];
const SIZE = 256;

const _ = require("lodash");

const makeAllSolutions = (size, tokens) => {
  //initialize solutions grid
  let solutionsGrid = [...Array(SIZE)].map((e) => Array(SIZE));

  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      solutionsGrid[i][j] = {
        origin: i,
        result: j,
        solution: "none",
        steps: []
      };
    }
  }

  const doToken = (number, token) => {
    switch (token) {
      case "<":
        return (number * 2) % SIZE;
      case ">":
        return Math.floor(number / 2);
      case "~":
        return SIZE - 1 - number;
      case "+":
        return number === SIZE - 1 ? 0 : number + 1;
      case "-":
        return number === 0 ? SIZE - 1 : number - 1;
      case "!":
        return 255;
      case " ":
        return 0;
      default:
        return null
    }
  };

  // in pairs where the origin and goal are the 
  // same number, set the solution to an empty string
  const zeroSteps = () => {
    for (let i = 0; i < SIZE; i++) {
      solutionsGrid[i][i].solution = ""
    }
  }

  const oneSteps = () => {
    for (let i = 0; i < SIZE; i++) {
      for (let token of TOKENS) {
        const result = doToken(i, token);
        if (solutionsGrid[i][result].solution === "none") {
          solutionsGrid[i][result].solution = token;
          solutionsGrid[i][result].steps.push({token: token, number: result})
        }
      }
    }
  }
  
  const addSteps = () => {
    // flat array containing all solved pairs
    const solvedPairs = _.flatten(solutionsGrid).filter((item) => item.solution !== "none")
    for (let pair of solvedPairs) {
      // build each new solution atop an existing one
      const {origin, result, solution} = pair
      for (let token of TOKENS) {
        const newResult = doToken(result, token)
        if (solutionsGrid[origin][newResult].solution === "none") {
          solutionsGrid[origin][newResult].solution = solution + token
          solutionsGrid[origin][newResult].steps.push({ token: token, number: newResult });
        }
      }
    }
  }

  zeroSteps();
  oneSteps();
  //i.e. while there are still any unsolved pairs
  while (
    _.flatten(solutionsGrid).filter((item) => item.solution === "none").length >
    0
  ) {
    addSteps()
  }

  return solutionsGrid
}

export const allSolutions = makeAllSolutions(SIZE, TOKENS)