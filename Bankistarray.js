const labellogin=document.querySelector(".login")
const transactiondetails = document.querySelector(".transactioncontainer");
const rightdescription=document.querySelector(".rightdescription");
const inamount=document.querySelector(".inamount");
const outamount=document.querySelector(".outamount")
const interestamount=document.querySelector(".interestamount")
const btnlogin=document.querySelector(".arrow")
const labeluser=document.querySelector(".user")
const labelpin=document.querySelector(".pin")
const labelcontainer=document.querySelector(".container")

const account1 = {
  owner: "Dilip Raj",
  transactions: [500, 200, -300, 50000, -30000, 2000, 1500, -15000],
  pin: 2222,
  interestRate: 0.5,
};
const account2 = {
  owner: "Ankit",
  transactions: [400, 2000, -1500, 13000, -3000, 131000, -1500, -100000],
  pin: 3333,
  interestRate: 2,
};
const account3 = {
  owner: "Amar",
  transactions: [50000, 20000, -3000, 50000, -300, 40000, 20000, -150000],
  pin: 4444,
  interestRate: 1,
};
const account4 = {
  owner: "Aryan",
  transactions: [4000, 20000, -30000, 10000, -20000, 1000, 10500, -1000],
  pin: 5555,
  interestRate: 0.8,
};
const accounts = [account1, account2, account3, account4];

const transactiondisplay = function (acc) {
  acc.forEach((value, i,accounts) => {
    const type = value > 0 ? "DEPOSIT" : "WITHDRAWL";
    const div = `
        <div class="individualTransaction">
            <div class="typetransaction  ${type}">${i + 1} ${type}</div>
            <div class="valuetransaction">${value}€</div>
        </div>
        `;
    transactiondetails.insertAdjacentHTML("afterbegin", div);
  });
};

const calcdisplaybalance=function(arr){
  const finalbalance=arr.reduce((acc,value,i,accounts)=>
  acc+=value,0)
  rightdescription.textContent=`${finalbalance}€`;
}
calcdisplaybalance(account1.transactions)

//Creating Usernames using map and forEach method
const usernames = function(username){
  username.forEach(function(arr){
    arr.username = arr.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
usernames(accounts);
console.log(accounts)

//calculating summary
const displaysummary=function(acc){
  const income=acc.transactions.filter(value=>value>0).reduce((acc,values)=>acc+=values,0);
  inamount.textContent=`${income}€`

  const expenditure=Math.abs(acc.transactions.filter(value=>value<0).reduce((acc,values)=>acc+=values,0));
  outamount.textContent=`${expenditure}€`

  const interest=acc.transactions.filter(value=>value>0).map(value=>value*acc.interestRate/100).reduce((acc,value)=>acc+=value,0);
  interestamount.textContent=`${interest}€`
}

btnlogin.addEventListener("click",function(e){
  e.preventDefault();

    currentaccount=accounts.find(acc=>acc.username===labeluser.value)
    // console.log(currentaccount)
    if(currentaccount?.pin === Number(labelpin.value))
    {
      labelcontainer.classList.remove("hidden")
      labellogin.textContent=`Welcome back, ${currentaccount.owner.split(" ")[0]}`;
      transactiondisplay(currentaccount.transactions);
      calcdisplaybalance(currentaccount.transactions);
      displaysummary(currentaccount);
      labeluser.classList.toggle("hidden")
      labelpin.classList.toggle("hidden")
      btnlogin.classList.toggle("hidden")
    }
});






