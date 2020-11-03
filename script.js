var checkExist = setInterval(async function () {
    if (document.getElementsByClassName("lectureNextPrevButtonWrapper")[0]) {
        var item = document.getElementsByClassName(
            "lectureNextPrevButtonWrapper"
        )[0];

        var text = "Download this lecture";
        var course_code = document.URL.split("/")[3];
        var lid = document.URL.split("/")[6];
        var uid = document.cookie.split("; ")[1].split("=")[1];
        var token = document.cookie.split("; ")[5].split("=")[1];
        var lecture = null;
        await fetch(
            `https://hello.iitk.ac.in/api/${course_code}/lectures/summary`, {
                headers: {
                    accept: "application/json, text/plain, */*",
                    "accept-language": "en-US,en;q=0.9",
                    "content-type": "application/json",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-origin",
                    token: token,
                    uid: uid,
                },
                referrer: "https://hello.iitk.ac.in/hss401a/",
                referrerPolicy: "strict-origin-when-cross-origin",
                body: null,
                method: "GET",
                mode: "cors",
                credentials: "include",
            }
        ).then(async (res) => {
            if (res.ok) {

                await res.json().then(async (jsonResponse) => {
                    await jsonResponse.forEach((e) => {
                        if (e.lid == lid) {
                            return e.videosUploaded.forEach((el) => {
                                if (el.type == "original") {
                                    lecture = el.path;
                                    return el.path;
                                }
                            });
                        }
                    });
                });
            }
        });
        if (document.getElementsByClassName("play-button")[0] == null)
            item.innerHTML =
            `<div class='divider'></div> \
                    <div class=''> \
                        <div align="center"> <button class='primary play-button' style="width:250px"><a href="${lecture}"  download="video.mp4">${text}</a></button> </div> \
                    </div> \
                    </div>\
                    <div class='divider'></div> ` + item.innerHTML;
        var play = document.getElementsByClassName("play-button")[0];
        // play.onclick = () => {
        //     window.location(lecture)
        // };

        clearInterval(checkExist);
    }
}, 100);