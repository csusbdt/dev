Arrow functions inherit the `this` binding of the context in which they are created.

design principles
-----------------
canvas covers entire window
coordinate system origin is center of canvas/window
objects are drawable if they have a property `z` and a draw(ctx) function
drawables are scaled down



https://www.redblobgames.com/grids/hexagons/

https://creativecommons.org/publicdomain/zero/1.0/

~~~
////////////////////////////////////////////////////////////////////////////////
//
//  https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
//
// read this
//
// and this: https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement
//
// for browser-to-browser adio/video streams:
//     https://developer.mozilla.org/en-US/docs/Web/Media  -- OVERVIEW
//     https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API
//     https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API
//     https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement
//     https://developers.google.com/youtube/documentation
//
////////////////////////////////////////////////////////////////////////////////
~~~

~~~
# i wrote this script experiment to see if appending a reversed
# video onto itself would give a smooth playout when looping

ffmpeg -ss 3 -t 500ms -i input.mp4 -filter:v fps=16 $filename%03d.jpg

# the above generated 001.jpg to 008.jpg

echo "for (let i = 1; i < 8; ++i) {" > m.js 
echo '    console.log("cp " + ("" + (116 - i)).padStart(3, "0") + ".jpg " + ("" + (116 + i)).padStart(3, "0") + ".jpg");' >> m.js
echo "}" >> m.js

node m.js > run.sh
./run.sh
rm m.js
rm run.sh

ffmpeg -i '%03d.jpg' -r 16 output.mp4
~~~

~~~
# older experiment with reversing a video with audio included

ffmpeg -t 1 input.mp4 -q 0 first.mts
#ffmpeg -i first.mts -vf reverse -af areverse -q 0 second.mts
#echo file first.mts  >  temp.txt
#echo file second.mts >> temp.txt
#ffmpeg -f concat -safe 0 -i temp.txt -c copy output.mts
#ffmpeg -i output.mts output.mp4
#rm temp.txt
#rm first.mts
#rm second.mts
#rm output.mts
~~~

