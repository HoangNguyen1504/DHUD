var video = document.getElementById('video');
    var canvas = document.getElementById('canvas');
    var width = video.videoWidth;
    var height = video.videoHeight;
    var context;
    var hiden = document.getElementById('hiden');
    var contextHiden;
    video.onplay = function () {
      //Scale video to 500xheight
      scaleRate = 1.0*video.videoWidth/500;
      width = 500;
      height = video.videoHeight/scaleRate;
      hiden.width = width;
      hiden.height = height;
      canvas.height = height;
      contextHiden = hiden.getContext('2d');
      context = canvas.getContext('2d');
      setInterval(function(){
        drawFrame();
      }, 0);
    }

    function drawFrame() {
      contextHiden.drawImage(video, 0, 0, width, height);
      var hidenImageData = contextHiden.getImageData(0, 0, width, height);
      var imageData = context.createImageData(width, height);
      var i=0, j=0;
      while(i<height) {
        while(j<width) {
          //P1
          var p1_1 = ((i-1)>=0 && (j-1)>=0)? hidenImageData.data[((i-1)*width+(j-1))*4]:0;
          var p1_2 = ((i-1)>=0 && (j-1)>=0)? hidenImageData.data[((i-1)*width+(j-1))*4+1]:0;
          var p1_3 = ((i-1)>=0 && (j-1)>=0)? hidenImageData.data[((i-1)*width+(j-1))*4+2]:0;
          //P2
          var p2_1 = ((i-1)>=0)? hidenImageData.data[((i-1)*width+j)*4]:0;
          var p2_2 = ((i-1)>=0)? hidenImageData.data[((i-1)*width+j)*4+1]:0;
          var p2_3 = ((i-1)>=0)? hidenImageData.data[((i-1)*width+j)*4+2]:0;
          //P3
          var p3_1 = ((i-1)>=0 && (j+1)<width)? hidenImageData.data[((i-1)*width+(j+1))*4]:0;
          var p3_2 = ((i-1)>=0 && (j+1)<width)? hidenImageData.data[((i-1)*width+(j+1))*4+1]:0;
          var p3_3 = ((i-1)>=0 && (j+1)<width)? hidenImageData.data[((i-1)*width+(j+1))*4+2]:0;
          //P4
          var p4_1 = ((j-1)>=0)? hidenImageData.data[(i*width+(j-1))*4]:0;
          var p4_2 = ((j-1)>=0)? hidenImageData.data[(i*width+(j-1))*4+1]:0;
          var p4_3 = ((j-1)>=0)? hidenImageData.data[(i*width+(j-1))*4+2]:0;
          //P5
          var p5_1 = hidenImageData.data[(i*width+j)*4];
          var p5_2 = hidenImageData.data[(i*width+j)*4+1];
          var p5_3 = hidenImageData.data[(i*width+j)*4+2];
          //P6
          var p6_1 = ((j+1)<width)? hidenImageData.data[(i*width+(j+1))*4]:0;
          var p6_2 = ((j+1)<width)? hidenImageData.data[(i*width+(j+1))*4+1]:0;
          var p6_3 = ((j+1)<width)? hidenImageData.data[(i*width+(j+1))*4+2]:0;
          //P7
          var p7_1 = ((i+1)<height && (j-1)>=0)? hidenImageData.data[((i+1)*width+(j-1))*4]:0;
          var p7_2 = ((i+1)<height && (j-1)>=0)? hidenImageData.data[((i+1)*width+(j-1))*4+1]:0;
          var p7_3 = ((i+1)<height && (j-1)>=0)? hidenImageData.data[((i+1)*width+(j-1))*4+2]:0;
          //P8
          var p8_1 = ((i+1)<height)? hidenImageData.data[((i+1)*width+j)*4]:0;
          var p8_2 = ((i+1)<height)? hidenImageData.data[((i+1)*width+j)*4+1]:0;
          var p8_3 = ((i+1)<height)? hidenImageData.data[((i+1)*width+j)*4+2]:0;
          //P9
          var p9_1 = ((i+1)<height && (j+1)<width)? hidenImageData.data[((i+1)*width+(j+1))*4]:0;
          var p9_2 = ((i+1)<height && (j+1)<width)? hidenImageData.data[((i+1)*width+(j+1))*4+1]:0;
          var p9_3 = ((i+1)<height && (j+1)<width)? hidenImageData.data[((i+1)*width+(j+1))*4+2]:0;

          var r = (p1_1 + p2_1*2 + p3_1 + p4_1*2 + p5_1*4 + p6_1*2 + p7_1 + p8_1*2 + p9_1)/16;
          var g = (p1_2 + p2_2*2 + p3_2 + p4_2*2 + p5_2*4 + p6_2*2 + p7_2 + p8_2*2 + p9_2)/16;
          var b = (p1_3 + p2_3*2 + p3_3 + p4_3*2 + p5_3*4 + p6_3*2 + p7_3 + p8_3*2 + p9_3)/16;

          imageData.data[(i*width+j)*4] = r;
          imageData.data[(i*width+j)*4+1] = g;
          imageData.data[(i*width+j)*4+2] = b;
          imageData.data[(i*width+j)*4+3] = 255;
          j += 1;
        }
        j=0;
        i += 1;
      }
      context.putImageData(imageData, 0, 0);
      if (video.paused || video.ended) {
        return;
      }    
    }