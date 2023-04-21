import { employees } from "./data.js"

const container = document.querySelector('.container')
const table = document.createElement('table')
const thead = document.createElement('thead')
const tbody = document.createElement('tbody')
const tfoot = document.createElement('tfoot')
const buttons = document.createElement('div')
container.appendChild(table)
container.appendChild(buttons)
let positions = ["Show ALL"]
let positionsUnique = []

// !! Function to make the table headings and sort by columns
const columns = ["Full name", "Position", "Salary"]
columns.forEach(column => {
  const th = document.createElement('th')
  th.innerHTML = column
  th.id = column.split(' ').join('').toLowerCase()
  thead.appendChild(th)
  th.addEventListener('click', () => {
    tbody.innerHTML = ''
    if (th.id === "fullname") {
      employees.sort((a, b) => {
        return (a.last + a.first).localeCompare(b.last + b.first)
      })
    } else if (th.id === "position") {
      employees.sort((a, b) => {
        return a.position.localeCompare(b.position)
      })
    } else if (th.id === "salary") {
      employees.sort((a, b) => a.salary < b.salary ? 1 : a.salary > b.salary ? -1 : 0)
    }
    populateTable()
  })
})
table.appendChild(thead)

// !! Function to populate the table
function populateTable() {
  employees.forEach(employee => {
    const tr = document.createElement('tr')
    tr.classList.add(employee.position, 'employee')
    positions.push(employee.position)
    tr.innerHTML = `
      <td> ${employee.first} ${employee.last}</td>
      <td> ${employee.position} </td>
      <td> ${employee.salary} </td>
      `
    tbody.appendChild(tr)
  })
  table.appendChild(tbody)
  positionsUnique = [...new Set(positions)]
}
populateTable()

// !! Function to calculate the total salaries
const totalSalaries = employees.reduce((sum, cur) => sum + cur.salary, 0)
tfoot.innerHTML = `
  <td colspan="2"> Total salaries:</td>
  <td> ${totalSalaries} </td>
  `
table.appendChild(tfoot)

// !! Function to display only specific categories
positionsUnique.forEach(position => {
  const button = document.createElement('button')
  button.innerText = position.charAt(0).toUpperCase() + position.slice(1)
  buttons.appendChild(button)
  button.addEventListener('click', () => {
    const allEmployees = document.getElementsByClassName('employee')
    for (let i = 0; i < allEmployees.length; i++) {
      allEmployees[i].style.display = 'none'
      if (allEmployees[i].classList.contains(position)) {allEmployees[i].style.display = ''}
      else if (position === 'Show ALL') {allEmployees[i].style.display = ''}
    }
  })
})