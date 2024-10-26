(function () {
  const documentElement = document.documentElement;

  if (!documentElement.classList.contains('squarespace-damask'))
    return; // not squarespace site

  let calendar = document.body.querySelector('div[title="Sunday"]');
  if (calendar == null)
    return; // no calendar

  // climb up to the calendar div
  for (let i = 0; i < 5; i++)
    calendar = calendar.parentElement;

  const prefix = 'sqs-blogdate-timemachine';
  if (calendar.parentElement.querySelector(`#${prefix}`) != null)
    return; // already installed


  const html = `
    <form class="css-roynbj" id="${prefix}">
      <fieldset class="date-inputs">
        <div>
          <input class="year" name="year" placeholder="YYYY" type="number">
          <label class="label" for="year">YYYY</label>
        </div>
        <div>
          <input class="month" min="1" max="12" placeholder="MM" name="month" type="number">
          <label class="label" for="month">MM</label>
        </div>
        <div>
          <input class="day" min="1" max="31" placeholder="DD" name="day" type="number">
          <label class="label" for="day">DD</label>
        </div>
        <div>
          <input type="submit" value="Go To"/>
        </div>
        </fieldset>
    </form>
  `;
  const style = `
    <style>
      #${prefix} .date-inputs {
        border: none;
        display: flex;
        gap: 1em;
        margin-left: 22px;
        margin-top: 0.5em;
        padding-block: unset;
        padding-inline: unset;
      }
      #${prefix} .date-inputs input {
        background-color: #f5f5f5;
        padding: 5px 10px;
        width: 3em;
      }
      #${prefix} .date-inputs label {
        display: block;
        padding-left: 10px;
      }
      #${prefix} .date-inputs input:first-child {
        width: 4em;
      }
      #${prefix} .date-inputs input[type="submit"] {
        border-radius: 10px;
        width: 5em;
      }
      #${prefix} .date-inputs button:hover {
        background-color: #f5f5f5;
      }
      #${prefix} .date-inputs button:active {
        background-color: #e1e1e1;
      }
    </style>
  `;

  const monthDiff = (fromDate, toDate) =>
    12 * (toDate.getFullYear() - fromDate.getFullYear()) +
    toDate.getMonth() -
    fromDate.getMonth();

  let timeoutId;
  const current = document.querySelector('[data-test="nav-text"]');
  const previousMonth = document.querySelector(
    '[data-test="month-nav-previous"]');
  const nextMonth = document.querySelector(
    '[data-test="month-nav-next"]');

  const goTo = (event) => {
    event.preventDefault();
    const toYear = document.querySelector(`#${prefix} .year`).value;
    const toMonth = document.querySelector(`#${prefix} .month`).value;
    const toDay = document.querySelector(`#${prefix} .day`).value;

    const toDate = new Date(`${toYear}-${toMonth}-1`);

    if (isNaN(toDate)) {
      alert("Invalid year and month");
      return;
    } else if (toDate.getFullYear() < 1970) {
      alert("1970 is the oldest possible year");
      return;
    }

    if (timeoutId)
      clearTimeout(timeoutId); // stop previous run

    const moveDate = () => {
      let curDate = new Date(`1 ${current.textContent}`);
      const diff = monthDiff(curDate, toDate);

      if (diff < 0) {
        previousMonth.click();
      } else if (diff > 0) {
        nextMonth.click();
      } else { // we have arrived!
        toDate.setDate(toDay);
        if (!isNaN(toDate))
          document.querySelector(`[data-value="${toDate.getTime()}"]`).click();
        return;
      }

      timeoutId = setTimeout(moveDate, 10);
    };
    moveDate();
  };


  document.head.insertAdjacentHTML("beforeend", style);
  calendar.insertAdjacentHTML("beforebegin", html);
  calendar.parentElement
    .querySelector(`#${prefix}`)
    .addEventListener("submit", goTo);
})();
