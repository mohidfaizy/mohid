const searchBox = document.getElementById('search-txt'),
searchBtn = document.getElementById('search-btn'),
errTxt = document.getElementById('error-txt'),
gold = document.getElementById('gold'),
textMsgHome = document.getElementById('text-message-home'),
vidThumb = document.getElementById('vid-thumb'),
vidTitle = document.getElementById('vid-title'),
vidDesc = document.getElementById('vid-desc'),
downList = document.getElementById('download-list');

searchBtn.addEventListener('click',()=>{
	if(searchBox.value != ""){
		const query = searchBox.value;
		let requireValue1 = "https://www.youtube.com/watch?v=";
		let requireValue2 = "www.youtube.com/watch?v=";
		let requireValue3 = "https://youtube.com/watch?v=";
		let requireValue4 = "youtube.com/watch?v=";

		if(query.includes(requireValue1) || query.includes(requireValue2) || query.includes(requireValue3) || query.includes(requireValue4)){
			errTxt.style.display = "none";
			let ytCode = query.split("youtube.com/watch?v=");
			showData(ytCode[1]);
		}else{
			errTxt.style.display = "block";
			errTxt.textContent = "Please enter a valid url!";
			gold.classList.remove('active');
		}
	}else{
		errTxt.style.display = "block";
		errTxt.textContent = "Please enter a youtube video url!";
		gold.classList.remove('active');
	}
})

function showData(code){
	const xhr = new XMLHttpRequest();

	xhr.addEventListener("readystatechange", function () {
		if (this.readyState === this.DONE) {
			let JSONdata = this.response;
			let data = JSON.parse(JSONdata);
			if(data.status != 'fail'){
				gold.classList.add('active');
				textMsgHome.style.display = 'none';
				vidThumb.src = data.thumb;
				vidTitle.textContent = data.title;
				if(data.description.length <= 150){
					vidDesc.textContent = data.description;
				}else{
					vidDesc.textContent = data.description.substr(0 , 150) + '...';
				}
				var downWrapp = '';
				var downLink = data.link;
				for(i in downLink){
					let links = downLink[i][0];
					let size = downLink[i][1];
					let quailty = downLink[i][3];
					let formate = downLink[i][4];
					if(formate.includes("video/mp4")){
						if(formate.includes(`codecs="av01.0`)){
							
						}else{
							downWrapp += `
							<div class="tabs_box_single">
								<i class='bx bxs-videos tabs_box_single_icon'></i>
								<p class="tabs_box_single_size">Size: <b>${size}</b></p>
								<p class="tabs_box_single_quality">Quality: <b>${quailty}</b></p>
								<a href="${links}" target="__blank__" class="tabs_box_single_download">Download</a>
							</div>`;
						}
					}
				}
				downList.innerHTML = downWrapp;
			}else{
				gold.classList.remove('active');
				textMsgHome.style.display = 'block';
				errTxt.style.display = "block";
				errTxt.textContent = "Please enter a valid url!";
			}
		}
	});
	
	xhr.open("GET", "https://youtube-video-download-info.p.rapidapi.com/dl?id="+code);
	xhr.setRequestHeader("x-rapidapi-host", "youtube-video-download-info.p.rapidapi.com");
	xhr.setRequestHeader("x-rapidapi-key", "8399d67d56msh08c923bec7a388fp1dfdccjsn938e887fd05f");
	
	xhr.send();
}