// const { createElement } = require("react");

let nameEl=document.getElementById("name");
let cityEl=document.getElementById("city");
let statusEl=document.getElementById("status");

//for error msg
let displayMsgEl = document.getElementById("displayMsg");
displayMsgEl.style.color="red";
displayMsgEl.style.fontSize="20px";
displayMsgEl.style.fontWeight="600";

let messageEl = document.createElement("h3");        
messageEl.style.color = "red";
displayMsgEl.appendChild(messageEl);

//for card info
let cardContEl = document.getElementById("cardData");

//getting user info from localstorage
getInfoFromStorage = () => {
  let data = localStorage.getItem("myInfo");

    if(data === null){
        return [];
    }
    else{
        return JSON.parse(data);
    }
}

let infoList = getInfoFromStorage();

const deleteCardInfo = (infoId) =>{

    let userInfo = document.getElementById(infoId);
    userInfo.remove();

    // for(each of infoList){
    //     if(each.id === infoId ){
    //         each.removeChild();
    //     }
    // }    
    //for above got error as "Uncaught TypeError: each.removeChild is not a function"

        infoList = infoList.filter((each) => {
            return each.id != infoId;
        });

        localStorage.setItem("myInfo", JSON.stringify(infoList));
        // cardName.textContent="";
    // cardCity.textContent="";
    // cardStatus.textContent="";

    // updateBtnEl.disabled = true;   
            
            // for (each of infoList){
            //     if(each.id === infoId){
            //         each.r              }
            // }

}

let updateCardEl = document.getElementById("updateCard");
 let nameInputEl  , cityInputEl , statusInputEl;


const saveUpdatedInfo = (selectedUser,nameInputEl,cityInputEl,statusInputEl) => {
     selectedUser.name = nameInputEl.value;

        selectedUser.city = cityInputEl.value;

        selectedUser.status = statusInputEl.value;

        localStorage.setItem("myInfo", JSON.stringify(infoList));

        // refresh cards
        cardContEl.textContent = "";

        for (let each of infoList) {
            createAndAppendInfo(each);
        }

        // clear update card
        updateCardEl.textContent = "";
        // cardContEl.style.display = "block";
        // updateCardEl.classList.add("d-none");  //with this after saving border will reappears , so used below code 
        updateCardEl.className="d-none";
}



const updateCardInfo = (infoId) => {

    // let userInfo = document.getElementById(infoId);

    // console.log(userInfo);

    updateCardEl.classList.add("card", "w-100", "p-2" ,"d-flex",  "justify-content-center",
        "align-items-center");


    // updateCardEl.classList.remove("d-block");
    updateCardEl.classList.remove("d-none");

        updateCardEl.textContent = "";

    let selectedUser = infoList.find((each) => {
        return each.id === infoId;
    });

    let updateCardBodyEl = document.createElement("div");

    updateCardBodyEl.classList.add("card-body","rounded","p-3","mb-3","w-50","border",
         "border-info", "rounded" );

    // Name Input
    let nameLabelEl=document.createElement("label");
    nameLabelEl.classList.add("font-weight-bold");
    nameLabelEl.textContent = "Name : ";
    nameInputEl = document.createElement("input");
    nameInputEl.classList.add("form-control", "mb-2", "w-100");
    nameInputEl.value = selectedUser.name;
    
    let cityLabelEl=document.createElement("label");
    cityLabelEl.classList.add("font-weight-bold");
    cityLabelEl.textContent = "City : ";

    // City Input
    cityInputEl = document.createElement("input");
    cityInputEl.classList.add("form-control", "mb-2", "w-100");
    cityInputEl.value = selectedUser.city;

    // Status Input

    let statusLabelEl=document.createElement("label");
    statusLabelEl.classList.add("font-weight-bold");
    statusLabelEl.textContent = "Status : ";

    statusInputEl = document.createElement("input");
    statusInputEl.classList.add("form-control", "mb-2", "w-100");
    statusInputEl.value = selectedUser.status;

    // Save Button

    let saveBtnContEl = document.createElement("div");
    saveBtnContEl.classList.add("d-flex", "justify-content-center", "mt-3");

    let saveBtnEl = document.createElement("button");
    saveBtnEl.classList.add("btn", "btn-primary", "rounded", "w-25");   

    saveBtnEl.textContent = "Save";

    saveBtnEl.onclick = function () {

        saveUpdatedInfo(selectedUser,nameInputEl,cityInputEl,statusInputEl);
    };

    saveBtnContEl.appendChild(saveBtnEl);    

    updateCardBodyEl.appendChild(nameLabelEl);
    updateCardBodyEl.appendChild(nameInputEl);

    updateCardBodyEl.appendChild(cityLabelEl);
    updateCardBodyEl.appendChild(cityInputEl);

    updateCardBodyEl.appendChild(statusLabelEl);
    updateCardBodyEl.appendChild(statusInputEl);

    updateCardBodyEl.appendChild(saveBtnContEl);

    updateCardEl.appendChild(updateCardBodyEl);
    

     

}

//function to create a card
const createCardText = (strongHead,spanHead, containerEl) =>{
   
    let pEl=document.createElement("p");
    pEl.classList.add("card-text","m-2");

    let strongEl=document.createElement("strong");
    strongEl.textContent = strongHead + " : ";
    pEl.appendChild(strongEl);

    let spanEl = document.createElement("span");
    spanEl.textContent = spanHead;
    pEl.appendChild(spanEl);   

    containerEl.appendChild(pEl);

    // let hrEl = document.createElement("hr");
    // containerEl.appendChild(hrEl);    
}


//function to create a User Info
const createAndAppendInfo = (info) =>{
    
    let infoId=info.id;

    let cardEl = document.createElement("div");

    cardEl.classList.add("card","border-info","mb-3","m-3");
    cardEl.style.width="270px";

    let cardBodyEl = document.createElement("div");
    cardBodyEl.classList.add("card-body");
    cardBodyEl.id=infoId;
    // cardContEl.appendChild(cardBodyEl);

    //fucntion call to create card for each user
    createCardText("Name", info.name, cardBodyEl);
    createCardText("City", info.city, cardBodyEl);
    createCardText("Status", info.status, cardBodyEl);


    let brEl = document.createElement("br");

    let divEl= document.createElement("div");
    divEl.classList.add("d-flex","justify-content-between");

    //delete button
    let dltBtnEl = document.createElement("button");
    dltBtnEl.classList.add("btn","btn-danger","rounded", "w-50","m-2");
    dltBtnEl.textContent="Delete";

    dltBtnEl.onclick = function(){
        deleteCardInfo(info.id);
    }

    divEl.appendChild(dltBtnEl);

    //Update button
    let updateBtnEl = document.createElement("button");
    updateBtnEl.classList.add("btn","btn-success","rounded", "w-50","m-2");
    updateBtnEl.textContent="Update";

    updateBtnEl.onclick = function(){
        updateCardInfo(info.id);
    }
    divEl.appendChild(updateBtnEl);

    cardBodyEl.appendChild(divEl);

    cardEl.appendChild(cardBodyEl);

    cardContEl.appendChild(cardEl);

    // cardContEl.appendChild(cardBodyEl);

    // cardName.textContent = info.name;
    // cardCity.textContent = info.city;
    // cardStatus.textContent = info.status;


}

//call for creating User Card Info
for(let each of infoList){
        createAndAppendInfo(each);
}


//Add user function
 const addInfo = ()=>{

    if(nameEl.value.trim() === "" ){
        displayMsgEl.textContent = "Please Enter valid Name";
    }
    else if(cityEl.value.trim() === "" ){
        displayMsgEl.textContent = "Please Enter valid City";
    }
    else if(statusEl.value.trim() === "" ){
        displayMsgEl.textContent = "Please Enter valid Status";
    }
    else{
        // updateBtnEl.disabled = false;  
        // let uniqueId = infoList.length + 1;   // as I found after deleteion same id as "2" repeated as legth was 1 after deletion so uisng date for that i stead of length
        
        let uniqueId = Date.now();

        let newInfo = {
            id:uniqueId,
            name: nameEl.value,
            city: cityEl.value,
            status: statusEl.value
        };

        createAndAppendInfo(newInfo);

        infoList.push(newInfo);
        console.log(infoList);

        //saving user info to local storage
        localStorage.setItem("myInfo", JSON.stringify(infoList));

        // clear inputs
        nameEl.value = "";
        cityEl.value = "";
        statusEl.value = "";        
        displayMsgEl.textContent = "";    
         
    }

   
 }   