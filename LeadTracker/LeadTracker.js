let myLeads = [];
const inputBtn = document.getElementById("save-btn");
const tabBtn = document.querySelector("#tab-btn");
const inputEl = document.querySelector("#input-el");
const deleteBtn = document.getElementById("delete-btn");
const ulEl = document.querySelector("#ul-el");
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStorage)
{
	myLeads = leadsFromLocalStorage;
	render(myLeads);
}

// to remove the leads
const removeEl = document.getElementById("remove-el");
const removeBtn = document.getElementById("remove-btn");

// console.log(removeEl);
// console.log(removeBtn);

//get the value from the text box
// match the value in the myLeads array 
// if found remove it  else print not present  

const removeValue = removeEl.value;

removeBtn.addEventListener("click" , function(){

	let flag = false;
	let i = 0 ;
	for( i = 0 ; i < myLeads.length ; i++)
	{
		if(removeEl.value.toLowerCase() == myLeads[i].toLowerCase())
		{
			flag = true;
			break;
		}
	}
	if(flag == true){
		console.log("true");
		myLeads.splice(i,1);
		localStorage.setItem("myLeads" , JSON.stringify(myLeads));
	}
	else{
		
		// console.log(removeEl.value);
		// if(removeEl.value.trim() == ""){console.log("empty");}

		if(removeEl.value == "" || removeEl.value.trim() == ""){
			alert("Please Specify the value in the remove input!");
		}
		else if(myLeads.length === 0){
			alert("You have ZERO(0) Leads saved.");
		}
		else{
			alert("Can't Find the Link");
		}
	}
	// console.log(myLeads);
	removeEl.value = "";
	render(myLeads);
})



// console.log(inputBtn)
// console.log(tabBtn)
// console.log(inputEl)
// console.log(deleteBtn)
// console.log(ulEl)




function render(leads)
{
	let listItems = "";
	for(let i = 0; i < leads.length ; i++)
	{
		listItems += `<li>
							<a target="_blank" href="${leads[i]}" }>
							 	${leads[i]}
							 </a>
						</li>`;
	}

	ulEl.innerHTML = listItems;
}


// modify this function , new feature :- dont add the link if it is already present 



inputBtn.addEventListener("click",function(){
	let flag = false;
	
	// console.log(myLeads);

	for(let i = 0; i < myLeads.length ; i++){
		if(inputEl.value.toLowerCase() == myLeads[i].toLowerCase()){
			flag = true;
		}
	}
	// console.log(flag);
	// console.log(!flag);

	if(!flag){
			myLeads.push(inputEl.value);
			localStorage.setItem("myLeads" , JSON.stringify(myLeads) );
	}

	else{
		if(!inputEl.value){
			alert("Please Specify the value in the input!");
		}
		else{
			alert("Lead is already save in your LEADS !");
		}
	}
		inputEl.value = "";
		render(myLeads);

})

deleteBtn.addEventListener("dblclick", function(){
	localStorage.clear();
	//localStorage.removeItem("myLeads");
	//to delete the value for specfic key.
	myLeads=[]
	render(myLeads);

})

tabBtn.addEventListener("click" , function(){
	chrome.tabs.query({active:true , currentWindow : true} , function(tabs){

		//validation for the duplicate tabs
		let flag = false;
	
	// console.log(myLeads);

	for(let i = 0; i < myLeads.length ; i++){
		if(tabs[0].url.toLowerCase() == myLeads[i].toLowerCase()){
			flag = true;
		}
	}
	// console.log(flag);
	// console.log(!flag);

	if(!flag){
			myLeads.push(tabs[0].url);
			localStorage.setItem("myLeads" , JSON.stringify(myLeads) );
	}

	else{
			alert("Lead is already save in your LEADS !");
	}
	
		render(myLeads);
	})
})