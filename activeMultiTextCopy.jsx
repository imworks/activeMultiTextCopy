var select_layer_names = [];
var multi_text = '';

var br = false;        // trueにすると改行が<br>に変換される
var descending = true; // true: 上から順に処理、false: 下から順に処理

executeSelectLayersAction(function (layer) {
    if (layer.kind == LayerKind.TEXT) {
        var text = layer.textItem.contents;
        if (br) {
            text = text.replace(/\r/g, '<br>');
        }
        multi_text += text + '\n';
    } else {
        alert('選択したレイヤーはテキストレイヤーではないようです');
    }
});

copyTextToClipboard(multi_text);

function copyTextToClipboard(text) {
    const keyTextData = app.charIDToTypeID('TxtD');
    const keyTextToClipboardStr = app.stringIDToTypeID("textToClipboard");
    var textStrDesc = new ActionDescriptor();
    textStrDesc.putString(keyTextData, text);
    executeAction(keyTextToClipboardStr, textStrDesc, DialogModes.NO);
}

function executeSelectLayersAction(exec_action) {
    var active_layer = app.activeDocument.activeLayer;
    var is_visible = active_layer.visible;

    var doc_ref = new ActionReference();
    doc_ref.putEnumerated(charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt"));
    var target_layers = executeActionGet(doc_ref).getList(stringIDToTypeID('targetLayersIndexes'));

    var count = target_layers.count;

    if (descending) {
        // 上から順（最上位レイヤーから下へ）
        for (var i = count - 1; i >= 0; i--) {
            processLayer(i, exec_action, target_layers);
        }
    } else {
        // 下から順（最下位レイヤーから上へ）
        for (var i = 0; i < count; i++) {
            processLayer(i, exec_action, target_layers);
        }
    }

    app.activeDocument.activeLayer = active_layer;
    app.activeDocument.activeLayer.visible = is_visible;
}

function processLayer(i, exec_action, target_layers) {
    var index = target_layers.getReference(i).getIndex() + 1;

    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putIndex(charIDToTypeID("Lyr "), index);
    desc.putReference(charIDToTypeID("null"), ref);
    desc.putBoolean(charIDToTypeID("MkVs"), false);
    executeAction(charIDToTypeID("slct"), desc, DialogModes.NO);

    var select_layer = app.activeDocument.activeLayer;
    exec_action(select_layer);
}
