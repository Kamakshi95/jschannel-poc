var chan1 = Channel.build({
    window: document.getElementById("child1").contentWindow,
    origin: "*",
    scope: "testScope",
    onReady: function () {
        console.log("channel1 is ready!");
    }
});

var chan2 = Channel.build({
    window: document.getElementById("child2").contentWindow,
    origin: "*",
    scope: "testScope",
    onReady: function () {
        console.log("channel2 is ready!");
    }
});

function callChannel(channel, parameters) {
    channel.call({
        method: "receiveMessageFromParent",
        params: parameters,
        error: function (err) {
            console.log(err);
        }, 
        success: function (data) {
            console.log(data);
        },
    });
}

chan1.bind("sendMessageToParent", function (trans, params) {
    if (params.type == 'controlsChange') {
        if (params.data.visible == true) {
            var btn = document.createElement("BUTTON");
            btn.innerHTML = params.data.meta.buttonText;
            btn.setAttribute("id", params.data.meta.buttonText + '1');
            btn.setAttribute("onclick", 'actionChan1Control("' + params.data.control + '")');
            document.getElementById('div1').appendChild(btn);
        }
        else {
            if (params.data.meta.buttonText=='check') {
                var element = document.getElementById("check1");
                element.parentNode.removeChild(element);

            }
            if (params.data.meta.buttonText=='Next') {
                var element = document.getElementById("Next1");
                element.parentNode.removeChild(element);
            }
        }
    }
})


chan2.bind("sendMessageToParent", function (trans, params) {
    if (params.type == 'controlsChange') {
        if (params.data.visible == true) {
            var btn = document.createElement("BUTTON");
            btn.innerHTML = params.data.meta.buttonText;
            btn.setAttribute("id", params.data.meta.buttonText + '2');
            btn.setAttribute("onclick", 'actionChan2Control("' + params.data.control + '")');
            document.getElementById('div2').appendChild(btn);
        }
        else {
            if (params.data.meta.buttonText=='check') {
                var element = document.getElementById("check2");
                element.parentNode.removeChild(element);

            }
            if (params.data.meta.buttonText=='Next') {
                var element = document.getElementById("Next2");
                element.parentNode.removeChild(element);
            }
        }
    }
})



function actionChan1Control(control) {
    callChannel(chan1, control)
}

function actionChan2Control(control) {
    callChannel(chan2, control)
}











