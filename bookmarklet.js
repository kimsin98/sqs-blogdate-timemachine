javascript:(function(){!function(){if(!document.documentElement.classList.contains("squarespace-damask"))return;let e=document.body.querySelector('div[title="Sunday"]');if(null==e)return;for(let n=0;n<5;n++)e=e.parentElement;const n="sqs-blogdate-timemachine";if(null!=e.parentElement.querySelector(`#${n}`))return;const t=`\n    <form class="css-roynbj" id="${n}">\n      <fieldset class="date-inputs">\n        <div>\n          <input class="year" name="year" placeholder="YYYY" type="number">\n          <label class="label" for="year">YYYY</label>\n        </div>\n        <div>\n          <input class="month" min="1" max="12" placeholder="MM" name="month" type="number">\n          <label class="label" for="month">MM</label>\n        </div>\n        <div>\n          <input class="day" min="1" max="31" placeholder="DD" name="day" type="number">\n          <label class="label" for="day">DD</label>\n        </div>\n        <div>\n          <input type="submit" value="Go To"/>\n        </div>\n        </fieldset>\n    </form>\n  `,a=`\n    <style>\n      #${n} .date-inputs {\n        border: none;\n        display: flex;\n        gap: 1em;\n        margin-left: 22px;\n        margin-top: 0.5em;\n        padding-block: unset;\n        padding-inline: unset;\n      }\n      #${n} .date-inputs input {\n        background-color: #f5f5f5;\n        padding: 5px 10px;\n        width: 3em;\n      }\n      #${n} .date-inputs label {\n        display: block;\n        padding-left: 10px;\n      }\n      #${n} .date-inputs input:first-child {\n        width: 4em;\n      }\n      #${n} .date-inputs input[type="submit"] {\n        border-radius: 10px;\n        width: 5em;\n      }\n      #${n} .date-inputs button:hover {\n        background-color: #f5f5f5;\n      }\n      #${n} .date-inputs button:active {\n        background-color: #e1e1e1;\n      }\n    </style>\n  `;let l;const r=document.querySelector('[data-test="nav-text"]'),i=document.querySelector('[data-test="month-nav-previous"]'),o=document.querySelector('[data-test="month-nav-next"]');document.head.insertAdjacentHTML("beforeend",a),e.insertAdjacentHTML("beforebegin",t),e.parentElement.querySelector(`#${n}`).addEventListener("submit",(e=>{e.preventDefault();const t=document.querySelector(`#${n} .year`).value,a=document.querySelector(`#${n} .month`).value,d=document.querySelector(`#${n} .day`).value,u=new Date(`${t}-${a}-1`);if(isNaN(u))return void alert("Invalid year and month");if(u.getFullYear()<1970)return void alert("1970 is the oldest possible year");l&&clearTimeout(l);const s=()=>{const e=((e,n)=>12*(n.getFullYear()-e.getFullYear())+n.getMonth()-e.getMonth())(new Date(`1 ${r.textContent}`),u);if(e<0)i.click();else{if(!(e>0))return u.setDate(d),void(isNaN(u)||document.querySelector(`[data-value="${u.getTime()}"]`).click());o.click()}l=setTimeout(s,10)};s()}))}();}());