const fromtext=document.querySelector(".text-from");
const textto=document.querySelector(".text-to");
const selectTag=document.querySelectorAll("select");
const exchangeicon=document.querySelector(".exchange");
traslationBtn=document.querySelector("button");
icons=document.querySelectorAll(".row i");
selectTag.forEach((tag,id)=>{
   for(const country_code in countries){
    let selected;
    if (id==0 && country_code =="en-GB") {
    	selected="selected";
    }else if(id==1 && country_code=="ur-PK"){
        selected="selected";
    }
    var option='<option value="'+country_code+'" '+selected+' >'+countries[country_code]+'</option>';
   	tag.insertAdjacentHTML("beforeend",option);
   	
   }
});
exchangeicon.addEventListener("click",()=>{
   let temptext=fromtext.value;
   templang=selectTag[0].value;
   fromtext.value=textto.value;
   selectTag[0].value=selectTag[1].value
   textto.value=temptext;
   selectTag[1].value=templang;
});

traslationBtn.addEventListener("click" ,()=>{
	let text=fromtext.value;
	traslationfrom=selectTag[0].value;
	traslationto=selectTag[1].value;
	// console.log(text,traslationfrom,traslationto);
	let Apiurl=('https://api.mymemory.translated.net/get?q='+text+'&langpair='+traslationfrom+'|'+traslationto+'');
	fetch(Apiurl).then(res => res.json())
	.then(data=>{
		textto.value=data.responseData.translatedText;
	});
});

icons.forEach(icon=>{
	icon.addEventListener("click",({target})=>{
	   if (target.classList.contains("fa-copy")) {
	   	 if (target.id=="from") {
	   	 	navigator.clipboard.writeText(fromtext.value);
	   	 }else{
	   	 	navigator.clipboard.writeText(textto.value);
	   	 }
	   }else{
	   	let utterance;
	   	if (target.id="from") {
	   		utterance=new SpeechSynthesisUtterance(fromtext.value);
	   		utterance.lang=selectTag[0].value;
	   	}else{
	   		utterance=new SpeechSynthesisUtterance(textto.value);
	   		utterance.lang=selectTag[1].value;
	   	}
	   	speechSynthesis.speak(utterance);
	   }
	});
});