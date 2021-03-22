const btn = document.querySelector('#talk')
const script = document.querySelector('#script')
const translation = document.querySelector('#translation')

const catchScript = window.webkitSpeechRecognition
const recognition = new catchScript()


recognition.onstart = function(){
    console.log("Activated")
}

async function translate(s){
await fetch("https://google-translate1.p.rapidapi.com/language/translate/v2", {
	"method": "POST",
	"headers": {
        /* "access-control-allow-credentials": "true",
        "access-control-allow-origin": "*", */
		"content-type": "application/x-www-form-urlencoded",
		"x-rapidapi-key": "e45949efa1msh9e4ebb1d8666649p10cc79jsnc6012d8e29eb",
		"x-rapidapi-host": "google-translate1.p.rapidapi.com"
	},
	"body":JSON.stringify({
		"q": s,
        "source":"zh-CN",
		"target": "en"
	})
})

.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});
}

recognition.onresult =async function(event){
    console.log(event)
    const scriptResult = event.results[0][0].transcript
    script.textContent = scriptResult
    console.log(scriptResult)
    translation.textContent =await translate(scriptResult)
}

btn.addEventListener('click', () => {
    recognition.start()
})
