window.addEventListener("load",function ()
{
    /////selector//////
    let goButton = document.querySelector("button");

    goButton.onclick = function ()
    {
       
        let textBox =document.querySelector("input[type=textbox]").value;
        let select = document.querySelector("select").value;
        const url = "game.html?textBox="+textBox+"&select="+select;
    
        window.location.href = url;
    }
});