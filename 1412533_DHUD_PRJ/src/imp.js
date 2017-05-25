function max(val1, val2, val3){
	if (val1>=val2 && val1>=val3){
		return val1;
	} else if (val2>=val1 && val2>=val3) {
		return val2;
	}
	return val3;
}

function min(val1, val2, val3){
	if (val1<=val2 && val1<=val3){
		return val1;
	} else if (val2<=val1 && val2<=val3) {
		return val2;
	}
	return val3;
}

function RGB2HSV(i,G,B){
	i = parseInt(i);
	G = parseInt(G);
	B = parseInt(B);
	R_ = 1.0*i/255;
	G_ = 1.0*G/255;
	B_ = 1.0*B/255;
	Cmax = max(R_, G_, B_);
	Cmin = min(R_, G_, B_);
	//Calculate H
	H = 0;
	if (Cmax==Cmin){
		H = 0;
	} else if (Cmax==R_){
		H = 60*((1.0*(G_-B_)/(Cmax-Cmin))%6);
	} else if (Cmax==G_){
		H = 60*(1.0*(B_-R_)/(Cmax-Cmin)+2);
	} else {
		H = 60*(1.0*(R_-G_)/(Cmax-Cmin)+4);
	}
	//Calculate S
	S = 0;
	if (Cmax != 0){
		S=1.0*(Cmax-Cmin)/Cmax;
	}
	//Calculate V
	V = Cmax;
	HSV = Array();
	HSV.push(H);
	HSV.push(S);
	HSV.push(V);
	return HSV;
}

function abs(val){
	if(val<0){
		return -val;
	}
	return val;
}
function HSV2RGB(H,S,V){
	C = V*S;
	X = C*(1-abs((H/60)%2-1));
	m = V-C;
	R_ = 0; G_ = 0; B_ = 0;
	if (H<60){
		R_ = C;
		G_ = X;
	} else if (H<120){
		R_ = X;
		G_ = C;
	} else if (H<180){
		G_ = C;
		B_ = X;
	} else if (H<240){
		G_ = X;
		B_ = C;
	} else if (H<300){
		R_ = X;
		B_ = C;
	} else {
		R_ = C;
		B_ = X;
	}
	i = parseInt((R_+m)*255);
	G = parseInt((G_+m)*255);
	B = parseInt((B_+m)*255);
	RGB = Array();
	RGB.push(i);
	RGB.push(G);
	RGB.push(B);
	return RGB;
}

function cast(value){
	if (value<=0){
		return 0;
	}
	if (value >=255){
		return 255;
	}
	return value;
}

function changeBrightness(imgData, beta){
	beta = parseInt(beta);
	for (var i=0; i<imgData.data.length; i+=4){
		imgData.data[i] = cast(imgData.data[i]+beta);
		imgData.data[i+1] = cast(imgData.data[i+1]+beta);
		imgData.data[i+2] = cast(imgData.data[i+2]+beta);
	}
	return imgData;
}

function changeContrast(imgData, alpha){
	alpha = parseFloat(alpha);
	for (var i=0; i<imgData.data.length; i+=4){
		imgData.data[i] = parseInt(cast(imgData.data[i]*alpha));
		imgData.data[i+1] = parseInt(cast(imgData.data[i+1]*alpha));
		imgData.data[i+2] = parseInt(cast(imgData.data[i+2]*alpha));
	}
	return imgData;
}

function grayscale(imgData){
	for (var i=0; i<imgData.data.length; i+=4){
		var gray = parseInt((imgData.data[i]+imgData.data[i+1]+imgData.data[i+2])/3);
		imgData.data[i] = gray;
		imgData.data[i+1] = gray;
		imgData.data[i+2] = gray;
	}
	return imgData;
}

function noise(imgData){
	for (var i=0; i<imgData.data.length; i+=4){
		var rand = parseInt(Math.floor((Math.random()*10)+1));
		imgData.data[i] = cast(imgData.data[i]+rand);
		imgData.data[i+1] = cast(imgData.data[i+1]+rand);
		imgData.data[i+2] = cast(imgData.data[i+2]+rand);
	}
	return imgData;
}

function sepia(imgData){
	for (var i=0; i<imgData.data.length; i+=4){
		outputRed = (imgData.data[i] * 0.393) + (imgData.data[i+1] *0.769) + (imgData.data[i+2] * 0.189)
		outputGreen = (imgData.data[i] * 0.349) + (imgData.data[i+1] *0.686) + (imgData.data[i+2] * 0.168)
		outputBlue = (imgData.data[i] * 0.272) + (imgData.data[i+1] *0.534) + (imgData.data[i+2] * 0.131)
		imgData.data[i] = cast(outputRed);
		imgData.data[i+1] = cast(outputGreen);
		imgData.data[i+2] = cast(outputBlue);
	}
	return imgData;
}

function chanels(imgData, deltaR, deltaG, deltaB){
	deltaR = parseInt(deltaR);
	deltaG = parseInt(deltaG);
	deltaB = parseInt(deltaB);
	for (var i=0; i<imgData.data.length; i+=4){
		imgData.data[i] = cast(imgData.data[i]+deltaR);
		imgData.data[i+1] = cast(imgData.data[i+1]+deltaG);
		imgData.data[i+2] = cast(imgData.data[i+2]+deltaB);
	}
	return imgData;
}

function gamma(imgData, value){
	value = parseFloat(value);
	value = 1/value;
	for (var i=0; i<imgData.data.length; i+=4){
		imgData.data[i] = cast(parseInt(255*Math.pow(imgData.data[i]/255,value)));
		imgData.data[i+1] = cast(parseInt(255*Math.pow(imgData.data[i+1]/255,value)));
		imgData.data[i+2] = cast(parseInt(255*Math.pow(imgData.data[i+2]/255,value)));
	}
	return imgData;
}
/*
function degrog(imageData, aroundPixels, width, height){
	console.log(aroundPixels.length);
	for (k=0; k<aroundPixels.length;k++){

		pixel = aroundPixels[k];
		i = pixel.y;
		j = pixel.x;
		var p1_1 = ((i-1)>=0 && (j-1)>=0)? imageData.data[((i-1)*width+(j-1))*4]:0;
	          var p1_2 = ((i-1)>=0 && (j-1)>=0)? imageData.data[((i-1)*width+(j-1))*4+1]:0;
	          var p1_3 = ((i-1)>=0 && (j-1)>=0)? imageData.data[((i-1)*width+(j-1))*4+2]:0;
	          //P2
	          var p2_1 = ((i-1)>=0)? imageData.data[((i-1)*width+j)*4]:0;
	          var p2_2 = ((i-1)>=0)? imageData.data[((i-1)*width+j)*4+1]:0;
	          var p2_3 = ((i-1)>=0)? imageData.data[((i-1)*width+j)*4+2]:0;
	          //P3
	          var p3_1 = ((i-1)>=0 && (j+1)<width)? imageData.data[((i-1)*width+(j+1))*4]:0;
	          var p3_2 = ((i-1)>=0 && (j+1)<width)? imageData.data[((i-1)*width+(j+1))*4+1]:0;
	          var p3_3 = ((i-1)>=0 && (j+1)<width)? imageData.data[((i-1)*width+(j+1))*4+2]:0;
	          //P4
	          var p4_1 = ((j-1)>=0)? imageData.data[(i*width+(j-1))*4]:0;
	          var p4_2 = ((j-1)>=0)? imageData.data[(i*width+(j-1))*4+1]:0;
	          var p4_3 = ((j-1)>=0)? imageData.data[(i*width+(j-1))*4+2]:0;
	          //P5
	          var p5_1 = imageData.data[(i*width+j)*4];
	          var p5_2 = imageData.data[(i*width+j)*4+1];
	          var p5_3 = imageData.data[(i*width+j)*4+2];
	          //P6
	          var p6_1 = ((j+1)<width)? imageData.data[(i*width+(j+1))*4]:0;
	          var p6_2 = ((j+1)<width)? imageData.data[(i*width+(j+1))*4+1]:0;
	          var p6_3 = ((j+1)<width)? imageData.data[(i*width+(j+1))*4+2]:0;
	          //P7
	          var p7_1 = ((i+1)<height && (j-1)>=0)? imageData.data[((i+1)*width+(j-1))*4]:0;
	          var p7_2 = ((i+1)<height && (j-1)>=0)? imageData.data[((i+1)*width+(j-1))*4+1]:0;
	          var p7_3 = ((i+1)<height && (j-1)>=0)? imageData.data[((i+1)*width+(j-1))*4+2]:0;
	          //P8
	          var p8_1 = ((i+1)<height)? imageData.data[((i+1)*width+j)*4]:0;
	          var p8_2 = ((i+1)<height)? imageData.data[((i+1)*width+j)*4+1]:0;
	          var p8_3 = ((i+1)<height)? imageData.data[((i+1)*width+j)*4+2]:0;
	          //P9
	          var p9_1 = ((i+1)<height && (j+1)<width)? imageData.data[((i+1)*width+(j+1))*4]:0;
	          var p9_2 = ((i+1)<height && (j+1)<width)? imageData.data[((i+1)*width+(j+1))*4+1]:0;
	          var p9_3 = ((i+1)<height && (j+1)<width)? imageData.data[((i+1)*width+(j+1))*4+2]:0;

	          var i = (p1_1 + p2_1*2 + p3_1 + p4_1*2 + p5_1*4 + p6_1*2 + p7_1 + p8_1*2 + p9_1)/16;
	          var g = (p1_2 + p2_2*2 + p3_2 + p4_2*2 + p5_2*4 + p6_2*2 + p7_2 + p8_2*2 + p9_2)/16;
	          var b = (p1_3 + p2_3*2 + p3_3 + p4_3*2 + p5_3*4 + p6_3*2 + p7_3 + p8_3*2 + p9_3)/16;

	          imageData.data[(i*width+j)*4] = i;
	          imageData.data[(i*width+j)*4+1] = g;
	          imageData.data[(i*width+j)*4+2] = b;
	          imageData.data[(i*width+j)*4+3] = 255;
	}
	return imageData;
}
*/

function blur(imageData, width, height){
	for (var i=0; i<height; i++){
		for (var j=0; j<width; j++) {
			var p1_1 = ((i-1)>=0 && (j-1)>=0)? imageData.data[((i-1)*width+(j-1))*4]:0;
	          var p1_2 = ((i-1)>=0 && (j-1)>=0)? imageData.data[((i-1)*width+(j-1))*4+1]:0;
	          var p1_3 = ((i-1)>=0 && (j-1)>=0)? imageData.data[((i-1)*width+(j-1))*4+2]:0;
	          //P2
	          var p2_1 = ((i-1)>=0)? imageData.data[((i-1)*width+j)*4]:0;
	          var p2_2 = ((i-1)>=0)? imageData.data[((i-1)*width+j)*4+1]:0;
	          var p2_3 = ((i-1)>=0)? imageData.data[((i-1)*width+j)*4+2]:0;
	          //P3
	          var p3_1 = ((i-1)>=0 && (j+1)<width)? imageData.data[((i-1)*width+(j+1))*4]:0;
	          var p3_2 = ((i-1)>=0 && (j+1)<width)? imageData.data[((i-1)*width+(j+1))*4+1]:0;
	          var p3_3 = ((i-1)>=0 && (j+1)<width)? imageData.data[((i-1)*width+(j+1))*4+2]:0;
	          //P4
	          var p4_1 = ((j-1)>=0)? imageData.data[(i*width+(j-1))*4]:0;
	          var p4_2 = ((j-1)>=0)? imageData.data[(i*width+(j-1))*4+1]:0;
	          var p4_3 = ((j-1)>=0)? imageData.data[(i*width+(j-1))*4+2]:0;
	          //P5
	          var p5_1 = imageData.data[(i*width+j)*4];
	          var p5_2 = imageData.data[(i*width+j)*4+1];
	          var p5_3 = imageData.data[(i*width+j)*4+2];
	          //P6
	          var p6_1 = ((j+1)<width)? imageData.data[(i*width+(j+1))*4]:0;
	          var p6_2 = ((j+1)<width)? imageData.data[(i*width+(j+1))*4+1]:0;
	          var p6_3 = ((j+1)<width)? imageData.data[(i*width+(j+1))*4+2]:0;
	          //P7
	          var p7_1 = ((i+1)<height && (j-1)>=0)? imageData.data[((i+1)*width+(j-1))*4]:0;
	          var p7_2 = ((i+1)<height && (j-1)>=0)? imageData.data[((i+1)*width+(j-1))*4+1]:0;
	          var p7_3 = ((i+1)<height && (j-1)>=0)? imageData.data[((i+1)*width+(j-1))*4+2]:0;
	          //P8
	          var p8_1 = ((i+1)<height)? imageData.data[((i+1)*width+j)*4]:0;
	          var p8_2 = ((i+1)<height)? imageData.data[((i+1)*width+j)*4+1]:0;
	          var p8_3 = ((i+1)<height)? imageData.data[((i+1)*width+j)*4+2]:0;
	          //P9
	          var p9_1 = ((i+1)<height && (j+1)<width)? imageData.data[((i+1)*width+(j+1))*4]:0;
	          var p9_2 = ((i+1)<height && (j+1)<width)? imageData.data[((i+1)*width+(j+1))*4+1]:0;
	          var p9_3 = ((i+1)<height && (j+1)<width)? imageData.data[((i+1)*width+(j+1))*4+2]:0;

	          var r = (p1_1 + p2_1*2 + p3_1 + p4_1*2 + p5_1*4 + p6_1*2 + p7_1 + p8_1*2 + p9_1)/16;
	          var g = (p1_2 + p2_2*2 + p3_2 + p4_2*2 + p5_2*4 + p6_2*2 + p7_2 + p8_2*2 + p9_2)/16;
	          var b = (p1_3 + p2_3*2 + p3_3 + p4_3*2 + p5_3*4 + p6_3*2 + p7_3 + p8_3*2 + p9_3)/16;

	          imageData.data[(i*width+j)*4] = r;
	          imageData.data[(i*width+j)*4+1] = g;
	          imageData.data[(i*width+j)*4+2] = b;
	          imageData.data[(i*width+j)*4+3] = 255;
		}
	}
	return imageData;
}

function A01(imageData, width, height){
	console.log("tag0");
	imageData = grayscale(imageData);
	console.log("tag1");
	imageData = changeContrast(imageData, 1.5);
	console.log("tag2");
	imageData = sepia(imageData);
	console.log("tag3");
	imageData = chanels(imageData, 50,0,0);
	console.log("tag4");
	imageData = blur(imageData, width, height);
	console.log("tag5");
	return imageData;
}

function A02(imageData, width, height){
	imageData = grayscale(imageData);
	imageData = changeContrast(imageData, 1.5);
	imageData = sepia(imageData);
	imageData = chanels(imageData, 0,50,0);
	imageData = blur(imageData, width, height);
	return imageData;
}

function A03(imageData, width, height){
	imageData = grayscale(imageData);
	imageData = changeContrast(imageData, 1.5);
	imageData = sepia(imageData);
	imageData = chanels(imageData, 0,0,50);
	imageData = blur(imageData, width, height);
	return imageData;
}

function B01(imageData, width, height){
	imageData = blur(imageData, width, height);
	return imageData;
}

function B02(imageData, width, height){
	for (var i=0; i<2; i++){
		imageData = blur(imageData, width, height);
	}
	return imageData;
}

function B03(imageData, width, height){
	for (var i=0; i<3; i++){
		imageData = blur(imageData, width, height);
	}
	return imageData;
}

function C01(imageData, width, height){
	imageData = changeContrast(imageData, 1.5);
	imageData = chanels(imageData, 50, 0, 0)
	imageData = noise(imageData);
	imageData = blur(imageData, width, height);
	return imageData;
}

function C02(imageData, width, height){
	imageData = changeContrast(imageData, 1.5);
	imageData = chanels(imageData, 0, 50, 0)
	imageData = noise(imageData);
	imageData = blur(imageData, width, height);
	return imageData;
}

function C03(imageData, width, height){
	imageData = changeContrast(imageData, 1.5);
	imageData = chanels(imageData, 0, 0, 50)
	imageData = noise(imageData);
	imageData = blur(imageData, width, height);
	return imageData;
}

function D01(imageData, width, height){
	imageData = grayscale(imageData);
	imageData = changeContrast(imageData, 1.5);
	imageData = noise(imageData);
	imageData = sepia(imageData);
	imageData = blur(imageData, width, height);
	return imageData;
}

function D02(imageData, width, height){
	imageData = grayscale(imageData);
	imageData = changeContrast(imageData, 1.5);
	imageData = noise(imageData);
	imageData = sepia(imageData);
	imageData = chanels(imageData, 50,0,0);
	return imageData;
}

function D03(imageData, width, height){
	imageData = grayscale(imageData);
	imageData = changeContrast(imageData, 1.5);
	imageData = noise(imageData);
	imageData = sepia(imageData);
	imageData = chanels(imageData, 0,50,0);
	return imageData;
}

function D04(imageData, width, height){
	imageData = grayscale(imageData);
	imageData = changeContrast(imageData, 1.5);
	imageData = noise(imageData);
	imageData = sepia(imageData);
	imageData = chanels(imageData, 0,0,50);
	return imageData;
}