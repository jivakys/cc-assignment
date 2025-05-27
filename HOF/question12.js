function processStudents(arr) {
  // Filter the students to create a new array of students who scored above 60 marks.
  // Sort the filtered array in descending order of marks.
  // Map the sorted array to extract only the names of the students.
  // Return the array of sorted names.

  const newStudentArr = arr
    .filter((student) => student.marks > 60)
    .sort((a, b) => b.marks - a.marks)
    .map((student) => student.name);
  //   console.log(newStudentArr);

  return newStudentArr;
}

let arr = [
  { name: "Alice", marks: 58 },
  { name: "Bob", marks: 85 },
  { name: "Charlie", marks: 92 },
  { name: "David", marks: 45 },
  { name: "Emma", marks: 76 },
  { name: "Frank", marks: 63 },
  { name: "Grace", marks: 89 },
  { name: "Hannah", marks: 95 },
  { name: "Ian", marks: 54 },
  { name: "Jack", marks: 79 },
  { name: "Kate", marks: 67 },
  { name: "Leo", marks: 88 },
  { name: "Mia", marks: 91 },
  { name: "Nathan", marks: 72 },
  { name: "Olivia", marks: 82 },
];
processStudents(arr);
