export const flexiableOperators = ["+", "x"]

export const questions = [
  {
    prompt: "There are five players on a basketball team.",
    subQuestions: [
      {
        question: "How many shirts do we need for four teams?",
        working: [
          {
            operands: [5, 4],
            operator: "x",
            answer: 20
          }
        ],
        answer: 20
      },
      {
        question: "How many pairs of shoes do we need for six teams?",
        working: [
          {
            operands: [5, 6],
            operator: "x",
            answer: 30
          }
        ],
        answer: 30
      }
    ]
  },
  {
    prompt: `There are twelve trees.\n½ of them are apple trees.\n¼ of them are pear trees.\nThe rest are orange trees.`,
    subQuestions: [
      {
        question: "How many of the trees are apple trees?",
        working: [
          {
            operands: [12, 2],
            operator: "/",
            answer: 6
          }
        ],
        answer: 6
      },
      {
        question: "How many pear trees are there?",
        working: [
          {
            operands: [12, 4],
            operator: "/",
            answer: 3
          }
        ],
        answer: 3
      },
      {
        question: `How many of the trees are orange trees?\n(Hint: First add up the number of apple and pear trees)`,
        working: [
          {
            operands: [3, 6],
            operator: "+",
            answer: 9
          },
          {
            operands: [12, 9],
            operator: "-",
            answer: 3
          }
        ],
        answer: 3
      }
    ]
  },
  {
    prompt: `There are ten children. Each child is pulling a wagon.\nThere are five blocks in each wagon.\nEach child holds three kites.`,
    subQuestions: [
      {
        question: "How many blocks are there altogether?",
        working: [
          {
            operands: [10, 5],
            operator: "x",
            answer: 50
          }
        ],
        answer: 50
      },
      {
        question: "How many kites are there altogether?",
        working: [
          {
            operands: [10, 3],
            operator: "x",
            answer: 30
          }
        ],
        answer: 30
      }
    ]
  },
  {
    prompt: `There are three girls and five boys. Each child has ten balloons.`,
    subQuestions: [
      {
        question: "How many balloons do the girls have?",
        working: [
          {
            operands: [3, 10],
            operator: "x",
            answer: 30
          }
        ],
        answer: 30
      },
      {
        question: "How many balloons do the boys have?",
        working: [
          {
            operands: [5, 10],
            operator: "x",
            answer: 50
          }
        ],
        answer: 50
      },
      {
        question: `How many balloons are there in total?\n(Hint: Add them up!)`,
        working: [
          {
            operands: [50, 30],
            operator: "+",
            answer: 80
          }
        ],
        answer: 80
      },
      {
        question: `If each child loses two balloons, how many balloons will be left?\n(Hint: First find out how many balloons are lost)`,
        working: [
          {
            operands: [2, 16],
            operator: "x",
            answer: 16
          },
          {
            operands: [80, 16],
            operator: "-",
            answer: 64
          }
        ],
        answer: 64
      },
    ]
  },
  {
    prompt: `Seven people are standing with their right hands in the air\nand their left hands hidden behind their backs.`,
    subQuestions: [
      {
        question: "How many fingers do we see?",
        working: [
          {
            operands: [5, 7],
            operator: "x",
            answer: 35
          }
        ],
        answer: 35
      },
      {
        question: "How many legs do we see?",
        working: [
          {
            operands: [2, 7],
            operator: "x",
            answer: 14
          }
        ],
        answer: 14
      }
    ]
  },
  {
    prompt: `The parking lot has space for sixteen cars.\nThere are four empty spaces.`,
    subQuestions: [
      {
        question: "How many cars are in the lot?",
        working: [
          {
            operands: [16, 4],
            operator: "-",
            answer: 12
          }
        ],
        answer: 12
      },
      {
        question: `Four of the cars are red.\nThere are as many blue cars as red cars.\nThe rest of the cars are green.\nHow many cars are green? (Hint: First add the red and blue cars)`,
        working: [
          {
            operands: [4, 4],
            operator: "+",
            answer: 8
          },
          {
            operands: [16, 8],
            operator: "-",
            answer: 8
          }
        ],
        answer: 8
      }
    ]
  },
  // {
  //   prompt: `Toy cars cost one dollar. Kites cost ten cents. Marbles cost one cent\n
  //   Elizabeth bought 2 toy cars, 5 kites and 8 marbles.\n
  //   Glen bought 1 toy car, 10 kites and 12 marbles.\n
  //   Esther bought 3 toy cars, 15 kites and 20 marbles.\n
  //   How much did each one spend (in dollars)?`,
  //   subQuestions: [
  //     {
  //       question: "Elizabeth. (1st row: cars, 2nd row: kites, 3rd row: marbles, 4th row: total)",
  //       working: [
  //         {
  //           operands: [1, 2],
  //           operator: "x",
  //           answer: 2
  //         },
  //         {
  //           operands: [0.1, 5],
  //           operator: "x",
  //           answer: 0.5
  //         },
  //         {
  //           operands: [0.01, 8],
  //           operator: "-",
  //           answer: 0.08
  //         },
  //         {
  //           operands: [0.08, 0.5, 12],
  //           operator: "+",
  //           answer: 2.58
  //         }
  //       ],
  //       answer: 2.58
  //     },
  //     {
  //       question: "Glen. (1st row: cars, 2nd row: kites, 3rd row: marbles, 4th row: total)",
  //       working: [
  //         {
  //           operands: [1, 1],
  //           operator: "x",
  //           answer: 1
  //         },
  //         {
  //           operands: [0.1, 10],
  //           operator: "x",
  //           answer: 1
  //         },
  //         {
  //           operands: [0.01, 12],
  //           operator: "-",
  //           answer: 0.12
  //         },
  //         {
  //           operands: [1, 1, 0.12],
  //           operator: "+",
  //           answer: 2.12
  //         }
  //       ],
  //       answer: 2.12
  //     },
  //     {
  //       question: "Esther. (1st row: cars, 2nd row: kites, 3rd row: marbles, 4th row: total)",
  //       working: [
  //         {
  //           operands: [1, 3],
  //           operator: "x",
  //           answer: 3
  //         },
  //         {
  //           operands: [0.1, 15],
  //           operator: "x",
  //           answer: 1.50
  //         },
  //         {
  //           operands: [0.01, 20],
  //           operator: "-",
  //           answer: 0.20
  //         },
  //         {
  //           operands: [3, 1.50, 0.20],
  //           operator: "+",
  //           answer: 4.70
  //         }
  //       ],
  //       answer: 4.70
  //     },
  //   ]
  // },
  {
    prompt: `Here are ten plants.\nThere are five flowers on each plant.\nTwo of the flowers are red and three are yellow.`,
    subQuestions: [
      {
        question: "How many red flowers in total?",
        working: [
          {
            operands: [10, 2],
            operator: "x",
            answer: 20
          }
        ],
        answer: 20
      },
      {
        question: `How many yellow flowers in total?`,
        working: [
          {
            operands: [10, 3],
            operator: "x",
            answer: 30
          }
        ],
        answer: 30
      },
      {
        question: `How many flowers are there in all?`,
        working: [
          {
            operands: [30, 20],
            operator: "+",
            answer: 50
          }
        ],
        answer: 50
      },
      {
        question: `How many more plants would we need to get one hundred flowers?`,
        working: [
          {
            operands: [100, 50],
            operator: "-",
            answer: 50
          }
        ],
        answer: 50
      }
    ]
  }
]
