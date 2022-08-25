const rightdescription=document.querySelector(".rightdescription");
const inamount=document.querySelector(".inamount");
const outamount=document.querySelector(".outamount")
const interestamount=document.querySelector(".interestamount")

const array1 = {
  owner: "Dilip Raj",
  transactions: [500, 200, -300, 50000, -30000, 2000, 1500, -15000],
  pin: 2222,
  interestRate: 0.5,
};
const array2 = {
  owner: "Ankit",
  transactions: [400, 2000, -1500, 13000, -3000, 131000, -1500, -100000],
  pin: 3333,
  interestRate: 2,
};
const array3 = {
  owner: "Amar",
  transactions: [50000, 20000, -3000, 50000, -300, 40000, 20000, -150000],
  pin: 4444,
  interestRate: 1,
};
const array4 = {
  owner: "Aryan",
  transactions: [4000, 20000, -30000, 10000, -20000, 1000, 10500, -1000],
  pin: 5555,
  interestRate: 0.8,
};
const array = [array1, array2, array3, array4];
const transactiondetails = document.querySelector(".transactioncontainer");

const transactiondisplay = function (trans) {
  trans.forEach((value, i,array) => {
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
transactiondisplay(array1.transactions);

const calcdisplaybalance=function(arr){
  const finalbalance=arr.reduce((acc,value,i,array)=>
  acc+=value,0)
  rightdescription.textContent=`${finalbalance}€`;
}
calcdisplaybalance(array1.transactions)

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
usernames(array);
console.log(array)

//calculating summary
const displaysummary=function(trans){
  const income=trans.filter(value=>value>0).reduce((acc,values)=>acc+=values,0);
  inamount.textContent=`${income}€`

  const expenditure=Math.abs(trans.filter(value=>value<0).reduce((acc,values)=>acc+=values,0));
  outamount.textContent=`${expenditure}€`

  const interest=trans.filter(value=>value>0).map(value=>value*0.5/100).reduce((acc,value)=>acc+=value,0);
  interestamount.textContent=`${interest}€`
}
displaysummary(array1.transactions)








//find is used here to get the account of a person by his/her name.
// const account=array.find(arr=> arr.owner==="Ankit")
// console.log(account)
//Filter method
// const transaction=array1.transactions;
// const debittrans=transaction.filter(value=> value>0)
// console.log(debittrans)
// const withdrawtrans=transaction.filter(value=>value<0)
// console.log(withdrawtrans)

// //reduce method-> To get a single value from the array after calculations.
// const calbalance=transaction.reduce((acc,value,i,array)=>
//   acc+=value,0);
// console.log("Total balance of Dilip Raj is:",calbalance)

// const inamount=document.querySelector(".inamount")
// console.log(inamount)