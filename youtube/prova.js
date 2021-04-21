const url = 'https://api.airtable.com/v0/appmdDxvPKfCXkamo/content'
const api_key = 'keyvJkNvjdsfsEbzB'

// Fetch api
const dbRequest = fetch(`${url}?api_key=${api_key}`);

// Recuperare risultato api
dbRequest.then((response) => {
    return response.json();
}).then((data) => {
    const records = data.records;    

    records.map((result) => {
        let source = result.fields.Attachments[0].url;
        let nameOfVideo = result.fields.Name;
        let nameOfChannel = result.fields.canale;
        let numOfViews = result.fields.views;
        let dateOfVideo = result.fields.date;
        let sub = result.fields.iscritti;
        let canaleLogo = result.fields.Profile[0].thumbnails.small.url;


        let videoProto = prototype(source, nameOfVideo, nameOfChannel, numOfViews, dateOfVideo, sub, canaleLogo);

        showVideosRight(videoProto);

    });

}).catch((error) => {
    console.log(error);
})

showVideoBig = (element) => {

    // Source
    let source = element.children[0].attributes[1].nodeValue;
    //name
    let videoName = element.children[1].children[0].childNodes[0].textContent;
    //views
    let views = element.children[1].children[2].children[0].textContent;
    //date
    let date = element.children[1].children[2].children[1].textContent;
    //logo
    let logo = element.children.logoImg2.attributes.src.nodeValue; 

    //canalename
    let channelName = element.children[1].children[1].textContent;
    
    //subs
    let subs = element.children.iscr.textContent;

    document.getElementById('video-source').src = source;
    document.getElementById('title').innerText = videoName;
    document.getElementById('views').innerText = views;
    document.getElementById('date').innerText = date;
    document.getElementById('logoCanale').src = logo;
    document.getElementById('canaleName').innerText = channelName; 
    document.getElementById('iscritti').innerText = subs;
}


prototype = (src, vidName, canName, views, vidDate, subs, logo1) => {
    function vidProto(source, vid_Name, can_Name, vis, vid_Date, subs, logo){
        this.source = source;
        this.vid_Name = vid_Name;
        this.can_Name = can_Name;
        this.vis = vis;
        this.vid_Date = vid_Date;
        this.subs = subs;
        this.logo = logo;
    }

    let videos = new vidProto(src, vidName, canName, views, vidDate, subs, logo1);

    return videos;
}

showVideosRight = (vidObj) => {
    console.log(vidObj);
    let videoHtml, newVideoHtml;

    videoHtml = `<div onclick="showVideoBig(this);" class="video">
                    <video id="video-sinistra" src="%src%"></video>
                    <div class="descrizioni-varie">
                        <p id="name-video">%nom%</p>
                        <p id="canaleName-video">%chanNom%</p>
                        <div class="vis-date">
                            <p id="visualizzazioni">%vis% views</p>
                            <p id="date-video">%date%</p>
                        </div>
                    </div>
                    <p style="display: none;" id="iscr">%iscr%</p>
                    <img style="display: none;" id="logoImg2" src="%imgLogo2%">
                </div>`

    newVideoHtml = videoHtml.replace("%src%", vidObj.source);
    newVideoHtml = newVideoHtml.replace("%nom%", vidObj.vid_Name);
    newVideoHtml = newVideoHtml.replace("%chanNom%", vidObj.can_Name);
    newVideoHtml = newVideoHtml.replace("%vis%", vidObj.vis);
    newVideoHtml = newVideoHtml.replace("%date%", vidObj.vid_Date);
    newVideoHtml = newVideoHtml.replace("%iscr%", vidObj.subs);
    newVideoHtml = newVideoHtml.replace("%imgLogo2%", vidObj.logo);



    document.querySelector('.sinistra').insertAdjacentHTML('beforeend', newVideoHtml);
}





