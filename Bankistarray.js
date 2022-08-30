const labellogin = document.querySelector(".login");
const inamount = document.querySelector(".inamount");
const outamount = document.querySelector(".outamount");
const transactiondetails = document.querySelector(".transactioncontainer");
const rightdescription = document.querySelector(".rightdescription");
const interestamount = document.querySelector(".interestamount");
const btnlogin = document.querySelector(".arrow");
const labeluser = document.querySelector(".user");
const labelpin = document.querySelector(".pin");
const labelcontainer = document.querySelector(".container");
const btntransfer = document.querySelector(".btntransfer");
const inputreceiver = document.querySelector(".inputreceiver");
const inputamount = document.querySelector(".inputamount");
const btnaccountclose = document.querySelector(".btncloseaccount");
const inputcloseuser = document.querySelector(".closeuser");
const inputclosepin = document.querySelector(".closepin");
const btnrequest = document.querySelector(".btnrequest");
const inputrequest = document.querySelector(".requestamount");
const btnsort = document.querySelector(".sorting");
const labeldate = document.querySelector(".date");
const labeltimer=document.querySelector(".timer")

const account1 = {
  owner: "Aryan Raj",
  transactions: [500, 200, -300, 50000, -30000, 2000, 1500, -15000],
  transactionsdates: [
    "2022-08-28T19:16:19.583Z",
    "2022-08-26T19:16:19.583Z",
    "2022-08-25T19:16:19.583Z",
    "2022-08-20T19:16:19.583Z",
    "2022-08-12T19:16:19.583Z",
    "2022-08-10T19:16:19.583Z",
    "2022-08-03T19:16:19.583Z",
    "2022-08-01T19:16:19.583Z",
  ],
  interestRate: 0.5,
  pin: 2222,
  locale: "en-US",
  currency:"USD"
};
const account2 = {
  owner: "Ankit Singh",
  transactions: [400, 2000, -1500, 13000, -3000, 131000, -1500, -100000],
  transactionsdates: [
    "2022-08-01T19:16:19.583Z",
    "2022-08-13T19:16:19.583Z",
    "2022-08-15T19:16:19.583Z",
    "2022-08-21T19:16:19.583Z",
    "2022-08-22T19:16:19.583Z",
    "2022-08-26T19:16:19.583Z",
    "2022-08-27T19:16:19.583Z",
    "2022-08-28T19:16:19.583Z",
  ],
  pin: 3333,
  interestRate: 0.6,
  locale: "en-GB",
  currency:"EUR"
};
const account3 = {
  owner: "Shivam Sharma",
  transactions: [50000, 20000, -3000, 50000, -300, 40000, 20000, -150000],
  transactionsdates: [
    "2022-08-28T19:16:19.583Z",
    "2022-08-28T19:16:19.583Z",
    "2022-08-28T19:16:19.583Z",
    "2022-08-28T19:16:19.583Z",
    "2022-08-28T19:16:19.583Z",
    "2022-08-28T19:16:19.583Z",
    "2022-08-28T19:16:19.583Z",
    "2022-08-28T19:16:19.583Z",
  ],
  pin: 4444,
  interestRate: 0.9,
  locale:"en-GB",
  currency:"AUD"
};
const account4 = {
  owner: "Rahul Tripathi",
  transactions: [4000, 20000, -30000, 10000, -20000, 1000, 10500, -1000],
  transactionsdates: [
    "2022-08-28T19:16:19.583Z",
    "2022-08-28T19:16:19.583Z",
    "2022-08-28T19:16:19.583Z",
    "2022-08-28T19:16:19.583Z",
    "2022-08-28T19:16:19.583Z",
    "2022-08-28T19:16:19.583Z",
    "2022-08-28T19:16:19.583Z",
    "2022-08-28T19:16:19.583Z",
  ],
  pin: 5555,
  interestRate: 0.8,
  locale:"en-US",
  currency:"JPY"
};
const accounts = [account1, account2, account3, account4];

let timer;

const timerDisplay=function(){
  let time=10;
  let min=String(Math.trunc(time/60)).padStart(2,0);
  let second=String(time%60).padStart(2,0);
  labeltimer.textContent=`${min}:${second}`

  timer=setInterval(function(){
    time--;
    min=String(Math.trunc(time/60)).padStart(2,0);
    second=String(time%60).padStart(2,0);

    labeltimer.textContent=`${min}:${second}`

    if((time+1)===0){
      clearInterval(timer);
      labelcontainer.classList.add("hidden")
      labellogin.textContent="Login to get started"
    }
  },1000)
  return timer;
}



//Dates With Current Balance
const datedisplay = function (locale) {
  const presentdate = new Date();
  // const date = presentdate.getDate();
  // const month = presentdate.getMonth();
  // const year = presentdate.getFullYear();
  // const displaydate = `${date}/${month+1}/${year}`;
  labeldate.textContent = new Intl.DateTimeFormat(locale).format(presentdate)
};

//Internationalizing Number Function
const CurrInter=function(value,locale,curr){

  // console.log(curr)
  return  new Intl.NumberFormat(locale,{
    style: 'currency',
    currency: curr
  }).format(value)
}

//Transactiondates formatting function
const transactiondates = function (transactiondate,locale) {
  const presentdate = new Date();
  const daypassed = Math.round(
    (presentdate - transactiondate) / (1000 * 60 * 60 * 24)
  );
  // const date = transactiondate.getDate();
  // const month = transactiondate.getMonth();
  // const year = transactiondate.getFullYear();
  // const transdate = `${date}/${month+1}/${year}`;

  if (daypassed === 0) return "Today"
  if (daypassed === 1) return "Yesterday";
  if (daypassed <= 7) return `${daypassed} days ago`;
  return new Intl.DateTimeFormat(locale).format(transactiondate)
};

//Displaying transactions
const transactiondisplay = function (acc, sort = false) {
  transactiondetails.innerHTML = "";

  const tran = sort
    ? acc.transactions.slice().sort((a, b) => a - b)
    : acc.transactions;
  tran.forEach((value, i, accounts) => {
    const type = value > 0 ? "DEPOSIT" : "WITHDRAWL";

    // const valuetrans=CurrInter(value,acc.locale,acc.currrency);

    const valuetrans=CurrInter(value,acc.locale,acc.currency)

    // console.log(acc.currency)
    const transactiondate = new Date(acc.transactionsdates[i]);
    const displaydates = transactiondates(transactiondate,acc.locale);
    const div = `
        <div class="individualTransaction">
            <div class="typetransaction  ${type}">${i + 1} ${type}</div>
            <div class="transactionsdate">${displaydates}</div>
            <div class="valuetransaction">${valuetrans}</div>
        </div>
        `;
    transactiondetails.insertAdjacentHTML("afterbegin", div);
  });
  labeluser.value = labelpin.value = "";
};

//Calculating and Showing final balance
const calcdisplaybalance = function (arr) {
  rightdescription.textContent = "";
  const finalbalance = arr.transactions.reduce(
    (acc, value, i, accounts) => (acc += value),
    0
  );
  arr.balance = finalbalance;
  rightdescription.textContent = CurrInter(finalbalance,arr.locale,arr.currency);
};

//Creating Usernames using map and forEach method
const usernames = function (acc) {
  acc.forEach(function (arr) {
    arr.username = arr.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
usernames(accounts);

//calculating summary
const displaysummary = function (acc) {
  const income = acc.transactions
    .filter((value) => value > 0)
    .reduce((acc, values) => (acc += values), 0);
  inamount.textContent = CurrInter(income,acc.locale,acc.currency);

  const expenditure = Math.abs(
    acc.transactions
      .filter((value) => value < 0)
      .reduce((acc, values) => (acc += values), 0)
  );
  outamount.textContent = CurrInter(expenditure,acc.locale,acc.currency);

  const interest = acc.transactions
    .filter((value) => value > 0)
    .map((value) => (value * acc.interestRate) / 100)
    .reduce((acc, value) => (acc += value), 0);
  interestamount.textContent = CurrInter(interest,acc.locale,acc.currency);
};

//DisplayUI
const displayUI = function (account) {
  transactiondisplay(account);
  displaysummary(account);
  calcdisplaybalance(account);
};

//Login Button
btnlogin.addEventListener("click", function (e) {
  e.preventDefault();

  currentaccount = accounts.find((acc) => acc.username === labeluser.value);
  if (currentaccount?.pin === Number(labelpin.value)) {
    labelcontainer.classList.remove("hidden");
    labellogin.textContent = `Welcome back, ${
      currentaccount.owner.split(" ")[0]
    }`;
    displayUI(currentaccount);
    datedisplay(currentaccount.locale);
    if(timer)clearTimeout(timer);
    timer=timerDisplay();
  }
});

//Transfer Button
btntransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const receiveraccount = accounts.find(
    (acc) => acc.username === inputreceiver.value
  );
  const amount = inputamount.value;
  // console.log(amount)
  if (
    amount > 0 &&
    currentaccount.balance >= amount &&
    receiveraccount &&
    receiveraccount.username !== currentaccount.username
  ) {
    currentaccount.transactions.push(Number(`-${amount}`));
    receiveraccount.transactions.push(Number(amount));

    receiveraccount.transactionsdates.push(new Date());
    currentaccount.transactionsdates.push(new Date());
    displayUI(currentaccount);
    clearTimeout(timer);
    timer=timerDisplay();
  }
  inputreceiver.value = inputamount.value = "";
});

//Request Loan Button
btnrequest.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = inputrequest.value;
  console.log(amount);

  if (
    amount > 0 &&
    currentaccount.transactions.some((trans) => trans>= amount * 0.1)
  ) {
    setTimeout(()=> {
    currentaccount.transactions.push(Number(amount));
    currentaccount.transactionsdates.push(new Date());
    displayUI(currentaccount);}
    ,5000)
    clearTimeout(timer);
    timer=timerDisplay();
  }
  inputrequest.value = "";
});

// Close Account Button
btnaccountclose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputcloseuser.value === currentaccount.username &&
    Number(inputclosepin.value) === currentaccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentaccount.username
    );
    accounts.splice(index, 1);
    labelcontainer.classList.add("hidden");
    labellogin.textContent="Login to get started"
  }
  inputclosepin.value = inputcloseuser.value = "";
});

//Sort Button
let sorting = false;
btnsort.addEventListener("click", function (e) {
  e.preventDefault();

  transactiondisplay(currentaccount, !sorting);
  sorting = !sorting;
});


// const num=45135131.66;

// const options={
//   style: 'currency',
//   currency: 'USD'
// }
// console.log(new Intl.NumberFormat('en-US',options).format(num))

//flat and flatMap method:flatMap method acn only be used in 1 level nested.
// const wholearray=accounts.map(acc=>acc.transactions);
// console.log(wholearray)
// const wholetransactionarray=wholearray.flat()
// console.log(wholetransactionarray)
// // sum of all transactions
// const totaltransactions=wholetransactionarray.reduce((acc,value)=>acc+value,0)
// console.log(totaltransactions)

// //flatmap:Using flat and map together
// const wholetransaction=accounts.flatMap(acc=>acc.transactions).reduce((acc,value)=>acc+value,0)
// console.log(wholetransaction)
// console.log(new Date().toISOString())
