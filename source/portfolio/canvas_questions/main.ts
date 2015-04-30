// (function(){


    // Set size of canvas that you need
    var MAX_WIDTH = window.innerWidth;
    var MAX_HEIGHT = window.innerHeight;
    // CONFIGURATION
    var startAge = 50;
    var endAge = 85;
    
    var saveMin = 50000;
    var saveMax = 1000000;

    var needMin = 5000;
    var needMax = 100000;

    var doItOnMyOwnLink = 'http://tests2i.com/index.html';

    var SpecialistLink = 'http://tests2i.com/index.html';
    var leanMoreLink = 'http://tests2i.com/index.html';
    var whyAnnuitiesLink = 'http://tests2i.com/index.html';
    var getCompetitiveBidLink = 'http://tests2i.com/index.html';

    function calculateResults(answers, callback) {
        // this is a function that allow you to calculate results
        // depend on answers
        // will execute on done
        // also you may use answers here!!!

        // some calculation here
        // may be AJAX?
        if (answers.termsOf === 'need') {
            callback("10,000", "150,000");    
        } else {
            callback("300,000", "20,000");
        }
        console.log(answers);

        // structure of answers
        var possibleAnswears = {
            name : 'User Name',
            // age and gender question
            age : 50,
            gender : 'male',  // or 'female',
            // approach to retirement question
            termsOf : 'save', // or 'need',
            // slider
            savingAmount : 1000, // number for 'save' way, undefined for 'need' way
            specifiedIncome : 1000, // number for 'need' way, undefined for 'save' way,

            // for single or joint question
            singleLife : true, // or false

            // spouse age and gender question
            spouseAge : 50,
            spouseGender : 'male', // or 'female'

            // beneficiary protection question
            apiToLife : '100%', // or 'no refund'

            // Level vs COLA question
            apiTo : 'level' // or 'cola'
        }
        
    }

    // DO NOT TOUCH THIS
    var stageWidth = 1920;
    var stageHeight = 1080;
    var images : any = {};
    var second = 1000;
    var answers : any = {};
    var voice, voice2, voice3, voice4, voice5, music : any;
    var lastTimeout;
    declare var Kinetic;
    declare var createjs;

    function loadImages(sources, callback) {
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for(var src in sources) {
            numImages++;
        }
        function onLoad() {
            if(++loadedImages >= numImages) {
                callback(images);
            }
        }
        for(src in sources) {
            images[src] = new Image();
            images[src].onload = onLoad;
            images[src].src = sources[src];
        }
    }
    var sources = {
        firstLogo: 'assets/logo.jpg',
        pair1: 'assets/pair1.png',
        blink1: 'assets/blink1.png',
        pairHand: 'assets/pairHand.png',
        womenSmile : 'assets/womenSmile.png',
        manSad : 'assets/manSad.png',
        homePage : 'assets/homePage.png',
        manRotate : 'assets/manRotate.png',
        pair2: 'assets/pair2.png',
        pair3 : 'assets/pair3.png',
        pair2_look : 'assets/pair2_look.png',
        pairHand2 : 'assets/pairHand2.png',
        pairHand2_look : 'assets/pairHand2_look.png',
        jerry : 'assets/Jerry.png',
        nameBorder1 : 'assets/nameBorder2.png',
        nameBorder2 : 'assets/nameBorder2.png',
        nameBorder3 : 'assets/nameBorder3.png',
        nameBorder4 : 'assets/nameBorder4.png',
        nameBorder5 : 'assets/nameBorder5.png',
        nameBorder6 : 'assets/nameBorder6.png',
        nameBorder7 : 'assets/nameBorder7.png',
        nameBorder8 : 'assets/nameBorder8.png',
        nameBorder9 : 'assets/nameBorder9.png',
        nameBorder : 'assets/nameBorder.png',
        pair1_handOut : 'assets/pair1_handOut.png',
        pair1_handOut2 : 'assets/pair1_handOut2.png',
        //incomeStars : 'assets/incomeStars.png',
        //income : 'assets/income.png',
        call : 'assets/call.png',
        ground : 'assets/ground.png',
        button : 'assets/button.png',
        paper1 : 'assets/paper1.png',
        paper2 : 'assets/paper2.png',
        paper3 : 'assets/paper3.png',
        boom1 : 'assets/boom1.png',
        boom2 : 'assets/boom2.png',
        boom3 : 'assets/boom3.png',
        //doneButton : 'assets/doneButton.png',
        //backButton : 'assets/backButton.png',
        bag1 : 'assets/bag1.png',
        bag2 : 'assets/bag2.png',
        bag3 : 'assets/bag3.png',
        // pig1 : 'assets/pig1.png',
        // pig2 : 'assets/pig2.png',
        // pig3 : 'assets/pig3.png',
        // pig40 : 'assets/pig40.png',
        // pig41 : 'assets/pig41.png',
        // pig42 : 'assets/pig42.png',
        // pig43 : 'assets/pig43.png',
        // pig44 : 'assets/pig44.png',
        pairCuted : 'assets/pairCuted.png',
        women1 : 'assets/women1.png',
        men1 : 'assets/men1.png',
        men2 : 'assets/men2.png',
        backDoneButtons : 'assets/backDoneButtons.png',
        maleIcon : 'assets/maleIcon.png',
        femaleIcon : 'assets/femaleIcon.png',
        menButtom : 'assets/manHandBottom.png',
        menTop : 'assets/manHandTop.png',
        glow : 'assets/glow.png',
        //results : 'assets/results.png',
        //results2 : 'assets/results2.png',
        // links : 'assets/links.png',
        check : 'assets/check.png',
        banner : 'assets/banner.png',
        //res1 : 'assets/res1.png',
        //res2 : 'assets/res2.png',
        restart : 'assets/restart.png',
        blueCircle : 'assets/blueCircle.png',
        greenCircle : 'assets/greenCircle.png'
    };

    function findFontSize(text : string, width : number) {
        var testText = new Kinetic.Text({
            text : text,
            fontSize : 1
        });

        while (true) {
            if (testText.width() > width) {
                return testText.fontSize();
            } else {
                testText.fontSize(testText.fontSize() + 1);
            }
        }
    }

    function numberToText(number) {
        if (number === 1000000) {
            return '1 million';
        } else {
            return (Math.round(number / 1000)) + 'k';
        }
    }

    function playSound(event) {
        // start playing the sound we just loaded, storing the playing instance
        if (event.src === 'assets/voice1.mp3') {
            voice = createjs.Sound.createInstance(event.src);
            start();
        } else if (event.src === 'assets/voice2.mp3') {
            voice2 = createjs.Sound.createInstance(event.src);
        } else if (event.src === 'assets/voice3.mp3') {
            voice3 = createjs.Sound.createInstance(event.src); 
        } else if (event.src === 'assets/voice4.mp3') {
            voice4 = createjs.Sound.createInstance(event.src); 
        } else if (event.src === 'assets/voice5.mp3') {
            voice5 = createjs.Sound.createInstance(event.src); 
        } else {
            music = createjs.Sound.createInstance(event.src);
            music.play({
                volume : 0.3,
                loop : 1000
            });
        }
    }

    loadImages(sources, function(images) {
        createjs.Sound.alternateExtensions = ['mp3'];
        createjs.Sound.addEventListener('fileload', playSound); // add an event listener for when load is completed
        createjs.Sound.registerSound('assets/voice1.mp3');  // register sound, which preloads by default
        createjs.Sound.registerSound('assets/voice2.mp3');  // register sound, which preloads by default     
        createjs.Sound.registerSound('assets/voice3.mp3');  // register sound, which preloads by default     
        createjs.Sound.registerSound('assets/voice4.mp3');  // register sound, which preloads by default     
        createjs.Sound.registerSound('assets/voice5.mp3');  // register sound, which preloads by default     
        createjs.Sound.registerSound('assets/music.mp3');  // register sound, which preloads by default  
    });

    var scale = Math.min((MAX_WIDTH - 20) / stageWidth, (MAX_HEIGHT - 20) / stageHeight);
    var stage = new Kinetic.Stage({
        container : "container",
        width : stageWidth * scale,
        height : stageHeight * scale
    });

    var layer = new Kinetic.Layer();
    stage.add(layer);
    var borderLayer = new Kinetic.Layer();
    borderLayer.add(new Kinetic.Line({
        points : [0, 0, stageWidth, 0],
        shadowBlur : 10,
        stroke : "#476ca9",
        strokeWidth : 10
    }));
    borderLayer.add(new Kinetic.Line({
        points : [stageWidth, 0, stageWidth, stageHeight],
        shadowBlur : 10,
        stroke : "#476ca9",
        strokeWidth : 10
    }));
    borderLayer.add(new Kinetic.Line({
        points : [stageWidth, stageHeight, 0, stageHeight],
        shadowBlur : 10,
        stroke : "#476ca9",
        strokeWidth : 10
    }));
    borderLayer.add(new Kinetic.Line({
        points : [0, stageHeight, 0, 0],
        shadowBlur : 10,
        stroke : "#476ca9",
        strokeWidth : 10
    }));
    stage.add(borderLayer);

    var state1, state2, state3, state4, state5;


    function showBackDoneButtons(params) {
        var group = new Kinetic.Group({
            opacity : 0,
            id : 'backDoneButtons',
            y : 930,
            x : stageWidth - 600,
            scaleX : 0.8,
            scaleY : 0.8
        });
        var image = new Kinetic.Image({
            image : images.backDoneButtons
        });
        group.add(image);
        var back = new Kinetic.Rect({
            x : image.x(),
            y : image.y(),
            width : 420,
            height : 120
        });
        group.add(back);
        var done = new Kinetic.Rect({
            x : image.x() + 420,
            y : image.y(),
            width : 420,
            height : 120
        });
        group.add(done);
        back.on('click tap', function() {
            this.off('click tap');
            // hideBackDoneButtons();
            // params.onBack();
        });
        done.on('click tap', function() {
            this.off('click tap');
            hideBackDoneButtons();
            params.onDone();
            setTimeout(function() {
                document.body.style.cursor='default';
            });
        });
        layer.add(group);
        done.on('mouseenter', function() {
            setTimeout(function() {
                document.body.style.cursor='pointer';
            });
        });
        done.on('mouseleave', function() {
            setTimeout(function() {
                document.body.style.cursor='default';
            });
        });
        var tween = new Kinetic.Tween({
            node : group,
            opacity : 1,
            duration : 0.3,
            x : group.x() - 200
        });
        tween.play();
    }

    function hideBackDoneButtons() {

        var group = layer.find('#backDoneButtons')[0];
        var tween = new Kinetic.Tween({
            duration : 0.2,
            opacity : 0,
            node : group,
            x : group.x() + 200,
            onFinish : function() {
                tween.destroy();
                group.destroy();
            }
        });
        tween.play();
    }


    function glow(params) {
        var scaleX = params.radius * 2 / images.glow.width;
        var scaleY = params.radius * 2 / images.glow.height;
        var image = new Kinetic.Image({
            image : images.glow,
            offsetX : images.glow.width / 2,
            offsetY : images.glow.height / 2,
            scaleX : scaleX / 1.2,
            scaleY : scaleY / 1.2,
            opacity : 0,
            x : params.x,
            y : params.y
        });
        layer.add(image);
        // image.moveToBottom();
        var showTween = new Kinetic.Tween({
            node : image,
            duration : params.duration || 0.2,
            scaleX : scaleX,
            scaleY : scaleY,
            opacity : params.opacity || 1,
            onFinish : function() {
                showTween.destroy();
                var hideTween = new Kinetic.Tween({
                    node : image,
                    duration : 0.2,
                    opacity : 0,
                    onFinish : function() {
                        hideTween.destroy();
                        image.destroy();
                        layer.draw();
                    }
                });
                hideTween.play();
            }
        });
        showTween.play();
    }
    function start(){
        stage.scale({
            x : scale,
            y : scale
        });
        borderLayer.draw();
        var text = new Kinetic.Text({
            text : 'Please turn your speakers up',
            fontSize : 50,
            fontFamily : 'Lusitana',
            x : 40,
            y : 40,
            fill : '#476ca9',
            id : 'text'
        });
        layer.add(text);

        var firstLogo = new Kinetic.Image({
            image : images.firstLogo,
            x : stageWidth / 2 - images.firstLogo.width / 2,
            y : stageHeight / 2 - images.firstLogo.height / 2,
            id : 'firstLogo'
        });
        layer.add(firstLogo);
        layer.draw();
        setTimeout(showPair, 2000);
    }

    function showPair() {
        voice.play();
        lastTimeout = setTimeout(function() {
            voice.pause();
        }, 17 * second);
        var pair = new Kinetic.Image({
            image : images.pair1,
            x : stageWidth / 2 - images.pair1.width / 2,
            y : stageHeight / 2 - images.pair1.height / 2,
            opacity : 0,
            scale : {
                x : 0.8,
                y : 0.8
            },
            id : 'pair'
        });
        var ground = new Kinetic.Image({
            image : images.ground,
            x : pair.x() + pair.width() * 0.8 / 2 - images.ground.width * 0.8/ 2,
            y : pair.y() + pair.height() * 0.8 - images.ground.height * 0.8/ 2,
            scale : {
                x : 0.8,
                y : 0.8
            },
            id : 'ground'
        });
        layer.add(ground).add(pair);
        var tween = new Kinetic.Tween({
            node : pair,
            opacity : 1,
            duration : 0.2,
            onFinish : function() {
                tween.destroy();
                hideFirstLogo();
            }
        });
        tween.play();
    }

    function hideFirstLogo() {
        var tween = new Kinetic.Tween({
            node : layer.find('#firstLogo')[0],
            opacity : 0,
            duration : 0.5,
            onFinish : function() {
                tween.destroy();
                setTimeout(function(){
                    startBlinking();
                }, second * 2/3);
            }
        });
        tween.play();
    }

    function startBlinking() {4
        layer.find('#pair')[0].setImage(images.blink1);
        layer.draw();
        setTimeout(function(){
            stopBlinking();
        }, second * 1/10);
    }

    function stopBlinking() {
        layer.find('#pair')[0].setImage(images.pair1);
        layer.draw();
        setTimeout(function(){
            handUp();
        }, second);
    }

    function handUp() {
        var textTween = new Kinetic.Tween({
            node : layer.find('#text')[0],
            opacity : 0,
            duration : 0.5,
            onFinish : function() {
                textTween.destroy();
                layer.find('#text')[0].destroy();
            }
        });
        textTween.play();
        layer.find('#pair')[0].setImage(images.pairHand);
        layer.draw();
        setTimeout(function(){
            womenSmile();
        }, second * 2);
    }

    function womenSmile(){
        layer.find('#pair')[0].setImage(images.womenSmile);
        layer.draw();
        setTimeout(function(){
            manSad();
        }, second * 2/3);
    }

    function manSad(){
        layer.find('#pair')[0].setImage(images.manSad);
        layer.draw();
        setTimeout(function(){
            showHomePage();
        }, second);
    }

    function showHomePage(){
        var pair = layer.find('#pair')[0];
        var ground = layer.find('#ground')[0];
        var scale = stageHeight / images.homePage.height * 0.8;
        var homePage = new Kinetic.Image({
            image : images.homePage,
            scaleX: scale,
            scaleY: scale,
            x : stageWidth - images.homePage.height * scale,
            y : 50,
            opacity : 0,
            id : 'homePage'
        });
        layer.add(homePage);
        layer.draw();
        var homePageTween = new Kinetic.Tween({
            node : homePage,
            duration : 0.5,
            opacity : 0.6,
            x : stageWidth - images.homePage.height * scale - 50,
            onFinish: function() {
                homePageTween.destroy();
            }
        });
        homePageTween.play();
        var dx = stageWidth / 4 - images.pair1.width / 2 - pair.x();
        var pairTween = new Kinetic.Tween({
            node : pair,
            duration : 0.5,
            x : pair.x() + dx,
            onFinish: function() {
                pairTween.destroy();
                setTimeout(function() {
                    manRotate();
                }, second * 1.5);
            }
        });
        pairTween.play();
        var groundTween = new Kinetic.Tween({
            node : ground,
            duration : 0.5,
            x : ground.x() + dx,
            onFinish: function() {
                groundTween.destroy();
            }
        });
        groundTween.play();
    }

    function manRotate() {
        var pair = layer.find('#pair')[0];
        pair.setImage(images.manRotate);
        layer.draw();
        setTimeout(function(){
            pair.setImage(images.pair2);
            layer.draw();
            showJerry();
        }, second / 10);
    }

    function showJerry() {
        var homePage = layer.find('#homePage')[0];
        var jerry = layer.find('#jerry')[0];
        var jerry = new Kinetic.Image({
            image : images.jerry,
            x : homePage.x() + homePage.width() / 2 - images.jerry.width,
            y : homePage.y() + homePage.height() / 2 - images.jerry.height,
            scaleX : 0.2,
            scaleY : 0.2,
            rotation : -45,
            id : 'jerry'
        });
        layer.add(jerry);
        var jerryTween = new Kinetic.Tween({
            node : jerry,
            duration : 0.3,
            scaleX : 1,
            scaleY : 1,
            rotation : 0,
            onFinish: function() {
                jerryTween.destroy();
                showJerryName();
            }
        });
        jerryTween.play();
    }

    function showJerryName() {
        var jerry = layer.find('#jerry')[0];
        var jerryName = new Kinetic.Text({
            text : 'Jerry',
            y : jerry.y() + jerry.width(),
            fontSize : 96,
            fontFamily : 'Lusitana',
            fill : '#476ca9',
            id : 'jerryName'
        });
        jerryName.x(jerry.x() + jerry.width() / 2 - jerryName.width() / 2);
        layer.add(jerryName);
        layer.draw();
        setTimeout(function(){
            handUp2();
        }, second * 1.5);
    }

    function handUp2() {
        layer.find('#pair')[0].setImage(images.pairHand2);
        layer.draw();
        setTimeout(function(){
            manLook();
        }, second * 1.3);
    }

    function manLook() {
        layer.find('#pair')[0].setImage(images.pairHand2_look);
        layer.draw();
        setTimeout(function(){
            handDown();
        }, second * 2 / 3);
    }

    function handDown() {
        layer.find('#pair')[0].setImage(images.pair);
        layer.draw();
        setTimeout(function(){
            jerryOut();
        }, second * 1);
    }

    function jerryOut() {
        layer.find('#pair')[0].setImage(images.pair2_look);
        layer.find("#jerryName")[0].destroy();
        var homePage = layer.find('#homePage')[0];
        var jerry = layer.find('#jerry')[0];
        var jerryTween = new Kinetic.Tween({
            node : jerry,
            duration : 0.3,
            scaleX : 0.2,
            scaleY : 0.2,
            rotation : -45,
            onFinish: function() {
                jerryTween.destroy();
                jerry.destroy();
            }
        });
        jerryTween.play();
        var homePageTween = new Kinetic.Tween({
            node : homePage,
            duration : 0.3,
            opacity : 0,
            x : stageWidth - 300,
            onFinish: function() {
                homePageTween.destroy();
                homePage.destroy();
                setTimeout(drawNameField, second * 2);
            }
        });
        homePageTween.play();
    }

    function drawNameField () {
        var nameField = new Kinetic.Image({
            image : images.nameBorder1,
            x : stageWidth * 3 / 4 - images.nameBorder1.width / 2,
            y : stageHeight * 1 / 3,
            id : 'nameField'
        });
        layer.add(nameField);
        layer.draw();
        for (var i = 2; i < 10; i++) {
            (function(counter){
                setTimeout(function(){
                    nameField.setImage(images['nameBorder' + counter]);
                    layer.draw();
                }, 30 * counter);
            })(i);
        }
        setTimeout(function(){
            nameField.setImage(images.nameBorder);
            layer.draw();
            showNameFieldText();
        }, 350);
    }

    function showNameFieldText() {
        var nameField = layer.find('#nameField')[0];
        var pair = layer.find('#pair')[0];
        var ground = layer.find('#ground')[0];
        var nameFieldText = new Kinetic.Text({
            text : 'What is your name?',
            y : nameField.y() + nameField.height() - 30,
            opacity : 0,
            fontSize : 70,
            fontFamily : 'Lusitana',
            id : 'nameFieldText',
            fill : '#476ca9'
        });
        nameFieldText.x(nameField.x() + nameField.width() / 2 - nameFieldText.width() / 2);
        layer.add(nameFieldText);
        var tween = new Kinetic.Tween({
            duration : 0.6,
            node : nameFieldText,
            opacity : 1,
            y : nameField.y() + nameField.height() + 10,
            onFinish : function() {
                tween.destroy();
                createNameInput();
                state1 = {
                    state : JSON.stringify(layer.toObject()),
                    pairImage : pair.getImage(),
                    nameFieldImage : nameField.getImage(),
                    groundImage : ground.getImage()
                };
            }
        });
        tween.play();
    }

    function createNameInput() {
        // implement
        var nameField = layer.find('#nameField')[0];
        var rect = stage.content.getBoundingClientRect();
        var input = document.createElement("input");
        input.type = "text";
        input.style.position = "absolute";
        input.style.top = (nameField.y() * scale + rect.top) + 'px'
        input.style.left = (nameField.x() * scale + rect.left + 20) + 'px'
        input.style.background = 'transparent';
        input.style.border = '0px';
        input.style.width = (nameField.width() * scale - 40) + 'px';
        input.style.height = (nameField.height() * scale  - 5) + 'px';
        input.style['font-size'] = (nameField.height() * scale) * 0.4 + 'px';
        document.body.appendChild(input);
        input.focus();
        input.onkeydown = function(evt){
            var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
              if (keyCode == 13) {
                    answers.name = input.value;
                    hideBackDoneButtons();
                    document.body.removeChild(input);
                    layer.find('#pair')[0].setImage(images.manSad);
                    hideInput();
              }
        };
        showBackDoneButtons({
            onDone : function() {
                answers.name = input.value;
                document.body.removeChild(input);
                layer.find('#pair')[0].setImage(images.manSad);
                hideInput();
            }
        });
    }

    function hideInput() {
        clearTimeout(lastTimeout);
        voice4.play({offset : 0});
        lastTimeout = setTimeout(function() {
            voice4.pause();
        }, 8 * second);
        var nameFieldText = layer.find('#nameFieldText')[0];
        var tweenText = new Kinetic.Tween({
            node : nameFieldText,
            duration : 0.2,
            opacity : 0,
            onFinish : function() {
                tweenText.destroy();
                nameFieldText.destroy();
            }
        });
        tweenText.play();
        var nameField = layer.find('#nameField')[0];
        var nameFieldTween = new Kinetic.Tween({
            node : nameField,
            duration : 0.2,
            opacity : 0,
            onFinish : function() {
                nameFieldTween.destroy();
                nameField.destroy();
                setTimeout(showBestText, second * 2.7);
            }
        });
        nameFieldTween.play();
    }

    function showBestText() {
        var ground = layer.find('#ground')[0];
        var bestText = new Kinetic.Text({
            text : 'Would you like to find out how an annuity\ncan guarantee your retirement income?',
            fill : '#476ca9',
            align : 'center',
            id : 'bestText',
            opacity : 0,
            fontSize : 67,
            fontFamily : 'Lusitana'
        });
        bestText.x(stageWidth / 2 - bestText.width() / 2);
        bestText.y(ground.y() + ground.height() - bestText.height() / 2);
        layer.add(bestText);
        layer.draw();
        var tween = new Kinetic.Tween({
            node : bestText,
            duration : 0.3,
            opacity : 1,
            y : ground.y() + ground.height(),
            onFinish : function() {
                tween.destroy();
                showSaveOrNeed();
            }
        });
        tween.play();
    }

    function showSaveOrNeed() {
        var circleRadius = 180;
        var yes = new Kinetic.Group({
            x : stageWidth * 4 / 10,
            y : stageHeight / 2,
            opacity : 0,
            id : 'yes'
        });
        var yesCircle = new Kinetic.Circle({
            radius : circleRadius,
            fill : '#6fc045',
        });
        yes.add(yesCircle);
        var text = new Kinetic.Text({
            text : 'Need\nHelp',
            fontSize : 70,
            fontFamily : 'Lusitana',
            fill : 'white',
            align : 'center'
        });
        text.x(-text.width() / 2);
        text.y(-text.height() / 2);
        yes.add(text);
        layer.add(yes);
        var need = new Kinetic.Group({
            x : stageWidth * 6 / 10,
            y : stageHeight / 2,
            id : 'need'
        });
        var needCircle = new Kinetic.Circle({
            radius : circleRadius,
            fill : '#476ca9'
        });
        need.add(needCircle);
        text = new Kinetic.Text({
            text : "Do it\non my\nown",
            fontSize : 70,
            fontFamily : 'Lusitana',
            fill : 'white',
            align : 'center'
        });
        text.x(-text.width() / 2);
        text.y(-text.height() / 2);
        need.add(text);
        layer.add(need);
        var yesTween = new Kinetic.Tween({
            node : yes,
            duration : 0.2,
            x : stageWidth * 1 / 5,
            y : stageHeight / 2,
            opacity : 1,
            onFinish: function() {
                yesTween.destroy();
            }
        });
        yesTween.play();
        var needTween = new Kinetic.Tween({
            node : need,
            duration : 0.2,
            x : stageWidth * 4 / 5,
            y : stageHeight / 2,
            opacity : 1,
            onFinish: function() {
                needTween.destroy();
            }
        });
        needTween.play();
        var pair = layer.find('#pair')[0];
        var dx = stageWidth  / 2 - pair.width() / 2 - pair.x();
        var pairTween = new Kinetic.Tween({
            node : pair,
            duration : 0.2,
            x : pair.x() + dx,
            onFinish: function() {
                pairTween.destroy();
            }
        });
        pairTween.play();
        var ground = layer.find('#ground')[0];
        var groundTween = new Kinetic.Tween({
            node : ground,
            duration : 0.2,
            x : ground.x() + dx,
            onFinish: function() {
                groundTween.destroy();
            }
        });
        groundTween.play();
        yes.on('click tap', function(){
            answers.need_help = 'yes';
            hideNeed();
            this.off('click tap');
            setTimeout(function() {
                document.body.style.cursor='default';
            });
        });
        yes.on('mouseenter', function() {
            setTimeout(function() {
                document.body.style.cursor='pointer';
            });
        });
        yes.on('mouseleave', function() {
            setTimeout(function() {
                document.body.style.cursor='default';
            });
        });
        need.on('click tap', function(){
            answers.need_help = 'no';
            // hideNeed();
            location.href = doItOnMyOwnLink;
            this.off('click tap');
            setTimeout(function() {
                document.body.style.cursor='default';
            });
        });
        need.on('mouseenter', function() {
            setTimeout(function() {
                document.body.style.cursor='pointer';
            });
        });
        need.on('mouseleave', function() {
            setTimeout(function() {
                document.body.style.cursor='default';
            });
        });
        setTimeout(function() {
            if (answers.need_help) {
                return;
            }
            glow({
                x : yes.x(),
                y : yes.y(),
                radius : yesCircle.radius() + 30,
                duration : 0.5
            });
        }, 1.21 * second);
        setTimeout(function() {
            if (answers.need_help) {
                return;
            }
            glow({
                x : need.x(),
                y : need.y(),
                radius : needCircle.radius() + 30,
                duration : 0.5
            });
        }, 3.21 * second);
        
    }

    function hideNeed() {
        var yes = layer.find('#yes')[0];
        var need = layer.find('#need')[0];
        var yesTween = new Kinetic.Tween({
            node : yes,
            duration : 0.2,
            opacity : 0,
            onFinish: function() {
                yesTween.destroy();
                yes.destroy();
            }
        });
        yesTween.play();
        var needTween = new Kinetic.Tween({
            node : need,
            duration : 0.2,
            opacity : 0,
            onFinish: function() {
                needTween.destroy();
                need.destroy();
                zoomPair();
            }
        });
        needTween.play();
        var textTween = new Kinetic.Tween({
            node : layer.find('#bestText')[0],
            duration : 0.2,
            opacity : 0,
            onFinish: function() {
                textTween.destroy();
            }
        });
        textTween.play();
    }

    function zoomPair() {
        clearTimeout(lastTimeout);
        voice4.pause();
        voice.play({offset : 30.5 * second});
        lastTimeout = setTimeout(function() {
            voice.pause();
        },  9 * second);
        var pair = layer.find('#pair')[0];
        var tween = new Kinetic.Tween({
            node : pair,
            duration : 0.6,
            x : 0,
            scaleX : 1.5,
            scaleY : 1.5,
            onFinish: function() {
                tween.destroy();
            }
        });
        tween.play();
        var ground = layer.find('#ground')[0];
        var groundTween = new Kinetic.Tween({
            node : ground,
            duration : 0.6,
            y : pair.y() + pair.height() * 1.7,
            x : 0,
            opacity : 0,
            onFinish: function() {
                groundTween.destroy();
                getPaper();
            }
        });
        groundTween.play();
    }

    function getPaper() {
        var pair = layer.find('#pair')[0];
        pair.setImage(images.paper1);
        layer.draw();
        setTimeout(function(){
            pair.setImage(images.paper2);
            layer.draw();
            setTimeout(function(){
                pair.setImage(images.paper3);
                layer.draw();
                showAgeGenderQuestion();
            }, second / 30 * 3);
        }, second / 30 * 3);
    }

    function showAgeGenderQuestion() {       
        var labelWidth = 650;
        var labelHeight = 120;
        var labelPadding = 120;
        var group = new Kinetic.Group({
            id : 'ageGender'
        });
        layer.add(group);
        // AGE
        var ageLabel = new Kinetic.Group({
            x : stageWidth - labelWidth - labelPadding,
            y : 150
        });
        var ageLabelBack = new Kinetic.Rect({
            width : labelWidth,
            height : labelHeight,
            fill : '#6fc045'
        });
        ageLabel.add(ageLabelBack);
        var ageText = new Kinetic.Text({
            text : "Age",
            fontSize : 58,
            fontFamily : 'Lusitana',
            x : 20,
            y : 50,
            fontStyle : 'bold',
            fill : 'white'
        });
        ageText.x(50);
        ageText.y(ageLabelBack.y() + ageLabelBack.height() / 2 - ageText.height() / 2);
        ageLabel.add(ageText);
        group.add(ageLabel);
        var back = new Kinetic.Rect({
            stroke : '#476ca9',
            strokeWidth : 12,
            cornerRadius : 60,
            width : labelWidth + 100,
            height : 400,
            x : ageLabel.x() - 50,
            y : ageLabel.y() - 50
        });
        group.add(back);
        var horisont = new Kinetic.Rect({
            y : ageLabel.y() + labelHeight + 70,
            x : ageLabel.x() + 20,
            width : labelWidth - 40,
            height : 20,
            cornerRadius : 7,
            fill : '#6fc045',
            offsetY : 10
        });
        group.add(horisont);
        var vertical = new Kinetic.Image({
            y : horisont.y(),
            x : horisont.x(),
            image : images.button,
            offsetX : images.button.width / 2 * 0.8,
            offsetY : images.button.height / 2 * 0.8,
            scaleX : 0.8,
            scaleY : 0.8,
            draggable : true,
            dragBoundFunc : function(pos) {
               if (pos.x < horisont.x() * scale) {
                   pos.x = horisont.x() * scale;
               } else if (pos.x > horisont.x() * scale + horisont.width() * scale) {
                  pos.x = horisont.x() * scale + horisont.width() * scale;
                }
                pos.y = horisont.y() * scale;
                return pos;
            }
        });
        vertical.on('mouseenter', function() {
            setTimeout(function() {
                document.body.style.cursor='pointer';
            });
        });
        vertical.on('mouseleave', function() {
            setTimeout(function() {
                document.body.style.cursor='default';
            });
        });
        group.add(vertical);
        var currentValue = new Kinetic.Text({
            text : startAge,
            fontSize : 50,
            fontFamily : 'Lusitana',
            fill : '#476ca9',
            y : vertical.y() + vertical.height() * vertical.scaleY() + 10 - vertical.offsetY()
        });
        answers.age = startAge;
        currentValue.x(vertical.x() - currentValue.width() / 2);
        group.add(currentValue);
        vertical.on("dragmove", function(){
            var value = Math.round(startAge + (endAge - startAge) * (this.x() - horisont.x()) / horisont.width());
            currentValue.setAttrs({
                text : value,
                x : vertical.x() - currentValue.width() / 2,
                y : vertical.y() + vertical.height() * vertical.scaleY() + 10 - vertical.offsetY()
            });
            layer.draw();
            answers.age = value;
        });

        // GENDER
        var genderLabel = new Kinetic.Group({
            x : stageWidth - labelWidth - labelPadding,
            y : back.y() + back.height() + 50
        });
        var genderLabelBack = new Kinetic.Rect({
            width : labelWidth,
            height : labelHeight + 50,
            fill : '#6fc045'
        });
        genderLabel.add(genderLabelBack);
        var genderText = new Kinetic.Text({
            text : "Gender",
            fontSize : 58,
            fontFamily : 'Lusitana',
            fontStyle : 'bold',
            x : 20,
            y : 50,
            fill : 'white',
        });
        genderText.x(50);
        genderText.y(genderLabelBack.y() + genderLabelBack.height() / 2 - genderText.height() / 2);
        genderLabel.add(genderText);
        group.add(genderLabel);
        var femaleButton = new Kinetic.Group({
            x : stageWidth - labelWidth - labelPadding,
            y : genderLabel.y() + genderLabelBack.height() + 50
        });
        var femaleBack = new Kinetic.Rect({
            width : labelWidth / 2 - 20,
            height : 100,
            fill : '#476ca9',
            cornerRadius : 10
        });
        femaleButton.add(femaleBack);
        var femaleText = new Kinetic.Text({
            text : "Female",
            fontSize : 45,
            fontFamily : 'Lusitana',
            fill : 'white',
        });
        femaleButton.add(femaleText);
        femaleText.x(femaleBack.x() + femaleBack.width() / 2 - femaleText.width() / 2);
        femaleText.y(femaleBack.y() + femaleBack.height() / 2 - femaleText.height() / 2);
        group.add(femaleButton);

        var maleButton = new Kinetic.Group({
            x : stageWidth - labelWidth / 2 - labelPadding,
            y : genderLabel.y() + genderLabelBack.height() + 50
        });
        var maleBack = new Kinetic.Rect({
            width : labelWidth / 2,
            height : 100,
            fill : '#476ca9',
            cornerRadius : 10
        });
        maleButton.add(maleBack);
        var maleText = new Kinetic.Text({
            text : "Male",
            fontSize : 45,
            fontFamily : 'Lusitana',
            fill : 'white',
        });
        maleButton.add(maleText);
        maleText.x(maleBack.x() + maleBack.width() / 2 - maleText.width() / 2);
        maleText.y(maleBack.y() + maleBack.height() / 2 - maleText.height() / 2);
        group.add(maleButton);
        maleButton.on('mouseenter', function() {
            setTimeout(function() {
                document.body.style.cursor='pointer';
            });
        });
        maleButton.on('mouseleave', function() {
            setTimeout(function() {
                document.body.style.cursor='default';
            });
        });
        femaleButton.on('mouseenter', function() {
            setTimeout(function() {
                document.body.style.cursor='pointer';
            });
        });
        femaleButton.on('mouseleave', function() {
            setTimeout(function() {
                document.body.style.cursor='default';
            });
        });
        
        var backDoneShowed = false;
        var pair = layer.find('#pair')[0];
        state2 = {
            state : JSON.stringify(layer.toObject()),
            pairImage : pair.getImage()
        };
        var next = false;
        var params = {
            onDone : function(){
                next = true;
                boom();
            },
            onBack : function() {
                layer.destroy();
                layer = Kinetic.Node.create(state1.state);
                stage.add(layer);
                pair.setImage(state1.pairImage);
                layer.find('#ground')[0].setImage(state1.groundImage);
                layer.find('#nameField')[0].setImage(state1.nameFieldImage);
                layer.draw();
                createNameInput();
            }
        };

        maleButton.on("click tap", function(){
            answers.gender = 'male';
            femaleBack.fill('#476ca9');
            maleBack.fill('#6fc045');
            layer.draw();
            if (!backDoneShowed) {
                showBackDoneButtons(params);
            }
            backDoneShowed = true;
            // hideAgeGenderQuestion();
        });
        femaleButton.on("click tap", function(){
            answers.gender = 'female';
            maleBack.fill('#476ca9');
            femaleBack.fill('#6fc045');
            layer.draw();
            if (!backDoneShowed) {
                showBackDoneButtons(params);
            }
            backDoneShowed = true;
        });
        setTimeout(function() {
            if (next) {
                return;
            }
            glow({
                x : ageLabel.x() + labelWidth / 2,
                y : ageLabel.y() + 150 ,
                radius : labelWidth / 3,
                opacity : 0.5,
                duration : 0.5
            });
        }, 6.9 * second);
        setTimeout(function() {
            if (next) {
                return;
            }
            glow({
                x : genderLabel.x() + labelWidth / 2,
                y : genderLabel.y() + 200,
                radius : labelWidth / 3,
                opacity : 0.5,
                duration : 0.5
            });
        }, 7.3 * second);
        layer.draw();
        setTimeout(function() {
            if (next) {
                return;
            }
            showAgeText()
        }, 6.2 * second);
    }

    function showAgeText() {
        var string = 'What is your age and gender?';
        var text = new Kinetic.Text({
            id : 'ageText',
            text : '',
            fill : '#476ca9',
            allign : 'center',
            fontSize : 50,
            fontFamily : 'Lusitana',
            x : 150,
            y : 70
        });
        layer.add(text);
        glow({
            x : text.x() + text.fontSize() / 4,
            y : text.y() + text.fontSize() / 2,
            radius : text.fontSize()
        });
        for (var i=0; i < string.length; i++) {
            (function(i){
                setTimeout(function() {
                    text.text(string.slice(0, i+1));
                    layer.draw();
                }, 30 * i);  
            })(i);

        }
    }

    function boom() {
        var pair = layer.find('#pair')[0];
        pair.setImage(images.manSad);
        var image = new Kinetic.Image({
            image : images.boom1,
            x : pair.x() + pair.width() * pair.scaleX() / 2 - images.boom1.width / 2,
            y : pair.y() + pair.height() * pair.scaleX() / 2 - images.boom1.height / 2
        });
        layer.add(image);
        layer.draw();
        setTimeout(function(){
            image.setAttrs({
                image : images.boom2,
                x : pair.x() + pair.width() * pair.scaleX() / 2 - images.boom2.width / 2,
                y : pair.y() + pair.height() * pair.scaleX() / 2 - images.boom2.height / 2
            });
            layer.draw();
            setTimeout(function(){
                image.setAttrs({
                    image : images.boom3,
                    x : pair.x() + pair.width() * pair.scaleX() / 2 - images.boom3.width / 2,
                    y : pair.y() + pair.height() * pair.scaleX() / 2 - images.boom3.height / 2
                });
                layer.draw();
                setTimeout(function(){
                    image.destroy();
                    layer.draw();
                    hideAgeGenderQuestion();
                }, second / 30 * 3);
            }, second / 30 * 3);
        }, second / 30 * 3);
    }

    function hideAgeGenderQuestion() {
        clearTimeout(lastTimeout);
        voice.play({
            offset : 42.4 * second
        });
        lastTimeout = setTimeout(function() {
            voice.pause();
        },  5.7 * second);
        layer.find('#ageText')[0] && layer.find('#ageText')[0].destroy();
        var group = layer.find('#ageGender')[0];
        var tween = new Kinetic.Tween({
            node : group,
            duration : 0.2,
            opacity : 0,
            onFinish : function() {
                tween.destroy();
                group.destroy();
                handOut();
            }
        });
        tween.play();
    }

    function handOut() {
        var pair = layer.find('#pair')[0];
        pair.setImage(images.pair1_handOut);
        layer.draw();
        setTimeout(function(){
            pair.setImage(images.pair1_handOut2);
            layer.draw();
            setTimeout(movePairToCenter, second * 1 / 4);
        }, second * 1 / 10);
    }

    function movePairToCenter() {
        var pair = layer.find('#pair')[0];
        var tween = new Kinetic.Tween({
            node : pair,
            duration : 0.2,
            x : stageWidth / 2 - pair.width() / 2 * 0.7,
            scaleX : 0.7,
            scaleY : 0.7,
            y : stageHeight / 2 - pair.height() / 2 * 0.7
        });
        tween.play();
        var ground = layer.find('#ground')[0];
        var groundTween = new Kinetic.Tween({
            node : ground,
            duration : 0.2,
            opacity : 1,
            x : stageWidth / 2 - ground.width() / 2 * 0.7,
            y : stageHeight / 2 + pair.height() / 2 * 0.7 - ground.height() / 2 * 0.7,
            scaleX : 0.7,
            scaleY : 0.7,
            onFinish : function() {
                groundTween.destroy();
                setTimeout(dropBag, second * 0.5);
            }
        });
        groundTween.play();
        setTimeout(function(){
            var needSaveTitle = new Kinetic.Text({
                text : ' Do you think of your retirement in terms of....',
                fill : '#476CA9',
                fontSize : 52,
                fontFamily : 'Lusitana',
                opacity : 0,
                y : 10,
                id : 'needSaveTitleText'
            });
            needSaveTitle.x(stageWidth / 2 - needSaveTitle.width() / 2);
            layer.add(needSaveTitle);
            var textTween = new Kinetic.Tween({
                node : needSaveTitle,
                duration : 0.2,
                opacity : 1,
                y : 50,
                onFinish : function() {
                    glow({
                        x : needSaveTitle.x() + needSaveTitle.fontSize() / 4,
                        y : needSaveTitle.y() + needSaveTitle.fontSize() / 2,
                        radius : needSaveTitle.fontSize()
                    });
                }
            });
            textTween.play();
        }, 2 * second);
    }

    function dropBag() {
        voice.pause();
        clearTimeout(lastTimeout);
        voice2.play({offset : 0 * second});
        lastTimeout = setTimeout(function() {
            voice2.pause();
        }, 7 * second);
        var saveGroup = new Kinetic.Group({
            id : 'saveGroup'
        });
        layer.add(saveGroup);
        var bagImage = new Kinetic.Image({
            image : images.bag1,
            x : 50,
            y : - images.bag1.height,
            scaleX : 0.8,
            scaleY : 0.8,
            id : 'bagImage'
        });
        saveGroup.add(bagImage);
        layer.draw();
        var tween = new Kinetic.Tween({
            node : bagImage,
            duration : 0.2,
            y : 350,
            onFinish : function() {
                bagImage.setImage(images.bag2);
                layer.draw();
                var text = new Kinetic.Text({
                    text : 'How much you\nsaved?',
                    fontSize : 52,
                    fontFamily : 'Lusitana',
                    align : 'center',
                    x : bagImage.x(),
                    y : bagImage.y() + bagImage.height() + 30,
                    fill : '#476CA9',
                    id : 'saveText'
                });
                saveGroup.add(text);
                setTimeout(function(){
                    bagImage.setImage(images.bag3);
                    layer.draw();
                    setTimeout(dropPig, second);
                }, 66);
            }
        });
        tween.play();
    }

    function dropPig() {
        var needGroup = new Kinetic.Group({
            id : 'needGroup'
        });
        layer.add(needGroup);
        var pigImage = new Kinetic.Image({
            image : images.check,
            x : stageWidth - 50 - images.check.width,
            y : stageHeight + images.check.height + 100,
            scaleX : 0.8,
            scaleY : 0.8,
            id : 'pigImage'
        });
        needGroup.add(pigImage);
        layer.draw();
        var tween = new Kinetic.Tween({
            node : pigImage,
            duration : 0.2,
            y : 370,
            onFinish : function() {
                pigImage.y(490);
                layer.draw();
                var text = new Kinetic.Text({
                    text : "How much income\nyou'll need?",
                    fontSize : 52,
                    fontFamily : 'Lusitana',
                    align : 'center',
                    x : pigImage.x(),
                    y : pigImage.y() + pigImage.height() * pigImage.scaleY() + 10,
                    fill : '#476CA9',
                    id : 'needText'
                });
                needGroup.add(text);
                installPigBagButtons();
            }
        });
        tween.play();
    }

    function installPigBagButtons() {       
        var pigImage = layer.find('#pigImage')[0];
        var bagImage = layer.find('#bagImage')[0];
        var pair = layer.find('#pair')[0];
        state3 = {
            state : JSON.stringify(layer.toObject()),
            pairImage : pair.getImage(),
            pigImage : pigImage.getImage(),
            bagImage : bagImage.getImage()
        };
        var pigImage = layer.find('#needGroup')[0];
        var bagImage = layer.find('#saveGroup')[0];
        var backDoneShowed = false;
        var next = false;
        var params = {
            onDone : function() {
                next = true;
                incomeSlider();
            },
            onBack : function() {
                next = true;
                layer.destroy();
                layer = Kinetic.Node.create(state2.state);
                stage.add(layer);
                pair = layer.find('#pair')[0];
                pair.setImage(state2.pairImage);
                layer.draw();
                showAgeGenderQuestion();
            }
        };
        pigImage.on('click tap', function(){
            if (next) {return;}
            answers.termsOf = 'need';
            layer.find('#needText')[0].fill('#6fc045');
            layer.find('#saveText')[0].fill('#476CA9');
            layer.draw();
            if (!backDoneShowed) {
                showBackDoneButtons(params);
            }
            backDoneShowed = true;
        });
        pigImage.on('mouseenter', function() {
            setTimeout(function() {
                document.body.style.cursor='pointer';
            });
        });
        pigImage.on('mouseleave', function() {
            setTimeout(function() {
                document.body.style.cursor='default';
            });
        });
        bagImage.on('click tap', function(){
            if (next) {return;}
            answers.termsOf = 'save';
            layer.find('#saveText')[0].fill('#6fc045');
            layer.find('#needText')[0].fill('#476CA9');
            layer.draw();
            if (!backDoneShowed) {
                showBackDoneButtons(params);
            }
            backDoneShowed = true;
        });
        bagImage.on('mouseenter', function() {
            setTimeout(function() {
                document.body.style.cursor='pointer';
            });
        });
        bagImage.on('mouseleave', function() {
            setTimeout(function() {
                document.body.style.cursor='default';
            });
        });
        setTimeout(function() {
            if (next) {return;}
            var pigImage = layer.find('#pigImage')[0];
            var bagImage = layer.find('#bagImage')[0];
            glow({
                x : pigImage.x() + pigImage.width() / 2 * pigImage.scaleX(),
                y : pigImage.y() + pigImage.height() / 2 * pigImage.scaleX(),
                radius : pigImage.width() / 2 * pigImage.scaleX() + 50,
                opacity : 0.5
            });
        }, 3.21 * second);
        setTimeout(function() {
            if (next) {return;}
            var pigImage = layer.find('#pigImage')[0];
            var bagImage = layer.find('#bagImage')[0];
            glow({
                x : bagImage.x() + bagImage.width() / 2 * bagImage.scaleX(),
                y : bagImage.y() + bagImage.height() / 2 * bagImage.scaleX(),
                radius : bagImage.width() / 2 * pigImage.scaleX() + 60,
                opacity : 0.5
            });
        }, 1.21 * second);
    }

    function incomeSlider() {
        var node;
        var pigImage = layer.find('#pigImage')[0];
        var bagImage = layer.find('#bagImage')[0];
        layer.find("#needText")[0] && layer.find("#needText")[0].destroy();
        layer.find("#saveText")[0] && layer.find("#saveText")[0].destroy();
        layer.find("#needSaveTitleText")[0] && layer.find("#needSaveTitleText")[0].destroy();
        if (answers.termsOf === 'save') {
            clearTimeout(lastTimeout);
            voice2.play({offset : 8 * second});
            lastTimeout = setTimeout(function() {
                voice2.pause();
            }, 4 * second);
            pigImage.destroy();
            node = bagImage;
        } else {
            clearTimeout(lastTimeout);
            voice2.play({offset : 12 * second});
            lastTimeout = setTimeout(function() {
                voice2.pause();
            }, 8 * second);
            bagImage.destroy();
            node = pigImage;
        }
        node.id('sonImage');
        var imageTween = new Kinetic.Tween({
            node : node,
            duration : 0.5,
            x : 400,
            scaleX : 1.2,
            scaleY : 1.2,
            onFinish : function() {
                createIncomeSlider();
            }
        });
        imageTween.play();
        var pair = layer.find("#pair")[0];
        var dx = stageWidth * 3 / 4 - pair.width() / 2 * pair.scaleX() - pair.x();
        var pairTween = new Kinetic.Tween({
            node : pair,
            duration : 0.5,
            x : pair.x() + dx,
            onFinish : function() {
                pair.setImage(images.pair1);
                layer.draw();
            }
        });
        pairTween.play();
        var ground = layer.find("#ground")[0];
        var groundTween = new Kinetic.Tween({
            node : ground,
            duration : 0.5,
            x : ground.x() + dx
        });
        groundTween.play();
    }

    function createIncomeSlider() {
        var fromValue, toValue, topText;
        if (answers.termsOf === 'save') {
            fromValue = 50000;

            toValue = 1000000;
            topText = ' So, how much of your savings might you\nuse to invest in the annuity?';
        } else {
            fromValue = 5000;
            toValue = 100000;
            topText = ' So, how much annual income do you need\nat the start of your retirement?';
        }
        var group = new Kinetic.Group({
            id : 'incomeSlider'
        });
        layer.add(group);
        var vertical = new Kinetic.Rect({
            y : 550,
            x : 160,
            width : 16,
            height : 270,
            cornerRadius : 7,
            fill : '#6fc045',
            offsetY : 10
        });
        group.add(vertical);
        var horisont = new Kinetic.Image({
            y : vertical.y() + vertical.height(),
            x : vertical.x() + vertical.width() / 2,
            image : images.button,
            offsetX : images.button.width / 2 * 0.8,
            offsetY : images.button.height / 2 * 0.8,
            scaleX : 0.8,
            scaleY : 0.8,
            draggable : true,
            id : 'button',
            dragBoundFunc : function(pos) {
               if (pos.y < vertical.y() * scale) {
                   pos.y = vertical.y() * scale;
               } else if (pos.y > vertical.y() * scale + vertical.height() * scale) {
                  pos.y = vertical.y() * scale + vertical.height() * scale;
                }
                pos.x = vertical.x() * scale+ vertical.width() / 2 * scale;
                return pos;
            }
        });
        horisont.on('mouseenter', function() {
            setTimeout(function() {
                document.body.style.cursor='pointer';
            });
        });
        horisont.on('mouseleave', function() {
            setTimeout(function() {
                document.body.style.cursor='default';
            });
        });
        group.add(horisont);
        var topValue = new Kinetic.Text({
            text : numberToText(toValue),
            fill : '#6fc045',
            fontSize : 52,
            fontFamily : 'Lusitana'
        });
        topValue.x(vertical.x() + vertical.width() / 2 - topValue.width() / 2);
        topValue.y(vertical.y() - topValue.height()  - 30);
        group.add(topValue);

        var currentValue = new Kinetic.Text({
            text : numberToText(fromValue),
            fontSize : 52,
            fontFamily : 'Lusitana',
            fill : '#6fc045',
        });
        currentValue.x(vertical.x() + vertical.width() / 2 - currentValue.width() / 2);
        currentValue.y(vertical.y() + vertical.height() + 30);
        if (answers.termsOf === 'need') {
            var currentValue2 = new Kinetic.Text({
                text : numberToText(fromValue),
                fontSize : 40,
                fontFamily : 'Lusitana',
                fill : 'black',
                rotation : 5
            });
            currentValue2.x(850);
            currentValue2.y(657);
            group.add(currentValue2);
        }
        group.add(currentValue);
        horisont.on("dragmove", function(){
            var persent = (vertical.y() - this.y()) / vertical.height() + 1;
            var step;
            if (answers.termsOf === 'save') {
                step = 10000;
            } else {
                step = 5000;
            }
            var value = Math.round((fromValue + (toValue - fromValue) * persent) / step) * step;
            currentValue.setAttrs({
                text : numberToText(value)
            });
            currentValue.x(vertical.x() + vertical.width() / 2 - currentValue.width() / 2);
            if (currentValue2) {
                currentValue2.text(numberToText(value));
            }
            layer.draw();
            if (answers.termsOf === 'save') {
                answers.savingAmount = value;
            } else {
                answers.specifiedIncome = value;
            }
        });
        // default answer
        if (answers.termsOf === 'save') {
            answers.savingAmount = saveMin;
        } else {
            answers.specifiedIncome = needMin;
        }
        var label = new Kinetic.Text({
            text : answers.termsOf === 'save' ? 'Savings' : 'Annual\nincome',
            fill : '#476CA9',
            fontSize : 52,
            fontFamily : 'Lusitana',
            fontStyle : 'bold'
        });
        label.x(vertical.x() + vertical.width() / 2 - label.width() / 2);
        label.y(vertical.y() - 200);
        group.add(label);
        var label2 = new Kinetic.Text({
            text : topText,
            fill : '#476CA9',
            fontSize : 52,
            fontFamily : 'Lusitana',
            fontStyle : 'bold',
            y : 20
        });
        label2.x(stageWidth / 2 - label2.width() / 2);
        group.add(label2);
        glow({
            x : label2.x() + label2.fontSize() / 4,
            y : label2.y() + label2.fontSize() / 2,
            radius : label2.fontSize()
        });
        var pair = layer.find("#pair")[0];
        state4 = {
            state : JSON.stringify(layer.toObject()),
            pairImage : pair.getImage(),
        };
        showBackDoneButtons({
            onDone : boom2,
            onBack : function() {
                layer.destroy();
                layer = Kinetic.Node.create(state3.state);
                stage.add(layer);
                pair = layer.find('#pair')[0];
                pair.setImage(state1.pairImage);
                layer.find('#bagImage')[0].setImage(state3.bagImage);
                layer.find('#pigImage')[0].setImage(state3.pigImage);
                layer.draw();
                installPigBagButtons();
            }
        });
        layer.draw();
    }

    function boom2() {
        var image = new Kinetic.Image({
            image : images.boom1,
            y : 550,
            x : 160,
        });
        layer.add(image);
        var group = layer.find('#incomeSlider')[0];
        layer.find('#sonImage')[0].moveTo(group);
        group.opacity(0);
        group.destroy();
        layer.draw();
        setTimeout(function(){
            image.setAttrs({
                image : images.boom2
            });
            layer.draw();
            setTimeout(function(){
                image.setAttrs({
                    image : images.boom3
                });
                layer.draw();
                setTimeout(function(){
                    image.destroy();
                    layer.draw();
                    zoomPair2();
                }, second / 30 * 3);
            }, second / 30 * 3);
        }, second / 30 * 3);
    }


    function zoomPair2() {
        var pair = layer.find("#pair")[0];
        var tween = new Kinetic.Tween({
            node : pair,
            y : 250,
            x : 300,
            scaleX : 2,
            scaleY : 2,
            duration : 0.5,
            onFinish: function() {
                tween.destroy();
                pair.setImage(images.pairCuted);
                pair.scaleX(1);
                pair.scaleY(1);
                showYouOrSpouse();
            }
        });
        tween.play();
        var ground = layer.find("#ground")[0];
        var groundTween = new Kinetic.Tween({
            node : ground,
            y : stageHeight,
            x : stageWidth / 2 - ground.width() / 2,
            scaleX : 1.5,
            scaleY : 1.5,
            duration : 0.5,
            onFinish: function() {
                groundTween.destroy();
            }
        });
        groundTween.play();
    }

    function showYouOrSpouse() {
        voice.pause();
        voice2.pause();
        // voice.play({offset : 49 * second});
        voice3.play({ offset: 0.4 * second }); 
        lastTimeout = setTimeout(function() {
            voice3.pause();
        },  10 * second);
        var group = new Kinetic.Group({
            id : 'youOrSpouse'
        });
        layer.add(group);
        var circleRadius = 150;
        var you = new Kinetic.Group({
            x : stageWidth / 2,
            y : stageHeight / 3,
            opacity : 0
        });
        var youBack = new Kinetic.Circle({
            radius : circleRadius,
            fill : '#689ACA'
        });
        you.add(youBack);
        var text = new Kinetic.Text({
            text : 'you',
            fontSize : 100,
            fontFamily : 'Lusitana',
            fill : 'white'
        });
        text.x(-text.width() / 2);
        text.y(-text.height() / 2);
        you.add(text);
        group.add(you);

        var andSpouse = new Kinetic.Group({
            x : stageWidth / 2,
            y : stageHeight * 2 / 3
        });
        var andSpouseBack = new Kinetic.Circle({
            radius : circleRadius,
            fill : '#689ACA'
        });
        andSpouse.add(andSpouseBack);
        text = new Kinetic.Text({
            text : "you\n& your\nspouse",
            fontSize : 60,
            fontFamily : 'Lusitana',
            fill : 'white',
            align : 'center'
        });
        text.x(-text.width() / 2);
        text.y(-text.height() / 2);
        andSpouse.add(text);
        group.add(andSpouse);
        var youTween = new Kinetic.Tween({
            node : you,
            duration : 0.2,
            opacity : 1,
            onFinish: function() {
                youTween.destroy();
            }
        });
        youTween.play();
        var andSpouseTween = new Kinetic.Tween({
            node : andSpouse,
            duration : 0.2,
            opacity : 1,
            onFinish: function() {
                andSpouseTween.destroy();
            }
        });
        andSpouseTween.play();

        var backDoneShowed = false;
        
        var pair = layer.find('#pair')[0];
        state5 = {
            state : JSON.stringify(layer.toObject()),
            pairImage : pair.getImage(),
        };
        var next = false;
        var params = {
            onDone : function() {
                next = true;
                moveMan();
            }
            ,
            onBack : function() {
                layer.destroy();
                layer = Kinetic.Node.create(state4.state);
                stage.add(layer);
                pair.setImage(state4.pairImage);
                layer.draw();
                installPigBagButtons();
            }
        };


        you.on('click tap', function(){
            answers.you = 'you';
            youBack.fill('#6fc045');
            andSpouseBack.fill('#689ACA');
            layer.draw();
            if (!backDoneShowed) {
                showBackDoneButtons(params);
            }
            backDoneShowed = true;
            answers.singleLife = true;
        });
        you.on('mouseenter', function() {
            setTimeout(function() {
                document.body.style.cursor='pointer';
            });
        });
        you.on('mouseleave', function() {
            setTimeout(function() {
                document.body.style.cursor='default';
            });
        });
        andSpouse.on('click tap', function(){
            answers.you = 'spouse';
            andSpouseBack.fill('#6fc045');
            youBack.fill('#689ACA');
            layer.draw();
            if (!backDoneShowed) {
                showBackDoneButtons(params);
            }
            backDoneShowed = true;
            answers.singleLife = false;
        });
        andSpouse.on('mouseenter', function() {
            setTimeout(function() {
                document.body.style.cursor='pointer';
            });
        });
        andSpouse.on('mouseleave', function() {
            setTimeout(function() {
                document.body.style.cursor='default';
            });
        });
        setTimeout(function() {
            if (next) {
                return;
            }
            glow({
                x : you.x(),
                y : you.y(),
                radius : youBack.radius() + 30
            });
        }, 6.71 * second);
        setTimeout(function() {
            if (next) {
                return;
            }
            glow({
                x : andSpouse.x(),
                y : andSpouse.y(),
                radius : andSpouseBack.radius() + 30
            });
        }, 8.61 * second);
        setTimeout(function() {
            if (next) {
                return;
            }
            var text = new Kinetic.Text({
                text : '1. Are you going to want income for...',
                fontSize : 52,
                fontFamily : 'Lusitana',
                y : 50,
                fill: '#689ACA'
            });
            text.x(stageWidth  / 2 - text.width() / 2);
            group.add(text);
            glow({
                x : text.x() + text.fontSize() / 4,
                y : text.y() + text.fontSize() / 2,
                radius : text.fontSize()
            });
        }, 4.5 * second);

    }

    function moveMan() {
        var pair = layer.find('#pair')[0];
        pair.destroy();
        layer.find('#you')[0] && layer.find('#you')[0].destroy();
        layer.find('#youOrSpouse')[0] && layer.find('#youOrSpouse')[0].destroy();
        var women = new Kinetic.Image({
            x : pair.x(),
            y : pair.y(),
            image : images.women1,
            scaleY : 1.2,
            scaleX : 1.2,
            id : 'women'
        });
        layer.add(women);
        var men = new Kinetic.Image({
            x : pair.x() + 500,
            y : pair.y(),
            scaleY : 1.2,
            scaleX : 1.2,
            image : images.men1,
            id : 'men'
        });
        layer.add(men);
        men.moveToBottom();
        layer.draw();
        var menTween = new Kinetic.Tween({
            node : men,
            duration : 0.3,
            x : 200
        });
        menTween.play();
        var womenTween = new Kinetic.Tween({
            node : women,
            duration : 0.3,
            x : 0,
            onFinish : function() {
                if (answers.you === 'you') {
                    showAPI();
                } else {
                    spouseAgeAndGender();
                }
                
            }
        });
        womenTween.play();
    }


    function spouseAgeAndGender() {
        var labelWidth = 650;
        var labelHeight = 120;
        var labelPadding = 90;
        var group = new Kinetic.Group({
            id : 'ageGender'
        });
        layer.add(group);
        voice.pause();      
        voice2.pause();
        clearTimeout(lastTimeout);
        voice3.play({ offset: 10 * second });       
        lastTimeout = setTimeout(function () {      
            voice3.pause();         
        }, 2.7 * second); 

        var topText = new Kinetic.Text({
            text : 'Tell us about your spouse...',
            fontSize : 55,
            fontFamily : 'Lusitana',
            fill : '#6fc045',
            y : 20
        });
        topText.x(stageWidth / 2 - topText.width() / 2);
        group.add(topText);
        // AGE
        var ageText = new Kinetic.Text({
            text : "spouse age",
            fontSize : 66,
            fontFamily : 'Lusitana',
            x : 1350,
            y : 200,
            fontStyle : 'bold',
            fill : '#689ACA'
        });
        group.add(ageText);
        var back = new Kinetic.Rect({
            cornerRadius : 30,
            width : 300,
            height : 180,
            x : ageText.x() + 20,
            y : ageText.y() + ageText.height() + 50,
            fill : '#689ACA'
        });
        group.add(back);
        var horisont = new Kinetic.Rect({
            y : back.y() + 70,
            x : back.x() + 60,
            width : back.width() - 120,
            height : 20,
            cornerRadius : 7,
            fill : 'white',
            offsetY : 10
        });

        group.add(horisont);
        var vertical = new Kinetic.Image({
            y : horisont.y(),
            x : horisont.x(),
            image : images.button,
            offsetX : images.button.width / 2 * 0.8,
            offsetY : images.button.height / 2 * 0.8,
            scaleX : 0.8,
            scaleY : 0.8,
            draggable : true,
            dragBoundFunc : function(pos) {
               if (pos.x < horisont.x() * scale) {
                   pos.x = horisont.x() * scale;
               } else if (pos.x > horisont.x() * scale + horisont.width() * scale) {
                  pos.x = horisont.x() * scale + horisont.width() * scale;
                }
                pos.y = horisont.y() * scale;
                return pos;
            }
        });
        vertical.on('mouseenter', function() {
            setTimeout(function() {
                document.body.style.cursor='pointer';
            });
        });
        vertical.on('mouseleave', function() {
            setTimeout(function() {
                document.body.style.cursor='default';
            });
        });
        group.add(vertical);
        var currentValue = new Kinetic.Text({
            text : startAge,
            fontSize : 50,
            fontFamily : 'Lusitana',
            fill : 'white',
            y : vertical.y() + vertical.height() * vertical.scaleY() + 10 - vertical.offsetY()
        });
        currentValue.x(vertical.x() - currentValue.width() / 2);
        group.add(currentValue);
        vertical.on("dragmove", function(){
            var value = Math.round(startAge + (endAge - startAge) * (this.x() - horisont.x()) / horisont.width());
            currentValue.setAttrs({
                text : value,
                x : vertical.x() - currentValue.width() / 2,
                y : vertical.y() + vertical.height() * vertical.scaleY() + 10 - vertical.offsetY()
            });
            layer.draw();
            answers.spouseAge = value;
        });

        var genderText = new Kinetic.Text({
            text : "spouse gender",
            fontSize : 58,
            fontFamily : 'Lusitana',
            fontStyle : 'bold',
            x : ageText.x(),
            y : 500,
            fill : '#689ACA',
        });
        genderText.y(back.y() + back.height() + 50);
        group.add(genderText);

        var femaleButton = new Kinetic.Group({
            x : genderText.x() + genderText.width() / 2,
            y : genderText.y() + genderText.height() + 50
        });
        var femaleBack = new Kinetic.Rect({
            x : - labelWidth / 3 - 10,
            width : labelWidth / 3,
            height : 200,
            stroke : '#476ca9',
            strokeWidth : 7,
            cornerRadius : 10
        });
        femaleButton.add(femaleBack);
        var femaleIcon = new Kinetic.Image({
            image : images.femaleIcon,
            x : femaleBack.x() + femaleBack.width() / 2 - images.femaleIcon.width / 2,
            y : femaleBack.y() + 20
        });
        femaleButton.add(femaleIcon);
        var femaleText = new Kinetic.Text({
            text : "Female",
            fontSize : 45,
            fontFamily : 'Lusitana',
            fill : '#6FC045',
        });
        femaleButton.add(femaleText);
        femaleText.x(femaleBack.x() + femaleBack.width() / 2 - femaleText.width() / 2);
        femaleText.y(femaleIcon.y() + femaleIcon.height()  + 20);
        group.add(femaleButton);

        var maleButton = new Kinetic.Group({
            x : genderText.x() + genderText.width() / 2,
            y : genderText.y() + genderText.height() + 50
        });
        var maleBack = new Kinetic.Rect({
            x : 10,
            width : labelWidth / 3,
            height : 200,
            stroke : '#476ca9',
            strokeWidth : 7,
            cornerRadius : 10
        });
        maleButton.add(maleBack);
        var maleIcon = new Kinetic.Image({
            image : images.maleIcon,
            x : maleBack.x() + maleBack.width() / 2 - images.maleIcon.width / 2,
            y : maleBack.y() + 20
        });
        maleButton.add(maleIcon);
        var maleText = new Kinetic.Text({
            text : "Male",
            fontSize : 45,
            fontFamily : 'Lusitana',
            fill : '#6FC045',
        });
        maleButton.add(maleText);
        maleText.x(maleBack.x() + maleBack.width() / 2 - maleText.width() / 2);
        maleText.y(maleIcon.y() + maleIcon.height() + 20);
        group.add(maleButton);
        
        var backDoneShowed = false;

        var pair = layer.find('#pair')[0];
        var params = {
            onDone : function() {
                group.destroy();
                showAPI();
            },
            onBack : function() {
                layer.destroy();
                layer = Kinetic.Node.create(state1.state);
                stage.add(layer);
                pair = layer.find('#pair')[0];
                pair.setImage(state1.pairImage);
                layer.draw();
                showYouOrSpouse();
            }
        };

        maleButton.on("click tap", function(){
            answers.gender = 'male';
            femaleBack.stroke('#476ca9');
            maleBack.stroke('#6fc045');
            layer.draw();
            if (!backDoneShowed) {
                showBackDoneButtons(params);
            }
            backDoneShowed = true
            answers.spouseGender = 'male';
            // hideAgeGenderQuestion();
        });
        maleButton.on('mouseenter', function() {
            setTimeout(function() {
                document.body.style.cursor='pointer';
            });
        });
        maleButton.on('mouseleave', function() {
            setTimeout(function() {
                document.body.style.cursor='default';
            });
        });
        femaleButton.on("click tap", function(){
            answers.gender = 'female';
            maleBack.stroke('#476ca9');
            femaleBack.stroke('#6fc045');
            layer.draw();
            if (!backDoneShowed) {
                showBackDoneButtons(params);
            }
            backDoneShowed = true;
            answers.spouseGender = 'female';
        });
        femaleButton.on('mouseenter', function() {
            setTimeout(function() {
                document.body.style.cursor='pointer';
            });
        });
        femaleButton.on('mouseleave', function() {
            setTimeout(function() {
                document.body.style.cursor='default';
            });
        });
        layer.draw();
    }

    function showAPI() {
        voice2.pause();
        voice.pause();
        voice3.pause();
        clearTimeout(lastTimeout);
        voice4.play({ offset: 10 * 1000 });
        lastTimeout = setTimeout(function() {
            voice4.pause();
        },  10 * 1000);
        var refundGroup = new Kinetic.Group({
            id : 'refundGroup'
        });
        layer.add(refundGroup);
        var topText = new Kinetic.Text({
            text : '2. Do you want to...',
            fontSize : 64,
            fontFamily : 'Lusitana',
            fill : '#476CA9'
        });
        topText.y(20);
        topText.x(stageWidth / 2 - topText.width() / 2);
        glow({
            x : topText.x() + topText.fontSize() / 4,
            y : topText.y() + topText.fontSize() / 2,
            radius : topText.fontSize()
        });
        refundGroup.add(topText);
        
        var first = new Kinetic.Group();
        refundGroup.add(first);
        var firstRect = new Kinetic.Rect({
            fill : '#476CA9',
            width : 700,
            y : 200,
            height : 250,
            x : stageWidth / 2 + 200,
            cornerRadius : 30
        });
        var text = new Kinetic.Text({
            text : 'accept lower income now\nso that it will continue to\nyour beneficiary?',
            fill : 'white',
            allign : 'left',
            fontSize : 50,
            fontFamily : 'Lusitana',
        });
        text.x(firstRect.x() + firstRect.width() / 2 - text.width() / 2);
        text.y(firstRect.y() + firstRect.height() / 2 - text.height() /2);

        first.add(firstRect).add(text);
        var second = new Kinetic.Group();
        refundGroup.add(second);
        var secondRect = new Kinetic.Rect({
            fill : '#476CA9',
            width : firstRect.width(),
            y : firstRect.y() + firstRect.height() + 50,
            height : firstRect.height(),
            x : firstRect.x(),
            cornerRadius : 30
        });
        text = new Kinetic.Text({
            text : 'maximize your income\nnow and have income\nstop at your death?',
            fill : 'white',
            allign : 'left',
            fontSize : 50,
            fontFamily : 'Lusitana'
        });
        text.x(secondRect.x() + secondRect.width() / 2 - text.width() / 2);
        text.y(secondRect.y() + secondRect.height() / 2 - text.height() / 2);

        second.add(secondRect).add(text);

        var backDoneShowed = false;
        var params = {
            onDone : hideAPI,
            onBack : function() {

            }
        };

        first.on('click tap', function() {
            secondRect.fill('#476CA9');
            firstRect.fill('#6fc045');
            layer.find("#men")[0].setImage(images.menTop);
            layer.draw();
            if (!backDoneShowed) {
                showBackDoneButtons(params);
            }
            backDoneShowed = true;
            answers.apiToLife = '100%';
        });
        first.on('mouseenter', function() {
            setTimeout(function() {
                document.body.style.cursor='pointer';
            });
        });
        first.on('mouseleave', function() {
            setTimeout(function() {
                document.body.style.cursor='default';
            });
        });

        second.on('click tap', function() {
            firstRect.fill('#476CA9');
            secondRect.fill('#6fc045');
            layer.find("#men")[0].setImage(images.menButtom);
            layer.draw();
            if (!backDoneShowed) {
                showBackDoneButtons(params);
            }
            backDoneShowed = true;
            answers.apiToLife = 'no refund';
        });
        second.on('mouseenter', function() {
            setTimeout(function() {
                document.body.style.cursor='pointer';
            });
        });
        second.on('mouseleave', function() {
            setTimeout(function() {
                document.body.style.cursor='default';
            });
        });

       
    }

    function hideAPI() {
        var group = layer.find('#refundGroup')[0];
        var tween = new Kinetic.Tween({
            node : group,
            x : group.x() + 100,
            opacity : 0,
            duration : 0.2,
            onFinish : function() {
                tween.destroy();
                group.destroy();
                setTimeout(showAPI2, second * 0.4);
            }
        });
        tween.play();
    }

    function showAPI2() {
        voice.pause();
        voice2.pause();
        voice3.pause();
        voice4.pause();
        clearTimeout(lastTimeout);
        voice3.play({offset : 24 * 1000});
        lastTimeout = setTimeout(function() {
            voice3.pause();
        },  8 * 1000);
        var refundGroup = new Kinetic.Group({
            id : 'apiGroup'
        });
        layer.add(refundGroup);
        var topText = new Kinetic.Text({
            text : '3. Do you want income that...',
            fontSize : 64,
            fontFamily : 'Lusitana',
            fill : '#476CA9'
        });
        topText.y(20);
        topText.x(stageWidth / 2 - topText.width() / 2);
        glow({      
            x: topText.x() + topText.fontSize() / 4,        
            y: topText.y() + topText.fontSize() / 2,        
            radius: topText.fontSize()      
        }); 
        refundGroup.add(topText);
        
        var first = new Kinetic.Group();
        refundGroup.add(first);
        var firstRect = new Kinetic.Rect({
            fill : '#476CA9',
            width : 700,
            y : 200,
            height : 250,
            x : stageWidth / 2 + 200,
            cornerRadius : 30
        });
        var text = new Kinetic.Text({
            text : 'starts higher and\nremains level?',
            fill : 'white',
            allign : 'center',
            fontSize : 50,
            fontFamily : 'Lusitana',
        });
        text.x(firstRect.x() + firstRect.width() / 2 - text.width() / 2);
        text.y(firstRect.y() + firstRect.height() / 2 - text.height() /2);

        first.add(firstRect).add(text);
        var second = new Kinetic.Group();
        refundGroup.add(second);
        var secondRect = new Kinetic.Rect({
            fill : '#476CA9',
            width : firstRect.width(),
            y : firstRect.y() + firstRect.height() + 50,
            height : firstRect.height(),
            x : firstRect.x(),
            cornerRadius : 30
        });
        text = new Kinetic.Text({
            text : 'starts lower and\nincreases with the\ncost of living?',
            fill : 'white',
            allign : 'center',
            fontSize : 50,
            fontFamily : 'Lusitana'
        });
        text.x(secondRect.x() + secondRect.width() / 2 - text.width() / 2);
        text.y(secondRect.y() + secondRect.height() / 2 - text.height() / 2);

        second.add(secondRect).add(text);

        var backDoneShowed = false;
        var params = {
            onDone : hideAPI2,
            onBack : function() {

            }
        };

        first.on('click tap', function() {
            secondRect.fill('#476CA9');
            firstRect.fill('#6fc045');
            layer.find("#men")[0].setImage(images.menTop);
            layer.draw();
            if (!backDoneShowed) {
                showBackDoneButtons(params);
            }
            backDoneShowed = true;
            answers.apiTo = 'level';
        });
        first.on('mouseenter', function() {
            setTimeout(function() {
                document.body.style.cursor='pointer';
            });
        });
        first.on('mouseleave', function() {
            setTimeout(function() {
                document.body.style.cursor='default';
            });
        });

        second.on('click tap', function() {
            firstRect.fill('#476CA9');
            secondRect.fill('#6fc045');
            layer.find("#men").setImage(images.menButtom);
            layer.draw();
            if (!backDoneShowed) {
                showBackDoneButtons(params);
            }
            backDoneShowed = true;
            answers.apiTo = 'cola';
        });
        second.on('mouseenter', function() {
            setTimeout(function() {
                document.body.style.cursor='pointer';
            });
        });
        second.on('mouseleave', function() {
            setTimeout(function() {
                document.body.style.cursor='default';
            });
        });
        layer.draw();
        glow({      
            x: text.x() + text.fontSize() / 4,      
            y: text.y() + text.fontSize() / 2,      
            radius: text.fontSize()         
        }); 
    }

    function hideAPI2() {
        // clearTimeout(lastTimeout);
        // voice.play({
        //     offset : 85 * second
        // });
        var apiGroup = layer.find('#apiGroup')[0];
        var tween = new Kinetic.Tween({
            node : apiGroup,
            x : apiGroup.x() + 100,
            opacity : 0,
            duration : 0.2,
            onFinish : function() {
                tween.destroy();
                apiGroup.destroy();
                hidePair();
            }
        });
        tween.play();
    }

    function hidePair() {
        var men = layer.find('#men')[0];
        var women = layer.find('#women')[0];
        men.setImage(images.men2);
        var tween = new Kinetic.Tween({
            node : men,
            duration : 0.2,
            scaleX : 0.9,
            scaleY : 0.9,
            y : men.y() + 160,
            x : stageWidth - men.width() * 0.9,
            opacity : 0,
            onFinish : function() {
                tween.destroy();
                showResults();
            }
        });
        tween.play();
        var womenTween = new Kinetic.Tween({
            node : women,
            duration : 0.2,
            scaleX : 0.9,
            scaleY : 0.9,
            x : 0,
            y : women.y() + 160,
            opacity : 0,
            onFinish : function() {
                womenTween.destroy();
            }
        });
        womenTween.play();
    }

    function showResults() {
        voice.pause();
        voice2.pause();
        voice3.pause();
        clearTimeout(lastTimeout);
        if (answers.termsOf !== 'save') {
            voice2.play({offset : 23 * second});
            lastTimeout = setTimeout(function() {
                voice2.pause();
                voice4.play({
                    offset : 20.5 * 1000
                });
                lastTimeout = setTimeout(function() {
                    voice4.pause();
                },  9 * 1000);
            },  8 * 1000);
        } else {
            voice.play({offset : 86.5 * second});
            lastTimeout = setTimeout(function () {      
                voice.pause();
                voice4.play({
                    offset : 20.5 * 1000
                });
                lastTimeout = setTimeout(function() {
                    voice4.pause();
                },  9 * 1000);
            }, 5.65 * second)
        }
        var pair = new Kinetic.Image({
            image : images.pair3,
            scaleX : 0.8,
            scaleY : 0.8,
            opacity : 0,
            x : stageWidth / 2 - images.pair3.width / 2 * 0.8,
            y : stageHeight / 2 - images.pair3.height / 2 * 0.8,
            id : 'pair'
        });
        layer.add(pair);
        var pairTween = new Kinetic.Tween({
            node : pair,
            opacity : 1,
            duration : 0.2
        });
        pairTween.play();
        var ground = layer.find('#ground')[0];
        ground.x(pair.x() + pair.width() / 2 * 0.8 - ground.width() / 2* 0.8);
        ground.y(pair.y() + pair.height()* 0.8 - ground.height() / 2* 0.8);
        ground.scaleX(0.8).scaleY(0.8);
        var groundTween = new Kinetic.Tween({
            node : ground,
            opacity : 1,
            duration : 0.2
        });
        groundTween.play();
        var bannerGroup = new Kinetic.Group({
            id : 'banner'
        });
        layer.add(bannerGroup);
        var banner = new Kinetic.Image({
            image : images.banner,
            x : stageWidth / 2 - images.banner.width / 2,
            y : 100
        });
        bannerGroup.add(banner);
        var string = answers.termsOf === 'need' ? 'Savings Results for ' : 'Income Results for ';
        string += answers.name;
        var fakeText = new Kinetic.Text({
            fontFamily : 'Lusitana',
            x : banner.x() + banner.width() / 2,
            y : banner.y() + 20,
            text : string,
            fontSize : findFontSize(string, banner.width() - 400),
        });
        var bannerText = new Kinetic.TextPath({
            fontFamily : 'Lusitana',
            x : banner.x() + banner.width() / 2,
            y : banner.y() + 20,
            text : string,
            fontSize : findFontSize(string, banner.width() - 400),
            id : 'bannerText',
            fill : 'white',
            data : 'M-' + (fakeText.width() / 2) + ',120 C0,20 ' + (fakeText.width() / 2) + ',120 ' + (fakeText.width() / 2) + ',120'
        });
        bannerGroup.add(bannerText);

        var result = new Kinetic.Group({
            opacity : 0,
            id : 'result'
            });
        layer.add(result);
        var leftCircle = new Kinetic.Image({
            image : answers.termsOf === 'need' ? images.greenCircle : images.blueCircle,
            x : stageWidth * 1 / 4 - images.greenCircle.width / 2,
            y : 360
        });
        result.add(leftCircle);
        var rightCircle = new Kinetic.Image({
            image : answers.termsOf === 'save' ? images.greenCircle : images.blueCircle,
            x : stageWidth * 3 / 4 - images.greenCircle.width / 2,
            y : 360
        });
        result.add(rightCircle);
        var leftText = new Kinetic.Text({
            text : answers.termsOf === 'need' ? 'Client\nGuaranteed Annual\nIncome\n\n\n\nYou Provided\n\n' : 'Retirement\nSavings\n\n\n\nYou Provided\n',
            fontSize : 32,
            align : 'center',
            fontFamily : 'Lusitana',
            fill : 'white',
            fontStyle : 'bold'
        });
        leftText.x(leftCircle.x() + leftCircle.width() / 2 - leftText.width() / 2);
        leftText.y(leftCircle.y() + leftCircle.height() / 2 - leftText.height() / 2);
        result.add(leftText);
        var rightText = new Kinetic.Text({
            text : answers.termsOf === 'need' ? 'Retirement\nSavings\n\n\n\nYou Need\n' : 'Guaranteed\nAnnual Income\n\n\n\nYour Savings\nGenerate',
            fontSize : 32,
            align : 'center',
            fontFamily : 'Lusitana',
            fill : 'white',
            fontStyle : 'bold'
        });
        rightText.x(rightCircle.x() + rightCircle.width() / 2 - rightText.width() / 2);
        rightText.y(rightCircle.y() + rightCircle.height() / 2 - rightText.height() / 2);
        result.add(rightText);
        //result.moveToBottom();
        var resultsTwwen = new Kinetic.Tween({
            node : result,
            opacity : 1,
            duration : 0.2
        });
        resultsTwwen.play();

        calculateResults(answers, function(provided, resultV){
            var providedText = new Kinetic.Text({
                y : answers.termsOf === 'save' ? 565 : 575,
                fontSize : 70,
                fill : 'white',
                textStyle : 'bold',
                text : '$' + provided,
                opacity : 0,
                id : 'providedText'
            });
            providedText.x(leftCircle.x() + leftCircle.width() / 2 - providedText.width() / 2);
            providedText.y(leftCircle.y() + leftCircle.height() / 2 - providedText.height() / 2);
            layer.add(providedText);
            var providedTween = new Kinetic.Tween({
                node : providedText,
                opacity : 1,
                duration : 0.2
            });
            providedTween.play();
            var resultText = new Kinetic.Text({
                y : answers.termsOf === 'save' ? 550 : 550,
                fontSize : 70,
                fill : 'white',
                textStyle : 'bold',
                text : '$' + resultV,
                opacity : 0,
                id : 'resultText'
            });
            resultText.x(rightCircle.x() + rightCircle.width() / 2 - resultText.width() / 2);
            resultText.y(rightCircle.y() + rightCircle.height() / 2 - resultText.height() / 2);
            layer.add(resultText);
            var resTween = new Kinetic.Tween({
                node : resultText,
                opacity : 1,
                duration : 0.2
            });
            resTween.play();
        });
        layer.draw();

        setTimeout(function(){
            showBackDoneButtons({
                onDone : hideResults
            });
            // var pairTween = new Kinetic.Tween({
            //     node : pair,
            //     opacity : 0,
            //     duration : 0.2
            // });
            // pairTween.play();
            //  var pairTween = new Kinetic.Tween({
            //     node : ground,
            //     opacity : 0,
            //     duration : 0.2
            // });
            // pairTween.play();
            // var resultsTwwen = new Kinetic.Tween({
            //     node : result,
            //     opacity : 0,
            //     duration : 0.2
            // });
            // resultsTwwen.play();
        }, second * 10);
    }
    function hideResults() {
        var pairTween = new Kinetic.Tween({
            node : layer.find('#pair')[0],
            opacity : 0,
            duration : 0.5
        });
        pairTween.play();
         var pairTween = new Kinetic.Tween({
            node : layer.find('#ground')[0],
            opacity : 0,
            duration : 0.5
        });
        pairTween.play();
        var resultsTwwen = new Kinetic.Tween({
            node : layer.find('#result')[0],
            opacity : 0,
            duration : 0.5
        });
        resultsTwwen.play();
        resultsTwwen = new Kinetic.Tween({
            node : layer.find('#providedText')[0],
            opacity : 0,
            duration : 0.5
        });
        resultsTwwen.play();
        resultsTwwen = new Kinetic.Tween({
            node : layer.find('#resultText')[0],
            opacity : 0,
            duration : 0.5
        });
        resultsTwwen.play();
        var bannerTween = new Kinetic.Tween({
            node : layer.find('#banner')[0],
            opacity : 0,
            duration : 0.5
        });
        bannerTween.play();
        setTimeout(showManAndWomen, 0.3);
    }

    function showManAndWomen() {
        var men = layer.find('#men')[0];
        var women = layer.find('#women')[0];
        men.setImage(images.men2);
        var tween = new Kinetic.Tween({
            node : men,
            duration : 0.2,
            opacity : 1,
            onFinish : function() {
                tween.destroy();
            }
        });
        tween.play();
        var womenTween = new Kinetic.Tween({
            node : women,
            duration : 0.2,
            opacity : 1,
            onFinish : function() {
                womenTween.destroy();
            }
        });
        womenTween.play();
        var bannerGroup = new Kinetic.Group({
            id : 'banner',
            opacity : 0
        });
        layer.add(bannerGroup);
        var banner = new Kinetic.Image({
            image : images.banner,
            x : stageWidth / 2 - images.banner.width / 2,
            y : 100
        });
        bannerGroup.add(banner);
        var string = 'Here are your next steps';
        var fakeText = new Kinetic.Text({
            fontFamily : 'Lusitana',
            text : string,
            fontSize : findFontSize(string, banner.width() - 400)
        });
        var bannerText = new Kinetic.TextPath({
            fontFamily : 'Lusitana',
            x : banner.x() + banner.width() / 2,
            y : banner.y() + 20,
            text : string,
            fontSize : findFontSize(string, banner.width() - 400),
            id : 'bannerText',
            fill : 'white',
            data : 'M-' + (fakeText.width() / 2) + ',120 C0,20 ' + (fakeText.width() / 2) + ',120 ' + (fakeText.width() / 2) + ',120'
        });
        bannerGroup.add(bannerText);
        var bannerTween = new Kinetic.Tween({
            node : bannerGroup,
            duration : 0.2,
            opacity : 1,
            onFinish : function() {
                bannerTween.destroy();
            }
        });
        bannerTween.play();
        // var logo = new Kinetic.Image({
        //     image : images.firstLogo,
        //     x : stageWidth / 2 - images.firstLogo.width / 2,
        //     y : 150,
        //     opacity : 0
        // });
        // layer.add(logo);
        // var logoTween = new Kinetic.Tween({
        //     node : logo,
        //     duration : 0.2,
        //     opacity : 1,
        //     onFinish : function() {
        //         logoTween.destroy();
        //     }
        // });
        // logoTween.play();
        setTimeout(showFinalButtons, 1 * second);
    }
    // function showLinks() {
    //     var links = new Kinetic.Image({
    //         image : images.links,
    //         x : stageWidth / 2 - images.links.width / 2,
    //         y : stageHeight / 2 - images.links.height / 2,
    //         opacity : 1
    //     });
    //     layer.add(links);
    //     var linksTween = new Kinetic.Tween({
    //         node : links,
    //         opacity : 1,
    //         duration : 0.2
    //     });
    //     linksTween.play();
    //     layer.draw();
    // }









    // function showStars() {
    //     voice.pause();
    //     voice2.pause();
    //     voice3.pause();
    //     clearTimeout(lastTimeout);
    //     if (answers.termsOf === 'save') {
    //         voice2.play({offset : 23 * second});
    //         lastTimeout = setTimeout(function() {
    //             voice2.pause();
    //         },  17 * 1000);
    //     } else {
    //         voice.play({offset : 85 * second});
    //     }
        
    //     var text = new Kinetic.Image({
    //         image : images.incomeStars,
    //         y : stageHeight / 5,
    //         x: stageWidth / 2 - images.incomeStars.width / 2
    //     });
    //     layer.add(text);
    //     layer.draw();
    //     setTimeout(function(){
    //         text.setImage(images.income);
    //         layer.draw();
    //         setTimeout(showFinalButtons, second * 2);
    //     }, second * 15);
    // }

    function showFinalButtons() {
        voice.pause();      
        voice2.pause();
        voice4.pause();         
        clearTimeout(lastTimeout);      
        voice3.play({ offset: 32 * 1000 });        
        // lastTimeout = setTimeout(function () {      
        //     voice.pause();      
        // }, 19 * 1000);
        var next = false;
        setTimeout(function(){
            if (next) {
                return;
            }
            var learnButton = new Kinetic.Group();
            layer.add(learnButton);
            var circle = new Kinetic.Circle({
                fill : '#ff6600',
                x : stageWidth / 2 + 200,
                y : stageHeight - 170,
                radius : 150
            });
            var text = new Kinetic.Text({
                text : 'Learn\nMore',
                fill: 'white',
                fontSize : 38,
                fontFamily : 'Lusitana'
            });
            text.x(circle.x() - text.width() / 2);
            text.y(circle.y() - text.height() / 2);
            learnButton.add(circle).add(text);
            learnButton.on('mouseenter', function() {
                setTimeout(function() {
                    document.body.style.cursor='pointer';
                });
            });
            learnButton.on('mouseleave', function() {
                setTimeout(function() {
                    document.body.style.cursor='default';
                });
            });
            layer.draw();
            learnButton.on('click tap', function() {
                hideButtons();
                next = true;
                window.open(leanMoreLink,'_blank');
            });
        }, 8 * 1000);

        setTimeout(function() {
            if (next) {
                return;
            }
            var whyButton = new Kinetic.Group();
            layer.add(whyButton);
            var circle = new Kinetic.Circle({
                fill : '#6fc045',
                x : stageWidth / 2 - 200,
                y : stageHeight  -170,
                radius : 150
            });
            var text = new Kinetic.Text({
                text : '  Why\nAnnuities',
                align : 'center',
                fill: 'white',
                fontSize : 38,
                fontFamily : 'Lusitana'
            });
            text.x(circle.x() - text.width() / 2);
            text.y(circle.y() - text.height() / 2);
            whyButton.add(circle).add(text);
            whyButton.on('mouseenter', function() {
                setTimeout(function() {
                    document.body.style.cursor='pointer';
                });
            });
            whyButton.on('mouseleave', function() {
                setTimeout(function() {
                    document.body.style.cursor='default';
                });
            });
            layer.draw();
            whyButton.on('click tap', function() {
                hideButtons();
                next = true;
                window.open(whyAnnuitiesLink,'_blank');
            });
        }, 5.5 * 1000);

        setTimeout(function() {
            if (next) {
                return;
            }
            var getButton = new Kinetic.Group();
            layer.add(getButton);
            var circle = new Kinetic.Circle({
                fill : '#476ca9',
                x : 550,
                y : stageHeight / 2 + 80,
                radius : 150
            });
            var text = new Kinetic.Text({
                text : 'Get\nCompetitive\nBid',
                fill: 'white',
                fontSize : 38,
                fontFamily : 'Lusitana',
                align : 'center'
            });
            text.x(circle.x() - text.width() / 2);
            text.y(circle.y() - text.height() / 2);
            getButton.add(circle).add(text);
            getButton.on('mouseenter', function() {
                setTimeout(function() {
                    document.body.style.cursor='pointer';
                });
            });
            getButton.on('mouseleave', function() {
                setTimeout(function() {
                    document.body.style.cursor='default';
                });
            });
            layer.draw();
            getButton.on('click tap', function() {
                hideButtons();
                next = true;
                window.open(getCompetitiveBidLink,'_blank');
            });
        }, 1000);

        setTimeout(function(){
            if (next) {
                return;
            }
            voice.play({
                offset : 114 * 1000
            });
        }, 10.5 * 1000);
        setTimeout(function() {
            if (next) {
                return;
            }
            var call = new Kinetic.Image({
                image : images.call,
                y : stageHeight / 2 + 80 - images.call.height / 2 * 0.6,
                x : stageWidth - 550 - images.call.width / 2 * 0.6,
                scaleX : 0.6,
                scaleY : 0.6
            });
            layer.add(call);
            layer.draw();
            call.on('click tap', function() {
                hideButtons();
                next = true;
                window.open(SpecialistLink,'_blank');
            });
            call.on('mouseenter', function() {
                setTimeout(function() {
                    document.body.style.cursor='pointer';
                });
            });
            call.on('mouseleave', function() {
                setTimeout(function() {
                    document.body.style.cursor='default';
                });
            });
        }, second * 11);
        setTimeout(function() {
            if (next) {
                return;
            }
            var text = new Kinetic.Text({
                text : 'Click on one of\nthese buttons to take the\nnext step!',
                align : 'center',
                fontSize : 43,
                fill : '#476ca9',
                fontFamily: 'Lusitana'
            });
            text.x(stageWidth / 2 - text.width() / 2);
            text.y(stageHeight / 2 -70);
            layer.add(text);
            layer.draw();
        }, 1000 * 11 + 4.5 * 1000);
        // setTimeout(function() {
        //     var restart = new Kinetic.Text({
        //         x : 20,
        //         y : 20,
        //         text : "Restart",
        //         fill : "grey",
        //         fontSize : 47
        //     });
        //     layer.add(restart);
        //     restart.on("click tap", function() {
        //         layer.destroyChildren();
        //         start();
        //     });
        //     restart.on('mouseenter', function() {
        //         setTimeout(function() {
        //             document.body.style.cursor='pointer';
        //         });
        //     });
        //     restart.on('mouseleave', function() {
        //         setTimeout(function() {
        //             document.body.style.cursor='default';
        //         });
        //     });
        //     layer.draw();
        // }, 15 * 1000);
        
        setTimeout(function() {
            if (next) {
                return;
            }
            hideButtons();
        }, 1000 * 11 + 18 * 1000);
    }

    function hideButtons() {
        voice.pause();      
        voice2.pause();
        voice4.pause();         
        voice3.pause();         
        clearTimeout(lastTimeout);
        var tween = new Kinetic.Tween({
            node : layer,
            opacity : 0,
            duration : 0.2,
            onFinish : function() {
                tween.destroy();
                layer.destroyChildren();
                layer.opacity(1);
                showFinalLogo();
            }
        });
        tween.play();
    }

    function showFinalLogo() {
        voice.pause();      
        voice2.pause();
        voice3.pause();
        voice4.pause();         
        clearTimeout(lastTimeout);      
        voice5.play();
        lastTimeout = setTimeout(function () {      
            voice5.pause();
        }, 5 * 1000); 
        var image = new Kinetic.Image({
            image : images.firstLogo,
            x : stageWidth / 2 - images.firstLogo.width / 2,
            y : stageHeight / 2 - images.firstLogo.height / 2,
            opacity : 0
        });
        layer.add(image);
        var tween = new Kinetic.Tween({
            node : image,
            duration : 0.2,
            opacity : 1
        }); 
        tween.play();
        var group = new Kinetic.Group({
            opacity : 0,
            y : 930,
            x : stageWidth - 600,
            scaleX : 0.8,
            scaleY : 0.8
        });
        var image = new Kinetic.Image({
            image : images.restart
        });
        group.add(image);
        var done = new Kinetic.Rect({
            x : image.x() + 420,
            y : image.y(),
            width : 420,
            height : 120
        });
        group.add(done);
        done.on('click tap', function() {
            this.off('click tap');
            layer.destroyChildren();
            voice5.pause();
            start();
            answers = {};
            setTimeout(function() {
                document.body.style.cursor='default';
            });
        });
        layer.add(group);
        done.on('mouseenter', function() {
            setTimeout(function() {
                document.body.style.cursor='pointer';
            });
        });
        done.on('mouseleave', function() {
            setTimeout(function() {
                document.body.style.cursor='default';
            });
        });
        var tween = new Kinetic.Tween({
            node : group,
            opacity : 1,
            duration : 0.3,
            x : group.x() - 200
        });
        tween.play();
    }
// })();