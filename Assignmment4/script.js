// console.log("JS Connected Successfully");


// (function(){
//     emailjs.init("wNUcYlbSOjzKOOr2v");
// })();




const services = [
    {id:1, name:"Dry Cleaning", Price:200},
    {id:2, name:"Wash & Fold", Price:120},
    {id:3, name:"Ironing", Price:50},
    {id:4, name:"Shoe Cleaning", Price:300},
    {id:5, name:"complete pack", Price:599}
];

const serviceList = document.getElementById("servicelist");
const cartBody = document.getElementById("cartbody")
const totalAmount = document.getElementById("totalAmount")

let cart = [];
let total = 0;

// services.forEach(s=>{
//     let card = document.createElement("div");
//     card.className = "p-4 bg-white rounded shadow"
//     card.innerHTML = `<h4 class="font-semibold">${s.name}</h4>
//                         <p class= "text-slate-600"> ₹${s.Price}</p>
//                         <button id="addcart" class="mt-3 bg-primary-500 text-white px-4 py-2 rounded" onclick="addToCart(${s.id})">
//                         Add Item </button>`;

//     serviceList.appendChild(card)
// });

updateServices();

function addToCart(id){
    let item = services.find(s=>s.id===id);
        cart.push(item);
        total += item.Price;
        updateCart(); 
        
}

function removeItem(id){
    const index = cart.findIndex(item=> item.id === id);

    if(index !== -1){
        total -= cart[index].Price;
        cart.splice(index, 1);

        if(cart.length === 0){
            total = 0;
        }
        updateCart();
        updateServiceButtons()
    }
}

function updateCart(){
    cartBody.innerHTML ="";
    cart.forEach((c,i)=>{
        let row = document.createElement("tr");
        row.classList.add("mx-1")
        row.innerHTML = `<td class="py-2">${i+1}</td>
                        <td class="py-2">${c.name}</td>
                        <td class="py-2">${c.Price}</td>
                        <td> <button class="p-2 rounded shadow font-bold text-white-800 bg-red-600"  onclick="removeItem(${c.id})">X</button></td>`;
                        cartBody.appendChild(row);
    });
    totalAmount.innerText = "₹"+Number(total);
}

function updateServices(){
    serviceList.innerHTML="";

    services.forEach(s=>{
        let card = document.createElement("div");
        card.className = "p-4 bg-white rounded shadow";

        const isAdded = cart.some(item => item.id === s.id);

        card.innerHTML =`
        <h4 class="font-semibold">${s.name}</h4>
        <p class="text-slate-600">₹${s.Price}</p>
        <button class="mt-3 text-white px-4 py-2 rounded service-btn ${isAdded?"bg-red-500":"bg-primary-500"}"
        data-id="${s.id}">
        ${isAdded?"Remove Item":"Add Item"}`;
        serviceList.appendChild(card);
    });
}

document.addEventListener("click", function(e){
    if(e.target.classList.contains("service-btn")){
        const id = Number(e.target.dataset.id);
        const exists = cart.some(item => item.id ===id);

        if(!exists){
            addToCart(id);
        }
        else{
            removeItem(id);
        }

        updateServiceButtons();

    }
})

function updateServiceButtons(){
    document.querySelectorAll(".service-btn").forEach(btn =>{
        const id = Number(btn.dataset.id);
        const exists = cart.some(item => item.id === id);
        if(exists){
            btn.textContent ="Remove Item";
            btn.classList.remove("bg-primary-500");
            btn.classList.add("bg-red-500");
        }else{
            btn.textContent = "Add Item";
            btn.classList.remove("bg-red-500");
            btn.classList.add("bg-primary-500");
        }
    });
}




const now = new Date();


document.getElementById("bookingForm").addEventListener("submit", function(e){
    e.preventDefault();

    let params ={
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        items: cart.map(c=>c.name).join(","),
        message: "Thank you for booking our service",
        time:   now.toLocaleString(),
        total: total
    };

    emailjs.send("service_18shwcc","template_ysviqs4",params)
    .then(()=>{
        return emailjs.send("service_18shwcc","template_5mfilz5",params);
    })
    .then(()=>{
        document.getElementById("bookingMsg").innerText = "Thank you!!!  Your booking is confirmed. A confirmation email has been send";

        cart = [];
        total = 0;

        updateCart();
        updateServiceButtons();
        document.getElementById("bookingForm").reset();

    })
    .catch(()=>{
        document.getElementById("bookingMsg").innerText = "Error sending email. Check EmailJS keys!";


    });

});


document.getElementById("scrollToServices").onclick = () => document.getElementById("Services").scrollIntoView();

document.getElementById("subBtn").onclick = () => alert("Subscribed successfully");

document.getElementById("year").innerHTML = new Date().getFullYear();

