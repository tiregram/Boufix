



function messageInit()
{


}


function messageDraw(inf)
{
    
    var mess = document.createElement("div");
    mess.className = "message new";
    mess.innerHTML = inf.user_name + ": passe de " + inf.old_value +" à "+ inf.new_value;
    document.getElementById("messContener").appendChild(mess);
    
    setTimeout(function()
	       {
		   mess.remove();
	       },5000);
	  
}
