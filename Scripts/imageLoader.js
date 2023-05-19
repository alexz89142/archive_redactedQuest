function loadImages(sources, callback) {
                    console.log('loading...');
                    var loadedImages = 0;
                    var numImages = 0;
            
            // get num of sources
                        for(var src in sources) {
                            numImages++;
                        }
            
                        for(var src in sources) {
                            images[src] = new Image();
                            images[src].onload = function() {
                        
                                if(++loadedImages >= numImages) {
                                    callback(images);
                                    console.log('finished loading');
                                    $('#loading').fadeOut('fast');
                                    //$('#game').css('background-image','url("Assets/Images/UI/Canvas/bg.jpg")');
                                }
                            };
                            images[src].src = sources[src];
                        }
                }