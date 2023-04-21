import { employees } from "./data.js"

const container = document.querySelector('.container')
const table = document.createElement('table')
const thead = document.createElement('thead')
const tbody = document.createElement('tbody')
const tfoot = document.createElement('tfoot')
const buttons = document.createElement('div')
container.appendChild(table)
container.appendChild(buttons)
buttons.className = "buttons"
let positions = []
let positionsUnique = []

// !! Function to make the table headings
const columns = ["Full name", "Position", "Salary"]
columns.forEach(column => {
  const th = document.createElement('th')
  th.innerHTML = column
  const columnID = column.split(' ').join('').toLowerCase()
  th.id = columnID
  thead.appendChild(th)
  th.addEventListener('click', () => {
    tbody.innerHTML = ''
    if (columnID === "fullname") {
      employees.sort((a, b) => {
        const aFull = a.last + " " + a.first
        const bFull = b.last + " " + b.first
        return aFull.localeCompare(bFull)
      })
    } else if (columnID === "position") {
      employees.sort((a, b) => {
        const aPosition = a.position
        const bPosition = b.position
        return aPosition.localeCompare(bPosition)
      })
    } else if (columnID === "salary") {
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
  positionsUnique = [...new Set(positions)]
table.appendChild(tbody)
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
    }
    const buttonEmployees = document.getElementsByClassName(position)
    for (let i = 0; i < buttonEmployees.length; i++) {
      buttonEmployees[i].style.display = ''
    }
  })
})