const express = require("express");
const ytdl = require("ytdl-core");

const app = express();

// Middleware to parse url-encoded data
app.use(express.urlencoded({ extended: false }));

app.get("/api/getVideoURL/:videoId", async (req, res) => {
    return res.status(200).json({
        success: true,
        msg: "Success",
        req: req.ip
    });
    // const {format, videoId} = req.params;
    // const isValidVideoId = ytdl.validateID(videoId);
    // if(!isValidVideoId){
    //     return res.status(400).json({
    //         success: false,
    //         msg: "Invalid Video ID"
    //     });
    // }
    // const info = (await ytdl.getInfo(videoId));
    // const all_formats = info.formats.filter(format => format.hasAudio && format.hasVideo);
    // res.status(200).json({
    //     success: true,
    //     msg: "Success",
    //     videos: all_formats
    // })
});

app.get("/api/getVideoURL/:videoId/:required_format", async (req, res) => {
    const {required_format, videoId} = req.params;
    const isValidVideoId = ytdl.validateID(videoId);
    if(!isValidVideoId){
        return res.status(400).json({
            success: false,
            msg: "Invalid Video ID"
        });
    }
    const info = (await ytdl.getInfo(videoId));
    const all_formats = info.formats.filter(format => format.hasAudio && format.hasVideo);
    const video = all_formats.find(format => format.hasAudio && format.qualityLabel == required_format);
    if(!video){
        res.status(200).json({
            success: false,
            msg: "Video url not found"
        })    
    }
    res.status(200).json({
        success: true,
        msg: "Success",
        video
    })
});

app.listen(3000, ()=>{
    console.log("App is listening on PORT 3000");
    ytdl.getInfo("9C8S9gt7Q3o");
});