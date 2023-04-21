
const fullnameSort = () => {
  console.log("Full Name was clicked")
}

const positionSort = () => {
  console.log("Position was clicked")
}

const salarySort = () => {
  console.log("Salary was clicked")
}

document.querySelector('#fullname').addEventListener('click', fullnameSort)
document.querySelector('#position').addEventListener('click', positionSort)
document.querySelector('#salary').addEventListener('click', salarySort)
