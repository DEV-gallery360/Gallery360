$(document).ready(function(){	
});


function gRotate(){
	_this = this;
}

gRotate.prototype = {		
	"init" : function(key){

		   $('.product').TreeSixtyImageRotate({
               totalFrames: 99,
               endFrame: 0,
               currentFrame: 0,
               extension: ".jpg",
            //   imagesFolder: "/3d/images/prod3/",
               imagesFolder: "/artimage/aa1231@daum.net/rotate/",
               smallWidth: 400,
               smallHeight: 900,
               largeWidth: 400,
               largeHeight: 900,
               imagePlaceholderClass: "images-placeholder",
               
               speed: 200,
               dragSpeed : 6,
               navigation: true,
               spinner: true
           }).initTreeSixty();
//           $('.product1').TreeSixtyImageRotate({
//               totalFrames: 18,
//               endFrame: 18,
//               currentFrame: 0,
//               extension: ".png",
//               imagesFolder: "/3d/images/prod1_1/",
//               smallWidth: 400,
//               smallHeight: 400,
//               largeWidth: 800,
//               largeHeight: 800,
//               imagePlaceholderClass: "images-placeholder"
//           }).initTreeSixty()
//			$('.product2').TreeSixtyImageRotate({
//               totalFrames: 9,
//               endFrame: 9,
//               currentFrame: 0,
//               extension: ".png",
//               imagesFolder: "/3d/images/prod1_2/",
//               smallWidth: 400,
//               smallHeight: 400,
//               largeWidth: 800,
//               largeHeight: 800,
//               imagePlaceholderClass: "images-placeholder"
//           }).initTreeSixty()
//         
      
		
	}
}
/*
totalFrames: total number of images you have
endFrame: end frame for the auto spin animation
currentFrame: This the start frame for auto spin
speed: Animation Speed
dragSpeed: Speed of rotation when dragging elements
progress: selector to show the loading progress
extension: extension for the images
imgPrefix: image prefix
navigation: display navigation
spinner: disable spinner for loading
imagesFolder: path to folder with images
smallWidth: smaller width for images
smallHeight: smaller height for images
largeWidth: larger width for images
largeHeight: larger height for images
imagePlaceholderClass: class for images placeholder
imgList: selector for image list
*/
