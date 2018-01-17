// 已知一组数组，里面有hash,其中要按照某个hash的顺序排序
const orderArray = [
  {order: 1},
  {order: 3},
  {order: 2},
];

// 要输出的数组
const outArray = [
  {
    order: 3,
    id: 1,
  },
  {
    order: 1,
    id: 2,
  },
  {
    order: 1,
    id: 3,
  },
  {
    order: 2,
    id: 4,
  },
  {
    order: 3,
    id: 5,
  },
];

// 现在要按照orderArray的顺序排序,如果相同则按照id排序
outArray.sort((a, b) => {
  if (a.order === b.order) {
    return a.id - b.id;
  } else {
    for (i of orderArray) {
      if (i.order === a.order) return -1;
      if (i.order === b.order) return 1;
    }
    return 0;
  }
});

console.log(outArray);

//[ { order: 1, id: 2 },
// { order: 1, id: 3 },
// { order: 3, id: 1 },
// { order: 3, id: 5 },
// { order: 2, id: 4 } ]
