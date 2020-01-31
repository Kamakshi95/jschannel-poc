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

chan.bind("close", function(context, params) {
    if (!context.origin) throw "where's your origin?";
    chan.notify({method: "terminate", params: 'terminate'});
  });

BindChannel(function (trans, params) {
    document.getElementById('childtext2').innerHTML = params;
    document.getElementById('childtext2').classList.add('p-2')
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



