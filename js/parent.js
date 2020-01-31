class Child {
    constructor(containerID, iframeId, src) {
        this.containerID = containerID;
        this.iframeId = iframeId;
        this.src = src;
        this.createIframe(this.containerID, this.iframeId, this.src);
    }
    createIframe(containerID, iframeId, src) {
        var iframe = document.createElement("IFRAME");
        iframe.setAttribute("id", iframeId);
        iframe.setAttribute("src", src);
        document.getElementById(containerID).appendChild(iframe);
        $(iframe).on('load', () => {
            console.log(this.iframeId+' loaded')
            this.initChannel(this.iframeId)
            .then((channel) => {
                this.channel = channel;
                this.bindChannel(this.containerID,this.iframeId)
            });
        })
    }
    initChannel(iframeId) {
        return new Promise(function (resolve, reject) {
            var channel = Channel.build({
                window: document.getElementById(iframeId).contentWindow,
                origin: '*',
                scope:'testScope',
                onReady: function () {
                    console.log('channel ready')
                    resolve(channel);
                }
            });
        });

    }
    actionControl(parameters) {
        this.channel.call({
            method: "receiveMessageFromParent",
            params: parameters,
            error: function (err) {
                console.log(err);
            },
            success: function (data) {
                console.log('receiveMessageFromParent success');
            },
        });
    }
    bindChannel(containerID, id) {
        this.channel.bind("sendMessageToParent",  (trans, params) =>{
            if (params.type == 'controlsChange') {
                if (params.data.visible == true) {
                    var btn = document.createElement("BUTTON");
                    btn.innerHTML = params.data.meta.buttonText;
                    btn.setAttribute("id", params.data.meta.buttonText + id);
                    btn.addEventListener('click',this.actionControl.bind(this,params.data.control));
                    document.getElementById(containerID).appendChild(btn);
                }
                else {
                    if ((params.data.meta.buttonText == 'check')&& (document.getElementById("check" + id))) {
                        var element = document.getElementById("check" + id);
                        element.parentNode.removeChild(element);

                    }
                    if ((params.data.meta.buttonText == 'Next')&& (document.getElementById("Next" + id))) {
                        var element = document.getElementById("Next" + id);
                        element.parentNode.removeChild(element);
                    }
                }
            }
        })
    }

}