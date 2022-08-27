const labellogin=document.querySelector(".login")
const inamount=document.querySelector(".inamount");
const outamount=document.querySelector(".outamount")
const transactiondetails = document.querySelector(".transactioncontainer");
const rightdescription=document.querySelector(".rightdescription");
const interestamount=document.querySelector(".interestamount")
const btnlogin=document.querySelector(".arrow")
const labeluser=document.querySelector(".user")
const labelpin=document.querySelector(".pin")
const labelcontainer=document.querySelector(".container")
const btntransfer=document.querySelector(".btntransfer")
const inputreceiver=document.querySelector(".inputreceiver")
const inputamount=document.querySelector(".inputamount")
const btnaccountclose=document.querySelector(".btncloseaccount")
const inputcloseuser=document.querySelector(".closeuser")
const inputclosepin=document.querySelector(".closepin")

const account1 = {
  owner: "Aryan Raj",
  transactions: [500, 200, -300, 50000, -30000, 2000, 1500, -15000],
  pin: 2222,
  interestRate: 0.5,
};
const account2 = {
  owner: "Ankit Singh",
  transactions: [400, 2000, -1500, 13000, -3000, 131000, -1500, -100000],
  pin: 3333,
  interestRate: 0.6,
};
const account3 = {
  owner: "Shivam Sharma",
  transactions: [50000, 20000, -3000, 50000, -300, 40000, 20000, -150000],
  pin: 4444,
  interestRate: 0.9,
};
const account4 = {
  owner: "Rahul Tripathi",
  transactions: [4000, 20000, -30000, 10000, -20000, 1000, 10500, -1000],
  pin: 5555,
  interestRate: 0.8,
};
const accounts = [account1, account2, account3, account4];

//Displaying summary

const transactiondisplay = function (acc) {
  transactiondetails.innerHTML="";
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
  labeluser.value=labelpin.value="";
};

//Calculating and Showing final balance
const calcdisplaybalance=function(arr){
  const finalbalance=arr.transactions.reduce((acc,value,i,accounts)=>
  acc+=value,0)
  // console.log(finalbalance)
  arr.balance=finalbalance
  rightdescription.textContent=`${finalbalance}€`;
}


//Creating Usernames using map and forEach method
const usernames = function(acc){
  acc.forEach(function(arr){
    arr.username = arr.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
usernames(accounts);

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
    if(currentaccount?.pin === Number(labelpin.value))
    {
      labelcontainer.classList.remove("hidden")
      labellogin.textContent=`Welcome back, ${currentaccount.owner.split(" ")[0]}`;
      transactiondisplay(currentaccount.transactions);
      calcdisplaybalance(currentaccount);
      displaysummary(currentaccount);

    }
});


btntransfer.addEventListener("click",function(e){
  e.preventDefault();

  const receiveraccount=accounts.find(acc=>acc.username===inputreceiver.value)
  const amount=inputamount.value;
  console.log(amount)
  if(amount>0&&currentaccount.balance>=amount && receiveraccount && receiveraccount.username!==currentaccount.username){
    currentaccount.transactions.push(Number(`-${amount}`)) 
    receiveraccount.transactions.push(Number(amount))
    console.log(currentaccount)
    console.log(receiveraccount)
    calcdisplaybalance(currentaccount)
    displaysummary(currentaccount)
    const transvalue=amount;
    console.log(transvalue);
    const ttype ="WITHDRAWL";
    let i=currentaccount.transactions.length;
    const transdiv = `
        <div class="individualTransaction">
            <div class="typetransaction  ${ttype}">${i} ${ttype}</div>
            <div class="valuetransaction">${transvalue}€</div>
        </div>
        `;
    transactiondetails.insertAdjacentHTML("afterbegin", transdiv);
  }  
})

btnaccountclose.addEventListener("click",function(e){
  e.preventDefault();
  
  // console.log(accounts)
  if(inputcloseuser.value===currentaccount.username&&
    Number(inputclosepin.value)===currentaccount.pin){
      const index=accounts.findIndex(acc=>acc.username===currentaccount.username)
      // console.log(index)
      accounts.splice(index,1)
      labelcontainer.classList.add("hidden")
    }
})












