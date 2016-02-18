

window.memberList = {};


window.onload = function() {

    
    httpRequest = new XMLHttpRequest();
    httpRequest.onreadystatechange =  manageAjaxAnswer;
    httpRequest.open('GET','http://127.0.0.1:8000/panel/ajax/all',true);
    httpRequest.send();

    panelInit();
    
    var cont = document.getElementById("cont");
    var leftsc = document.getElementById("")
    cont.scroolLeft += 10;
    

		
    
    var selection = document.querySelectorAll(".leters > div");

    for(var leter in selection)
    {
	selection[leter]
	    .addEventListener("click",function(elem)
					  {
					      updateMember(elem.target.innerHTML);
					  }
					 );	
    }


    
}

function refrechMember(element)
{
    if(httpRequest.readyState == 4)
    {
	if(httpRequest.status == 200)
	{
	    
	    var datab = element.srcElement.responseText;
	    
	    var data = JSON.parse(datab);
	    console.log(data);

	    window.memberList[data.user_name[0]][data.user_name].value = data.new_value;
	    messageDraw(data);
	    
	    var elememToModif = document.getElementById(data.user_name);
	    elememToModif.innerHTML = "";
	    
	    var nameMember = document.createElement("h3");	    
	    nameMember.innerHTML = data.user_name +" : "+data.new_value;
	    elememToModif.appendChild(nameMember);


	    
//    document.getElementById(element.)
	}

    }
}

function manageAjaxAnswer(rep)
{
    if(httpRequest.readyState == 4)
    {
	if(httpRequest.status == 200)
	{
	    var va = httpRequest.responseText;
	    console.log(va);
	    document.getElementById("cont")
	    var contenerOfMember = JSON.parse(va);

	    contenerOfMember.forEach(function(elem){
		console.log(elem);
		if(window.memberList[elem.fields.name[0]] ==undefined )
		    window.memberList[elem.fields.name[0]] = {};
		
		window.memberList[ elem.fields.name[0] ][elem.fields.name] = elem.fields;
	    });

	  	    
	}
	else
	{
	    console.log("error:"+httpRequest.status);
	}
	
    }
    else
    {


    }

    
}


function addOneMember(){}

function updateMember(elem)
{
    
    var contenerOfMember = document.getElementById("cont");
    var listOfMenberForThisLeter = window.memberList[ elem.toLowerCase() ] ;
    contenerOfMember.innerHTML="";
    
    for(var indiceOfMember in listOfMenberForThisLeter)
    {
	contenerOfMember.appendChild(createMember(listOfMenberForThisLeter[indiceOfMember]));

    }


}

function createMember(objMember)
{
    var member = document.createElement("div")
    member.className = "member";
    member.id = objMember.name;
    member.addEventListener("click",
			    function(e)
			    {
		
				console.log("a");
				clickOnMember(member); 
			    });
    
    var nameMember = document.createElement("h3");
    nameMember.innerHTML = objMember.name +" : "+objMember.value;
    

    member.appendChild(nameMember);
    return member;

}


function clickOnMember(elem)
{
    httpRequest.onreadystatechange =  panelOpenForUser;
    httpRequest.open('GET','http://127.0.0.1:8000/panel/ajax/one/'+elem.id,true);
    httpRequest.send();    
    panelOpen();
}