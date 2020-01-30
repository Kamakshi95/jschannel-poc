var chan = Channel.build({
    window: window.parent,
    origin: "*",
    scope: "testScope"
});

var changeControlsVisibility = function (control, visible, buttonText) {
    var params = {
        type: 'controlsChange',
        data: {
            control: control,
            meta: {
                buttonText: buttonText,
                type: 'button'
            },
            visible: visible
        }
    };
    chan.call({
        method: 'sendMessageToParent',
        params: params,
        success: function () { },
        error: function () {
            console.log('controlsChange method error');
        }
    });
};


function BindChannel(action) {
    chan.bind("receiveMessageFromParent", action);
}


BindChannel(function (trans, params) {
    document.getElementById('childtext2').innerHTML = params
}
)


function displayCheck() {
    changeControlsVisibility('checkAnswer', true, 'check')
}

function hideCheck() {
    changeControlsVisibility('checkAnswer', false, 'check')
}

function displayNext() {
    changeControlsVisibility('goNext', true, 'Next')
}

function hideNext() {
    changeControlsVisibility('goNext', false, 'Next')
}



