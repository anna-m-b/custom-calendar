// DISPLAY MONTHS IN CALENDAR //

// select the cells and save into an array
const allDays = Array.from(document.getElementsByTagName('td'));

// declarations for intial display (current month)
let date =  new Date();
let currentMonth = date.getMonth();
let year = date.getFullYear();

function displayMonth(date, currentMonth) {
    document.getElementById('mth').innerHTML = 
    date.toLocaleString('default', { month: 'long'}) + ',  ' + year;
    fillCal(currentMonth)
};

//get real current month to display
window.onload = function() {
  displayMonth(date, date.getMonth());
};


//get the first day of the current month
function getFirstDay(year, m) {
    let day = new Date(year, m).getDay()
    let firstDay;
    // assign index of allDays to be the first for month to display
    if ( day === 0) {
        firstDay = 6;
    } else {
        firstDay = day - 1;
    }
    return firstDay
};

//check leap year - if isLeapYear is true, the given year is a leap year.
// if the year given is not a leap year, new Date will evaluate to the first of March, so
// checking if the month is feb (1) tells us if we have a leap year or not.
const isLeapYear = (year) =>  new Date(year, 1, 29).getMonth() === 1 ;

// get the length of each month
function getMonthLength(m) {
    let monthLength;
    if ( 
        m === 3 
        || m === 5 
        || m === 8 
        || m === 10
        ) {
            monthLength = 30
        } else if (m === 1 && isLeapYear(year)) {
            monthLength = 29
        } else if (m === 1) {
            monthLength = 28
        } else {
            monthLength = 31
        }
     
        return monthLength
    };
    

    
// fill the calendar with the correct dates 
function fillCal(m) {
    let first = getFirstDay(year, m);
    let last = first + getMonthLength(m)
    let displayMth = allDays.slice(first, last)
    let day = 1
      for (let i = 0; i < displayMth.length; i++) {
          displayMth[i].innerHTML = day
            day++
          }  
};



// RESPOND TO USER INTERACTION //

// CHANGE MONTH & YEAR WHEN ARROWS ARE CLICKED
document.addEventListener('click', function(event) {
    
    if (event.target.matches('#prev-mth')) {
        resetTable();
        if (currentMonth === 0) {
            currentMonth = 11
            year  = year - 1
        } else {
        currentMonth = currentMonth - 1;
        }
        date = new Date(year, currentMonth);
        displayMonth(date, currentMonth);
        togglePastDates()
    }

    if (event.target.matches('#nxt-mth')) {
        resetTable();
        if (currentMonth === 11) {
            currentMonth = 0
            year = year + 1
        } else {
        currentMonth = currentMonth + 1;
        }
        date = new Date(year, currentMonth);
        displayMonth(date, currentMonth);
        togglePastDates()
    }
});
    


// HIGHLIGHT SELECTED DAY & DISPLAY SELECTED DATE
const dateText = document.getElementById('selected-date')
let selectedDate; 
const selectDate = (target) => {
  if (target.classList.contains('selected-day')) {
    removeSelectedDay()
  } else { 
    removeSelectedDay()
    target.classList.add('selected-day')
    selectedDate = `${target.innerHTML}/${(currentMonth + 1)}/${year}`
     return selectedDate;
  };
};

allDays.forEach(td => td.addEventListener('click', function(event) {
  let target = event.target
  if (!target.innerHTML) {
    return;
  }
  
  if (target.classList.contains('selected-day')) {
    removeSelectedDay()
  } else {
    date = new Date();
    if(disablePastDatesBtn.checked) {
      if (target.innerHTML >= date.getDate() && currentMonth >= date.getMonth()) {
        selectDate(target)
        dateText.innerHTML =  selectedDate;
      }
  } else {
     selectDate(target)
     dateText.innerHTML =  selectedDate;
  }
  };
}));

// SETTINGS //

// DISABLE / ENABLE PAST DATES //
const disablePastDatesBtn = document.getElementById('disable-past'); 
const togglePastDates = () => {
  removeSelectedDay();
  const today = new Date();
  const pastDates = allDays.filter(td => year === today.getFullYear() && currentMonth < today.getMonth()
                                         || (year === today.getFullYear() 
                                            && currentMonth === today.getMonth() 
                                            && parseInt(td.innerHTML) < today.getDate()));

  if (disablePastDatesBtn.checked ) {
    pastDates.forEach(date => date.classList.add('past-date'));
  } else {
    pastDates.forEach(date => date.classList.remove('past-date'));
  }
};

// HIDE or SHOW WEEKENDS //
const saturdays = Array.from(document.getElementsByClassName('saturday'));
const sundays = Array.from(document.getElementsByClassName('sunday'));

const toggleSaturdays = () => saturdays.map(elem => elem.classList.toggle('hidden'));
const toggleSundays = () => sundays.map(elem => elem.classList.toggle('hidden'));

document.getElementById('show-sat').addEventListener('click', toggleSaturdays);
document.getElementById('show-sun').addEventListener('click', toggleSundays);
disablePastDatesBtn.addEventListener('click', togglePastDates);

// REMOVE STYLES FUNCTIONS //
const removeSelectedDay = () =>  {
  allDays.forEach(td => td.classList.remove('selected-day'))
  dateText.innerHTML = "";
};

function resetTable() {
    allDays.map(td => {
        td.innerHTML = '';
        td.classList.remove('selected-day');
        td.classList.remove('past-date')
    })
};

// clear selected date text when settings change 
const settings = Array.from(document.getElementsByClassName('settings'))
settings.map(input => input.addEventListener('change', () =>  {
  removeSelectedDay();
}));


